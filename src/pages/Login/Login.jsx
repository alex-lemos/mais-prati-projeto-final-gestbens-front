import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // já preparado para receber estilos

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(email, senha); // chama o contexto
      navigate("/"); // redireciona para dashboard
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">GestBens</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>

        {erro && <p className="error-message">{erro}</p>}

        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
}
