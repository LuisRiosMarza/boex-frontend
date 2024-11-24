// src/components/IndicesTarjetas.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerIndices } from '../services/indicesService';

const IndicesTarjetas = () => {
  const [Indices, setIndices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const IndicesData = await obtenerIndices();
        setIndices(IndicesData);
      } catch (error) {
        console.error("Error al obtener los Indices:", error);
      }
    };
    obtenerDatos();
  }, []);

  const handleCardClick = (code) => {
    navigate(`/indicesCotizaciones/${code}`);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '20px', marginLeft: '240px', marginTop: '96px' }}>
      {Indices.map((indice) => (
        <div
          key={indice._id}
          onClick={() => handleCardClick(indice.code)}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            width: '200px',
            cursor: 'pointer',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{indice.name}</div>
          <div style={{ fontSize: '14px', color: '#666' }}>Código: {indice.code}</div>
        </div>
      ))}
    </div>
  );
};

export default IndicesTarjetas;
