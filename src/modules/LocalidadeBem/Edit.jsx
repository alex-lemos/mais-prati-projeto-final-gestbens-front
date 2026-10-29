import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioLocalidade from "../../components/FormularioLocalidade";
import { localidadeService } from "../../services/localidadeService";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [localidade, setLocalidade] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarLocalidade() {
      try {
        setCarregando(true);
        setErro("");
        setLocalidade(await localidadeService.getById(id));
      } catch (error) {
        console.error("Erro ao carregar localidade:", error);
        setErro("Não foi possível carregar a localidade.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarLocalidade();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await localidadeService.update(id, formData);
      navigate("/locais");
    } catch (error) {
      console.error("Erro ao atualizar localidade:", error);
      alert(error.response?.data?.message || "Não foi possível atualizar a localidade.");
    }
  };

  if (carregando) return <div className="inicio-page"><h1>Carregando localidade...</h1></div>;
  if (erro || !localidade) return <div className="inicio-page"><h1 className="form-error">{erro || "Localidade não encontrada"}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Editar Localidade</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/locais")} className="atalho-btn vermelho">Cancelar</button>
          </div>
        </div>
        <div className="card">
          <FormularioLocalidade key={id} onSubmit={handleSubmit} initialData={localidade} modo="edit" />
        </div>
      </div>
    </div>
  );
}
