import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movimentacaoService } from "../../services/movimentacaoService";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

export default function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movimentacao, setMovimentacao] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarMovimentacao() {
      try {
        setCarregando(true);
        setErro("");
        setMovimentacao(await movimentacaoService.getById(id));
      } catch (error) {
        console.error("Erro ao carregar movimentação:", error);
        setErro("Não foi possível carregar a movimentação.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarMovimentacao();
  }, [id]);

  const handleDelete = async () => {
    try {
      await movimentacaoService.remove(id);
      navigate("/movimentacoes");
    } catch (error) {
      console.error("Erro ao excluir movimentação:", error);
      alert(error.response?.data?.message || "Não foi possível excluir a movimentação.");
    }
  };

  if (carregando) return <div className="inicio-page"><h1>Carregando movimentação...</h1></div>;
  if (erro || !movimentacao) return <div className="inicio-page"><h1 className="form-error">{erro || "Movimentação não encontrada"}</h1></div>;

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
              <div className="campo"><strong>Data:</strong><p>{(movimentacao.data_movimentacao || movimentacao.dataMovimentacao)?.slice(0, 10)}</p></div>
              <div className="campo"><strong>Bem:</strong><p>{movimentacao.bem?.nome || movimentacao.bem || `#${movimentacao.bem_id ?? movimentacao.bemId}`}</p></div>
              <div className="campo"><strong>Origem:</strong><p>{movimentacao.localidadeOrigem?.nome || movimentacao.localidadeOrigem || `#${movimentacao.localidade_origem_id ?? movimentacao.localidadeOrigemId}`}</p></div>
              <div className="campo"><strong>Destino:</strong><p>{movimentacao.localidadeDestino?.nome || movimentacao.localidadeDestino || `#${movimentacao.localidade_destino_id ?? movimentacao.localidadeDestinoId}`}</p></div>
              <div className="campo"><strong>Responsável:</strong><p>{movimentacao.usuario?.nome || movimentacao.usuario || `#${movimentacao.usuario_id ?? movimentacao.usuarioId}`}</p></div>
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
