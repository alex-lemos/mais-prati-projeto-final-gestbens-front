import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { manutencaoService } from "../../services/manutencaoService";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

export default function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manutencao, setManutencao] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarManutencao() {
      try {
        setCarregando(true);
        setErro("");
        setManutencao(await manutencaoService.getById(id));
      } catch (error) {
        console.error("Erro ao carregar manutenção:", error);
        setErro("Não foi possível carregar a manutenção.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarManutencao();
  }, [id]);

  const handleDelete = async () => {
    try {
      await manutencaoService.remove(id);
      navigate("/manutencoes");
    } catch (error) {
      console.error("Erro ao excluir manutenção:", error);
      alert(error.response?.data?.message || "Não foi possível excluir a manutenção.");
    }
  };

  if (carregando) return <div className="inicio-page"><h1>Carregando manutenção...</h1></div>;
  if (erro || !manutencao) return <div className="inicio-page"><h1 className="form-error">{erro || "Manutenção não encontrada"}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Excluir Manutenção #{manutencao.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/manutencoes")} className="atalho-btn vermelho">Cancelar</button>
          </div>
        </div>
        <div className="conteudo">
          <div className="card informacoes">
            <h2 className="titulo">Manutenção #{manutencao.id}</h2>
            <div className="informacoes-detalhes">
              <div className="campo"><strong>Data:</strong><p>{(manutencao.data_manutencao || manutencao.dataManutencao)?.slice(0, 10)}</p></div>
              <div className="campo"><strong>Bem:</strong><p>{manutencao.bem?.nome || manutencao.bem || `#${manutencao.bem_id ?? manutencao.bemId}`}</p></div>
              <div className="campo"><strong>Responsável:</strong><p>{manutencao.usuario?.nome || manutencao.usuario || `#${manutencao.usuario_id ?? manutencao.usuarioId}`}</p></div>
            </div>
            <div className="campo"><strong>Descrição:</strong><p>{manutencao.descricao || "Sem descrição."}</p></div>
          </div>
          <div className="card alerta-exclusao">
            <h2>Tem certeza que deseja excluir esta manutenção? Essa ação não poderá ser desfeita.</h2>
            <button onClick={handleDelete} className="btn-excluir"><FaTrash /> Confirmar Exclusão</button>
          </div>
        </div>
      </div>
    </div>
  );
}
