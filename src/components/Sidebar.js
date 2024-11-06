// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { obtenerEmpresas } from '../services/empresasService';

const Sidebar = () => {
  const [empresas, setEmpresas] = useState([]);

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

  return (
    <div style={{ width: 240, position: 'fixed', top: 64, left: 0, height: '100%', backgroundColor: '#f4f4f4' }}>
      <List>
        {empresas.map((empresa) => (
          <ListItem button component={Link} to={`/${empresa.codempresa}`} key={empresa._id}>
            <ListItemText primary={empresa.empresaNombre}/>
          </ListItem>
        ))}
        <ListItem button component={Link} to="/">
          <ListItemText primary="Agregar Empresa" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
