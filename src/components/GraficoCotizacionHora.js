import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const GraficoCotizacionDia = ({ datosCotizaciones }) => {
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

    // Obtener la fecha de hoy sin horas, minutos y segundos
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    // Crear un nuevo objeto de fecha para el final del día
    const finDelDia = new Date(hoy);
    finDelDia.setHours(23, 59, 59, 999);

    // Filtrar las cotizaciones para solo incluir las de hoy
    const datosHoy = datosCotizaciones.filter(cotizacion => {
      const fechaCotizacion = new Date(cotizacion.fecha);
      // Debug: Mostrar las fechas
      console.log(`Filtrando cotización: ${cotizacion.fecha} - ${fechaCotizacion}`);
      return fechaCotizacion >= hoy && fechaCotizacion <= finDelDia;
    });

    // Verificar los datos filtrados
    console.log('Datos filtrados de hoy:', datosHoy);

    // Convertir los datos a un formato que Lightweight Charts pueda utilizar
    const data = datosHoy.map(cotizacion => {
      const date = new Date(cotizacion.fecha);
      return {
        time: Math.floor(date.getTime() / 1000), // Convertir a timestamp en segundos
        value: cotizacion.precio,
      };
    });

    // Verificar la conversión de datos
    console.log('Datos convertidos para el gráfico:', data);

    // Filtrar duplicados y ordenar por tiempo ascendente
    const uniqueData = Array.from(new Map(data.map(item => [item.time, item])).values());
    const orderedData = uniqueData.sort((a, b) => a.time - b.time);

    // Verificar los datos finales
    console.log('Datos únicos y ordenados:', orderedData);

    // Actualizar la serie con los datos
    lineSeries.setData(orderedData);

    // Limpiar el chart al desmontar el componente
    return () => chart.remove();
  }, [datosCotizaciones]);

  return (
    <div ref={chartRef} style={{ position: 'relative', width: '100%', height: '300px' }} />
  );
};

export default GraficoCotizacionDia;
