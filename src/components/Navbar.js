// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import i18next from 'i18next';

const Navbar = () => {
  // Idioma por defecto si no hay nada guardado
  const idiomaPorDefecto = 'es';

  // Estado para manejar el idioma actual
  const [idioma, setIdioma] = useState(idiomaPorDefecto);

  useEffect(() => {
    // Cargar el idioma desde localStorage
    const idiomaGuardado = localStorage.getItem('idioma');
    if (idiomaGuardado) {
      // Si el idioma está guardado, se usa ese idioma
      setIdioma(idiomaGuardado);
      i18next.changeLanguage(idiomaGuardado);
    } else {
      // Si no hay idioma guardado, usamos el idioma por defecto
      setIdioma(idiomaPorDefecto);
      i18next.changeLanguage(idiomaPorDefecto);
      localStorage.setItem('idioma', idiomaPorDefecto);
    }
  }, []);

  const manejarSeleccionDeIdioma = (event) => {
    const nuevoIdioma = event.target.value;
    setIdioma(nuevoIdioma); // Cambiar idioma en el estado
    i18next.changeLanguage(nuevoIdioma); // Cambiar idioma en i18next
    localStorage.setItem('idioma', nuevoIdioma); // Guardar el idioma en localStorage
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          BOEX RUSSIAN
        </Typography>
        
        <Button color="inherit" component={Link} to="/">
          {i18next.t('inicio')}
        </Button>
        <Button color="inherit" component={Link} to="/empresas">
          {i18next.t('empresas')}
        </Button>
        <Button color="inherit" component={Link} to="/cotizaciones">
          {i18next.t('cotizaciones')}
        </Button>
        <Button color="inherit" component={Link} to="/indices">
          {i18next.t('indices')}
        </Button>
        
        {/* Selector de idioma */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="idioma-select-label">Idioma</InputLabel>
          <Select
            labelId="idioma-select-label"
            value={idioma} // El idioma actual desde el estado
            label="Idioma"
            onChange={manejarSeleccionDeIdioma}
          >
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="ru">Русский</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
