import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usuarioService } from "../../services/usuarioService";
import { FaUserPlus, FaEdit, FaBan } from "react-icons/fa";

export default function Index() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        setCarregando(true);
        setErro("");
        const dados = await usuarioService.getAll();
        setUsuarios(Array.isArray(dados) ? [...dados].sort((a, b) => Number(a.id) - Number(b.id)) : []);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        setErro("Não foi possível carregar os usuários.");
      } finally {
        setCarregando(false);
      }
    }
    carregarUsuarios();
  }, []);

  const usuariosFiltrados = usuarios
    .filter((usuario) =>
      `${usuario.nome} ${usuario.email}`.toLowerCase().includes(filtro.toLowerCase())
    )
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" }));
  const totalPaginas = Math.max(1, Math.ceil(usuariosFiltrados.length / itensPorPagina));
  const usuariosPagina = usuariosFiltrados.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);

  console.log(usuarios)

  return (
    <div className="inicio-page">
      <h1>Gerenciar Usuários</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Atalhos:</h2>
          <div className="atalhos-buttons">
            <NavLink to="/usuarios/create" className="atalho-btn verde"><FaUserPlus /> Cadastrar Novo Usuário</NavLink>
          </div>
        </div>
        <div className="conteudo">
          <div className="card filtros">
            <h2>Filtros:</h2>
            <div className="filtros-form">
              <input aria-label="Filtrar por nome ou e-mail" value={filtro} onChange={(event) => { setFiltro(event.target.value); setPagina(1); }} placeholder="Nome ou e-mail" />
              <button className="atalho-btn" onClick={() => { setFiltro(""); setPagina(1); }}>Limpar</button>
            </div>
          </div>
          {carregando && <p>Carregando usuários...</p>}
          {erro && <p className="form-error">⚠️ {erro}</p>}
          <div className="card" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <table className="tabela">
                <thead><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Ações</th></tr></thead>
                <tbody>
                  {usuariosPagina.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.nome}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.admin ? "Administrador" : "Usuário"}</td>
                      <td className="acoes">
                        <NavLink to={`/usuarios/edit/${usuario.id}`} data-tooltip="Editar usuário"><FaEdit /></NavLink>
                        <NavLink className="excluir" to={`/usuarios/status/${usuario.id}`} data-tooltip="Gerenciar status e perfil do usuário"><FaBan /></NavLink>
                      </td>
                    </tr>
                  ))}
                  {!usuariosPagina.length && !carregando && <tr><td colSpan="5">Nenhum usuário encontrado.</td></tr>}
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
