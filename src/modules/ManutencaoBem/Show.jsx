import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { manutencaoService } from "../../services/manutencaoService";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

function formatarData(data) {
  if (!data) return "—";

  const [ano, mes, dia] = String(data).split("T")[0].split("-");
  return ano && mes && dia ? `${dia}/${mes}/${ano}` : "Data inválida";
}

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
        setDados(await manutencaoService.getById(id));
      } catch (error) {
        console.error("Erro ao carregar dados da manutenção:", error);
        setErro(
          error.response?.data?.mensagem ||
          error.response?.data?.message ||
          `Não foi possível carregar os dados da manutenção${error.response?.status ? ` (HTTP ${error.response.status})` : ""}.`
        );
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
      <h1>Detalhes da Manutenção</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            {usuario?.papel === "ADMIN" && (
              <NavLink to={`/manutencoes/edit/${dados.id}`} className="atalho-btn"><FaEdit /> Editar Manutenção</NavLink>
            )}
          </div>
        </div>
        <div className="card informacoes">
          <h2 className="titulo">Manutenção</h2>
          <div className="informacoes-detalhes">
            <div className="campo">
              <strong>Data: (Saída/Retorno)</strong>
              <p>{formatarData(dados.dataEntrada)} / {formatarData(dados.dataRetorno)}</p>
            </div>
            <div className="campo">
              <strong>Bem:</strong>
              <p>{dados.bem || "—"}</p>
            </div>
            <div className="campo">
              <strong>Responsável:</strong>
              <p>{dados.usuario || "—"}</p>
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
