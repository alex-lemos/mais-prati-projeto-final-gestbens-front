// HOOK CUSTOMIZADO PARA CONSUMIR O CONTEXTO DE AUTENTICAÇÃO

import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// Hook customizado para consumir o contexto
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  }
  return contexto;
}