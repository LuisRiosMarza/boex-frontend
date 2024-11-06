// src/components/Empresas.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEmpresas } from '../services/empresasService';

const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatos = async () => {
      const cotizaciones = await obtenerEmpresas();
      const nombresEmpresas = Array.from(new Set(cotizaciones.map((item) => item.empresa)));
      setEmpresas(nombresEmpresas);
    };
    obtenerDatos();
  }, []);

  const handleCardClick = (empresa) => {
    navigate(`/${empresa}`);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '20px', marginLeft: '240px', marginTop: '64px' }}>
      {empresas.map((empresa, index) => (
        <div
          key={index}
          onClick={() => handleCardClick(empresa)}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            width: '150px',
            cursor: 'pointer',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {empresa}
        </div>
      ))}
    </div>
  );
};

export default Empresas;
