import api from "./api"; // seu arquivo configurado do axios

export const authService = {
  login: async (email, senha) => {
    const response = await api.post("/auth/login", { email, senha });
    return response.data; // Retorna o LoginResponse do Spring Boot { token, nome, role }
  },

  loginGoogle: async (credential) => {
    const response = await api.post("/auth/login/google", { credential });
    return response.data;
  },
};
