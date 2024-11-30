// src/components/EmpresasTarjetas.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerEmpresas } from '../services/empresasService';
import i18next from 'i18next';
import { useTheme, useMediaQuery } from '@mui/material';

const EmpresasTarjetas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [idioma, setIdioma] = useState(i18next.language); // Estado para el idioma
  const navigate = useNavigate();

  // Función para obtener las empresas desde el backend
  const obtenerDatosEmpresas = async () => {
    try {
      const empresasData = await obtenerEmpresas();
      setEmpresas(empresasData);
    } catch (error) {
      console.error("Error al obtener las empresas:", error);
    }
  };

  // Configurar idioma inicial y manejar cambios
  useEffect(() => {
    const idiomaGuardado = localStorage.getItem('idioma') || 'es';
    i18next.changeLanguage(idiomaGuardado);
    setIdioma(idiomaGuardado);

    const handleLanguageChange = (nuevoIdioma) => {
      setIdioma(nuevoIdioma); // Actualizar el idioma
    };

    i18next.on('languageChanged', handleLanguageChange);

    return () => {
      i18next.off('languageChanged', handleLanguageChange);
    };
  }, []);

  // Recargar datos al cambiar el idioma
  useEffect(() => {
    obtenerDatosEmpresas();
  }, [idioma]);

  // Determinar multiplicador según el idioma
  let multiplicador = 1;
  if (idioma === 'ru') {
    multiplicador = 98;
  }

  // Navegar al detalle de la empresa
  const handleCardClick = (codempresa) => {
    navigate(`/${codempresa}`);
  };

  // Usar media query para detectar si es mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xl'));

  // Aplicar marginLeft solo si no es mobile
  let marginLeftValue = '240px';
  if (isMobile === true) {
    marginLeftValue = '0';
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '20px',
        marginLeft: marginLeftValue, // Aplicar marginLeft según el dispositivo
        marginTop: '96px',
        justifyContent: "center"
      }}
    >
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
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            {empresa.empresaNombre}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            {i18next.t('codigo')}: {empresa.codempresa}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            {i18next.t('cotizacionIncial')}:{' '}
            ${(empresa.cotizationInicial * multiplicador).toFixed(2)}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            {i18next.t('acciones')}: {empresa.cantidadAcciones}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmpresasTarjetas;
