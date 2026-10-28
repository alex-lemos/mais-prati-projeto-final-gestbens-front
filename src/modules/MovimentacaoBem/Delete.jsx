import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movimentacoes as mockMovimentacoes } from "../../mocks/data";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
// Futuramente: import { movimentacaoService } from "../../services/movimentacaoService";

export default function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movimentacao, setMovimentacao] = useState(null);

  useEffect(() => {
    setMovimentacao(mockMovimentacoes.find((item) => item.id.toString() === id) || null);
  }, [id]);

  const handleDelete = async () => {
    try {
      const indice = mockMovimentacoes.findIndex((item) => item.id.toString() === id);
      if (indice < 0) throw new Error("Movimentação não encontrada.");
      mockMovimentacoes.splice(indice, 1);
      // Futuramente: await movimentacaoService.remove(id);
      navigate("/movimentacoes");
    } catch (error) {
      console.error("Erro ao excluir movimentação:", error);
      alert("Não foi possível excluir a movimentação.");
    }
  };

  if (!movimentacao) return <div className="inicio-page"><h1>Movimentação não encontrada</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Excluir Movimentação #{movimentacao.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/movimentacoes")} className="atalho-btn vermelho">Cancelar</button>
          </div>
        </div>
        <div className="conteudo">
          <div className="card informacoes">
            <h2 className="titulo">Movimentação #{movimentacao.id}</h2>
            <div className="informacoes-detalhes">
              <div className="campo"><strong>Data:</strong><p>{movimentacao.data_movimentacao?.slice(0, 10)}</p></div>
              <div className="campo"><strong>Bem:</strong><p>#{movimentacao.bem_id}</p></div>
              <div className="campo"><strong>Origem:</strong><p>#{movimentacao.localidade_origem_id}</p></div>
              <div className="campo"><strong>Destino:</strong><p>#{movimentacao.localidade_destino_id}</p></div>
              <div className="campo"><strong>Responsável:</strong><p>#{movimentacao.usuario_id}</p></div>
            </div>
            <div className="campo"><strong>Observação:</strong><p>{movimentacao.observacao || "Sem observação."}</p></div>
          </div>
          <div className="card alerta-exclusao">
            <h2>Tem certeza que deseja excluir esta movimentação? Essa ação não poderá ser desfeita.</h2>
            <button onClick={handleDelete} className="btn-excluir"><FaTrash /> Confirmar Exclusão</button>
          </div>
        </div>
      </div>
    </div>
  );
}
