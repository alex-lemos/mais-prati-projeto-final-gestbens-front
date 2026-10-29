import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usuarioService } from "../../services/usuarioService";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

export default function Delete() {
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

  const handleDelete = async () => {
    try {
      await usuarioService.remove(id);
      navigate("/usuarios");
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert(error.response?.data?.message || "Não foi possível excluir o usuário.");
    }
  };

  if (carregando) return <div className="inicio-page"><h1>Carregando usuário...</h1></div>;
  if (erro || !usuario) return <div className="inicio-page"><h1 className="form-error">{erro || "Usuário não encontrado"}</h1></div>;

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
