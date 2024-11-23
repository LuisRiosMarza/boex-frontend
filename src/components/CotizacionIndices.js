import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, MenuItem, Select } from '@mui/material';
import { obtenerCotizacionesPorCodigoIndice } from '../services/indicesCotizacionesService';
import GraficoCotizacionHora from './GraficoCotizacionHora'; // reutilizo este componente
import { useParams } from 'react-router-dom';
import i18next from 'i18next';

const CotizacionIndice = () => {
  const { codigoIndice } = useParams(); // Parámetro del índice
  const [cotizaciones, setCotizaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("dia");
  const [idioma, setIdioma] = useState(i18next.language);

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

  // Obtener cotizaciones del índice
  useEffect(() => {
    const fetchCotizaciones = async () => {
      console.log(codigoIndice);
      try {
        const data = await obtenerCotizacionesPorCodigoIndice(codigoIndice);
        setCotizaciones(data);
      } catch (error) {
        setError('Error al obtener las cotizaciones del índice');
      } finally {
        setCargando(false);
      }
    };

    fetchCotizaciones();
  }, [codigoIndice]);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  if (cargando) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Determinar multiplicador según el idioma
  let multiplicador = 1;
  if (idioma === 'ru') {
    multiplicador = 98;
  }

  return (
    <div>
      <h1>
        {i18next.t('cotizacionIndices')}
        <Select value={filtro} onChange={handleFiltroChange}>
          <MenuItem value="dia">{i18next.t('dia')}</MenuItem>
          <MenuItem value="mes">{i18next.t('mes')}</MenuItem>
        </Select>
      </h1>

      {/* Gráfico para las cotizaciones del índice */}
      <GraficoCotizacionHora datosCotizaciones={cotizaciones.map(c => ({
        ...c,
        cotization: c.valorIndice * multiplicador,
      }))} filtro={filtro} />

      <Typography variant="h4" gutterBottom>
        {i18next.t('cotizacionesDe')} {codigoIndice}
      </Typography>
    </div>
  );
};

export default CotizacionIndice;
