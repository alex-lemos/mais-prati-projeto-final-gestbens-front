import { useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

const dadosVazios = {
  descricao: "",
  bemId: "",
  custo: "",
};

const normalizarDados = (dados = {}) => ({
  ...dadosVazios,
  ...dados,
  bemId: String(dados.bemId ?? dados.bem_id ?? dados.bem?.id ?? ""),
});

export default function FormularioManutencao({ bens = [], onSubmit, initialData, modo }) {
  const [formData, setFormData] = useState(() => normalizarDados(initialData));
  const edicao = modo === "edit";
  const retornoJaRegistrado = Boolean(initialData?.dataRetorno ?? initialData?.data_retorno);
  const bensOrdenados = [...bens].sort((a, b) =>
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
    setFormData(normalizarDados(initialData));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (edicao) {
      onSubmit({
        descricao: formData.descricao,
        custo: formData.custo === "" || formData.custo == null ? null : Number(formData.custo),
      });
      return;
    }

    onSubmit({
      bemId: formData.bemId,
      descricao: formData.descricao,
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      
      {edicao ? (
        <>
          <label>Bem</label>
          <p>{nomeBemAtual}</p>
        </>
      ) : (
        <>
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
              <option value={formData.bemId}>{nomeBemAtual}</option>
            )}
            {bensOrdenados.map((bem) => (
              <option key={bem.id} value={bem.id}>{`${bem.nome} - (Patrimônio: ${bem.id})`}</option>
            ))}
          </select>
        </>
      )}

      {edicao && (
        <>
          <label htmlFor="custo">Custo do retorno (opcional)</label>
          <input
            id="custo"
            name="custo"
            type="number"
            min="0"
            step="0.01"
            value={formData.custo ?? ""}
            onChange={handleChange}
          />
          <small>
            {retornoJaRegistrado
              ? "Manutenção finalizada. Alterações no custo serão salvas sem registrar o retorno novamente."
              : "Preencher o custo registra o retorno e tira o bem da manutenção."}
          </small>
        </>
      )}

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
