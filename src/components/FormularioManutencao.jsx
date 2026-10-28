import { useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

const dadosVazios = {
  data_manutencao: "",
  descricao: "",
  custo: "",
  usuario_id: "",
  bem_id: "",
};

export default function FormularioManutencao({ bens = [], usuarios = [], onSubmit, initialData, modo }) {
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
      <label htmlFor="data_manutencao">Data da Manutenção</label>
      <input id="data_manutencao" name="data_manutencao" type="date" value={formData.data_manutencao} onChange={handleChange} required />

      <label htmlFor="bem_id">Bem</label>
      <select id="bem_id" name="bem_id" value={formData.bem_id} onChange={handleChange} required>
        <option value="">Selecione um bem</option>
        {bens.map((bem) => <option key={bem.id} value={bem.id}>{bem.nome} (#{bem.id})</option>)}
      </select>

      <label htmlFor="usuario_id">Responsável</label>
      <select id="usuario_id" name="usuario_id" value={formData.usuario_id} onChange={handleChange} required>
        <option value="">Selecione um responsável</option>
        {usuarios.map((usuario) => <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>)}
      </select>

      <label htmlFor="custo">Custo</label>
      <input id="custo" name="custo" type="number" min="0" step="0.01" value={formData.custo ?? ""} onChange={handleChange} />

      <label htmlFor="descricao">Descrição</label>
      <textarea id="descricao" name="descricao" value={formData.descricao || ""} onChange={handleChange} />

      <div className="form-actions">
        <button type="submit" className="atalho-btn verde"><FaSave /> Salvar</button>
        <button type="button" className="atalho-btn vermelho" onClick={handleReset}>
          <FaTrash /> {modo === "edit" ? "Desfazer alterações" : "Limpar formulário"}
        </button>
      </div>
    </form>
  );
}
