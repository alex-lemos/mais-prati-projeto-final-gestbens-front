import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // importa o contexto
import "./Sidebar.css";

export default function Sidebar() {
  const { usuario, logout } = useAuth();

  return (
    <aside className="sidebar">
      <h2>GestBens</h2>
      <nav>
        <ul>
          <li><NavLink to="/" end>Início</NavLink></li>
          <li><NavLink to="/bens">Gerenciar Bens</NavLink></li>
          <li><NavLink to="/manutencoes">Manutenção</NavLink></li>
          <li><NavLink to="/movimentacoes">Movimentação</NavLink></li>
          <li><NavLink to="/locais">Locais</NavLink></li>
          <li><NavLink to="/categorias">Categorias</NavLink></li>
          <li><NavLink to="/usuarios">Usuários</NavLink></li>
        </ul>
      </nav>

      {/* Rodapé com usuário e botão sair */}
      <div className="sidebar-footer">
        <span className="user-name">{usuario?.nome || "Usuário"}</span>
        <button className="logout-btn" onClick={logout}>⎋</button>
      </div>
    </aside>
  );
}
