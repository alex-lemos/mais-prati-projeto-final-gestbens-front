// src/components/FormularioBem.jsx
import { useState, useEffect } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

export default function FormularioBem({ categorias, localidades, onSubmit, initialData, modo }) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    dataCompra: "",
    valorCompra: "",
    categoriaId: "",
    localidadeId: "",
    status: "ATIVO",
  });

  // Se vier initialData (caso do Edit), atualiza o estado
  useEffect(() => {
    const carregarDadosIniciais = () => {
      if (initialData) {
        setFormData(initialData);
      }
    };
    carregarDadosIniciais();
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData(initialData || {
      nome: "",
      descricao: "",
      dataCompra: "",
      valorCompra: "",
      categoriaId: "",
      localidadeId: "",
      status: "ATIVO",
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>Nome do Bem</label>
      <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />

      <label>Categoria</label>
      <select name="categoriaId" value={formData.categoriaId} onChange={handleChange} required>
        <option value="">Selecione uma categoria</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.nome}</option>
        ))}
      </select>

      <label>Localidade</label>
      <select name="localidadeId" value={formData.localidadeId} onChange={handleChange} required>
        <option value="">Selecione uma localidade</option>
        {localidades.map((loc) => (
          <option key={loc.id} value={loc.id}>{loc.nome}</option>
        ))}
      </select>

      <label>Data de Compra</label>
      <input type="date" name="dataCompra" value={formData.dataCompra} onChange={handleChange} required />

      <label>Valor de Compra</label>
      <input type="number" name="valorCompra" value={formData.valorCompra} onChange={handleChange} required />

      <label>Status</label>
      <select name="status" value={formData.status} onChange={handleChange} required>
        <option value="Ativo">Ativo</option>
        <option value="Inativo">Inativo</option>
        <option value="Manutenção">Em manutenção</option>
      </select>

      <label>Descrição</label>
      <textarea name="descricao" value={formData.descricao} onChange={handleChange} required />

      <div className="form-actions">
        <button type="submit" className="atalho-btn verde">
          <FaSave /> Salvar
        </button>
        <button type="button" className="atalho-btn vermelho" onClick={handleReset}>
          <FaTrash /> {modo === "edit" ? "Desfazer alterações" : "Limpar formulário"}
        </button>
      </div>

    </form>
  );
}
