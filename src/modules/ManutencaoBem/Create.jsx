import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioManutencao from "../../components/FormularioManutencao";
import { manutencaoService } from "../../services/manutencaoService";
import { bemService } from "../../services/bemService";
import { usuarioService } from "../../services/usuarioService";

export default function Create() {
  const navigate = useNavigate();
  const [bens, setBens] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarOpcoes() {
      try {
        setCarregando(true);
        setErro("");
        const [dadosBens, dadosUsuarios] = await Promise.all([bemService.getAll(), usuarioService.getAll()]);
        setBens(Array.isArray(dadosBens) ? dadosBens : []);
        setUsuarios(Array.isArray(dadosUsuarios) ? dadosUsuarios : []);
      } catch (error) {
        console.error("Erro ao carregar opções da manutenção:", error);
        setErro("Não foi possível carregar os bens e responsáveis.");
      } finally {
        setCarregando(false);
      }
    }

    carregarOpcoes();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      await manutencaoService.create(formData);
      navigate("/manutencoes");
    } catch (error) {
      console.error("Erro ao salvar manutenção:", error);
      alert(error.response?.data?.message || "Não foi possível salvar a manutenção.");
    }
  };

  if (carregando) return <div className="inicio-page"><h1>Carregando formulário...</h1></div>;
  if (erro) return <div className="inicio-page"><h1 className="form-error">⚠️ {erro}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Registrar Manutenção</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)}><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/manutencoes")}>Cancelar</button>
          </div>
        </div>
        <div className="card">
          <FormularioManutencao bens={bens} usuarios={usuarios} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
