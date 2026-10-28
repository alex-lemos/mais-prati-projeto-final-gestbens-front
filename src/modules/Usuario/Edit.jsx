import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioUsuario from "../../components/FormularioUsuario";
import { usuarios as mockUsuarios } from "../../mocks/data";
// Futuramente: import { usuarioService } from "../../services/usuarioService";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    setUsuario(mockUsuarios.find((item) => item.id.toString() === id) || null);
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const indice = mockUsuarios.findIndex((item) => item.id.toString() === id);
      if (indice < 0) throw new Error("Usuário não encontrado.");
      mockUsuarios[indice] = { ...mockUsuarios[indice], ...formData };
      // Futuramente: await usuarioService.update(id, formData);
      navigate("/usuarios");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Não foi possível atualizar o usuário.");
    }
  };

  if (!usuario) return <div className="inicio-page"><h1>Usuário não encontrado</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Editar Usuário</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/usuarios")} className="atalho-btn vermelho">Cancelar</button>
          </div>
        </div>
        <div className="card">
          <FormularioUsuario key={id} onSubmit={handleSubmit} initialData={usuario} modo="edit" />
        </div>
      </div>
    </div>
  );
}
