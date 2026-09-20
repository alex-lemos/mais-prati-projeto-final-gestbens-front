// src/services/manutencaoService.js
import api from "./api";

export const manutencaoService = {
  create: async (dados) => {
    const response = await api.post("/manutencoes", dados);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/manutencoes");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/manutencoes/${id}`);
    return response.data;
  },

  update: async (id, dados) => {
    const response = await api.put(`/manutencoes/${id}`, dados);
    return response.data;
  },

  remove: async (id) => {
    const response = await api.delete(`/manutencoes/${id}`);
    return response.data;
  }
};
