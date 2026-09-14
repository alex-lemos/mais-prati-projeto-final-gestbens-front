import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logoGestBens from "../../assets/img/logo-simples-gestbens.png";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(email, senha);
      navigate("/");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="login-page">
      {/* Lado esquerdo - institucional com fundo */}
      <div className="login-info-side">
        <div className="login-info-content">
          <img src={logoGestBens} alt="Logo GestBens" className="login-logo" />
          <p className="slogan">Simplificando a gestão patrimonial</p>
          <ul className="features">
            <li>✔ Controle de bens</li>
            <li>✔ Categorias e localidades</li>
            <li>✔ Gestão de manutenção</li>
            <li>✔ Usuários e permissões</li>
          </ul>
        </div>
      </div>

      {/* Lado direito - formulário */}
      <div className="login-form-side">
        <div className="login-container">
          <h2 className="login-title">Acesse sua conta</h2>
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

          <div className="login-extra">
            <p>
              Não tem conta? <a href="/cadastro">Cadastre-se</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
