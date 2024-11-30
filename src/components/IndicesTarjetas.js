// src/components/IndicesTarjetas.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerIndices } from '../services/indicesService';
import i18next from 'i18next';
import { useTheme, useMediaQuery } from '@mui/material';

const IndicesTarjetas = () => {
  const [indices, setIndices] = useState([]);
  const [idioma, setIdioma] = useState(i18next.language); // Estado para el idioma
  const navigate = useNavigate();

  // Función para obtener los índices desde el backend
  const obtenerDatosIndices = async () => {
    try {
      const indicesData = await obtenerIndices();
      setIndices(indicesData);
    } catch (error) {
      console.error("Error al obtener los índices:", error);
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
    obtenerDatosIndices();
  }, [idioma]);

  // Navegar al detalle del índice
  const handleCardClick = (code) => {
    navigate(`/indicesCotizaciones/${code}`);
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
      {indices.map((indice) => (
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
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            {indice.name}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            {i18next.t('codigo')}: {indice.code}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IndicesTarjetas;
