import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movimentacaoService } from "../../services/movimentacaoService";
import { FaArrowLeft } from "react-icons/fa";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");
        setDados(await movimentacaoService.getById(id));
      } catch (error) {
        console.error("Erro ao carregar dados da movimentação:", error);
        setErro(
          error.response?.data?.mensagem ||
          error.response?.data?.message ||
          `Não foi possível carregar os dados da movimentação${error.response?.status ? ` (HTTP ${error.response.status})` : ""}.`
        );
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarDados();
  }, [id]);

  if (carregando) return <div className="inicio-page"><h1>Carregando movimentação...</h1></div>;
  if (erro || !dados) return <div className="inicio-page"><h1 className="form-error">{erro || "Movimentação não encontrada"}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Detalhes da Movimentação</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
          </div>
        </div>
        <div className="card informacoes">
          <h2 className="titulo">Movimentação</h2>
          <div className="informacoes-detalhes">
            <div className="campo">
              <strong>Data:</strong>
              <p>{(dados.data_movimentacao || dados.dataMovimentacao)?.slice(0, 10) || "—"}</p>
            </div>
            <div className="campo">
              <strong>Bem:</strong>
              <p>{dados.bem || "—"}</p>
            </div>
            <div className="campo">
              <strong>Origem:</strong>
              <p>{dados.localidadeOrigem || "—"}</p>
            </div>
            <div className="campo">
              <strong>Destino:</strong>
              <p>{dados.localidadeDestino || "—"}</p>
            </div>
            <div className="campo">
              <strong>Responsável:</strong>
              <p>{dados.usuario || "—"}</p>
            </div>
          </div>
          <div className="campo">
            <strong>Observação:</strong>
            <p>{dados.observacao || "Sem observação."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
