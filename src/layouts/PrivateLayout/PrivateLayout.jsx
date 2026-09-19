import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FaChevronRight } from "react-icons/fa";
import "./PrivateLayout.css";

export default function PrivateLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="private-layout">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Botão lateral só aparece fora quando fechado */}
      {!sidebarOpen && (
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menu"
        >
          <FaChevronRight />
        </button>
      )}

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
