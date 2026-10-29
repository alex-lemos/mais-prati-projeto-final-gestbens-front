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

  update: async (id, dados) => {
    const response = await api.put(`/bens/${id}`, dados);
    return response.data;
  },

  remove: async (id) => {
    const response = await api.delete(`/bens/${id}`);
    return response.data;
  }
};
