import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioUsuario from "../../components/FormularioUsuario";
import { usuarios } from "../../mocks/data";
// Futuramente: import { usuarioService } from "../../services/usuarioService";

export default function Create() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const id = Math.max(0, ...usuarios.map((usuario) => Number(usuario.id))) + 1;
      usuarios.push({ id, ...formData });
      // Futuramente: await usuarioService.create(formData);
      navigate("/usuarios");
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Não foi possível salvar o usuário.");
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
