// src/components/CotizacionEmpresa.js
import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select } from '@mui/material';
import { obtenerCotizacionesPorEmpresa } from '../services/cotizacionesService';
import GraficoCotizacionHora from './GraficoCotizacionHora';
import { useParams } from 'react-router-dom';

const CotizacionEmpresa = () => {
  const { empresa } = useParams();
  const [cotizaciones, setCotizaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("dia");

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const data = await obtenerCotizacionesPorEmpresa(empresa);
        setCotizaciones(data);
      } catch (error) {
        setError("No se pudieron obtener las cotizaciones.");
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
        Cotización de Acciones
        {/* Selector para el tipo de gráfico */}
        <Select value={filtro} onChange={handleFiltroChange}>
          <MenuItem value="dia">Día</MenuItem>
          <MenuItem value="mes">Mes</MenuItem>
        </Select>
      </h1>

      {/* Gráfico de Cotización por Día o Mes */}
      <GraficoCotizacionHora datosCotizaciones={cotizaciones} filtro={filtro} />

      <Typography variant="h4" gutterBottom>
        Cotizaciones de {empresa}
      </Typography>

      {/* Tabla de Cotizaciones */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Cotización</TableCell>
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
