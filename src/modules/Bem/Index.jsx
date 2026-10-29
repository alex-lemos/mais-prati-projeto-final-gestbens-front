import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { FaBoxOpen, FaEye, FaEdit, FaTrash } from "react-icons/fa";

import { bemService } from "../../services/bemService";
import { categoriaService } from "../../services/categoriaService";
import { localidadeService } from "../../services/localidadeService";

export default function BensIndex() {
  const { usuario } = useAuth();

  const [bens, setBens] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  
  const [filtros, setFiltros] = useState({
    patrimonio: "",
    localidade: "", 
    categoria: "",  
    status: "",
  });
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

  // Refs para capturar os valores dos inputs de filtros
  const patrimonioRef = useRef();
  const localidadeRef = useRef();
  const categoriaRef = useRef();
  const statusRef = useRef();

  // Carregar os dados
  useEffect(() => {
    const carregarDadosDoBanco = async () => {
      try {
        setCarregando(true);
        setErro("");

        const [dadosBens, dadosCategorias, dadosLocalidades] = await Promise.all([
          bemService.getAll(),
          categoriaService.getAll(),
          localidadeService.getAll(),
        ]);

        setBens(Array.isArray(dadosBens) ? [...dadosBens].sort((a, b) => Number(a.id) - Number(b.id)) : []);
        
        setCategorias(
          Array.isArray(dadosCategorias) 
            ? [...dadosCategorias].sort((a, b) => a.nome.localeCompare(b.nome)) 
            : []
        );
        
        setLocalidades(
          Array.isArray(dadosLocalidades) 
            ? [...dadosLocalidades].sort((a, b) => a.nome.localeCompare(b.nome)) 
            : []
        );

      } catch (error) {
        console.error("Erro ao carregar dados do gerenciador:", error);
        setErro("Não foi possível carregar a lista de bens ou filtros.");
      } finally {
        setCarregando(false);
      }
    };

    carregarDadosDoBanco();
  }, []);

  // Filtros 
  const bensFiltrados = bens.filter((bem) => {
    return (
      (filtros.patrimonio === "" || bem.id.toString().includes(filtros.patrimonio)) &&
      (filtros.localidade === "" || bem.nomeLocalidade === filtros.localidade) && 
      (filtros.categoria === "" || bem.nomeCategoria === filtros.categoria) &&   
      (filtros.status === "" || bem.status.toLowerCase() === filtros.status.toLowerCase())
    );
  });

  // Paginação local
  const totalPaginas = Math.max(1, Math.ceil(bensFiltrados.length / itensPorPagina));
  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const bensPagina = bensFiltrados.slice(inicio, fim);

  // Ações de gerenciamento dos filtros
  const aplicarFiltros = () => {
    setFiltros({
      patrimonio: patrimonioRef.current.value,
      localidade: localidadeRef.current.value,
      categoria: categoriaRef.current.value,
      status: statusRef.current.value,
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

  return (
    <div className="inicio-page">
      <h1>Gerenciar Bens</h1>

      <div className="conteudo-wrapper">
        {/* Atalhos */}
        <div className="card atalhos">
          <h2> Atalhos:</h2>
          <div className="atalhos-buttons">
            <NavLink to="/bens/create" className="atalho-btn verde">
              <FaBoxOpen /> Cadastrar Novo Bem
            </NavLink>
          </div>
        </div>

        <div className="conteudo">
          {/* Filtros */}
          <div className="card filtros">
            <h2>Filtros:</h2>
            <div className="filtros-form">
              <input ref={patrimonioRef} type="text" placeholder="Patrimônio" />

              <select ref={localidadeRef} defaultValue="">
                <option value="">Todas Localidades</option>
                {localidades.map((loc) => (
                  <option key={loc.id} value={loc.nome}>
                    {loc.nome}
                  </option>
                ))}
              </select>

              <select ref={categoriaRef} defaultValue="">
                <option value="">Todas Categorias</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nome}>
                    {cat.nome}
                  </option>
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

          {carregando && <p>Carregando bens do servidor...</p>}
          {erro && <p className="form-error">⚠️ {erro}</p>}
          
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
                {bensPagina.length === 0 && !carregando ? (
                  <tr>
                    <td colSpan="6">Nenhum bem encontrado.</td>
                  </tr>
                ) : (
                  bensPagina.map((bem) => (
                    <tr key={bem.id}>
                      <td>{bem.id}</td>
                      <td>{bem.nome}</td>
                      <td>{bem.nomeCategoria || "Não informada"}</td>
                      <td>{bem.nomeLocalidade || "Não informado"}</td>
                      <td>
                        <span className={`status ${bem.status ? bem.status.toLowerCase() : ""}`}>
                          {bem.status || "N/A"}
                        </span>
                      </td>
                      <td className="acoes">
                        <NavLink to={`/bens/show/${bem.id}`} data-tooltip="Visualizar bem"><FaEye /></NavLink>
                        {usuario?.papel === "ADMIN" && (
                          <>
                            <NavLink to={`/bens/edit/${bem.id}`} data-tooltip="Editar bem"><FaEdit /></NavLink>
                            <NavLink to={`/bens/delete/${bem.id}`} data-tooltip="Excluir bem"><FaTrash /></NavLink>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className="paginacao">
            <button disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>Anterior</button>
            <span>Página {pagina} de {totalPaginas}</span>
            <button disabled={pagina === totalPaginas}onClick={() => setPagina(pagina + 1)}>Próxima</button>
          </div>
        </div>
      </div>
    </div>
  );
}