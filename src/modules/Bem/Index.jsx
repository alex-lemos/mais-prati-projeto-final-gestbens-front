import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
// futuramente: import { bemService } from "../../services/bemService";
import { bens as mockBens, categorias as mockCategorias, localidades as mockLocalidades } from "../../mocks/data";
import { FaBolt, FaBoxOpen, FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function BensIndex() {
  const { usuario } = useAuth();
  const [bens, setBens] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [filtros, setFiltros] = useState({
    patrimonio: "",
    localidade: "",
    categoria: "",
    status: ""
  });
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

  // refs para inputs de filtro
  const patrimonioRef = useRef();
  const localidadeRef = useRef();
  const categoriaRef = useRef();
  const statusRef = useRef();

  useEffect(() => {
    const carregar = async () => {
      // ordena alfabeticamente pelo nome
      const categoriasOrdenadas = [...mockCategorias].sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );
      const localidadesOrdenadas = [...mockLocalidades].sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );

      setBens(mockBens);
      setCategorias(categoriasOrdenadas);
      setLocalidades(localidadesOrdenadas);
    };
    carregar();
  }, []);


  // aplica filtros
  const bensFiltrados = bens.filter((bem) => {
    return (
      (filtros.patrimonio === "" || bem.id.toString().includes(filtros.patrimonio)) &&
      (filtros.localidade === "" || bem.localidade_id.toString() === filtros.localidade) &&
      (filtros.categoria === "" || bem.categoria_id.toString() === filtros.categoria) &&
      (filtros.status === "" || bem.status.toLowerCase() === filtros.status.toLowerCase())
    );
  });

  // paginação
  const totalPaginas = Math.ceil(bensFiltrados.length / itensPorPagina);
  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const bensPagina = bensFiltrados.slice(inicio, fim);

  const aplicarFiltros = () => {
    setFiltros({
      patrimonio: patrimonioRef.current.value,
      localidade: localidadeRef.current.value,
      categoria: categoriaRef.current.value,
      status: statusRef.current.value
    });
    setPagina(1);
  };

  const limparFiltros = () => {
    patrimonioRef.current.value = "";
    localidadeRef.current.value = "";
    categoriaRef.current.value = "";
    statusRef.current.value = "";
    setFiltros({ patrimonio: "", localidade: "", categoria: "", status: "" });
    setPagina(1);
  };

  const getCategoriaNome = (id) => {
    const cat = categorias.find((c) => c.id === id);
    return cat ? cat.nome : id;
  };

  const getLocalidadeNome = (id) => {
    const loc = localidades.find((l) => l.id === id);
    return loc ? loc.nome : id;
  };

  return (
    <div className="inicio-page">
      <h1>Gerenciar Bens</h1>

      {/* container principal */}
      <div className="conteudo-wrapper">

        {/*Atalhos */}
        <div className="card atalhos">
          <h2><FaBolt /> Atalhos:</h2>
          <div className="atalhos-buttons">
            <NavLink to="/bens/create" className="atalho-btn verde">
              <FaBoxOpen /> Cadastrar Novo Bem
            </NavLink>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="conteudo">

          {/* Filtros */}
          <div className="card filtros">
            <h2>Filtros:</h2>
            <div className="filtros-form">
              <input ref={patrimonioRef} type="text" placeholder="Patrimônio" />

              <select ref={localidadeRef} defaultValue="">
                <option value="">Todas Localidades</option>
                {localidades.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.nome}</option>
                ))}
              </select>

              <select ref={categoriaRef} defaultValue="">
                <option value="">Todas Categorias</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nome}</option>
                ))}
              </select>

              <select ref={statusRef} defaultValue="">
                <option value="">Todos Status</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Manutenção">Em manutenção</option>
              </select>

              <button onClick={aplicarFiltros} className="atalho-btn">Aplicar</button>
              <button onClick={limparFiltros} className="atalho-btn">Limpar</button>
            </div>
          </div>

          {/* Tabela */}
          <div className="card">
            <table className="tabela">
              <thead>
                <tr>
                  <th>Patrimônio</th>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Local Atual</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {bensPagina.map((bem) => (
                  <tr key={bem.id}>
                    <td>{bem.id}</td>
                    <td>{bem.nome}</td>
                    <td>{getCategoriaNome(bem.categoria_id)}</td>
                    <td>{getLocalidadeNome(bem.localidade_id)}</td>
                    <td><span className={`status ${bem.status.toLowerCase()}`}>{bem.status}</span></td>
                    <td className="acoes">
                      <NavLink to={`/bens/show/${bem.id}`} data-tooltip="Visualizar bem"><FaEye /></NavLink>
                      {usuario?.is_admin && (
                        <>
                          <NavLink to={`/bens/edit/${bem.id}`} data-tooltip="Editar bem"><FaEdit /></NavLink>
                          <NavLink to={`/bens/delete/${bem.id}`} data-tooltip="Excluir bem"><FaTrash /></NavLink>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>            
          </div>

          <div className="paginacao">
            <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>Anterior</button>
            <span>Página {pagina} de {totalPaginas}</span>
            <button disabled={pagina === totalPaginas} onClick={() => setPagina(pagina + 1)}>Próxima</button>
          </div>

        </div>
      </div>
    </div>
  );
}
