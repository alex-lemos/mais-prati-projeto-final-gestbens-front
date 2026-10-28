import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioManutencao from "../../components/FormularioManutencao";
import { bens, usuarios, manutencoes } from "../../mocks/data";
// Futuramente: import { manutencaoService } from "../../services/manutencaoService";

export default function Create() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const id = Math.max(0, ...manutencoes.map((item) => Number(item.id))) + 1;
      manutencoes.push({ id, ...formData });
      // Futuramente: await manutencaoService.create(formData);
      navigate("/manutencoes");
    } catch (error) {
      console.error("Erro ao salvar manutenção:", error);
      alert("Não foi possível salvar a manutenção.");
    }
  };

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
