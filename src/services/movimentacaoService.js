// src/services/movimentacaoService.js
import api from "./api";

export const movimentacaoService = {
  create: async (dados) => {
    const response = await api.post("/movimentacoes", dados);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/movimentacoes");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/movimentacoes/${id}`);
    return response.data;
  },

  getByBemId: async (bemId) => {
    const response = await api.get(`/movimentacoes/bem/${bemId}`);
    return response.data;
  },
  
};
