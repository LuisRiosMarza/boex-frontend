import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, MenuItem, Select, Alert, Box, useMediaQuery } from '@mui/material';
import { obtenerCotizacionesPorCodigoIndice } from '../services/indicesCotizacionesService';
import { obtenerIndices } from '../services/indicesService';
import GraficoCotizacionHora from './GraficoCotizacionHora';
import { useParams } from 'react-router-dom';
import i18next from 'i18next';

const CotizacionIndice = () => {
  const { code } = useParams();
  const [cotizaciones, setCotizaciones] = useState([]);
  const [cotizacionesComparadas, setCotizacionesComparadas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('dia');
  const [idioma, setIdioma] = useState(i18next.language);
  const [indicesDisponibles, setIndicesDisponibles] = useState([]);
  const [indiceSeleccionado, setIndiceSeleccionado] = useState('');

  const esMobile = useMediaQuery('(max-width:600px)'); // Detectar pantallas pequeñas

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
    setIndiceSeleccionado(event.target.value);
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
          justifyContent: esMobile ? 'center' : 'space-between',
          alignItems: 'center',
          my: esMobile ? 2 : 4,
          flexDirection: esMobile ? 'column' : 'row',
          gap: esMobile ? 2 : 0,
        }}
      >
        <Typography
          variant={esMobile ? 'h5' : 'h3'}
          component="h1"
          gutterBottom
          sx={{ textAlign: esMobile ? 'center' : 'left' }}
        >
          {i18next.t('cotizacionIndices')}
        </Typography>
        <Select
          value={filtro}
          onChange={handleFiltroChange}
          variant="outlined"
          sx={{ width: esMobile ? '150px' : '200px' }}
        >
          <MenuItem value="dia">{i18next.t('dia')}</MenuItem>
          <MenuItem value="mes">{i18next.t('mes')}</MenuItem>
          <MenuItem value="anio">{i18next.t('anio')}</MenuItem>
        </Select>
      </Box>

      {/* Gráfico */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: esMobile ? 2 : 4,
        }}
      >
        <GraficoCotizacionHora
          datosCotizaciones={cotizaciones.map((c) => ({
            ...c,
            cotization: c.valor * multiplicador,
          }))}
          filtro={filtro}
          segundoIndiceDatos={cotizacionesComparadas.map((c) => ({
            ...c,
            cotization: c.valor * multiplicador,
          }))}
          estiloGrafico={{ height: esMobile ? 300 : 500, width: '100%' }}
        />
      </Box>

      {/* Selector para comparar con otro índice */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: esMobile ? 2 : 4 }}>
        <Select
          value={indiceSeleccionado}
          onChange={handleIndiceChange}
          displayEmpty
          variant="outlined"
          sx={{ width: esMobile ? '150px' : '200px' }}
        >
          <MenuItem value="" disabled>
            {i18next.t('seleccioneIndice')}
          </MenuItem>
          {indicesDisponibles
            .filter((indice) => indice.code !== code)
            .map((indice) => (
              <MenuItem key={indice.code} value={indice.code}>
                {indice.name}
              </MenuItem>
            ))}
        </Select>
      </Box>

      {/* Información adicional */}
      <Typography
        variant={esMobile ? 'body1' : 'h5'}
        sx={{ textAlign: 'center', color: 'text.secondary', mb: esMobile ? 2 : 4 }}
      >
        {i18next.t('cotizacionesDe')} {code}
      </Typography>
    </div>
  );
};

export default CotizacionIndice;
