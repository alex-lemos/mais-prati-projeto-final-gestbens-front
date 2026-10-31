import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { FaArrowLeft, FaEdit, FaBan, FaEye } from "react-icons/fa";

import { bemService } from "../../services/bemService";
import { movimentacaoService } from "../../services/movimentacaoService";
import { manutencaoService } from "../../services/manutencaoService";

const statusInfo = {
  ATIVO: { label: "Ativo", classe: "ativo" },
  INATIVO: { label: "Inativo", classe: "inativo" },
  EM_MANUTENCAO: { label: "Em manutenção", classe: "em-manutencao" },
};

export default function BensShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [bem, setBem] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("manutencoes");

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Carrega Dados
  useEffect(() => {
    async function carregarDadosDoBem() {
      try {
        setCarregando(true);
        setErro("");

        const [dadosBem, dadosMovimentacoes, dadosManutencoes] =
          await Promise.all([
            bemService.getById(id),
            movimentacaoService.getByBemId(id),
            manutencaoService.getByBemId(id),
          ]);

        setBem({
          ...dadosBem,
          movimentacoes: Array.isArray(dadosMovimentacoes)
            ? dadosMovimentacoes
            : [],
          manutencoes: Array.isArray(dadosManutencoes)
            ? dadosManutencoes
            : [],
        });
      } catch (error) {
        console.error("Erro ao carregar detalhes do bem:", error);
        setErro("Não foi possível carregar as informações deste patrimônio.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      carregarDadosDoBem();
    }
  }, [id]);

  // Formatação de datas
  const formatarData = (dataString) => {
    if (!dataString) return "—";

    const [ano, mes, dia] = String(dataString).split("T")[0].split("-");
    if (ano && mes && dia) return `${dia}/${mes}/${ano}`;

    const data = new Date(dataString);
    return Number.isNaN(data.getTime())
      ? "Data inválida"
      : data.toLocaleDateString("pt-BR");
  };

  if (carregando)
    return (
      <div className="inicio-page">
        <h1>Carregando detalhes do bem...</h1>
      </div>
    );
  if (erro || !bem)
    return (
      <div className="inicio-page">
        <h1 className="form-error">⚠️ {erro || "Bem não encontrado"}</h1>
      </div>
    );

  return (
    <div className="inicio-page">
      <h1>Detalhes do Bem</h1>

      <div className="conteudo-wrapper">
        {/* Atalhos */}
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            {usuario?.papel === "ADMIN" && (
              <>
                <NavLink to={`/bens/edit/${bem.id}`} className="atalho-btn"><FaEdit /> Editar Bem</NavLink>
                <NavLink to={`/bens/status/${bem.id}`} className="atalho-btn"><FaBan /> Desativar/Reativar Bem</NavLink>
              </>
            )}
          </div>
        </div>

        <div className="conteudo">
          {/* Informações */}
          <div className="card informacoes">
            <h2 className="titulo">{bem.nome}</h2>
            <div className="informacoes-detalhes">
              <div className="campo">
                <strong>Patrimônio:</strong>
                <p>{bem.id}</p>
              </div>
              <div className="campo">
                <strong>Categoria:</strong>
                <p>{bem.nomeCategoria || "Não informada"}</p>
              </div>
              <div className="campo">
                <strong>Localidade Atual:</strong>
                <p>{bem.nomeLocalidade || "Não informada"}</p>
              </div>
              <div className="campo">
                <strong>Data da Compra:</strong>
                <p>{formatarData(bem.dataCompra)}</p>
              </div>
              <div className="campo">
                <strong>Valor de Compra:</strong>
                <p>R${" "} {bem.valorCompra ? Number(bem.valorCompra).toFixed(2) : "0,00"}</p>
              </div>
              <div className="campo">
                <strong>Status:</strong>
                <p>
                  <span className={`status ${statusInfo[bem.status?.toUpperCase()]?.classe || ""}`}>
                    {statusInfo[bem.status?.toUpperCase()]?.label || bem.status || "N/A"}
                  </span>
                </p>
              </div>
            </div>
            {bem.descricao && (
              <div className="campo">
                <strong>Descrição:</strong>
                <p>{bem.descricao}</p>
              </div>
            )}
          </div>

          {/* Alternador de abas */}
          <div className="card abas-container">
            <div className="abas">
              <button className={abaAtiva === "manutencoes" ? "aba ativa" : "aba"} onClick={() => setAbaAtiva("manutencoes")}>
                Manutenções
              </button>
              <button className={abaAtiva === "movimentacoes" ? "aba ativa" : "aba"} onClick={() => setAbaAtiva("movimentacoes")}>
                Movimentações
              </button>
            </div>

            <div className="conteudo-aba">
              {abaAtiva === "movimentacoes" && (
                <div className="movimentacoes">
                  {bem.movimentacoes && bem.movimentacoes.length > 0 ? (
                    <table className="tabela">
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Origem</th>
                          <th>Destino</th>
                          <th>Responsável</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bem.movimentacoes.map((mov) => (
                          <tr key={mov.id}>
                            <td>{formatarData(mov.data_movimentacao ?? mov.dataMovimentacao)}</td>
                            <td>{mov.localidadeOrigem?.nome || mov.localidadeOrigem || "—"}</td>
                            <td>{mov.localidadeDestino?.nome || mov.localidadeDestino || "—"}</td>
                            <td>{mov.usuario?.nome || mov.usuario || "—"}</td>
                            <td className="acoes">
                              <NavLink to={`/movimentacoes/show/${mov.id}`} data-tooltip="Visualizar movimentação"><FaEye /></NavLink>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>Nenhuma movimentação registrada.</p>
                  )}
                </div>
              )}

              {abaAtiva === "manutencoes" && (
                <div className="manutencoes">
                  {bem.manutencoes && bem.manutencoes.length > 0 ? (
                    <table className="tabela">
                      <thead>
                        <tr>
                          <th>Retorno</th>
                          <th>Responsável</th>
                          <th>Custo</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bem.manutencoes.map((man) => (
                          <tr key={man.id}>
                            <td>{formatarData(man.dataRetorno ?? man.data_retorno)}</td>
                            <td>{man.usuario?.nome || man.usuario || "—"}</td>
                            <td>{man.custo == null ? "—" : `R$ ${Number(man.custo).toFixed(2)}`}</td>
                            <td className="acoes">
                              <NavLink to={`/manutencoes/show/${man.id}`} data-tooltip="Visualizar manutenção"><FaEye /></NavLink>
                              <NavLink to={`/manutencoes/edit/${man.id}`} data-tooltip="Editar manutenção"><FaEdit /></NavLink>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>Nenhuma manutenção registrada.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
