import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { localidadeService } from "../../services/localidadeService";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

export default function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [localidade, setLocalidade] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarLocalidade() {
      try {
        setCarregando(true);
        setErro("");
        setLocalidade(await localidadeService.getById(id));
      } catch (error) {
        console.error("Erro ao carregar localidade:", error);
        setErro("Não foi possível carregar a localidade.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarLocalidade();
  }, [id]);

  const handleDelete = async () => {
    try {
      await localidadeService.remove(id);
      navigate("/locais");
    } catch (error) {
      console.error("Erro ao excluir localidade:", error);
      alert(error.response?.data?.mensagem || error.response?.data?.message || "Não foi possível excluir a localidade.");
    }
  };

  if (carregando) return <div className="inicio-page"><h1>Carregando localidade...</h1></div>;
  if (erro || !localidade) return <div className="inicio-page"><h1 className="form-error">{erro || "Localidade não encontrada"}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Excluir Localidade #{localidade.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft />Voltar</button>
            <button onClick={() => navigate("/locais")} className="atalho-btn vermelho">Cancelar</button>
          </div>
        </div>
        <div className="conteudo">
          <div className="card informacoes">
            <h2 className="titulo">{localidade.nome}</h2>
            <div className="campo">
              <strong>Descrição:</strong><p>{localidade.descricao || "Sem descrição."}</p>
            </div>
          </div>
          <div className="card alerta-exclusao">
            <h2>Tem certeza que deseja excluir esta localidade? Essa ação não poderá ser desfeita.</h2>
            <button onClick={handleDelete} className="btn-excluir"><FaTrash />Confirmar Exclusão</button>
          </div>
        </div>
      </div>
    </div>
  );
}
