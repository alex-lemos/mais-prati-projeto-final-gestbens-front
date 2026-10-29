import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { movimentacaoService } from "../../services/movimentacaoService";
import { bemService } from "../../services/bemService";
import { localidadeService } from "../../services/localidadeService";
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
        const [movimentacao, bens, localidades, usuarios] = await Promise.all([
          movimentacaoService.getById(id),
          bemService.getAll(),
          localidadeService.getAll(),
          usuarioService.getAll(),
        ]);
        const nomePorId = (lista, itemId) => lista.find((item) => String(item.id) === String(itemId))?.nome || `#${itemId}`;
        setDados({
          ...movimentacao,
          bemNome: movimentacao.bem?.nome || movimentacao.bem || nomePorId(Array.isArray(bens) ? bens : [], movimentacao.bem_id ?? movimentacao.bemId),
          origemNome: movimentacao.localidadeOrigem?.nome || movimentacao.localidadeOrigem || nomePorId(Array.isArray(localidades) ? localidades : [], movimentacao.localidade_origem_id ?? movimentacao.localidadeOrigemId),
          destinoNome: movimentacao.localidadeDestino?.nome || movimentacao.localidadeDestino || nomePorId(Array.isArray(localidades) ? localidades : [], movimentacao.localidade_destino_id ?? movimentacao.localidadeDestinoId),
          usuarioNome: movimentacao.usuario?.nome || movimentacao.usuario || nomePorId(Array.isArray(usuarios) ? usuarios : [], movimentacao.usuario_id ?? movimentacao.usuarioId),
        });
      } catch (error) {
        console.error("Erro ao carregar dados da movimentação:", error);
        setErro("Não foi possível carregar os dados da movimentação.");
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
      <h1>Detalhes da Movimentação #{dados.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft />Voltar</button>
            {usuario?.papel === "ADMIN" && <>
              <NavLink to={`/movimentacoes/edit/${dados.id}`} className="atalho-btn"><FaEdit />Editar Movimentação</NavLink>
              <NavLink to={`/movimentacoes/delete/${dados.id}`} className="atalho-btn"><FaTrash />Excluir Movimentação</NavLink>
            </>}
          </div>
        </div>
        <div className="card informacoes">
          <h2 className="titulo">Movimentação #{dados.id}</h2>
          <div className="informacoes-detalhes">
            <div className="campo">
              <strong>Data:</strong>
              <p>{(dados.data_movimentacao || dados.dataMovimentacao)?.slice(0, 10)}</p>
            </div>
            <div className="campo">
              <strong>Bem:</strong>
              <p>{dados.bemNome}</p>
            </div>
            <div className="campo">
              <strong>Origem:</strong>
              <p>{dados.origemNome}</p>
              </div>
            <div className="campo">
              <strong>Destino:</strong>
              <p>{dados.destinoNome}</p>
            </div>
            <div className="campo">
              <strong>Responsável:</strong>
              <p>{dados.usuarioNome}</p>
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
