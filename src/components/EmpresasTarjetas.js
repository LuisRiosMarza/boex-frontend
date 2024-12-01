// src/components/EmpresasTarjetas.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEmpresas } from '../services/empresasService';
import { obtenerCotizacionesPorEmpresa } from '../services/cotizacionesService'; // Importa el servicio necesario
import i18next from 'i18next';
import { useTheme, useMediaQuery, CircularProgress, Box } from '@mui/material';

const EmpresasTarjetas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [idioma, setIdioma] = useState(i18next.language); // Estado para el idioma
  const [cambios, setCambios] = useState({}); // Estado para guardar cambios en cotizaciones
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const navigate = useNavigate();

  // Función para obtener las empresas y calcular cambios en las cotizaciones
  const obtenerDatosEmpresas = async () => {
    try {
      const empresasData = await obtenerEmpresas();
      const cambiosTemp = {};

      // Obtener cambios de cotización para cada empresa
      for (const empresa of empresasData) {
        const cotizaciones = await obtenerCotizacionesPorEmpresa(empresa.codempresa);

        // Filtrar cotizaciones entre las 6:00 y las 16:00
        const cotizacionesFiltradas = cotizaciones.filter(cotizacion => {
          const hora = new Date(cotizacion.fecha + 'T' +cotizacion.hora).getHours();
          return hora >= 6 && hora <= 16;
        });
        //console.log(cotizacionesFiltradas);
        if (cotizacionesFiltradas.length >= 10) {
          const ultima = cotizacionesFiltradas[cotizacionesFiltradas.length - 1].cotization;
          const penultima = cotizacionesFiltradas[cotizacionesFiltradas.length - 10].cotization;

          //console.log(ultima + " " + empresa.codempresa);
          //console.log(penultima + " " + empresa.codempresa);

          const cambioPorcentaje = ((ultima - penultima) / penultima) * 100;

          if (cambioPorcentaje > 0) {
            cambiosTemp[empresa.codempresa] = { tipo: 'subio', porcentaje: cambioPorcentaje.toFixed(2) };
          } else if (cambioPorcentaje < 0) {
            cambiosTemp[empresa.codempresa] = { tipo: 'bajo', porcentaje: Math.abs(cambioPorcentaje).toFixed(2) };
          } else {
            cambiosTemp[empresa.codempresa] = { tipo: 'mantuvo', porcentaje: '0.00' };
          }
        }
      }

      setEmpresas(empresasData);
      setCambios(cambiosTemp);
      setLoading(false); // Finaliza el estado de carga una vez que los datos están listos
    } catch (error) {
      console.error('Error al obtener las empresas o cotizaciones:', error);
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
    obtenerDatosEmpresas();
  }, [idioma]);

  // Determinar multiplicador según el idioma
  let multiplicador = 1;
  if (idioma === 'ru') {
    multiplicador = 98;
  }

  // Navegar al detalle de la empresa
  const handleCardClick = (codempresa) => {
    navigate(`/${codempresa}`);
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
        marginLeft: marginLeftValue,
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
        empresas.map((empresa) => {
          const cambio = cambios[empresa.codempresa];
          return (
            <div
              key={empresa._id}
              onClick={() => handleCardClick(empresa.codempresa)}
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
                {empresa.empresaNombre}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {i18next.t('codigo')}: {empresa.codempresa}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {i18next.t('cotizacionIncial')}:{' '}
                ${(empresa.cotizationInicial * multiplicador).toFixed(2)}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {i18next.t('acciones')}: {empresa.cantidadAcciones}
              </div>
              {cambio && (
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
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default EmpresasTarjetas;
