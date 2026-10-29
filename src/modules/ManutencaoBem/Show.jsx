import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { manutencaoService } from "../../services/manutencaoService";
import { bemService } from "../../services/bemService";
import { usuarioService } from "../../services/usuarioService";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");
        const [manutencao, dadosBens, dadosUsuarios] = await Promise.all([
          manutencaoService.getById(id),
          bemService.getAll(),
          usuarioService.getAll(),
        ]);
        const listaBens = Array.isArray(dadosBens) ? dadosBens : [];
        const listaUsuarios = Array.isArray(dadosUsuarios) ? dadosUsuarios : [];
        setDados({
          ...manutencao,
          bem: listaBens.find((item) => String(item.id) === String(manutencao.bem_id ?? manutencao.bemId ?? manutencao.bem?.id)) || manutencao.bem,
          usuario: listaUsuarios.find((item) => String(item.id) === String(manutencao.usuario_id ?? manutencao.usuarioId ?? manutencao.usuario?.id)) || manutencao.usuario,
        });
      } catch (error) {
        console.error("Erro ao carregar dados da manutenção:", error);
        setErro("Não foi possível carregar os dados da manutenção.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarDados();
  }, [id]);

  if (carregando) return <div className="inicio-page"><h1>Carregando manutenção...</h1></div>;
  if (erro || !dados) return <div className="inicio-page"><h1 className="form-error">{erro || "Manutenção não encontrada"}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Detalhes da Manutenção #{dados.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            {usuario?.papel === "ADMIN" && <>
              <NavLink to={`/manutencoes/edit/${dados.id}`} className="atalho-btn"><FaEdit /> Editar Manutenção</NavLink>
              <NavLink to={`/manutencoes/delete/${dados.id}`} className="atalho-btn"><FaTrash /> Excluir Manutenção</NavLink>
            </>}
          </div>
        </div>
        <div className="card informacoes">
          <h2 className="titulo">Manutenção #{dados.id}</h2>
          <div className="informacoes-detalhes">
            <div className="campo">
              <strong>Data:</strong>
              <p>{(dados.data_manutencao || dados.dataManutencao)?.slice(0, 10)}</p>
            </div>
            <div className="campo">
              <strong>Bem:</strong>
              <p>{dados.bem?.nome || dados.bem || `#${dados.bem_id ?? dados.bemId}`}</p>
            </div>
            <div className="campo">
              <strong>Responsável:</strong>
              <p>{dados.usuario?.nome || dados.usuario || `#${dados.usuario_id ?? dados.usuarioId}`}</p>
            </div>
            <div className="campo">
              <strong>Custo:</strong>
              <p>{dados.custo == null ? "Não informado" : `R$ ${Number(dados.custo).toFixed(2)}`}</p>
            </div>
          </div>
          <div className="campo">
            <strong>Descrição:</strong>
            <p>{dados.descricao || "Sem descrição."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
