import { useNavigate } from "react-router-dom";
import { categorias, localidades } from "../../mocks/data";
import FormularioBem from "../../components/FormularioBem";
import { FaArrowLeft } from "react-icons/fa";
import { bemService } from "../../services/bemService";

export default function Create() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      // chamada real ao back
      await bemService.create(formData);

      // redireciona para lista de bens
      navigate("/bens");
    } catch (error) {
      console.error("Erro ao salvar bem:", error);
      alert("Não foi possível salvar o bem. Tente novamente.");
    }
  };

  return (
    <div className="inicio-page">
      <h1>Cadastrar Novo Bem</h1>

      <div className="conteudo-wrapper">
        {/* Barra superior de ações */}
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)}>
              <FaArrowLeft /> Voltar
            </button>
            <button onClick={() => navigate("/")}>
              Cancelar
            </button>
          </div>
        </div>

        {/* Formulário */}
        <div className="card">
          <FormularioBem
            categorias={categorias}
            localidades={localidades}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
