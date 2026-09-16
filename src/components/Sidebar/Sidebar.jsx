import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // importa o contexto
import "./Sidebar.css";
import logo from "../../assets/img/logo-simples-gestbens.png"; // importa o logo
import { FiLogOut } from "react-icons/fi";

export default function Sidebar() {
  const { usuario, logout } = useAuth();

  return (
    <aside className="sidebar">
      <img src={logo} alt="Logo" className="logo" />
      <nav>
        <ul>
          <li><NavLink to="/" end>Início</NavLink></li>
          <li><NavLink to="/bens">Gerenciar Bens</NavLink></li>
          <li><NavLink to="/manutencoes">Manutenção</NavLink></li>
          <li><NavLink to="/movimentacoes">Movimentação</NavLink></li>

          {usuario?.is_admin && (
            <>
              <li><NavLink to="/locais">Locais</NavLink></li>
              <li><NavLink to="/categorias">Categorias</NavLink></li>
              <li><NavLink to="/usuarios">Usuários</NavLink></li>
            </>
          )}
        </ul>
      </nav>

      {/* Rodapé com usuário e botão sair */}
      <div className="sidebar-footer">
        <span className="user-name">{usuario?.nome || "Usuário"}</span>
        <button className="logout-btn" onClick={logout}>
          <FiLogOut />
        </button>
      </div>
    </aside>
  );
}
