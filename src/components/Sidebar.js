// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { obtenerCotizaciones } from '../services/cotizacionesService';

const Sidebar = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      const cotizaciones = await obtenerCotizaciones();
      const nombresEmpresas = Array.from(new Set(cotizaciones.map((item) => item.empresa)));
      setEmpresas(nombresEmpresas);
    };
    fetchEmpresas();
  }, []);

  return (
    <div style={{ width: 240, position: 'fixed', top: 64, left: 0, height: '100%', backgroundColor: '#f4f4f4' }}>
      <List>
        {empresas.map((empresa, index) => (
          <ListItem button component={Link} to={`/${empresa}`} key={index}>
            <ListItemText primary={empresa} />
          </ListItem>
        ))}
        <ListItem button component={Link} to="/">
          <ListItemText primary="Agregar cotización" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
