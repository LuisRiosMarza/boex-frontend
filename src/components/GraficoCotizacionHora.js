import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { DateTime } from 'luxon';

const GraficoCotizacionDia = ({ datosCotizaciones, filtro }) => {
  const chartRef = useRef();
  const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || ''); // Cargar idioma desde localStorage

  // Función para agregar las fechas y tiempos
  const agregarFechas = (data, idioma) => {
    return data.map(item => {
      // Crear objeto DateTime a partir de la fecha UTC
      const fechaUTC = DateTime.fromISO(item.fechaUTC, { zone: 'utc' });

      // Definir la zona horaria según el idioma
      let zonaHoraria = 'America/Argentina/Buenos_Aires'; // Valor predeterminado para Argentina
      let diferenciaHoras = -3; // Argentina está a UTC-3 por defecto

      if (idioma === 'ru') {
        zonaHoraria = 'Europe/Moscow'; // Zona horaria de Rusia para el idioma 'ru'
        diferenciaHoras = 3; // Rusia está a UTC+3
      }

      // Convertir a la zona horaria seleccionada
      const fechaLocal = fechaUTC.setZone(zonaHoraria);
      const fechaLocalSegundos = fechaLocal.toSeconds();

      // Ajustar el timestamp según la diferencia horaria
      const timestampAjustado = fechaLocalSegundos + diferenciaHoras * 3600; // Sumar o restar la diferencia en segundos

      return {
        ...item,
        // Asignamos la fecha y el tiempo en la zona seleccionada
        fechaLocal: fechaLocal.toISO().slice(0, 16),
        time: timestampAjustado, // Timestamp ajustado en segundos
      };
    });
  };

  useEffect(() => {
    // Obtener el idioma desde localStorage y actualizar el estado
    const idiomaGuardado = localStorage.getItem('idioma') || 'es'; // Si no hay idioma, usar 'es' como predeterminado
    setIdioma(idiomaGuardado);
    console.log(idiomaGuardado);

    const chart = createChart(chartRef.current, {
      layout: {
        background: { color: "#222" },
        textColor: "#DDD"
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
    });

    const lineSeries = chart.addLineSeries({
      lineWidth: 2,
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
    aperturaUTC.setHours(6, 0, 0, 0); // 06:00 UTC
    const cierreUTC = new Date();
    cierreUTC.setHours(16, 0, 0, 0); // 16:00 UTC

    let datosFiltrados;

    if (filtro === "dia") {
      datosFiltrados = datosCotizaciones
        .filter(cotizacion => {
          const fechaCotizacion = new Date(cotizacion.fecha.split('T')[0] + "T" + cotizacion.hora);
          return fechaCotizacion >= aperturaUTC && fechaCotizacion <= cierreUTC;
        })
        .map(cotizacion => ({
          fechaUTC: cotizacion.fecha.split('T')[0] + "T" + cotizacion.hora,
          //time: Math.floor(new Date(cotizacion.fecha.split('T')[0] + "T" + cotizacion.hora).getTime() / 1000),
          value: cotizacion.cotization,
        }));

      // Agregar fechas y tiempos en función del idioma seleccionado (Argentina o Rusia)
      datosFiltrados = agregarFechas(datosFiltrados, idioma);
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
    console.log(datosFiltrados);
    const orderedData = datosFiltrados.sort((a, b) => a.time - b.time);
    lineSeries.setData(orderedData);

    return () => chart.remove();
  }, [datosCotizaciones, filtro, idioma]);

  return (
    <div ref={chartRef} style={{ position: 'relative', width: '100%', height: '300px' }} />
  );
};

export default GraficoCotizacionDia;
