import { bens, movimentacoes, manutencoes } from "../../mocks/data";
import { NavLink } from "react-router-dom";
import {
  FaTools, // ícone de ferramentas
  FaBoxOpen, // ícone de caixa aberta
  FaExchangeAlt, // ícone de setas duplas
  FaWrench, // ícone de chave inglesa
  FaBolt, // ícone de raio (usado para atalhos)
} from "react-icons/fa";

export default function Inicio() {
  const bensEmManutencao = manutencoes.length;
  const totalBens = bens.length;
  const totalMovimentacoes = movimentacoes.length;
  const totalManutencoes = manutencoes.length;

  return (
    <div className="inicio-page">
      <h1>Início</h1>

      {/* container principal */}
      <div className="conteudo-wrapper">

        {/* Atalhos */}
        <div className="card atalhos">
          <h2><FaBolt /> Atalhos:</h2>
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
        
        {/* Conteúdo principal */}
        <div className="conteudo">
          
          {/* Destaque */}
          <div className="card">
            <div className="icon">
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
              <div className="icon azul">
                <FaBoxOpen />
              </div>
              <h3>Total de Bens</h3>
              <span className="valor">{totalBens}</span>
            </div>
            <div className="card">
              <div className="icon azul">
                <FaExchangeAlt />
              </div>
              <h3>Movimentações</h3>
              <span className="valor">{totalMovimentacoes}</span>
            </div>
            <div className="card">
              <div className="icon azul">
                <FaWrench />
              </div>
              <h3>Manutenções</h3>
              <span className="valor">{totalManutencoes}</span>
            </div>
          </div>
          
        </div>        

      </div>
    
    </div>
  );
}
