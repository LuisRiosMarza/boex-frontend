// BOEX-frontend/src/services/indiceService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/indices';

export const obtenerIndices = async () => {
  const respuesta = await axios.get(API_URL);
  return respuesta.data;
};

export const crearIndice = async (indice) => {
  const respuesta = await axios.post(API_URL, indice);
  return respuesta.data;
};

export const actualizarIndice = async (id, indice) => {
  const respuesta = await axios.put(`${API_URL}/${id}`, indice);
  return respuesta.data;
};

export const eliminarIndice = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
