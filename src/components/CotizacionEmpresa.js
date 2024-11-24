import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, MenuItem, Select, Box, Alert, Container } from '@mui/material';
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
          {i18next.t('cotizacionAcciones')}
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
            cotization: c.cotization * multiplicador,
          }))}
          filtro={filtro}
          esIndice={false}
          indicesDisponibles={[]}
        />
      </Box>


      {/* Información adicional */}
      <Typography
        variant="h5"
        sx={{ textAlign: 'center', color: 'text.secondary', mb: 4 }}
      >
        {i18next.t('cotizacionesDe')} {empresa}
      </Typography>
    </div>
  );
};

export default CotizacionEmpresa;
