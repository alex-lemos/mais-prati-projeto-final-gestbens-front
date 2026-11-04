import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";

import { bemService } from "../../services/bemService";
import { categoriaService } from "../../services/categoriaService";
import { localidadeService } from "../../services/localidadeService";

const statusInfo = {
  ATIVO: { label: "Ativo", classe: "ativo" },
  INATIVO: { label: "Inativo", classe: "inativo" },
  EM_MANUTENCAO: { label: "manutenção", classe: "em-manutencao" },
};

export default function BensIndex() {
  const navigate = useNavigate();

  const [bens, setBens] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [resultadoBuscaPatrimonio, setResultadoBuscaPatrimonio] = useState({
    patrimonio: "",
    bem: null,
    buscando: false,
    erro: "",
  });
  
  const [filtros, setFiltros] = useState({
    patrimonio: "",
    localidade: "", 
    categoria: "",  
    status: "",
  });
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

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

        setBens(Array.isArray(dadosBens) ? [...dadosBens].sort((a, b) => Number(b.id) - Number(a.id)) : []);
        
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

  useEffect(() => {
    if (!filtros.patrimonio) return undefined;

    let ativo = true;

    const timeout = setTimeout(async () => {
      setResultadoBuscaPatrimonio({
        patrimonio: filtros.patrimonio,
        bem: null,
        buscando: true,
        erro: "",
      });

      try {
        const resultado = await bemService.getById(filtros.patrimonio);
        if (ativo) {
          setResultadoBuscaPatrimonio({
            patrimonio: filtros.patrimonio,
            bem: resultado,
            buscando: false,
            erro: "",
          });
        }
      } catch (error) {
        if (!ativo) return;

        const naoEncontrado = error.response?.status === 404;
        if (!naoEncontrado) {
          console.error("Erro ao buscar patrimônio:", error);
        }
        setResultadoBuscaPatrimonio({
          patrimonio: filtros.patrimonio,
          bem: null,
          buscando: false,
          erro: naoEncontrado ? "" : "Não foi possível buscar o patrimônio.",
        });
      }
    }, 350);

    return () => {
      ativo = false;
      clearTimeout(timeout);
    };
  }, [filtros.patrimonio]);

  // Filtros 
  const bemEncontrado = resultadoBuscaPatrimonio.patrimonio === filtros.patrimonio &&
    String(resultadoBuscaPatrimonio.bem?.id) === filtros.patrimonio
    ? resultadoBuscaPatrimonio.bem
    : null;
  const buscandoPatrimonio = resultadoBuscaPatrimonio.patrimonio === filtros.patrimonio &&
    resultadoBuscaPatrimonio.buscando;
  const erroBuscaPatrimonio = resultadoBuscaPatrimonio.patrimonio === filtros.patrimonio
    ? resultadoBuscaPatrimonio.erro
    : "";
  const bensFiltrados = (filtros.patrimonio ? (bemEncontrado ? [bemEncontrado] : []) : bens).filter((bem) => {
    return (
      (filtros.localidade === "" || bem.nomeLocalidade === filtros.localidade) && 
      (filtros.categoria === "" || bem.nomeCategoria === filtros.categoria) &&   
      (filtros.status === "" || bem.status?.toUpperCase() === filtros.status)
    );
  });

  // Paginação local
  const totalPaginas = Math.max(1, Math.ceil(bensFiltrados.length / itensPorPagina));
  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const bensPagina = bensFiltrados.slice(inicio, fim);

  const limparFiltros = () => {
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
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Patrimônio"
                value={filtros.patrimonio}
                onChange={(event) => {
                  setFiltros((prev) => ({ ...prev, patrimonio: event.target.value.replace(/\D/g, "") }));
                  setPagina(1);
                }}
              />

              <select
                value={filtros.localidade}
                onChange={(event) => {
                  setFiltros((prev) => ({ ...prev, localidade: event.target.value }));
                  setPagina(1);
                }}
              >
                <option value="">Todas Localidades</option>
                {localidades.map((loc) => (
                  <option key={loc.id} value={loc.nome}>
                    {loc.nome}
                  </option>
                ))}
              </select>

              <select
                value={filtros.categoria}
                onChange={(event) => {
                  setFiltros((prev) => ({ ...prev, categoria: event.target.value }));
                  setPagina(1);
                }}
              >
                <option value="">Todas Categorias</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nome}>
                    {cat.nome}
                  </option>
                ))}
              </select>

              <select
                value={filtros.status}
                onChange={(event) => {
                  setFiltros((prev) => ({ ...prev, status: event.target.value }));
                  setPagina(1);
                }}
              >
                <option value="">Todos Status</option>
                <option value="ATIVO">Ativo</option>
                <option value="INATIVO">Inativo</option>
                <option value="EM_MANUTENCAO">Em manutenção</option>
              </select>

              <button onClick={limparFiltros} className="atalho-btn">Limpar</button>
            </div>
          </div>

          {carregando && <p>Carregando bens do servidor...</p>}
          {erro && <p className="form-error">⚠️ {erro}</p>}
          {buscandoPatrimonio && <p>Buscando patrimônio...</p>}
          {erroBuscaPatrimonio && <p className="form-error">⚠️ {erroBuscaPatrimonio}</p>}
          
          {/* Tabela */}
          <div className="card">
            <table className="tabela">
              <thead>
                <tr>
                  <th>Bem</th>
                  <th>Local Atual</th>
                  <th>Categoria</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bensPagina.length === 0 && !carregando && !buscandoPatrimonio ? (
                  <tr>
                    <td colSpan={3}>Nenhum bem encontrado.</td>
                  </tr>
                ) : (
                  bensPagina.map((bem) => (
                    <tr
                      key={bem.id}
                      className="bem-link"
                      role="link"
                      tabIndex={0}
                      aria-label={`Ver detalhes de ${bem.nome}`}
                      onClick={() => navigate(`/bens/show/${bem.id}`)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          navigate(`/bens/show/${bem.id}`);
                        }
                      }}
                    >
                      <td>{bem.nome}</td>
                      <td>{bem.nomeLocalidade || "Não informado"}</td>
                      <td>{bem.nomeCategoria || "Não informado"}</td>
                      <td>
                        <span className={`status status-bem ${statusInfo[bem.status?.toUpperCase()]?.classe || ""}`}>
                          {statusInfo[bem.status?.toUpperCase()]?.label || bem.status || "N/A"}
                        </span>
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