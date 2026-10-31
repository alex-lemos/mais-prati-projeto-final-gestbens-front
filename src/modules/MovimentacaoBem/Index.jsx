import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { movimentacaoService } from "../../services/movimentacaoService";
import { FaExchangeAlt, FaEye } from "react-icons/fa";

export default function Index() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [filtros, setFiltros] = useState({ bem: "", usuario: "" });
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");
        const dadosMovimentacoes = await movimentacaoService.getAll();
        setMovimentacoes(Array.isArray(dadosMovimentacoes) ? dadosMovimentacoes : []);
      } catch (error) {
        console.error("Erro ao carregar movimentações:", error);
        setErro(
          error.response?.data?.mensagem ||
          error.response?.data?.message ||
          `Não foi possível carregar as movimentações${error.response?.status ? ` (HTTP ${error.response.status})` : ""}.`
        );
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, []);

  const movimentacoesFiltradas = movimentacoes
    .filter((movimentacao) =>
      (!filtros.bem || String(movimentacao.bemId) === filtros.bem) &&
      (!filtros.usuario || (movimentacao.usuario || "").toLowerCase().includes(filtros.usuario.toLowerCase()))
    )
    .sort((a, b) => {
      const dataA = Date.parse(a.data_movimentacao ?? a.dataMovimentacao ?? "");
      const dataB = Date.parse(b.data_movimentacao ?? b.dataMovimentacao ?? "");

      if (Number.isNaN(dataA)) return Number.isNaN(dataB) ? 0 : 1;
      if (Number.isNaN(dataB)) return -1;
      return dataB - dataA;
    });
  const totalPaginas = Math.max(1, Math.ceil(movimentacoesFiltradas.length / itensPorPagina));
  const movimentacoesPagina = movimentacoesFiltradas.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);

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
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                aria-label="Filtrar por patrimônio do bem"
                placeholder="Patrimônio"
                value={filtros.bem}
                onChange={(event) => {
                  const bemId = event.target.value.replace(/\D/g, "");
                  setFiltros((prev) => ({ ...prev, bem: bemId }));
                  setPagina(1);
                }}
              />
              <input
                type="text"
                aria-label="Filtrar por responsável"
                placeholder="Responsável"
                value={filtros.usuario}
                onChange={(event) => {
                  setFiltros((prev) => ({ ...prev, usuario: event.target.value }));
                  setPagina(1);
                }}
              />
              <button className="atalho-btn" onClick={() => {
                setFiltros({ bem: "", usuario: "" });
                setPagina(1);
              }}>Limpar</button>
            </div>
          </div>
          {carregando && <p>Carregando movimentações...</p>}
          {erro && <p className="form-error">⚠️ {erro}</p>}
          <div className="card" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <table className="tabela">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Bem</th>
                    <th>Origem</th>
                    <th>Destino</th>
                    <th>Responsável</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {movimentacoesPagina.map((movimentacao) => (
                    <tr key={movimentacao.id}>
                      <td>{(movimentacao.data_movimentacao ?? movimentacao.dataMovimentacao)?.slice(0, 10) || "—"}</td>
                      <td>{movimentacao.bem || "—"}</td>
                      <td>{movimentacao.localidadeOrigem || "—"}</td>
                      <td>{movimentacao.localidadeDestino || "—"}</td>
                      <td>{movimentacao.usuario || "—"}</td>
                      <td className="acoes">
                        <NavLink to={`/movimentacoes/show/${movimentacao.id}`} data-tooltip="Visualizar movimentação"><FaEye /></NavLink>
                      </td>
                    </tr>
                  ))}
                  {!movimentacoesPagina.length && !carregando && <tr><td colSpan="6">Nenhuma movimentação encontrada.</td></tr>}
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
