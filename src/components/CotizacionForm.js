// src/components/CotizacionForm.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { crearCotizacion } from '../services/cotizacionesService';

const CotizacionForm = () => {
  const [nuevaEmpresa, setNuevaEmpresa] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');

  const agregarCotizacion = async () => {
    const nuevaCotizacion = { 
      empresa: nuevaEmpresa, 
      precio: nuevoPrecio, 
      fecha: new Date() 
    };

    try {
      await crearCotizacion(nuevaCotizacion);
      setNuevaEmpresa('');
      setNuevoPrecio('');
      // Llama a la función para cargar cotizaciones después de agregar
    } catch (error) {
      console.error("Error al agregar la cotización:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Agregar Cotización
      </Typography>
      <TextField
        label="Empresa"
        variant="outlined"
        value={nuevaEmpresa}
        onChange={(e) => setNuevaEmpresa(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Precio"
        type="number"
        variant="outlined"
        value={nuevoPrecio}
        onChange={(e) => setNuevoPrecio(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={agregarCotizacion}
        style={{ marginTop: '16px' }}
      >
        Agregar Cotización
      </Button>
    </Container>
  );
};

export default CotizacionForm;
