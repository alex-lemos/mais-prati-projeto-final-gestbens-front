import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { categorias as mockCategorias } from "../../mocks/data";
// Futuramente: import { categoriaService } from "../../services/categoriaService";
import { FaBoxOpen, FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function Index() {
  const { usuario } = useAuth();
  const [categorias] = useState(() => [...mockCategorias].sort((a, b) => a.nome.localeCompare(b.nome)));
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

  const categoriasFiltradas = categorias.filter((categoria) =>
    categoria.nome.toLowerCase().includes(filtro.toLowerCase())
  );
  const totalPaginas = Math.max(1, Math.ceil(categoriasFiltradas.length / itensPorPagina));
  const categoriasPagina = categoriasFiltradas.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);

  return (
    <div className="inicio-page">
      <h1>Gerenciar Categorias</h1>
      <div className="conteudo-wrapper">
        {usuario?.is_admin && (
          <div className="card atalhos">
            <h2>Atalhos:</h2>
            <div className="atalhos-buttons">
              <NavLink to="/categorias/create" className="atalho-btn verde"><FaBoxOpen /> Cadastrar Nova Categoria</NavLink>
            </div>
          </div>
        )}
        <div className="conteudo">
          <div className="card filtros">
            <h2>Filtros:</h2>
            <div className="filtros-form">
              <input aria-label="Filtrar por nome" value={filtro} onChange={(event) => { setFiltro(event.target.value); setPagina(1); }} placeholder="Nome da categoria" />
              <button className="atalho-btn" onClick={() => setFiltro("")}>Limpar</button>
            </div>
          </div>
          <div className="card" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <table className="tabela">
                <thead><tr><th>ID</th><th>Nome</th><th>Descrição</th><th>Ações</th></tr></thead>
                <tbody>
                  {categoriasPagina.map((categoria) => (
                    <tr key={categoria.id}>
                      <td>{categoria.id}</td>
                      <td>{categoria.nome}</td>
                      <td>{categoria.descricao || "—"}</td>
                      <td className="acoes">
                        <NavLink to={`/categorias/show/${categoria.id}`} data-tooltip="Visualizar categoria"><FaEye /></NavLink>
                        {usuario?.is_admin && <>
                          <NavLink to={`/categorias/edit/${categoria.id}`} data-tooltip="Editar categoria"><FaEdit /></NavLink>
                          <NavLink to={`/categorias/delete/${categoria.id}`} data-tooltip="Excluir categoria"><FaTrash /></NavLink>
                        </>}
                      </td>
                    </tr>
                  ))}
                  {!categoriasPagina.length && <tr><td colSpan="4">Nenhuma categoria encontrada.</td></tr>}
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
