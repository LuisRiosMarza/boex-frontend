// src/components/GraficoPie.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los elementos necesarios
ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoTorta = ({ datos, etiquetas, colores }) => {
  const data = {
    labels: etiquetas,
    datasets: [
      {
        data: datos,
        backgroundColor: colores,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options}  />;
};

export default GraficoTorta;
