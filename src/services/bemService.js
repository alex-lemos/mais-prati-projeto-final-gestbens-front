// src/services/bemService.js
import api from "./api";

export const bemService = {
  create: async (dados) => {
    const response = await api.post("/bens", dados);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/bens");
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/bens/${id}`);
    return response.data;
  },

  getByStatus: async (status) => {
    const response = await api.get(`/bens/status/${status}`);
    return response.data;
  },

  update: async (id, dados) => {
    const response = await api.put(`/bens/${id}`, dados);
    return response.data;
  },

  baixa: async (id) => {
    const response = await api.patch(`/bens/${id}/baixa`);
    return response.data;
  },

  reativar: async (id) => {
    const response = await api.patch(`/bens/${id}/reativar`);
    return response.data;
  },
  
};
