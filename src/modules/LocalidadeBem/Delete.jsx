import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { localidades as mockLocalidades } from "../../mocks/data";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
// Futuramente: import { localidadeService } from "../../services/localidadeService";

export default function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [localidade, setLocalidade] = useState(null);

  useEffect(() => {
    setLocalidade(mockLocalidades.find((item) => item.id.toString() === id) || null);
  }, [id]);

  const handleDelete = async () => {
    try {
      const indice = mockLocalidades.findIndex((item) => item.id.toString() === id);
      if (indice < 0) throw new Error("Localidade não encontrada.");
      mockLocalidades.splice(indice, 1);
      // Futuramente: await localidadeService.remove(id);
      navigate("/locais");
    } catch (error) {
      console.error("Erro ao excluir localidade:", error);
      alert("Não foi possível excluir a localidade.");
    }
  };

  if (!localidade) return <div className="inicio-page"><h1>Localidade não encontrada</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Excluir Localidade #{localidade.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/locais")} className="atalho-btn vermelho">Cancelar</button>
          </div>
        </div>
        <div className="conteudo">
          <div className="card informacoes">
            <h2 className="titulo">{localidade.nome}</h2>
            <div className="campo"><strong>Descrição:</strong><p>{localidade.descricao || "Sem descrição."}</p></div>
          </div>
          <div className="card alerta-exclusao">
            <h2>Tem certeza que deseja excluir esta localidade? Essa ação não poderá ser desfeita.</h2>
            <button onClick={handleDelete} className="btn-excluir"><FaTrash /> Confirmar Exclusão</button>
          </div>
        </div>
      </div>
    </div>
  );
}
