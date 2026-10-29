import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioCategoria from "../../components/FormularioCategoria";
import { categoriaService } from "../../services/categoriaService";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarCategoria() {
      try {
        setCarregando(true);
        setErro("");
        setCategoria(await categoriaService.getById(id));
      } catch (error) {
        console.error("Erro ao carregar categoria:", error);
        setErro("Não foi possível carregar a categoria.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarCategoria();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await categoriaService.update(id, formData);
      navigate("/categorias");
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      alert(error.response?.data?.message || "Não foi possível atualizar a categoria.");
    }
  };

  if (carregando) return <div className="inicio-page"><h1>Carregando categoria...</h1></div>;
  if (erro || !categoria) return <div className="inicio-page"><h1 className="form-error">{erro || "Categoria não encontrada"}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Editar Categoria</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/categorias")} className="atalho-btn vermelho">Cancelar</button>
          </div>
        </div>
        <div className="card">
          <FormularioCategoria key={id} onSubmit={handleSubmit} initialData={categoria} modo="edit" />
        </div>
      </div>
    </div>
  );
}
