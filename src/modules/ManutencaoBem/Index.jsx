import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { manutencoes as mockManutencoes, bens, usuarios } from "../../mocks/data";
// Futuramente: import { manutencaoService } from "../../services/manutencaoService";
import { FaWrench, FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function Index() {
  const { usuario } = useAuth();
  const [manutencoes] = useState(mockManutencoes);
  const [filtros, setFiltros] = useState({ bem: "", usuario: "" });
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

  const manutencoesFiltradas = manutencoes.filter((manutencao) =>
    (!filtros.bem || String(manutencao.bem_id) === filtros.bem) &&
    (!filtros.usuario || String(manutencao.usuario_id) === filtros.usuario)
  );
  const totalPaginas = Math.max(1, Math.ceil(manutencoesFiltradas.length / itensPorPagina));
  const manutencoesPagina = manutencoesFiltradas.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);
  const nomeBem = (id) => bens.find((bem) => String(bem.id) === String(id))?.nome || `#${id}`;
  const nomeUsuario = (id) => usuarios.find((item) => String(item.id) === String(id))?.nome || `#${id}`;

  return (
    <div className="inicio-page">
      <h1>Gerenciar Manutenções</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Atalhos:</h2>
          <div className="atalhos-buttons">
            <NavLink to="/manutencoes/create" className="atalho-btn verde"><FaWrench /> Registrar Manutenção</NavLink>
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
                <thead><tr><th>ID</th><th>Data</th><th>Bem</th><th>Responsável</th><th>Custo</th><th>Ações</th></tr></thead>
                <tbody>
                  {manutencoesPagina.map((manutencao) => (
                    <tr key={manutencao.id}>
                      <td>{manutencao.id}</td>
                      <td>{manutencao.data_manutencao?.slice(0, 10)}</td>
                      <td>{nomeBem(manutencao.bem_id)}</td>
                      <td>{nomeUsuario(manutencao.usuario_id)}</td>
                      <td>{manutencao.custo == null ? "—" : `R$ ${Number(manutencao.custo).toFixed(2)}`}</td>
                      <td className="acoes">
                        <NavLink to={`/manutencoes/show/${manutencao.id}`} data-tooltip="Visualizar manutenção"><FaEye /></NavLink>
                        {usuario?.is_admin && <>
                          <NavLink to={`/manutencoes/edit/${manutencao.id}`} data-tooltip="Editar manutenção"><FaEdit /></NavLink>
                          <NavLink to={`/manutencoes/delete/${manutencao.id}`} data-tooltip="Excluir manutenção"><FaTrash /></NavLink>
                        </>}
                      </td>
                    </tr>
                  ))}
                  {!manutencoesPagina.length && <tr><td colSpan="6">Nenhuma manutenção encontrada.</td></tr>}
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
