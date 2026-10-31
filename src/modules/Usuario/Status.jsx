import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usuarioService } from "../../services/usuarioService";
import { FaArrowLeft } from "react-icons/fa";

export default function Status() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [acaoEmAndamento, setAcaoEmAndamento] = useState(false);

  // Carrega informações do usuário
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

  // Função para alterar status e role
  const executarAcao = async (acao, atualizarUsuario, mensagemErro) => {
    try {
      setAcaoEmAndamento(true);
      await usuarioService[acao](id);
      setUsuario((atual) => atualizarUsuario(atual));
    } catch (error) {
      console.error(mensagemErro.log, error);
      alert(error.response?.data?.message || mensagemErro.alerta);
    } finally {
      setAcaoEmAndamento(false);
    }
  };

  // Status
  const estaAtivo = () => {
    if (typeof usuario.ativo === "boolean") return usuario.ativo;
    if (typeof usuario.isAtivo === "boolean") return usuario.isAtivo;
    const status = String(usuario.status ?? usuario.ativo ?? "").toUpperCase();
    if (["INATIVO", "DESATIVADO", "FALSE"].includes(status)) return false;
    if (["ATIVO", "ATIVA", "TRUE"].includes(status)) return true;
    return true;
  };
  const handleToggleStatus = () => {
    const ativo = !estaAtivo();
    return executarAcao(ativo ? "reativar" : "desativar", (atual) => ({ ...atual, ativo }), {
      log: "Erro ao alterar status do usuário:",
      alerta: "Não foi possível alterar o status do usuário.",
    });
  };

  // Role
  const eAdministrador = () => Boolean(usuario.admin);
  const handleToggleRole = () => {
    const admin = !eAdministrador();
    return executarAcao(admin ? "promover" : "rebaixar", (atual) => ({ ...atual, admin }), {
      log: "Erro ao alterar perfil do usuário:",
      alerta: "Não foi possível alterar o perfil do usuário.",
    });
  };

  // Feedback visual
  if (carregando) return <div className="inicio-page"><h1>Carregando usuário...</h1></div>;
  if (erro || !usuario) return <div className="inicio-page"><h1 className="form-error">{erro || "Usuário não encontrado"}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Status do Usuário #{usuario.id}</h1>
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
              <div className="campo"><strong>Status:</strong><p>{estaAtivo() ? "Ativo" : "Inativo"}</p></div>
              <div className="campo"><strong>Perfil:</strong><p>{eAdministrador() ? "Administrador" : "Usuário"}</p></div>
            </div>
          </div>
          <div className="card alerta-exclusao">
            <h2>Ações da conta e do perfil</h2>
            <button onClick={handleToggleStatus} className="btn-excluir" disabled={acaoEmAndamento}>
              {estaAtivo() ? <>Desativar Usuário</> : <>Reativar Usuário</>}
            </button>
            <button onClick={handleToggleRole} className="btn-excluir" disabled={acaoEmAndamento}>
              {eAdministrador() ? <>Rebaixar para Usuário</> : <>Promover a Administrador</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
