import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { manutencoes as mockManutencoes } from "../../mocks/data";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
// Futuramente: import { manutencaoService } from "../../services/manutencaoService";

export default function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manutencao, setManutencao] = useState(null);

  useEffect(() => {
    setManutencao(mockManutencoes.find((item) => item.id.toString() === id) || null);
  }, [id]);

  const handleDelete = async () => {
    try {
      const indice = mockManutencoes.findIndex((item) => item.id.toString() === id);
      if (indice < 0) throw new Error("Manutenção não encontrada.");
      mockManutencoes.splice(indice, 1);
      // Futuramente: await manutencaoService.remove(id);
      navigate("/manutencoes");
    } catch (error) {
      console.error("Erro ao excluir manutenção:", error);
      alert("Não foi possível excluir a manutenção.");
    }
  };

  if (!manutencao) return <div className="inicio-page"><h1>Manutenção não encontrada</h1></div>;

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
              <div className="campo"><strong>Data:</strong><p>{manutencao.data_manutencao?.slice(0, 10)}</p></div>
              <div className="campo"><strong>Bem:</strong><p>#{manutencao.bem_id}</p></div>
              <div className="campo"><strong>Responsável:</strong><p>#{manutencao.usuario_id}</p></div>
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
