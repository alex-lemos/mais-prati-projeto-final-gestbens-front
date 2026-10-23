import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { movimentacoes as mockMovimentacoes, bens, localidades, usuarios } from "../../mocks/data";
// Futuramente: import { movimentacaoService } from "../../services/movimentacaoService";
import { FaExchangeAlt, FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function Index() {
  const { usuario } = useAuth();
  const [movimentacoes] = useState(mockMovimentacoes);
  const [filtros, setFiltros] = useState({ bem: "", usuario: "" });
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

  const movimentacoesFiltradas = movimentacoes.filter((movimentacao) =>
    (!filtros.bem || String(movimentacao.bem_id) === filtros.bem) &&
    (!filtros.usuario || String(movimentacao.usuario_id) === filtros.usuario)
  );
  const totalPaginas = Math.max(1, Math.ceil(movimentacoesFiltradas.length / itensPorPagina));
  const movimentacoesPagina = movimentacoesFiltradas.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);
  const nomePorId = (lista, id) => lista.find((item) => String(item.id) === String(id))?.nome || `#${id}`;

  return (
    <div className="inicio-page">
      <h1>Gerenciar Movimentações</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Atalhos:</h2>
          <div className="atalhos-buttons">
            <NavLink to="/movimentacoes/create" className="atalho-btn verde"><FaExchangeAlt /> Registrar Movimentação</NavLink>
          </div>
        </div>
        <div className="conteudo">
          <div className="card filtros">
            <h2>Filtros:</h2>
            <div className="filtros-form">
              <select value={filtros.bem} onChange={(event) => { setFiltros((prev) => ({ ...prev, bem: event.target.value })); setPagina(1); }}>
                <option value="">Todos os bens</option>
                {bens.map((bem) => <option key={bem.id} value={bem.id}>{bem.nome}</option>)}
              </select>
              <select value={filtros.usuario} onChange={(event) => { setFiltros((prev) => ({ ...prev, usuario: event.target.value })); setPagina(1); }}>
                <option value="">Todos os responsáveis</option>
                {usuarios.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
              </select>
              <button className="atalho-btn" onClick={() => { setFiltros({ bem: "", usuario: "" }); setPagina(1); }}>Limpar</button>
            </div>
          </div>
          <div className="card" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <table className="tabela">
                <thead><tr><th>ID</th><th>Data</th><th>Bem</th><th>Origem</th><th>Destino</th><th>Responsável</th><th>Ações</th></tr></thead>
                <tbody>
                  {movimentacoesPagina.map((movimentacao) => (
                    <tr key={movimentacao.id}>
                      <td>{movimentacao.id}</td>
                      <td>{movimentacao.data_movimentacao?.slice(0, 10)}</td>
                      <td>{nomePorId(bens, movimentacao.bem_id)}</td>
                      <td>{nomePorId(localidades, movimentacao.localidade_origem_id)}</td>
                      <td>{nomePorId(localidades, movimentacao.localidade_destino_id)}</td>
                      <td>{nomePorId(usuarios, movimentacao.usuario_id)}</td>
                      <td className="acoes">
                        <NavLink to={`/movimentacoes/show/${movimentacao.id}`} data-tooltip="Visualizar movimentação"><FaEye /></NavLink>
                        {usuario?.is_admin && <>
                          <NavLink to={`/movimentacoes/edit/${movimentacao.id}`} data-tooltip="Editar movimentação"><FaEdit /></NavLink>
                          <NavLink to={`/movimentacoes/delete/${movimentacao.id}`} data-tooltip="Excluir movimentação"><FaTrash /></NavLink>
                        </>}
                      </td>
                    </tr>
                  ))}
                  {!movimentacoesPagina.length && <tr><td colSpan="7">Nenhuma movimentação encontrada.</td></tr>}
                </tbody>
            </table>
          </div>
          <div className="paginacao">
            <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>Anterior</button>
            <span>Página {pagina} de {totalPaginas}</span>
            <button disabled={pagina >= totalPaginas} onClick={() => setPagina(pagina + 1)}>Próxima</button>
          </div>
        </div>
      </div>
    </div>
  );
}
