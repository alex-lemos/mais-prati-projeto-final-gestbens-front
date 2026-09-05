// menu lateral fixo

import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Menu Principal">
      <div className="sidebar-menu">
        <Link to="/">Dashboard</Link>
        <Link to="/">Gerenciar xxxxx</Link>
        <Link to="/">Gerenciar xxxxx</Link>
        <Link to="/">Gerenciar xxxxx</Link>
      </div>

      <div className="user-info">
        <img src="https://i.pinimg.com/originals/a8/da/22/a8da222be70a71e7858bf752065d5cc3.jpg" alt="Foto do usuário" />
        <p className="user-name">Usuário:
          <span> João Silva</span>
        </p>
        <p className="user-role">Função: 
          <span>Administrador</span>
        </p>
      </div>
    </aside>
  )
}
