// src/routes/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth/useAuth";

export default function AdminRoute({ children }) {
  const { usuario } = useAuth();

  if (usuario && usuario.papel === "ADMIN") {
    return children;
  }

  return <Navigate to="/" replace />;
}
