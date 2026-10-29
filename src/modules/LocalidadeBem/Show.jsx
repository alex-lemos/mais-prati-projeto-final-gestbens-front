import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { localidadeService } from "../../services/localidadeService";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
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

  if (carregando) return <div className="inicio-page"><h1>Carregando localidade...</h1></div>;
  if (erro || !localidade) return <div className="inicio-page"><h1 className="form-error">{erro || "Localidade não encontrada"}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Detalhes da Localidade #{localidade.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft />Voltar</button>
            {usuario?.papel === "ADMIN" && <>
              <NavLink to={`/locais/edit/${localidade.id}`} className="atalho-btn"><FaEdit />Editar Localidade</NavLink>
              <NavLink to={`/locais/delete/${localidade.id}`} className="atalho-btn"><FaTrash />Excluir Localidade</NavLink>
            </>}
          </div>
        </div>
        <div className="card informacoes">
          <h2 className="titulo">{localidade.nome}</h2>
          <div className="informacoes-detalhes">
            <div className="campo">
              <strong>ID:</strong>
              <p>{localidade.id}</p>
            </div>
            <div className="campo">
              <strong>Nome:</strong>
              <p>{localidade.nome}</p>
            </div>
          </div>
          <div className="campo">
            <strong>Descrição:</strong>
            <p>{localidade.descricao || "Sem descrição."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
