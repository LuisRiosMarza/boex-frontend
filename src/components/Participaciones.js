import React, { useEffect, useState } from 'react';
import GraficoTorta from './GraficoTorta';
import { CircularProgress, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { obtenerEmpresas } from '../services/empresasService';
import { obtenerCotizacionesPorEmpresa } from '../services/cotizacionesService';

const Participaciones = () => {
    const [cargando, setCargando] = useState(true);
    const [modo, setModo] = useState('dia'); // 'dia' o 'mes'
    const [etiquetas, setEtiquetas] = useState([]);
    const [datos, setDatos] = useState([]);
    const [colores, setColores] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empresas = await obtenerEmpresas();
                const fechaActual = new Date();
                let fechaFiltro;

                // Definir el filtro según el modo seleccionado
                if (modo === 'dia') {
                    fechaFiltro = fechaActual.toISOString().split('T')[0]; // YYYY-MM-DD
                } else if (modo === 'mes') {
                    fechaFiltro = fechaActual.toISOString().slice(0, 7); // YYYY-MM
                }

                const datosPorEmpresa = await Promise.all(
                    empresas.map(async (empresa) => {
                        const cotizaciones = await obtenerCotizacionesPorEmpresa(empresa.codempresa);
                        let total = 0;

                        cotizaciones.forEach((cotizacion) => {
                            if (cotizacion && cotizacion.fecha && cotizacion.fecha.startsWith(fechaFiltro)) {
                                total += cotizacion.cotization;
                            }
                        });

                        return { nombre: empresa.empresaNombre, total };
                    })
                );

                let totalGeneral = 0;
                datosPorEmpresa.forEach((e) => {
                    if (e.total) {
                        totalGeneral += e.total;
                    }
                });

                const etiquetasGeneradas = [];
                const datosGenerados = [];
                const coloresGenerados = [];

                datosPorEmpresa.forEach(({ nombre, total }) => {
                    if (total > 0) {
                        etiquetasGeneradas.push(nombre);
                        datosGenerados.push(((total / totalGeneral) * 100).toFixed(2));
                        coloresGenerados.push(
                            `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`
                        );
                    }
                });

                setEtiquetas(etiquetasGeneradas);
                setDatos(datosGenerados);
                setColores(coloresGenerados);
            } catch (error) {
                console.error('Error al cargar datos para las participaciones:', error);
            } finally {
                setCargando(false);
            }
        };

        fetchData();
    }, [modo]);

    if (cargando) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>

            {/* Contenedor para el selector alineado a la derecha */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                my: 4,
            }}>
                {/* Título alineado a la izquierda */}
                <Typography variant="h4" gutterBottom align="left">
                    Participaciones por Empresa
                </Typography>

                <FormControl fullWidth variant="outlined" sx={{ width: '150px' }}>
                    <InputLabel>Modo</InputLabel>
                    <Select
                        value={modo}
                        onChange={(e) => setModo(e.target.value)}
                        label="Modo"
                    >
                        <MenuItem value="dia">Día</MenuItem>
                        <MenuItem value="mes">Mes</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Gráfico achicado */}
            <Box sx={{ maxWidth: '100%', height: '500px', marginBottom: 2, display: 'flex', justifyContent: 'center', mt: 2 }}>
                <GraficoTorta datos={datos} etiquetas={etiquetas} colores={colores} />
            </Box>

            {/* Descripción adicional debajo del gráfico */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                    Datos de participación según el modo seleccionado (Día o Mes).
                </Typography>
            </Box>
        </Box>
    );
};

export default Participaciones;
