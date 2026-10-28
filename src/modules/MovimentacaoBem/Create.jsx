import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioMovimentacao from "../../components/FormularioMovimentacao";
import { movimentacoes, bens, localidades, usuarios } from "../../mocks/data";
// Futuramente: import { movimentacaoService } from "../../services/movimentacaoService";

export default function Create() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const id = Math.max(0, ...movimentacoes.map((item) => Number(item.id))) + 1;
      movimentacoes.push({ id, ...formData });
      // Futuramente: await movimentacaoService.create(formData);
      navigate("/movimentacoes");
    } catch (error) {
      console.error("Erro ao salvar movimentação:", error);
      alert("Não foi possível salvar a movimentação.");
    }
  };

  return (
    <div className="inicio-page">
      <h1>Registrar Movimentação</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)}><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/movimentacoes")}>Cancelar</button>
          </div>
        </div>
        <div className="card">
          <FormularioMovimentacao bens={bens} localidades={localidades} usuarios={usuarios} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
