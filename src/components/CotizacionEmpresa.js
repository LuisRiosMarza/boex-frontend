// src/components/CotizacionEmpresa.js
import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { obtenerCotizacionesPorEmpresa } from '../services/cotizacionesService';
import GraficoCotizacionHora from './GraficoCotizacionHora';

const CotizacionEmpresa = ({ empresa }) => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

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

  if (cargando) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      {/* Gráfico de Cotización por Hora */}
      <h1>Cotización de Acciones por Hora</h1>
      <GraficoCotizacionHora datosCotizaciones={cotizaciones} />

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
              <TableRow key={cotizacion.fecha}>
                <TableCell>{cotizacion.fecha}</TableCell>
                <TableCell>{cotizacion.precio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CotizacionEmpresa;
