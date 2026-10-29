import { useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

const dadosVazios = {
  data_movimentacao: "",
  observacao: "",
  usuario_id: "",
  bem_id: "",
  localidade_origem_id: "",
  localidade_destino_id: "",
};

export default function FormularioMovimentacao({
  bens = [],
  localidades = [],
  usuarios = [],
  onSubmit,
  initialData,
  modo,
}) {
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
      <label htmlFor="data_movimentacao">Data da Movimentação</label>
      <input id="data_movimentacao" name="data_movimentacao" type="date" value={formData.data_movimentacao} onChange={handleChange} required />

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

      <label htmlFor="localidade_origem_id">Localidade de Origem</label>
      <select id="localidade_origem_id" name="localidade_origem_id" value={formData.localidade_origem_id} onChange={handleChange} required>
        <option value="">Selecione a origem</option>
        {localidades.map((localidade) => <option key={localidade.id} value={localidade.id}>{localidade.nome}</option>)}
      </select>

      <label htmlFor="localidade_destino_id">Localidade de Destino</label>
      <select id="localidade_destino_id" name="localidade_destino_id" value={formData.localidade_destino_id} onChange={handleChange} required>
        <option value="">Selecione o destino</option>
        {localidades.map((localidade) => <option key={localidade.id} value={localidade.id}>{localidade.nome}</option>)}
      </select>

      <label htmlFor="observacao">Observação</label>
      <textarea id="observacao" name="observacao" value={formData.observacao || ""} onChange={handleChange} />

      <div className="form-actions">
        <button type="submit" className="atalho-btn"><FaSave /> Salvar</button>
        <button type="button" className="atalho-btn" onClick={handleReset}>
          <FaTrash /> {modo === "edit" ? "Desfazer alterações" : "Limpar formulário"}
        </button>
      </div>
    </form>
  );
}
