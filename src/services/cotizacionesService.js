import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/cotizaciones';

// Función para obtener cotizaciones por código de empresa
export const obtenerCotizacionesPorEmpresa = async (codempresa) => {
  try {
    const response = await axios.get(`${baseUrl}/${codempresa}`);
    return response.data; // Devuelve las cotizaciones obtenidas
  } catch (error) {
    console.error('Error al obtener cotizaciones por empresa:', error);
    throw error; // Propaga el error
  }
};
