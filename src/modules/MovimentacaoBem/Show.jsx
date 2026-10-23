import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { movimentacoes as mockMovimentacoes, bens, localidades, usuarios } from "../../mocks/data";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
// Futuramente: import { movimentacaoService } from "../../services/movimentacaoService";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    const movimentacao = mockMovimentacoes.find((item) => item.id.toString() === id);
    if (movimentacao) {
      const nomePorId = (lista, itemId) => lista.find((item) => String(item.id) === String(itemId))?.nome || `#${itemId}`;
      setDados({
        ...movimentacao,
        bemNome: nomePorId(bens, movimentacao.bem_id),
        origemNome: nomePorId(localidades, movimentacao.localidade_origem_id),
        destinoNome: nomePorId(localidades, movimentacao.localidade_destino_id),
        usuarioNome: nomePorId(usuarios, movimentacao.usuario_id),
      });
    }
  }, [id]);

  if (!dados) return <div className="inicio-page"><h1>Movimentação não encontrada</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Detalhes da Movimentação #{dados.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            {usuario?.is_admin && <>
              <NavLink to={`/movimentacoes/edit/${dados.id}`} className="atalho-btn"><FaEdit /> Editar Movimentação</NavLink>
              <NavLink to={`/movimentacoes/delete/${dados.id}`} className="atalho-btn"><FaTrash /> Excluir Movimentação</NavLink>
            </>}
          </div>
        </div>
        <div className="card informacoes">
          <h2 className="titulo">Movimentação #{dados.id}</h2>
          <div className="informacoes-detalhes">
            <div className="campo"><strong>Data:</strong><p>{dados.data_movimentacao?.slice(0, 10)}</p></div>
            <div className="campo"><strong>Bem:</strong><p>{dados.bemNome}</p></div>
            <div className="campo"><strong>Origem:</strong><p>{dados.origemNome}</p></div>
            <div className="campo"><strong>Destino:</strong><p>{dados.destinoNome}</p></div>
            <div className="campo"><strong>Responsável:</strong><p>{dados.usuarioNome}</p></div>
          </div>
          <div className="campo"><strong>Observação:</strong><p>{dados.observacao || "Sem observação."}</p></div>
        </div>
      </div>
    </div>
  );
}
