import { FaChevronLeft, FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/img/logo-gestbens.png";
import "./Sidebar.css";

export default function Sidebar({ open, onClose }) {
  const { usuario, logout } = useAuth();

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      {open && (
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Fechar menu"
        >
          <FaChevronLeft />
        </button>
      )}

      <img src={logo} alt="Logo" className="logo" />
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              Início
            </NavLink>
          </li>
          <li>
            <NavLink to="/bens">Gerenciar Bens</NavLink>
          </li>
          <li>
            <NavLink to="/manutencoes">Manutenção</NavLink>
          </li>
          <li>
            <NavLink to="/movimentacoes">Movimentação</NavLink>
          </li>

          {usuario?.is_admin && (
            <>
              <li>
                <NavLink to="/locais">Locais</NavLink>
              </li>
              <li>
                <NavLink to="/categorias">Categorias</NavLink>
              </li>
              <li>
                <NavLink to="/usuarios">Usuários</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          {usuario?.foto ? (
            <img
              src={usuario.foto}
              alt={usuario.nome}
              className="user-avatar"
            />
          ) : (
            <FaUserCircle className="user-avatar" />
          )}
          <span className="user-name">{usuario?.nome || "Usuário"}</span>
        </div>
        <button className="logout-btn" onClick={logout}>
          <FiLogOut />
        </button>
      </div>
    </aside>
  );
}
