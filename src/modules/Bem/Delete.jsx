import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { bemService } from "../../services/bemService"; // 1. Ativamos a importação do service

export default function BensDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bem, setBem] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Carrega o Bem pelo ID
  useEffect(() => {
    async function buscarBem() {
      try {
        setCarregando(true);
        setErro("");
        const dadosBem = await bemService.getById(id);
        setBem(dadosBem);
      } catch (error) {
        console.error("Erro ao buscar detalhes do bem:", error);
        setErro("Não foi possível encontrar as informações deste bem.");
      } finally {
        setCarregando(false);
      }
    }    
    if (id) buscarBem();
  }, [id]);

  // Deleta o Bem
  const handleDelete = async () => {
    try {
      await bemService.remove(id);
      navigate("/bens");
    } catch (error) {
      console.error("Erro ao excluir bem:", error);
      const msgErro = error.response?.data?.message || "Não foi possível excluir o bem. Tente novamente.";
      alert(`❌ Erro: ${msgErro}`);
    }
  };

  if (carregando) return <div className="inicio-page"><h1>Carregando informações do bem...</h1></div>;
  if (erro || !bem) return <div className="inicio-page"><h1 className="form-error">⚠️ {erro || "Bem não encontrado"}</h1></div>;

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
          {/* Informações do Bem*/}
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
                <p>R$ {bem.valorCompra ? Number(bem.valorCompra).toFixed(2) : "0,00"}</p>
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
          </div>

          {/* Alerta de exclusão */}
          <div className="card alerta-exclusao">
            <h2>Tem certeza que deseja excluir este bem? Essa ação não poderá ser desfeita.</h2>
            <button onClick={handleDelete} className="btn-excluir"><FaTrash />Confirmar Exclusão</button>
          </div>
        </div>

      </div>
    </div>
  );
}