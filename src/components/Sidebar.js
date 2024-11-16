// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { obtenerEmpresas } from '../services/empresasService';
import i18next from 'i18next';

const Sidebar = () => {
  const [empresas, setEmpresas] = useState([]);
  const [textoAgregarEmpresa, setTextoAgregarEmpresa] = useState(i18next.t('agregarEmpresa')); // Estado para texto traducido

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const empresasData = await obtenerEmpresas();
        setEmpresas(empresasData);
      } catch (error) {
        console.error("Error al obtener las empresas:", error);
      }
    };
    fetchEmpresas();
  }, []);

  useEffect(() => {
    // Actualizar el texto cuando cambie el idioma
    const handleLanguageChange = () => {
      setTextoAgregarEmpresa(i18next.t('agregarEmpresa'));
    };

    i18next.on('languageChanged', handleLanguageChange);

    // Limpiar el listener al desmontar el componente
    return () => {
      i18next.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <div style={{ width: 240, position: 'fixed', top: 64, left: 0, height: '100%', backgroundColor: '#f4f4f4' }}>
      <List>
        {empresas.map((empresa) => (
          <ListItem button component={Link} to={`/${empresa.codempresa}`} key={empresa._id}>
            <ListItemText primary={empresa.empresaNombre} />
          </ListItem>
        ))}
        <ListItem button component={Link} to="/">
          <ListItemText primary={textoAgregarEmpresa} />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
