import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { categoriaService } from "../../services/categoriaService";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [categoria, setCategoria] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarCategoria() {
      try {
        setCarregando(true);
        setErro("");
        setCategoria(await categoriaService.getById(id));
      } catch (error) {
        console.error("Erro ao carregar categoria:", error);
        setErro("Não foi possível carregar a categoria.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarCategoria();
  }, [id]);

  if (carregando) return <div className="inicio-page"><h1>Carregando categoria...</h1></div>;
  if (erro || !categoria) return <div className="inicio-page"><h1 className="form-error">{erro || "Categoria não encontrada"}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Detalhes da Categoria #{categoria.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft />Voltar</button>
            {usuario?.papel === "ADMIN" && <>
              <NavLink to={`/categorias/edit/${categoria.id}`} className="atalho-btn"><FaEdit />Editar Categoria</NavLink>
              <NavLink to={`/categorias/delete/${categoria.id}`} className="atalho-btn"><FaTrash />Excluir Categoria</NavLink>
            </>}
          </div>
        </div>
        <div className="card informacoes">
          <h2 className="titulo">{categoria.nome}</h2>
          <div className="informacoes-detalhes">
            <div className="campo">
              <strong>ID:</strong>
              <p>{categoria.id}</p>
            </div>
            <div className="campo">
              <strong>Nome:</strong>
              <p>{categoria.nome}</p>
            </div>
          </div>
          <div className="campo">
            <strong>Descrição:</strong>
            <p>{categoria.descricao || "Sem descrição."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
