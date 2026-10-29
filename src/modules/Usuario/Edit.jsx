import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioUsuario from "../../components/FormularioUsuario";
import { usuarioService } from "../../services/usuarioService";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarUsuario() {
      try {
        setCarregando(true);
        setErro("");
        setUsuario(await usuarioService.getById(id));
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        setErro("Não foi possível carregar o usuário.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarUsuario();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await usuarioService.update(id, formData);
      navigate("/usuarios");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert(error.response?.data?.message || "Não foi possível atualizar o usuário.");
    }
  };

  if (carregando) return <div className="inicio-page"><h1>Carregando usuário...</h1></div>;
  if (erro || !usuario) return <div className="inicio-page"><h1 className="form-error">{erro || "Usuário não encontrado"}</h1></div>;

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
