import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioLocalidade from "../../components/FormularioLocalidade";
import { localidades } from "../../mocks/data";
// Futuramente: import { localidadeService } from "../../services/localidadeService";

export default function Create() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const id = Math.max(0, ...localidades.map((localidade) => Number(localidade.id))) + 1;
      localidades.push({ id, ...formData });
      // Futuramente: await localidadeService.create(formData);
      navigate("/locais");
    } catch (error) {
      console.error("Erro ao salvar localidade:", error);
      alert("Não foi possível salvar a localidade.");
    }
  };

  return (
    <div className="inicio-page">
      <h1>Cadastrar Nova Localidade</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)}><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/locais")}>Cancelar</button>
          </div>
        </div>
        <div className="card">
          <FormularioLocalidade onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
