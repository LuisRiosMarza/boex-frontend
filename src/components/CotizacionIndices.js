import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, MenuItem, Select, Alert, Box } from '@mui/material';
import { obtenerCotizacionesPorCodigoIndice } from '../services/indicesCotizacionesService';
import { obtenerIndices } from '../services/indicesService';
import GraficoCotizacionHora from './GraficoCotizacionHora'; // reutilizo este componente
import { useParams } from 'react-router-dom';
import i18next from 'i18next';

const CotizacionIndice = () => {
  const { code } = useParams(); // Parámetro del índice
  const [cotizaciones, setCotizaciones] = useState([]);
  const [cotizacionesComparadas, setCotizacionesComparadas] = useState([]); // Cotizaciones para el índice comparado
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("dia");
  const [idioma, setIdioma] = useState(i18next.language);
  const [indicesDisponibles, setIndicesDisponibles] = useState([]);
  const [indiceSeleccionado, setIndiceSeleccionado] = useState(""); // Estado para el índice seleccionado

  // Configurar idioma inicial y manejar cambios
  useEffect(() => {
    const idiomaGuardado = localStorage.getItem('idioma') || 'es';
    i18next.changeLanguage(idiomaGuardado);
    setIdioma(idiomaGuardado);

    const handleLanguageChange = (nuevoIdioma) => {
      setIdioma(nuevoIdioma);
    };

    i18next.on('languageChanged', handleLanguageChange);

    return () => {
      i18next.off('languageChanged', handleLanguageChange);
    };
  }, []);

  // Obtener cotizaciones del índice actual
  useEffect(() => {
    const fetchCotizaciones = async () => {
      setCargando(true);
      try {
        const data = await obtenerCotizacionesPorCodigoIndice(code);
        setCotizaciones(data);
      } catch (error) {
        setError('Error al obtener las cotizaciones del índice');
      } finally {
        setCargando(false);
      }
    };

    fetchCotizaciones();
  }, [code]);

  // Obtener cotizaciones del índice comparado cuando se selecciona uno
  useEffect(() => {
    const fetchCotizacionesComparadas = async () => {
      if (!indiceSeleccionado) {
        setCotizacionesComparadas([]);
        return;
      }
      setCargando(true);
      try {
        const data = await obtenerCotizacionesPorCodigoIndice(indiceSeleccionado);
        setCotizacionesComparadas(data);
      } catch (error) {
        setError('Error al obtener las cotizaciones del índice comparado');
      } finally {
        setCargando(false);
      }
    };

    fetchCotizacionesComparadas();
  }, [indiceSeleccionado]);

  // Cargar índices disponibles desde el backend
  useEffect(() => {
    const cargarIndices = async () => {
      try {
        const data = await obtenerIndices();
        setIndicesDisponibles(data);
      } catch (error) {
        console.error('Error al cargar los índices:', error);
      }
    };

    cargarIndices();
  }, []);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const handleIndiceChange = (event) => {
    setIndiceSeleccionado(event.target.value); // Cambiar el índice seleccionado
  };

  if (cargando) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Alert severity="error" sx={{ width: '100%', maxWidth: '600px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
          <strong>{error}</strong>
        </Alert>
      </Box>
    );
  }

  // Determinar multiplicador según el idioma
  let multiplicador = 1;
  if (idioma === 'ru') {
    multiplicador = 98;
  }

  return (
    <div>
      {/* Encabezado */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 4,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          {i18next.t('cotizacionIndices')}
        </Typography>
        <Select
          value={filtro}
          onChange={handleFiltroChange}
          variant="outlined"
          sx={{ width: '200px' }}
        >
          <MenuItem value="dia">{i18next.t('dia')}</MenuItem>
          <MenuItem value="mes">{i18next.t('mes')}</MenuItem>
        </Select>
      </Box>

      {/* Gráfico para las cotizaciones del índice */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <GraficoCotizacionHora
          datosCotizaciones={cotizaciones.map(c => ({
            ...c,
            cotization: c.valor * multiplicador, // Ajuste del multiplicador si es necesario
          }))}
          filtro={filtro}
          segundoIndiceDatos={cotizacionesComparadas.map(c => ({
            ...c,
            cotization: c.valor * multiplicador, // Ajuste del multiplicador si es necesario
          }))}
        />
      </Box>

      {/* Selector para comparar con otro índice */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Select
          value={indiceSeleccionado}
          onChange={handleIndiceChange}
          displayEmpty
          variant="outlined"
          sx={{ width: '200px' }}
        >
          {/* Opción por defecto */}
          <MenuItem value="" disabled>
            Seleccione un índice
          </MenuItem>
          {indicesDisponibles
            .filter((indice) => indice.code !== code) // Excluir el índice actual
            .map((indice) => (
              <MenuItem key={indice.code} value={indice.code}>
                {indice.name}
              </MenuItem>
            ))}
        </Select>
      </Box>

      {/* Información adicional */}
      <Typography
        variant="h5"
        sx={{ textAlign: 'center', color: 'text.secondary', mb: 4 }}
      >
        {i18next.t('cotizacionesDe')} {code}
      </Typography>
    </div>
  );
};

export default CotizacionIndice;
