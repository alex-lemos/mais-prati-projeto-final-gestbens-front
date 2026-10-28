import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioMovimentacao from "../../components/FormularioMovimentacao";
import { movimentacoes as mockMovimentacoes, bens, localidades, usuarios } from "../../mocks/data";
// Futuramente: import { movimentacaoService } from "../../services/movimentacaoService";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movimentacao, setMovimentacao] = useState(null);

  useEffect(() => {
    setMovimentacao(mockMovimentacoes.find((item) => item.id.toString() === id) || null);
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const indice = mockMovimentacoes.findIndex((item) => item.id.toString() === id);
      if (indice < 0) throw new Error("Movimentação não encontrada.");
      mockMovimentacoes[indice] = { ...mockMovimentacoes[indice], ...formData };
      // Futuramente: await movimentacaoService.update(id, formData);
      navigate("/movimentacoes");
    } catch (error) {
      console.error("Erro ao atualizar movimentação:", error);
      alert("Não foi possível atualizar a movimentação.");
    }
  };

  if (!movimentacao) return <div className="inicio-page"><h1>Movimentação não encontrada</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Editar Movimentação #{movimentacao.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/movimentacoes")} className="atalho-btn vermelho">Cancelar</button>
          </div>
        </div>
        <div className="card">
          <FormularioMovimentacao key={id} bens={bens} localidades={localidades} usuarios={usuarios} onSubmit={handleSubmit} initialData={movimentacao} modo="edit" />
        </div>
      </div>
    </div>
  );
}
