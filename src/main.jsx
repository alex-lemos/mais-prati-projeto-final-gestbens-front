// ============================================================
//   PONTO DE ENTRADA DA APLICAÇÃO (o "liga" do React)
// ============================================================

import { StrictMode } from "react"; // Importa o StrictMode do React para ajudar a identificar problemas na aplicação
import { createRoot } from "react-dom/client"; // Importa o StrictMode e createRoot do React para renderizar a aplicação
import { BrowserRouter } from "react-router-dom"; // Importa o BrowserRouter para habilitar o roteamento no React
import { AuthProvider } from "./contexts/Auth"; // Importa o AuthProvider para fornecer o contexto de autenticação
import App from "./App.jsx"; // Importa o componente principal da aplicação
// CSS
import "./main.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);
