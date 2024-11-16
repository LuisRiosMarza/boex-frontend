// src/components/CotizacionEmpresa.js
import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select } from '@mui/material';
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
  const [idioma, setIdioma] = useState(i18next.language); // Estado para rastrear el idioma actual

  // Configurar el idioma inicial desde localStorage
  useEffect(() => {
    const idiomaGuardado = localStorage.getItem('idioma') || 'es'; // 'es' por defecto
    i18next.changeLanguage(idiomaGuardado);
    setIdioma(idiomaGuardado);

    // Escuchar cambios de idioma
    const handleLanguageChange = (nuevoIdioma) => {
      setIdioma(nuevoIdioma);
    };

    i18next.on('languageChanged', handleLanguageChange);

    // Limpiar el listener al desmontar el componente
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
        setError(i18next.t('errorCotizaciones'));
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
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <h1>
        {i18next.t('cotizacionAcciones')}
        {/* Selector para el tipo de gráfico */}
        <Select value={filtro} onChange={handleFiltroChange}>
          <MenuItem value="dia">{i18next.t('dia')}</MenuItem>
          <MenuItem value="mes">{i18next.t('mes')}</MenuItem>
        </Select>
      </h1>

      {/* Gráfico de Cotización por Día o Mes */}
      <GraficoCotizacionHora datosCotizaciones={cotizaciones} filtro={filtro} />

      <Typography variant="h4" gutterBottom>
        {i18next.t('cotizacionesDe')} {empresa}
      </Typography>

      {/* Tabla de Cotizaciones */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{i18next.t('fecha')}</TableCell>
              <TableCell>{i18next.t('cotizacion')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cotizaciones.map((cotizacion) => (
              <TableRow key={cotizacion.fecha + "T" + cotizacion.hora}>
                <TableCell>{new Date(cotizacion.fecha.split('T')[0] + "T" + cotizacion.hora).toLocaleString()}</TableCell>
                <TableCell>{cotizacion.cotization}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CotizacionEmpresa;
