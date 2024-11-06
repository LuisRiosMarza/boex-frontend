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

export const obtenerEmpresasPorCodigo = async (codempresa) => {
  try {
    const respuesta = await axios.get(API_URL); // Obtiene todas las empresas
    const empresas = respuesta.data; // Suponiendo que recibes un array de empresas
    return empresas.filter(empresa => empresa.codempresa === codempresa); // Filtra por código de empresa
  } catch (error) {
    console.error("Error al obtener las empresas:", error);
    throw error; // Re-lanzamos el error para manejarlo en el componente
  }
};
