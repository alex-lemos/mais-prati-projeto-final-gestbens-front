import { bens, movimentacoes, manutencoes } from "../../mocks/data";
import { NavLink } from "react-router-dom";
import {
  FaTools,
  FaBoxOpen,
  FaExchangeAlt,
  FaWrench,
  FaBolt,
} from "react-icons/fa";
import "./Inicio.css";

export default function Inicio() {
  const bensEmManutencao = manutencoes.length;
  const totalBens = bens.length;
  const totalMovimentacoes = movimentacoes.length;
  const totalManutencoes = manutencoes.length;

  return (
    <div className="inicio-page">
      <h1>Início</h1>

      {/* Destaque */}
      <div className="card">
        <div className="card-icon">
          <FaTools />
        </div>
        <div>
          <h2>Bens em Manutenção</h2>
          <span className="valor">{bensEmManutencao} itens em manutenção</span>
        </div>
      </div>

      {/* Cards de métricas */}
      <div className="cards">
        <div className="card">
          <div className="card-icon azul">
            <FaBoxOpen />
          </div>
          <h3>Total de Bens</h3>
          <span className="valor">{totalBens}</span>
        </div>
        <div className="card">
          <div className="card-icon azul">
            <FaExchangeAlt />
          </div>
          <h3>Movimentações</h3>
          <span className="valor">{totalMovimentacoes}</span>
        </div>
        <div className="card">
          <div className="card-icon azul">
            <FaWrench />
          </div>
          <h3>Manutenções</h3>
          <span className="valor">{totalManutencoes}</span>
        </div>
      </div>

      {/* Atalhos */}
      <div className="atalhos card">
        <h2>
          <FaBolt /> Atalhos:
        </h2>
        <div className="atalhos-buttons">
          <NavLink to="/bens/create" className="atalho-btn verde">
            <FaBoxOpen /> Cadastrar Novo Bem
          </NavLink>
          <NavLink to="/manutencoes/create" className="atalho-btn verde">
            <FaWrench /> Registrar Manutenção
          </NavLink>
          <NavLink to="/movimentacoes/create" className="atalho-btn verde">
            <FaExchangeAlt /> Nova Movimentação
          </NavLink>
        </div>
      </div>
    </div>
  );
}
