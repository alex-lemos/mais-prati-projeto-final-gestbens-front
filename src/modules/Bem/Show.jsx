import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { bens as mockBens, categorias, localidades, movimentacoes, manutencoes, usuarios } from "../../mocks/data";
import { FaBolt, FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";

export default function BensShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [bem, setBem] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("movimentacoes");

  useEffect(() => {
    const carregar = () => {
      const bemEncontrado = mockBens.find((b) => b.id.toString() === id);
      if (bemEncontrado) {
        const categoria = categorias.find((c) => c.id === bemEncontrado.categoria_id);
        const localidade = localidades.find((l) => l.id === bemEncontrado.localidade_id);

        const movs = movimentacoes
          .filter((m) => m.bem_id === bemEncontrado.id)
          .map((m) => ({
            ...m,
            usuario: usuarios.find((u) => u.id === m.usuario_id),
            origem: localidades.find((l) => l.id === m.localidade_origem_id),
            destino: localidades.find((l) => l.id === m.localidade_destino_id),
          }));

        const mans = manutencoes
          .filter((man) => man.bem_id === bemEncontrado.id)
          .map((man) => ({
            ...man,
            usuario: usuarios.find((u) => u.id === man.usuario_id),
          }));

        setBem({
          ...bemEncontrado,
          categoria,
          localidade,
          movimentacoes: movs,
          manutencoes: mans,
        });
      }
    };
    carregar();
  }, [id]);

  if (!bem) return <div className="inicio-page"><h1>Bem não encontrado</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Detalhes do Bem #{bem.id}</h1>

      <div className="conteudo-wrapper">

        {/* Atalhos */}
        <div className="card atalhos">
          <h2><FaBolt /> Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn">
              <FaArrowLeft /> Voltar
            </button>
            {usuario?.is_admin && (
              <>
                <NavLink to={`/bens/edit/${bem.id}`} className="atalho-btn amarelo">
                  <FaEdit /> Editar Bem
                </NavLink>
                <NavLink to={`/bens/delete/${bem.id}`} className="atalho-btn vermelho">
                  <FaTrash /> Excluir Bem
                </NavLink>
              </>
            )}
          </div>
        </div>

        <div className="conteudo">
          {/* Informações principais */}
          <div className="card informacoes">
            <h2>{bem.nome}</h2>
            <div className="informacoes-detalhes">
              <div className="campo">
                <strong>Código / ID:</strong>
                <p>{bem.id}</p>
              </div>
              <div className="campo">
                <strong>Categoria:</strong>
                <p>{bem.categoria?.nome}</p>
              </div>
              <div className="campo">
                <strong>Localidade Atual:</strong>
                <p>{bem.localidade?.nome}</p>
              </div>
              <div className="campo">
                <strong>Data de Compra:</strong>
                <p>{bem.data_compra}</p>
              </div>
              <div className="campo">
                <strong>Valor de Compra:</strong>
                <p>R$ {bem.valor_compra.toFixed(2)}</p>
              </div>
              <div className="campo">
                <strong>Status:</strong>
                <p><span className={`status ${bem.status.toLowerCase()}`}>{bem.status}</span></p>
              </div>
            </div>
            <div className="campo">
              <strong>Descrição:</strong>
              <p>{bem.descricao}</p>
            </div>
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
                            <td>{mov.data_movimentacao}</td>
                            <td>{mov.origem?.nome}</td>
                            <td>{mov.destino?.nome}</td>
                            <td>{mov.usuario?.nome}</td>
                            <td>{mov.observacao}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : <p>Nenhuma movimentação registrada.</p>}
                </div>
              )}

              {abaAtiva === "manutencoes" && (
                <div className="manutencoes">
                  {bem.manutencoes && bem.manutencoes.length > 0 ? (
                    <table className="tabela">
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Descrição</th>
                          <th>Custo</th>
                          <th>Responsável</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bem.manutencoes.map((man) => (
                          <tr key={man.id}>
                            <td>{man.data_manutencao}</td>
                            <td>{man.descricao}</td>
                            <td>R$ {man.custo.toFixed(2)}</td>
                            <td>{man.usuario?.nome}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : <p>Nenhuma manutenção registrada.</p>}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
