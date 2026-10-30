import { useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

const dadosVazios = { nome: "", email: "", senha: "", is_admin: false };

export default function FormularioUsuario({ onSubmit, initialData, modo }) {
  const [formData, setFormData] = useState(() =>
    initialData
      ? { ...dadosVazios, ...initialData, senha: "" }
      : { ...dadosVazios },
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleReset = () => {
    setFormData(
      initialData ? { ...dadosVazios, ...initialData, senha: "" } : dadosVazios,
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dados = { ...formData };
    if (modo === "edit" && !dados.senha) delete dados.senha;
    onSubmit(dados);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label htmlFor="nome">Nome</label>
      <input
        id="nome"
        name="nome"
        type="text"
        maxLength="150"
        value={formData.nome}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">E-mail</label>
      <input
        id="email"
        name="email"
        type="email"
        maxLength="150"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="senha">
        Senha {modo === "edit" && "(preencha somente para alterar)"}
      </label>
      <input
        id="senha"
        name="senha"
        type="password"
        maxLength="200"
        value={formData.senha}
        onChange={handleChange}
        required={modo !== "edit"}
        autoComplete="new-password"
      />

      <label>
        <input
          name="admin"
          type="checkbox"
          checked={Boolean(formData.admin)}
          onChange={handleChange}
          style={{ width: "auto" }}
        />
        Administrador
      </label>

      <div className="form-actions">
        <button type="submit" className="atalho-btn"><FaSave />Salvar</button>
        <button type="button" className="atalho-btn" onClick={handleReset}>
          <FaTrash />{" "}{modo === "edit" ? "Desfazer alterações" : "Limpar formulário"}
        </button>
      </div>
    </form>
  );
}
