import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { usuarios as mockUsuarios } from "../../mocks/data";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
// Futuramente: import { usuarioService } from "../../services/usuarioService";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    setUsuario(mockUsuarios.find((item) => item.id.toString() === id) || null);
  }, [id]);

  if (!usuario) return <div className="inicio-page"><h1>Usuário não encontrado</h1></div>;

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
            <div className="campo"><strong>ID:</strong><p>{usuario.id}</p></div>
            <div className="campo"><strong>Nome:</strong><p>{usuario.nome}</p></div>
            <div className="campo"><strong>E-mail:</strong><p>{usuario.email}</p></div>
            <div className="campo"><strong>Perfil:</strong><p>{usuario.is_admin ? "Administrador" : "Usuário"}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
