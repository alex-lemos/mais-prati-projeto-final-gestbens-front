import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { categoriaService } from "../../services/categoriaService";
import { FaBoxOpen, FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function Index() {
  const { usuario } = useAuth();
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    async function carregarCategorias() {
      try {
        setCarregando(true);
        setErro("");
        const dados = await categoriaService.getAll();
        setCategorias(Array.isArray(dados) ? [...dados].sort((a, b) => Number(a.id) - Number(b.id)) : []);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        setErro("Não foi possível carregar as categorias.");
      } finally {
        setCarregando(false);
      }
    }

    carregarCategorias();
  }, []);

  const categoriasFiltradas = categorias.filter((categoria) =>
    categoria.nome.toLowerCase().includes(filtro.toLowerCase())
  );
  const totalPaginas = Math.max(1, Math.ceil(categoriasFiltradas.length / itensPorPagina));
  const categoriasPagina = categoriasFiltradas.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);

  return (
    <div className="inicio-page">
      <h1>Gerenciar Categorias</h1>
      <div className="conteudo-wrapper">
        {usuario?.papel === "ADMIN" && (
          <div className="card atalhos">
            <h2>Atalhos:</h2>
            <div className="atalhos-buttons">
              <NavLink to="/categorias/create" className="atalho-btn verde"><FaBoxOpen />Cadastrar Nova Categoria</NavLink>
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
          {carregando && <p>Carregando categorias...</p>}
          {erro && <p className="form-error">⚠️ {erro}</p>}
          <div className="card">
            <table className="tabela">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriasPagina.map((categoria) => (
                    <tr key={categoria.id}>
                      <td>{categoria.id}</td>
                      <td>{categoria.nome}</td>
                      <td>{categoria.descricao || "—"}</td>
                      <td className="acoes">
                        <NavLink to={`/categorias/show/${categoria.id}`} data-tooltip="Visualizar categoria"><FaEye /></NavLink>
                        {usuario?.papel === "ADMIN" && <>
                          <NavLink to={`/categorias/edit/${categoria.id}`} data-tooltip="Editar categoria"><FaEdit /></NavLink>
                          <NavLink to={`/categorias/delete/${categoria.id}`} data-tooltip="Excluir categoria"><FaTrash /></NavLink>
                        </>}
                      </td>
                    </tr>
                  ))}
                  {!categoriasPagina.length && !carregando && <tr><td colSpan="4">Nenhuma categoria encontrada.</td></tr>}
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
