// BOEX-frontend/src/services/cotizacionesService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/cotizaciones';

export const obtenerCotizaciones = async () => {
  const respuesta = await axios.get(API_URL);
  return respuesta.data;
};

export const crearCotizacion = async (cotizacion) => {
  const respuesta = await axios.post(API_URL, cotizacion);
  return respuesta.data;
};

export const actualizarCotizacion = async (id, cotizacion) => {
  const respuesta = await axios.put(`${API_URL}/${id}`, cotizacion);
  return respuesta.data;
};

export const eliminarCotizacion = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const obtenerCotizacionesPorEmpresa = async (empresa) => {
  try {
    const respuesta = await axios.get(API_URL);    // Obtiene todas las cotizaciones
    const cotizaciones = respuesta.data; // Suponiendo que recibes un array de cotizaciones
    return cotizaciones.filter(cotizacion => cotizacion.empresa === empresa); // Filtra por empresa
  } catch (error) {
    console.error("Error al obtener las cotizaciones:", error);
    throw error; // Re-lanzamos el error para manejarlo en el componente
  }
};
