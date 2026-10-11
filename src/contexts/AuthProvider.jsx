//  CONTEXTO DE AUTENTICAÇÃO

import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { usuarios } from "../mocks/data";

export function AuthProvider({ children }) {
  // Lazy init: tenta reidratar o usuário salvo no localStorage
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem("usuario");
    return salvo ? JSON.parse(salvo) : null;
  });

  // Login usando dados mockados
  function login(email, senha) {
    const encontrado = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (encontrado) {
      setUsuario(encontrado);
      localStorage.setItem("usuario", JSON.stringify(encontrado));
      return;
    }

    // Lança erro para a tela de Login decidir como exibir
    throw new Error("E-mail ou senha incorretos.");
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem("usuario");
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}