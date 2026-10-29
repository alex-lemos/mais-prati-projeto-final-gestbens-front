/* eslint-disable preserve-caught-error */
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { authService } from "../../services/authService";

export function AuthProvider({ children }) {
  // Reidrata o usuário e o token salvos ao recarregar a página
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem("usuario");
    return salvo ? JSON.parse(salvo) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // Função de login integrada com o Backend Spring Boot
  async function login(email, senha) {
    try {
      const data = await authService.login(email, senha);
      // O backend retorna: { token, nome, papel }
      const dadosUsuario = { nome: data.nome, papel: data.papel };

      // Salva no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(dadosUsuario));

      // Atualiza o estado global
      setToken(data.token);
      setUsuario(dadosUsuario);
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "E-mail ou senha incorretos.",
      );
    }
  }

  function logout() {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}