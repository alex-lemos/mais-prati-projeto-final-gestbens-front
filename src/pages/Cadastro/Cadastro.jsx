import { useState } from "react";
import "./Cadastro.css";
import logo from "../../assets/img/logo-gestbens.png";
import { usuarioService } from "../../services/usuarioService";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    confirmarEmail: "",
    senha: "",
    confirmarSenha: ""
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email !== form.confirmarEmail) {
      setMensagem("Os e-mails não coincidem!");
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      setMensagem("As senhas não coincidem!");
      return;
    }

    try {
      const novoUsuario = {
        nome: form.nome,
        email: form.email,
        senha: form.senha
      };

      await usuarioService.create(novoUsuario);
      setMensagem("✅ Usuário cadastrado com sucesso!");
      setForm({
        nome: "",
        email: "",
        confirmarEmail: "",
        senha: "",
        confirmarSenha: ""
      });
    } catch (err) {
      setMensagem("❌ Erro ao cadastrar usuário: " + (err.message || "Tente novamente"));
    }
  };

  return (
    <div className="cadastro-page">
      <div className="form-container">

        <div className="cadastro-logo">
          <img src={logo} alt="GestBens Logo" />
        </div>

        <h1>Criar nova conta</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Nome Completo
            <input
              type="text"
              name="nome"
              placeholder="Ex.: Carlos Eduardo Menezes"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Confirmar E-mail
            <input
              type="email"
              name="confirmarEmail"
              placeholder="repita seu e-mail"
              value={form.confirmarEmail}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Senha de Acesso
            <input
              type="password"
              name="senha"
              placeholder="Mínimo 6 dígitos"
              value={form.senha}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Confirmar Senha
            <input
              type="password"
              name="confirmarSenha"
              placeholder="Repita a senha"
              value={form.confirmarSenha}
              onChange={handleChange}
              required
            />
          </label>

          {mensagem && (
            <p className={mensagem.startsWith("✅") ? "form-success" : "form-error"}>
              {mensagem}
            </p>
          )}

          <div className="form-actions">
            <button type="submit" className="primary">Criar Minha Conta</button>
          </div>
        </form>

        <p className="login-link"> 
          Já tem uma conta? <a href="/login">Fazer login</a>
        </p>
      </div>
    </div>
  );
}
