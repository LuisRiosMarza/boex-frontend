// src/services/indicesCotizacionesService.js
import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/indicesCotizaciones';

// Obtener todas las cotizaciones de índices
export const obtenerCotizacionesIndices = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error al obtener cotizaciones de índices:', error);
    throw error;
  }
};

// Crear una nueva cotización de índice
export const crearCotizacionIndice = async (indiceData) => {
  try {
    const response = await axios.post(baseUrl, indiceData);
    return response.data;
  } catch (error) {
    console.error('Error al crear cotización de índice:', error);
    throw error;
  }
};

// Actualizar una cotización de índice
export const actualizarCotizacionIndice = async (id, indiceData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, indiceData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar cotización de índice:', error);
    throw error;
  }
};

// Eliminar una cotización de índice
export const eliminarCotizacionIndice = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.status;
  } catch (error) {
    console.error('Error al eliminar cotización de índice:', error);
    throw error;
  }
};

// Obtener cotizaciones por código de índice
export const obtenerCotizacionesPorCodigoIndice = async (codigoIndice) => {
  try {
    const response = await axios.get(`${baseUrl}/${codigoIndice}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener cotizaciones por código de índice:', error);
    throw error;
  }
};
