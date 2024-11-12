// BOEX-frontend/src/services/empresaService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/empresas';

export const obtenerEmpresas = async () => {
  const respuesta = await axios.get(API_URL);
  return respuesta.data;
};

export const crearEmpresa = async (empresa) => {
  const respuesta = await axios.post(API_URL, empresa);
  return respuesta.data;
};

export const actualizarEmpresa = async (id, empresa) => {
  const respuesta = await axios.put(`${API_URL}/${id}`, empresa);
  return respuesta.data;
};

export const eliminarEmpresa = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
