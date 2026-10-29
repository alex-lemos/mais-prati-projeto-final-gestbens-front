import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioCategoria from "../../components/FormularioCategoria";
import { categoriaService } from "../../services/categoriaService";

export default function Create() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await categoriaService.create(formData);
      navigate("/categorias");
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      alert(error.response?.data?.message || "Não foi possível salvar a categoria. Tente novamente.");
    }
  };

  return (
    <div className="inicio-page">
      <h1>Cadastrar Nova Categoria</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)}><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/categorias")}>Cancelar</button>
          </div>
        </div>
        <div className="card">
          <FormularioCategoria onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
