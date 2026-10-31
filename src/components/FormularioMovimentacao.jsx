import { useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

const dadosVazios = {
  observacao: "",
  bemId: "",
  localidadeDestinoId: "",
};

function obterDadosFormulario(dados = {}) {
  const bem = dados.bemId ?? dados.bem_id ?? dados.bem?.id ?? "";
  const localidadeDestino =
    dados.localidadeDestinoId ??
    dados.localidade_destino_id ??
    dados.localidadeDestino?.id ??
    dados.localidadeDestino ??
    "";

  return {
    bemId: String(bem),
    localidadeDestinoId: String(localidadeDestino),
    observacao: dados.observacao ?? "",
  };
}

export default function FormularioMovimentacao({
  bens = [],
  localidades = [],
  onSubmit,
  initialData,
  modo,
}) {
  const [formData, setFormData] = useState(() =>
    initialData ? obterDadosFormulario(initialData) : { ...dadosVazios }
  );
  const bensOrdenados = [...bens].sort((a, b) =>
    String(a.nome ?? "").localeCompare(String(b.nome ?? ""), "pt-BR", { sensitivity: "base" })
  );
  const localidadesOrdenadas = [...localidades].sort((a, b) =>
    String(a.nome ?? "").localeCompare(String(b.nome ?? ""), "pt-BR", { sensitivity: "base" })
  );
  const patrimonioNaLista = bensOrdenados.some((bem) => String(bem.id) === formData.bemId);
  const bemAtual = bensOrdenados.find((bem) => String(bem.id) === formData.bemId);
  const nomeBemAtual = bemAtual?.nome ||
    (typeof initialData?.bem === "object" ? initialData.bem?.nome : initialData?.bem) ||
    "Bem";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialData ? obterDadosFormulario(initialData) : { ...dadosVazios });
  };

  return (
    <form className="form-container" onSubmit={(event) => {
      event.preventDefault();
      onSubmit({
        bemId: Number(formData.bemId),
        localidadeDestinoId: Number(formData.localidadeDestinoId),
        observacao: formData.observacao,
      });
    }}>
      <label htmlFor="bemId">Digite o patrimônio</label>
      <input
        id="bemId"
        name="bemId"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Digite o patrimônio"
        value={formData.bemId}
        onChange={(event) => {
          setFormData((prev) => ({ ...prev, bemId: event.target.value.replace(/\D/g, "") }));
        }}
        required
      />

      <label htmlFor="bemLista">Ou selecione na lista</label>
      <select
        id="bemLista"
        value={patrimonioNaLista ? formData.bemId : ""}
        onChange={(event) => {
          setFormData((prev) => ({ ...prev, bemId: event.target.value }));
        }}
      >
        <option value="">Selecione um bem</option>
        {!patrimonioNaLista && formData.bemId && (
          <option value={formData.bemId}>{`${nomeBemAtual} - (Patrimônio: ${formData.bemId})`}</option>
        )}
        {bensOrdenados.map((bem) => (
          <option key={bem.id} value={bem.id}>{`${bem.nome} - (Patrimônio: ${bem.id})`}</option>
        ))}
      </select>

      <label htmlFor="localidadeDestinoId">Localidade de Destino</label>
      <select id="localidadeDestinoId" name="localidadeDestinoId" value={formData.localidadeDestinoId} onChange={handleChange} required>
        <option value="">Selecione o destino</option>
        {localidadesOrdenadas.map((localidade) => <option key={localidade.id} value={localidade.id}>{localidade.nome}</option>)}
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
