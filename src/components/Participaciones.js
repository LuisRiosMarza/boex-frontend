import React, { useEffect, useState } from 'react';
import GraficoTorta from './GraficoTorta';
import { CircularProgress } from '@mui/material';
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
        return <CircularProgress />;
    }

    return (
        <div style={{ width: '600px', height: '600px' }}>
            <select
                value={modo}
                onChange={(e) => setModo(e.target.value)}
                style={{ marginBottom: '20px', padding: '8px' }}
            >
                <option value="dia">Día</option>
                <option value="mes">Mes</option>
            </select>
            <GraficoTorta datos={datos} etiquetas={etiquetas} colores={colores} />
        </div>
    );
};

export default Participaciones;
