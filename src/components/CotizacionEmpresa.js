import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, MenuItem, Select, Box, Alert } from '@mui/material';
import { obtenerCotizacionesPorEmpresa } from '../services/cotizacionesService';
import GraficoCotizacionHora from './GraficoCotizacionHora';
import { useParams } from 'react-router-dom';
import i18next from 'i18next';

const CotizacionEmpresa = () => {
  const { empresa } = useParams();
  const [cotizaciones, setCotizaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("dia");
  const [idioma, setIdioma] = useState(i18next.language);

  // Configurar el idioma inicial desde localStorage
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
      try {
        const data = await obtenerCotizacionesPorEmpresa(empresa);
        setCotizaciones(data);
      } catch (error) {
        setError('Error al obtener las cotizaciones');
      } finally {
        setCargando(false);
      }
    };

    fetchCotizaciones();
  }, [empresa]);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  if (cargando) {
    return (
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
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Alert
          severity="error"
          sx={{
            width: '100%',
            maxWidth: '600px',
            textAlign: 'center',
          }}
        >
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
    <Box
      sx={{
        px: { xs: 2, md: 4 }, // Espaciado horizontal responsivo
        py: 4,
        maxWidth: { xs: '100%', md: '80%' },
        margin: '0 auto',
      }}
    >
      {/* Encabezado */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: '1.5rem', md: '2.5rem' }, // Tamaño de fuente responsivo
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {i18next.t('cotizacionAcciones')}
        </Typography>
        <Select
          value={filtro}
          onChange={handleFiltroChange}
          variant="outlined"
          sx={{
            width: { xs: '100%', md: '200px' }, // Tamaño responsivo
            mt: { xs: 2, md: 0 },
          }}
        >
          <MenuItem value="dia">{i18next.t('dia')}</MenuItem>
          <MenuItem value="mes">{i18next.t('mes')}</MenuItem>
        </Select>
      </Box>

      {/* Gráfico */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <GraficoCotizacionHora
          datosCotizaciones={cotizaciones.map((c) => ({
            ...c,
            cotization: c.cotization * multiplicador,
          }))}
          filtro={filtro}
          esIndice={false}
          indicesDisponibles={[]}
          sx={{
            width: { xs: '100%', md: '75%' }, // Ajuste de tamaño del gráfico
            height: { xs: '300px', md: '500px' }, // Altura responsiva
          }}
        />
      </Box>

      {/* Información adicional */}
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          fontSize: { xs: '1rem', md: '1.25rem' }, // Tamaño de fuente responsivo
          mb: 4,
        }}
      >
        {i18next.t('cotizacionesDe')} {empresa}
      </Typography>
    </Box>
  );
};

export default CotizacionEmpresa;
