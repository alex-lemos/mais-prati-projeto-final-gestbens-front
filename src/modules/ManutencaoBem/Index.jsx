import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { manutencaoService } from "../../services/manutencaoService";
import { FaWrench, FaEye, FaEdit } from "react-icons/fa";

function formatarData(data) {
  if (!data) return "—";

  const dataFormatada = new Date(data);
  if (Number.isNaN(dataFormatada.getTime())) return "Data inválida";

  return dataFormatada.toLocaleDateString("pt-BR");
}

export default function Index() {
  const [manutencoes, setManutencoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [filtros, setFiltros] = useState({ bem: "", usuario: "", situacao: "" });
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");
        const dadosManutencoes = await manutencaoService.getAll();
        setManutencoes(Array.isArray(dadosManutencoes) ? dadosManutencoes : []);
      } catch (error) {
        console.error("Erro ao carregar manutenções:", error);
        setErro(
          error.response?.data?.mensagem ||
          error.response?.data?.message ||
          `Não foi possível carregar as manutenções${error.response?.status ? ` (HTTP ${error.response.status})` : ""}.`
        );
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, []);

  const manutencoesFiltradas = manutencoes
    .filter((manutencao) =>
      (!filtros.bem || String(manutencao.bemId) === filtros.bem) &&
      (!filtros.usuario || (manutencao.usuario || "").toLowerCase().includes(filtros.usuario.toLowerCase())) &&
      (!filtros.situacao ||
        (filtros.situacao === "em-andamento"
          ? !manutencao.dataRetorno
          : Boolean(manutencao.dataRetorno)))
    )
    .sort((a, b) => {
      const dataA = Date.parse(a.dataEntrada || "");
      const dataB = Date.parse(b.dataEntrada || "");

      if (Number.isNaN(dataA)) return Number.isNaN(dataB) ? 0 : 1;
      if (Number.isNaN(dataB)) return -1;
      return dataB - dataA;
    });
  const totalPaginas = Math.max(1, Math.ceil(manutencoesFiltradas.length / itensPorPagina));
  const manutencoesPagina = manutencoesFiltradas.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);

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
              <select
                aria-label="Filtrar por situação da manutenção"
                value={filtros.situacao}
                onChange={(event) => {
                  setFiltros((prev) => ({ ...prev, situacao: event.target.value }));
                  setPagina(1);
                }}
              >
                <option value="">Todas as manutenções</option>
                <option value="em-andamento">Em andamento</option>
                <option value="concluida">Concluídas</option>
              </select>
              <button className="atalho-btn" onClick={() => {
                setFiltros({ bem: "", usuario: "", situacao: "" });
                setPagina(1);
              }}>Limpar</button>
            </div>
          </div>
          {carregando && <p>Carregando manutenções...</p>}
          {erro && <p className="form-error">⚠️ {erro}</p>}
          <div className="card" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <table className="tabela">
                <thead>
                  <tr>
                    <th>Retorno</th>
                    <th>Bem</th>
                    <th>Responsável</th>
                    <th>Custo</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {manutencoesPagina.map((manutencao) => (
                    <tr key={manutencao.id}>
                      <td>
                        {formatarData(manutencao.dataRetorno)}
                      </td>
                      <td>{manutencao.bem || "—"}</td>
                      <td>{manutencao.usuario || "—"}</td>
                      <td>{manutencao.custo == null ? "—" : `R$ ${Number(manutencao.custo).toFixed(2)}`}</td>
                      <td className="acoes">
                        <NavLink to={`/manutencoes/show/${manutencao.id}`} data-tooltip="Visualizar manutenção"><FaEye /></NavLink>
                        <NavLink to={`/manutencoes/edit/${manutencao.id}`} data-tooltip="Editar manutenção"><FaEdit /></NavLink>
                      </td>
                    </tr>
                  ))}
                  {!manutencoesPagina.length && !carregando && <tr><td colSpan="5">Nenhuma manutenção encontrada.</td></tr>}
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
