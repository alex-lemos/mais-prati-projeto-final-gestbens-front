// src/modules/Bem/Delete.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { bens as mockBens, categorias, localidades } from "../../mocks/data";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
// import { bemService } from "../../services/bemService";

export default function BensDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bem, setBem] = useState(null);

  useEffect(() => {
    const carregar = () => {
      const bemEncontrado = mockBens.find((b) => b.id.toString() === id);
      if (bemEncontrado) {
        const categoria = categorias.find((c) => c.id === bemEncontrado.categoria_id);
        const localidade = localidades.find((l) => l.id === bemEncontrado.localidade_id);

        setBem({
          ...bemEncontrado,
          categoria,
          localidade,
        });
      }
    };
    carregar();
  }, [id]);

  const handleDelete = async () => {
    try {
      // Futuramente: await bemService.remove(id);
      console.log("Bem excluído (mock):", bem);

      navigate("/bens");
    } catch (error) {
      console.error("Erro ao excluir bem:", error);
      alert("Não foi possível excluir o bem.");
    }
  };

  if (!bem) return <div className="inicio-page"><h1>Bem não encontrado</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Excluir Bem #{bem.id}</h1>

      <div className="conteudo-wrapper">

        {/* Atalhos */}
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn">
              <FaArrowLeft /> Voltar
            </button>
            <button onClick={() => navigate("/")} className="atalho-btn vermelho">
              Cancelar
            </button>
          </div>
        </div>

        <div className="conteudo">
          {/* Informações principais */}
          <div className="card informacoes">
            <h2 className="titulo">{bem.nome}</h2>
            <div className="informacoes-detalhes">
              <div className="campo">
                <strong>Patrimônio:</strong>
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

          {/* Alerta de exclusão em vez das abas */}
          <div className="card alerta-exclusao">
            <h2>Tem certeza que deseja excluir este bem? Essa ação não poderá ser desfeita.</h2>
            <button onClick={handleDelete} className="btn-excluir">
                <FaTrash /> Confirmar Exclusão
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
