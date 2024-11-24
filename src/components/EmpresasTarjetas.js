// src/components/EmpresasTarjetas.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEmpresas } from '../services/empresasService';

const EmpresasTarjetas = () => {
  const [empresas, setEmpresas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const empresasData = await obtenerEmpresas();
        setEmpresas(empresasData);
      } catch (error) {
        console.error("Error al obtener las empresas:", error);
      }
    };
    obtenerDatos();
  }, []);

  const handleCardClick = (codempresa) => {
    navigate(`/${codempresa}`);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '20px', marginLeft: '240px', marginTop: '96px' }}>
      {empresas.map((empresa) => (
        <div
          key={empresa._id}
          onClick={() => handleCardClick(empresa.codempresa)}
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
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{empresa.empresaNombre}</div>
          <div style={{ fontSize: '14px', color: '#666' }}>Código: {empresa.codempresa}</div>
          <div style={{ fontSize: '14px', color: '#666' }}>Cotización Inicial: ${empresa.cotizationInicial}</div>
          <div style={{ fontSize: '14px', color: '#666' }}>Acciones: {empresa.cantidadAcciones}</div>
        </div>
      ))}
    </div>
  );
};

export default EmpresasTarjetas;
