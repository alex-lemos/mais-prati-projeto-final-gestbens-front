import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { movimentacaoService } from "../../services/movimentacaoService";
import { bemService } from "../../services/bemService";
import { localidadeService } from "../../services/localidadeService";
import { usuarioService } from "../../services/usuarioService";
import { FaExchangeAlt, FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function Index() {
  const { usuario } = useAuth();
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [bens, setBens] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
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
        const [dadosMovimentacoes, dadosBens, dadosLocalidades, dadosUsuarios] = await Promise.all([
          movimentacaoService.getAll(),
          bemService.getAll(),
          localidadeService.getAll(),
          usuarioService.getAll(),
        ]);
        setMovimentacoes(Array.isArray(dadosMovimentacoes) ? [...dadosMovimentacoes].sort((a, b) => Number(a.id) - Number(b.id)) : []);
        setBens(Array.isArray(dadosBens) ? dadosBens : []);
        setLocalidades(Array.isArray(dadosLocalidades) ? dadosLocalidades : []);
        setUsuarios(Array.isArray(dadosUsuarios) ? dadosUsuarios : []);
      } catch (error) {
        console.error("Erro ao carregar movimentações:", error);
        setErro("Não foi possível carregar as movimentações.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const movimentacoesFiltradas = movimentacoes.filter((movimentacao) =>
    (!filtros.bem || String(movimentacao.bem_id ?? movimentacao.bemId ?? movimentacao.bem?.id) === filtros.bem) &&
    (!filtros.usuario || String(movimentacao.usuario_id ?? movimentacao.usuarioId ?? movimentacao.usuario?.id) === filtros.usuario)
  );
  const totalPaginas = Math.max(1, Math.ceil(movimentacoesFiltradas.length / itensPorPagina));
  const movimentacoesPagina = movimentacoesFiltradas.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);
  const nomePorId = (lista, id) => lista.find((item) => String(item.id) === String(id))?.nome || `#${id}`;
  const nomeReferencia = (referencia, lista, id) => referencia?.nome || (typeof referencia === "string" ? referencia : null) ||
    nomePorId(lista, id ?? referencia?.id);

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
                {bens.map((bem) => <option key={bem.id} value={bem.id}>{bem.id} - {bem.nome}</option>)}
              </select>
              <select value={filtros.usuario} onChange={(event) => { setFiltros((prev) => ({ ...prev, usuario: event.target.value })); setPagina(1); }}>
                <option value="">Todos os responsáveis</option>
                {usuarios.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
              </select>
              <button className="atalho-btn" onClick={() => { setFiltros({ bem: "", usuario: "" }); setPagina(1); }}>Limpar</button>
            </div>
          </div>
          {carregando && <p>Carregando movimentações...</p>}
          {erro && <p className="form-error">⚠️ {erro}</p>}
          <div className="card" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <table className="tabela">
                <thead><tr><th>ID</th><th>Data</th><th>Bem</th><th>Origem</th><th>Destino</th><th>Responsável</th><th>Ações</th></tr></thead>
                <tbody>
                  {movimentacoesPagina.map((movimentacao) => (
                    <tr key={movimentacao.id}>
                      <td>{movimentacao.id}</td>
                      <td>{(movimentacao.data_movimentacao || movimentacao.dataMovimentacao)?.slice(0, 10)}</td>
                      <td>{nomeReferencia(movimentacao.bem, bens, movimentacao.bem_id ?? movimentacao.bemId)}</td>
                      <td>{nomeReferencia(movimentacao.localidadeOrigem, localidades, movimentacao.localidade_origem_id ?? movimentacao.localidadeOrigemId)}</td>
                      <td>{nomeReferencia(movimentacao.localidadeDestino, localidades, movimentacao.localidade_destino_id ?? movimentacao.localidadeDestinoId)}</td>
                      <td>{nomeReferencia(movimentacao.usuario, usuarios, movimentacao.usuario_id ?? movimentacao.usuarioId)}</td>
                      <td className="acoes">
                        <NavLink to={`/movimentacoes/show/${movimentacao.id}`} data-tooltip="Visualizar movimentação"><FaEye /></NavLink>
                        {usuario?.papel === "ADMIN" && <>
                          <NavLink to={`/movimentacoes/edit/${movimentacao.id}`} data-tooltip="Editar movimentação"><FaEdit /></NavLink>
                          <NavLink to={`/movimentacoes/delete/${movimentacao.id}`} data-tooltip="Excluir movimentação"><FaTrash /></NavLink>
                        </>}
                      </td>
                    </tr>
                  ))}
                  {!movimentacoesPagina.length && !carregando && <tr><td colSpan="7">Nenhuma movimentação encontrada.</td></tr>}
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
