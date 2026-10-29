import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

import { bemService } from "../../services/bemService";
import { movimentacaoService } from "../../services/movimentacaoService";
import { manutencaoService } from "../../services/manutencaoService";

export default function BensShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [bem, setBem] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("movimentacoes");

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Carga Dados
  useEffect(() => {
    async function carregarDadosDoBem() {
      try {
        setCarregando(true);
        setErro("");

        const [dadosBem, dadosMovimentacoes, dadosManutencoes] =
          await Promise.all([
            bemService.getById(id),
            movimentacaoService.getAll(),
            manutencaoService.getAll(),
          ]);

        // Filtra o histórico de movimentações
        const movsFiltradas = Array.isArray(dadosMovimentacoes)
          ? dadosMovimentacoes.filter((m) => m.bem === dadosBem.nome) : [];

        // Filtra o histórico de manutenções
        const mansFiltradas = Array.isArray(dadosManutencoes)
          ? dadosManutencoes.filter((man) => man.bem === dadosBem.nome) : [];

        setBem({
          ...dadosBem, 
          movimentacoes: movsFiltradas,
          manutencoes: mansFiltradas,
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
    if (!dataString) return "N/A";
    try {
      const data = new Date(dataString);
      return (
        data.toLocaleDateString("pt-BR") + " " + data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      );
    } catch {
      return dataString;
    }
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
      <h1>Detalhes do Bem #{bem.id}</h1>

      <div className="conteudo-wrapper">
        {/* Atalhos */}
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft />Voltar</button>
            {usuario?.papel === "ADMIN" && (
              <>
                <NavLink to={`/bens/edit/${bem.id}`} className="atalho-btn"><FaEdit />Editar Bem</NavLink>
                <NavLink to={`/bens/delete/${bem.id}`} className="atalho-btn"><FaTrash /> Excluir Bem</NavLink>
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
                <strong>Valor de Compra:</strong>
                <p>R${" "} {bem.valorCompra ? Number(bem.valorCompra).toFixed(2) : "0,00"}</p>
              </div>
              <div className="campo">
                <strong>Status:</strong>
                <p>
                  <span className={`status ${bem.status ? bem.status.toLowerCase() : ""}`}>
                    {bem.status || "N/A"}
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
              <button className={abaAtiva === "movimentacoes" ? "aba ativa" : "aba"} onClick={() => setAbaAtiva("movimentacoes")}>
                Movimentações
              </button>
              <button className={abaAtiva === "manutencoes" ? "aba ativa" : "aba"} onClick={() => setAbaAtiva("manutencoes")}>
                Manutenções
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
                          <th>Observação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bem.movimentacoes.map((mov) => (
                          <tr key={mov.id}>
                            <td>{formatarData(mov.dataMovimentacao)}</td>
                            <td>{mov.localidadeOrigem || "N/A"}</td>
                            <td>{mov.localidadeDestino}</td>
                            <td>{mov.usuario}</td>
                            <td>{mov.observacao || "Sem observações"}</td>
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
                          <th>Data Entrada</th>
                          <th>Data Retorno</th>
                          <th>Descrição</th>
                          <th>Custo</th>
                          <th>Responsável</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bem.manutencoes.map((man) => (
                          <tr key={man.id}>
                            <td>{formatarData(man.dataEntrada)}</td>
                            <td>{formatarData(man.dataRetorno)}</td>
                            <td>{man.descricao}</td>
                            <td>R${" "} {man.custo ? Number(man.custo).toFixed(2) : "0,00"}</td>
                            <td>{man.usuario}</td>
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
