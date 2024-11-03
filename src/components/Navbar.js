// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          BOEX RUSSIAN
        </Typography>
        <Button color="inherit" component={Link} to="/">Inicio</Button>
        <Button color="inherit" component={Link} to="/empresas">Empresas</Button>
        <Button color="inherit" component={Link} to="/cotizaciones">Cotizaciones</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
