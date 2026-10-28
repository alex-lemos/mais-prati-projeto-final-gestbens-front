import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usuarios as mockUsuarios } from "../../mocks/data";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
// Futuramente: import { usuarioService } from "../../services/usuarioService";

export default function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    setUsuario(mockUsuarios.find((item) => item.id.toString() === id) || null);
  }, [id]);

  const handleDelete = async () => {
    try {
      const indice = mockUsuarios.findIndex((item) => item.id.toString() === id);
      if (indice < 0) throw new Error("Usuário não encontrado.");
      mockUsuarios.splice(indice, 1);
      // Futuramente: await usuarioService.remove(id);
      navigate("/usuarios");
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Não foi possível excluir o usuário.");
    }
  };

  if (!usuario) return <div className="inicio-page"><h1>Usuário não encontrado</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Excluir Usuário #{usuario.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/usuarios")} className="atalho-btn vermelho">Cancelar</button>
          </div>
        </div>
        <div className="conteudo">
          <div className="card informacoes">
            <h2 className="titulo">{usuario.nome}</h2>
            <div className="informacoes-detalhes">
              <div className="campo"><strong>E-mail:</strong><p>{usuario.email}</p></div>
              <div className="campo"><strong>Perfil:</strong><p>{usuario.is_admin ? "Administrador" : "Usuário"}</p></div>
            </div>
          </div>
          <div className="card alerta-exclusao">
            <h2>Tem certeza que deseja excluir este usuário? Essa ação não poderá ser desfeita.</h2>
            <button onClick={handleDelete} className="btn-excluir"><FaTrash /> Confirmar Exclusão</button>
          </div>
        </div>
      </div>
    </div>
  );
}
