import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { localidadeService } from "../../services/localidadeService";
import { FaBoxOpen, FaEdit, FaTrash } from "react-icons/fa";

export default function Index() {
  const { usuario } = useAuth();
  const [localidades, setLocalidades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    async function carregarLocalidades() {
      try {
        setCarregando(true);
        setErro("");
        const dados = await localidadeService.getAll();
        setLocalidades(Array.isArray(dados) ? [...dados].sort((a, b) => Number(a.id) - Number(b.id)) : []);
      } catch (error) {
        console.error("Erro ao carregar localidades:", error);
        setErro("Não foi possível carregar as localidades.");
      } finally {
        setCarregando(false);
      }
    }

    carregarLocalidades();
  }, []);

  const localidadesFiltradas = localidades
    .filter((localidade) =>
      localidade.nome.toLowerCase().includes(filtro.toLowerCase())
    )
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" }));
  const totalPaginas = Math.max(1, Math.ceil(localidadesFiltradas.length / itensPorPagina));
  const localidadesPagina = localidadesFiltradas.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);

  console.log(localidades)

  return (
    <div className="inicio-page">
      <h1>Gerenciar Locais</h1>
      <div className="conteudo-wrapper">
        {usuario?.papel === "ADMIN" && (
          <div className="card atalhos">
            <h2>Atalhos:</h2>
            <div className="atalhos-buttons">
              <NavLink to="/locais/create" className="atalho-btn verde"><FaBoxOpen />Cadastrar Nova Localidade</NavLink>
            </div>
          </div>
        )}
        <div className="conteudo">
          <div className="card filtros">
            <h2>Filtros:</h2>
            <div className="filtros-form">
              <input aria-label="Filtrar por nome" value={filtro} onChange={(event) => { setFiltro(event.target.value); setPagina(1); }} placeholder="Nome do local" />
              <button className="atalho-btn" onClick={() => { setFiltro(""); setPagina(1); }}>Limpar</button>
            </div>
          </div>
          {carregando && <p>Carregando localidades...</p>}
          {erro && <p className="form-error">⚠️ {erro}</p>}
          <div className="card" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <table className="tabela">
                <thead><tr><th>Nome</th><th>Descrição</th><th>Ações</th></tr></thead>
                <tbody>
                  {localidadesPagina.map((localidade) => (
                    <tr key={localidade.id}>
                      <td>{localidade.nome}</td>
                      <td>{localidade.descricao || "—"}</td>
                      <td className="acoes">
                        {usuario?.papel === "ADMIN" && <>
                          <NavLink to={`/locais/edit/${localidade.id}`} data-tooltip="Editar localidade"><FaEdit /></NavLink>
                          <NavLink className="excluir" to={`/locais/delete/${localidade.id}`} data-tooltip="Excluir localidade"><FaTrash /></NavLink>
                        </>}
                      </td>
                    </tr>
                  ))}
                  {!localidadesPagina.length && !carregando && <tr><td colSpan="4">Nenhuma localidade encontrada.</td></tr>}
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
