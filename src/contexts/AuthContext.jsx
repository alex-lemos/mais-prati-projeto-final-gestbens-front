// ============================================================
//   CONTEXT API — compartilhando o "usuário logado" com o app todo
// ============================================================

import { createContext, useContext, useState } from "react";
import { usuarios } from "../mocks/data"; // lista de usuários falsos

const AuthContext = createContext(null);

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

// Hook customizado para consumir o contexto
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  }
  return contexto;
}
