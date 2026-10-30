import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTools,
  FaBoxOpen,
  FaExchangeAlt,
  FaWrench,
} from "react-icons/fa";

import { bemService } from "../../services/bemService";
import { manutencaoService } from "../../services/manutencaoService";
import { movimentacaoService } from "../../services/movimentacaoService";

export default function Inicio() {
  const [totalBens, setTotalBens] = useState(0);
  const [totalMovimentacoes, setTotalMovimentacoes] = useState(0);
  const [totalManutencoes, setTotalManutencoes] = useState(0);
  const [bensEmManutencao, setBensEmManutencao] = useState(0);
  
  // Estados auxiliares de controle da tela
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Carrega dados
  useEffect(() => {
    async function carregarDadosDashboard() {
      try {
        setCarregando(true);
        setErro("");

        const [dadosBens, dadosMovimentacoes, dadosManutencoes] = await Promise.all([
          bemService.getAll(),
          movimentacaoService.getAll(),
          manutencaoService.getAll(),
        ]);

        setTotalBens(Array.isArray(dadosBens) ? dadosBens.length : 0);
        setTotalMovimentacoes(Array.isArray(dadosMovimentacoes) ? dadosMovimentacoes.length : 0);
        setTotalManutencoes(Array.isArray(dadosManutencoes) ? dadosManutencoes.length : 0);

        // FILTRA bens em manutenção!
        const emManutencaoAtiva = Array.isArray(dadosManutencoes) 
          ? dadosManutencoes.filter(m => m.dataEntrada && !m.dataRetorno).length 
          : 0;
          
        setBensEmManutencao(emManutencaoAtiva);

      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
        setErro("Não foi possível carregar as métricas do sistema.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDadosDashboard();
  }, []);

  // Feedback visual para o usuário
  if (carregando) return <div className="inicio-page"><h1>Carregando painel...</h1></div>;
  if (erro) return <div className="inicio-page"><h1>{erro}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Início</h1>

      {/* container principal */}
      <div className="conteudo-wrapper">

        {/* Atalhos */}
        <div className="card atalhos">
          <h2> Atalhos:</h2>
          <div className="atalhos-buttons">
            <NavLink to="/bens/create" className="atalho-btn"><FaBoxOpen />Cadastrar Novo Bem</NavLink>
            <NavLink to="/manutencoes/create" className="atalho-btn"><FaWrench />Registrar Manutenção</NavLink>
            <NavLink to="/movimentacoes/create" className="atalho-btn"><FaExchangeAlt />Nova Movimentação</NavLink>
          </div>
        </div>
        
        {/* Conteúdo principal */}
        <div className="conteudo">
          
          {/* Destaque */}
          <div className="card">
            <div className="icon"><FaTools /></div>
            <div>
              <h2>Bens em Manutenção</h2>
              <span className="valor">{bensEmManutencao} itens em manutenção</span>
            </div>
          </div>

          {/* Cards de métricas */}
          <div className="cards">
            <div className="card">
              <div className="icon azul"><FaBoxOpen /></div>
              <h3>Total de Bens</h3>
              <span className="valor">{totalBens}</span>
            </div>
            <div className="card">
              <div className="icon azul"><FaExchangeAlt /></div>
              <h3>Movimentações</h3>
              <span className="valor">{totalMovimentacoes}</span>
            </div>
            <div className="card">
              <div className="icon azul"><FaWrench /></div>
              <h3>Manutenções</h3>
              <span className="valor">{totalManutencoes}</span>
            </div>
          </div>
          
        </div>        

      </div>
    
    </div>
  );
}
