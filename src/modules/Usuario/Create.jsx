import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioUsuario from "../../components/FormularioUsuario";
import { usuarioService } from "../../services/usuarioService";

export default function Create() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await usuarioService.create(formData);
      navigate("/usuarios");
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert(error.response?.data?.message || "Não foi possível salvar o usuário.");
    }
  };

  return (
    <div className="inicio-page">
      <h1>Cadastrar Novo Usuário</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)}><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/usuarios")}>Cancelar</button>
          </div>
        </div>
        <div className="card">
          <FormularioUsuario onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
