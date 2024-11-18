// src/components/EmpresaForm.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { crearEmpresa } from '../services/empresasService'; // Importa el nuevo servicio

const EmpresaForm = () => {
  const [codempresa, setCodempresa] = useState('');
  const [empresaNombre, setEmpresaNombre] = useState('');
  const [id, setId] = useState('');
  const [cotizationInicial, setCotizacionInicial] = useState('');
  const [cantidadAcciones, setCantidadAcciones] = useState('');

  const agregarEmpresa = async () => {
    const nuevaEmpresa = { 
      codempresa, 
      empresaNombre, 
      id: parseInt(id),  // Asegúrate de convertir a número
      cotizationInicial: parseFloat(cotizationInicial),  // Asegúrate de convertir a número
      cantidadAcciones: parseInt(cantidadAcciones)  // Asegúrate de convertir a número
    };

    try {
      await crearEmpresa(nuevaEmpresa);
      console.log(nuevaEmpresa);
      // Limpia los campos después de agregar
      setCodempresa('');
      setEmpresaNombre('');
      setId('');
      setCotizacionInicial('');
      setCantidadAcciones('');
      // Llama a la función para cargar empresas después de agregar, si es necesario
    } catch (error) {
      console.error("Error al agregar la empresa:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Agregar Empresa
      </Typography>
      <TextField
        label="Código de Empresa"
        variant="outlined"
        value={codempresa}
        onChange={(e) => setCodempresa(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Nombre de la Empresa"
        variant="outlined"
        value={empresaNombre}
        onChange={(e) => setEmpresaNombre(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="ID"
        type="number"
        variant="outlined"
        value={id}
        onChange={(e) => setId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Cotización Inicial"
        type="number"
        variant="outlined"
        value={cotizationInicial}
        onChange={(e) => setCotizacionInicial(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Cantidad de Acciones"
        type="number"
        variant="outlined"
        value={cantidadAcciones}
        onChange={(e) => setCantidadAcciones(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={agregarEmpresa}
        style={{ marginTop: '16px' }}
      >
        Agregar Empresa
      </Button>
    </Container>
  );
};

export default EmpresaForm;
