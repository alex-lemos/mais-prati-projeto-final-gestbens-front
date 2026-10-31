// src/components/FormularioBem.jsx
import { useState, useEffect } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

const formularioVazio = {
  nome: "",
  descricao: "",
  dataCompra: "",
  valorCompra: "",
  categoriaId: "",
  localidadeId: "",
};

function obterDadosFormulario(dados = {}, categorias = []) {
  const categoria = categorias.find(
    (item) =>
      item.nome?.trim().toLowerCase() ===
      dados.nomeCategoria?.trim().toLowerCase(),
  );

  return {
    nome: dados.nome ?? "",
    descricao: dados.descricao ?? "",
    dataCompra: dados.dataCompra ?? "",
    valorCompra: dados.valorCompra ?? "",
    categoriaId: String(dados.categoriaId ?? categoria?.id ?? ""),
    localidadeId: String(dados.localidadeId ?? ""),
  };
}

export default function FormularioBem({ categorias, localidades, onSubmit, initialData, modo }) {
  const [formData, setFormData] = useState(formularioVazio);

  console.log(formData)

  useEffect(() => {
    const carregar = () => {
      if (initialData) {
        setFormData(obterDadosFormulario(initialData, categorias));
      }
    }
    carregar();
  }, [initialData, categorias]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { localidadeId, ...dadosSemLocalidade } = formData;
    if (modo === "edit") {
      onSubmit(dadosSemLocalidade);
      return;
    }

    onSubmit({ ...dadosSemLocalidade, localidadeId });
  };

  const handleReset = () => {
    setFormData(obterDadosFormulario(initialData, categorias));
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

      {modo !== "edit" && (
        <>
          <label>Localidade</label>
          <select name="localidadeId" value={formData.localidadeId} onChange={handleChange} required>
            <option value="">Selecione uma localidade</option>
            {localidades.map((loc) => (
              <option key={loc.id} value={loc.id}>{loc.nome}</option>
            ))}
          </select>
        </>
      )}

      <label>Data de Compra</label>
      <input type="date" name="dataCompra" value={formData.dataCompra} onChange={handleChange} required />

      <label>Valor de Compra</label>
      <input type="number" name="valorCompra" value={formData.valorCompra} onChange={handleChange} required />

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
