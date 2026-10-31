import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioMovimentacao from "../../components/FormularioMovimentacao";
import { movimentacaoService } from "../../services/movimentacaoService";
import { bemService } from "../../services/bemService";
import { localidadeService } from "../../services/localidadeService";

export default function Create() {
  const navigate = useNavigate();
  const [bens, setBens] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarOpcoes() {
      try {
        setCarregando(true);
        setErro("");
        const [dadosBens, dadosLocalidades] = await Promise.all([
          bemService.getAll(),
          localidadeService.getAll(),
        ]);
        setBens(Array.isArray(dadosBens) ? dadosBens : []);
        setLocalidades(Array.isArray(dadosLocalidades) ? dadosLocalidades : []);
      } catch (error) {
        console.error("Erro ao carregar opções da movimentação:", error);
        setErro("Não foi possível carregar os bens e localidades.");
      } finally {
        setCarregando(false);
      }
    }
    carregarOpcoes();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      await movimentacaoService.create(formData);
      navigate("/movimentacoes");
    } catch (error) {
      console.error("Erro ao salvar movimentação:", error);
      alert(error.response?.data?.mensagem || error.response?.data?.message || "Não foi possível salvar a movimentação.");
    }
  };

  if (carregando) return <div className="inicio-page"><h1>Carregando formulário...</h1></div>;
  if (erro) return <div className="inicio-page"><h1 className="form-error">⚠️ {erro}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Registrar Movimentação</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)}><FaArrowLeft />Voltar</button>
            <button onClick={() => navigate("/movimentacoes")}>Cancelar</button>
          </div>
        </div>
        <div className="card">
          <FormularioMovimentacao bens={bens} localidades={localidades} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
