import { useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

const dadosVazios = { nome: "", descricao: "" };

export default function FormularioCategoria({ onSubmit, initialData, modo }) {
  const [formData, setFormData] = useState(() =>
    initialData ? { ...dadosVazios, ...initialData } : { ...dadosVazios }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialData ? { ...dadosVazios, ...initialData } : dadosVazios);
  };

  return (
    <form className="form-container" onSubmit={(event) => {
      event.preventDefault();
      onSubmit(formData);
    }}>
      <label htmlFor="nome">Nome da Categoria</label>
      <input id="nome" name="nome" type="text" maxLength="100" value={formData.nome} onChange={handleChange} required />

      <label htmlFor="descricao">Descrição</label>
      <textarea id="descricao" name="descricao" value={formData.descricao || ""} onChange={handleChange} />

      <div className="form-actions">
        <button type="submit" className="atalho-btn"><FaSave /> Salvar</button>
        <button type="button" className="atalho-btn" onClick={handleReset}>
          <FaTrash /> {modo === "edit" ? "Desfazer alterações" : "Limpar formulário"}
        </button>
      </div>
    </form>
  );
}
