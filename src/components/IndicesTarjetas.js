// src/components/IndicesTarjetas.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerIndices } from '../services/indicesService';
import { obtenerCotizacionesPorCodigoIndice } from '../services/indicesCotizacionesService';
import i18next from 'i18next';
import { useTheme, useMediaQuery, CircularProgress, Box } from '@mui/material';

const IndicesTarjetas = () => {
  const [indices, setIndices] = useState([]);
  const [idioma, setIdioma] = useState(i18next.language); // Estado para el idioma
  const [cambios, setCambios] = useState({}); // Estado para guardar cambios en cotizaciones
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error404, setError404] = useState({}); // Estado para manejar errores 404 por código
  const navigate = useNavigate();

  // Función para obtener los índices y calcular cambios
  const obtenerDatosIndices = async () => {
    try {
      const indicesData = await obtenerIndices();
      const cambiosTemp = {};
      const erroresTemp = {}; // Almacenamos los errores 404

      // Obtener cambios de cotización para cada índice
      for (const indice of indicesData) {
        // Verificar que el código no sea undefined
        if (!indice.code) continue;

        try {
          const cotizaciones = await obtenerCotizacionesPorCodigoIndice(indice.code);
          //console.log(cotizaciones);

          // Filtrar cotizaciones entre las 6:00 y las 16:00
          const cotizacionesFiltradas = cotizaciones.filter(cotizacion => {
            const hora = new Date(cotizacion.fecha + 'T' + cotizacion.hora).getHours();
            return hora >= 6 && hora <= 16;
          });
          //console.log(cotizacionesFiltradas);

          if (cotizacionesFiltradas.length >= 10) {
            const ultima = cotizacionesFiltradas[cotizacionesFiltradas.length - 1].valorIndice;
            const penultima = cotizacionesFiltradas[cotizacionesFiltradas.length - 10].valorIndice;
            const cambioPorcentaje = ((ultima - penultima) / penultima) * 100;

            if (cambioPorcentaje > 0) {
              cambiosTemp[indice.code] = { tipo: 'subio', porcentaje: cambioPorcentaje.toFixed(2) };
            } else if (cambioPorcentaje < 0) {
              cambiosTemp[indice.code] = { tipo: 'bajo', porcentaje: Math.abs(cambioPorcentaje).toFixed(2) };
            } else {
              cambiosTemp[indice.code] = { tipo: 'mantuvo', porcentaje: '0.00' };
            }
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            erroresTemp[indice.code] = i18next.t('errorCotizaciones');
          }
        }
      }

      setIndices(indicesData);
      setCambios(cambiosTemp);
      setError404(erroresTemp); // Establecer los errores 404
      setLoading(false); // Finaliza el estado de carga una vez que los datos están listos
    } catch (error) {
      console.error("Error al obtener los índices:", error);
      setLoading(false); // Finaliza el estado de carga en caso de error
    }
  };


  // Configurar idioma inicial y manejar cambios
  useEffect(() => {
    const idiomaGuardado = localStorage.getItem('idioma') || 'es';
    i18next.changeLanguage(idiomaGuardado);
    setIdioma(idiomaGuardado);

    const handleLanguageChange = (nuevoIdioma) => {
      setIdioma(nuevoIdioma); // Actualizar el idioma
    };

    i18next.on('languageChanged', handleLanguageChange);

    return () => {
      i18next.off('languageChanged', handleLanguageChange);
    };
  }, []);

  // Recargar datos al cambiar el idioma
  useEffect(() => {
    setLoading(true); // Inicia el estado de carga antes de obtener los datos
    obtenerDatosIndices();
  }, [idioma]);

  // Navegar al detalle del índice
  const handleCardClick = (code) => {
    navigate(`/indicesCotizaciones/${code}`);
  };

  // Usar media query para detectar si es mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xl'));

  // Aplicar marginLeft solo si no es mobile
  let marginLeftValue = '240px';
  if (isMobile === true) {
    marginLeftValue = '0';
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '20px',
        marginLeft: marginLeftValue, // Aplicar marginLeft según el dispositivo
        marginTop: '96px',
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        indices.map((indice) => {
          // Verificar que el código no sea undefined
          if (!indice.code) return null;

          const cambio = cambios[indice.code];
          const error = error404[indice.code]; // Verificar si hubo error 404 para este índice

          // Si no hay cotizaciones o si hubo un error 404, no mostrar el cartel de porcentaje
          return (
            <div
              key={indice._id}
              onClick={() => handleCardClick(indice.code)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                width: '200px',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                {indice.name}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {i18next.t('codigo')}: {indice.code}
              </div>
              {error ? (
                <div style={{ color: 'red', marginTop: '8px' }}>
                  {i18next.t('errorCotizaciones')}
                </div>
              ) : (
                cambio && (
                  <div
                    style={{
                      marginTop: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: cambio.tipo === 'subio' ? 'green' : cambio.tipo === 'bajo' ? 'red' : 'gray',
                      color: 'white',
                      borderRadius: '4px',
                      padding: '4px 8px',
                    }}
                  >
                    {cambio.tipo === 'subio' && '↑'}
                    {cambio.tipo === 'bajo' && '↓'}
                    <span style={{ marginLeft: cambio.tipo === 'mantuvo' ? '0' : '8px' }}>
                      {cambio.porcentaje}%
                    </span>
                  </div>
                )
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default IndicesTarjetas;
