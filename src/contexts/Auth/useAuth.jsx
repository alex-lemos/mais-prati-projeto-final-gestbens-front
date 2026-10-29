import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  }

  return contexto;
}
