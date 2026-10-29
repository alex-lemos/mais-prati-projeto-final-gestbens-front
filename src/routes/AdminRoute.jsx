// src/routes/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

export default function AdminRoute({ children }) {
  const { usuario } = useAuth();

  if (!usuario || usuario.papel !== "ADMIN") {
    // Se não for admin, redireciona para a página inicial
    return <Navigate to="/" replace />;
  }

  return children;
}
