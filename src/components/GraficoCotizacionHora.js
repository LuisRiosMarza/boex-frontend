import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const GraficoCotizacionDia = ({ datosCotizaciones, filtro }) => {
  const chartRef = useRef();

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
    });

    const lineSeries = chart.addLineSeries({
      color: 'blue',
      lineWidth: 2,
      crossHairMarkerVisible: true,
    });

    chart.timeScale().applyOptions({
      borderColor: '#71649C',
      timeVisible: true,
      rightOffset: 20,
      barSpacing: 10,
      minBarSpacing: 0,
      fixLeftEdge: true,
    });

    const aperturaUTC = new Date();
    aperturaUTC.setHours(6, 0, 0, 0); // 06:00 UTC //En realidad abre 6:30, pero redondeo a las 6:00 UTC
    const cierreUTC = new Date();
    cierreUTC.setHours(16, 0, 0, 0); // 16:00 UTC

    let datosFiltrados;

    if (filtro === "dia") {
      datosFiltrados = datosCotizaciones.filter(cotizacion => {
        const fechaCotizacion = new Date(cotizacion.fecha.split('T')[0] + "T" + cotizacion.hora);
        return fechaCotizacion >= aperturaUTC && fechaCotizacion <= cierreUTC;
      }).map(cotizacion => ({
        //fecha: cotizacion.fecha.split('T')[0] + "T" + cotizacion.hora, Controlo que filtra los datos entre 6 y 16
        time: Math.floor(new Date(cotizacion.fecha.split('T')[0] + "T" + cotizacion.hora).getTime() / 1000),
        value: cotizacion.cotization,
      }));
    }
    else if (filtro === "mes") {
      const mesActual = new Date().getMonth();

      const cotizacionesMes = datosCotizaciones.filter(cotizacion => {
        const fechaCotizacion = new Date(cotizacion.fecha);
        return fechaCotizacion.getMonth() === mesActual;
      });

      // Agrupar cotizaciones por día y calcular el promedio
      const cotizacionesPorDia = cotizacionesMes.reduce((acumulador, cotizacion) => {
        const fecha = cotizacion.fecha.split('T')[0]; // Obtener sólo la fecha
        if (!acumulador[fecha]) {
          acumulador[fecha] = { total: 0, count: 0 };
        }
        acumulador[fecha].total += cotizacion.cotization;
        acumulador[fecha].count += 1;
        return acumulador;
      }, {});

      // Calcular el promedio diario
      datosFiltrados = Object.keys(cotizacionesPorDia).map(fecha => {
        const promedio = cotizacionesPorDia[fecha].total / cotizacionesPorDia[fecha].count;
        return {
          time: Math.floor(new Date(fecha).getTime() / 1000), // Convertir a timestamp en segundos
          value: promedio,
        };
      });
    }
    //console.log(datosFiltrados)
    const orderedData = datosFiltrados.sort((a, b) => a.time - b.time);
    lineSeries.setData(orderedData);

    return () => chart.remove();
  }, [datosCotizaciones, filtro]);

  return (
    <div ref={chartRef} style={{ position: 'relative', width: '100%', height: '300px' }} />
  );
};

export default GraficoCotizacionDia;
