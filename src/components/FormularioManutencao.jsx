import { useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

const dadosVazios = {
  descricao: "",
  custo: "",
  bemId: "",
};

export default function FormularioManutencao({ bens = [], onSubmit, initialData, modo }) {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...formData,
      custo: formData.custo === "" ? null : Number(formData.custo),
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      
      <label htmlFor="bem_id">Bem</label>
      <select id="bem_id" name="bem_id" value={formData.bem_id} onChange={handleChange} required>
        <option value="">Selecione um bem</option>
        {bens.map((bem) => <option key={bem.id} value={bem.id}>{`${bem.id} - ${bem.nome}`}</option>)}
      </select>

      <label htmlFor="custo">Custo</label>
      <input id="custo" name="custo" type="number" min="0" step="0.01" value={formData.custo ?? ""} onChange={handleChange} />

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
