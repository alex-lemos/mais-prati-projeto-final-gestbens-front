import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { usuarioService } from "../../services/usuarioService";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarUsuario() {
      try {
        setCarregando(true);
        setErro("");
        setUsuario(await usuarioService.getById(id));
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        setErro("Não foi possível carregar o usuário.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarUsuario();
  }, [id]);

  if (carregando) return <div className="inicio-page"><h1>Carregando usuário...</h1></div>;
  if (erro || !usuario) return <div className="inicio-page"><h1 className="form-error">{erro || "Usuário não encontrado"}</h1></div>;

  console.log(usuario)

  return (
    <div className="inicio-page">
      <h1>Detalhes do Usuário #{usuario.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            <NavLink to={`/usuarios/edit/${usuario.id}`} className="atalho-btn"><FaEdit /> Editar Usuário</NavLink>
            <NavLink to={`/usuarios/delete/${usuario.id}`} className="atalho-btn"><FaTrash /> Excluir Usuário</NavLink>
          </div>
        </div>
        <div className="card informacoes">
          <h2 className="titulo">{usuario.nome}</h2>
          <div className="informacoes-detalhes">
            <div className="campo">
              <strong>ID:</strong>
              <p>{usuario.id}</p>
            </div>
            <div className="campo">
              <strong>Nome:</strong>
              <p>{usuario.nome}</p>
            </div>
            <div className="campo">
              <strong>E-mail:</strong>
              <p>{usuario.email}</p>
            </div>
            <div className="campo">
              <strong>Perfil:</strong>
              <p>{usuario.admin ? "Administrador" : "Usuário"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
