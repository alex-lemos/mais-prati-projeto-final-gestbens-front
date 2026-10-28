import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioCategoria from "../../components/FormularioCategoria";
import { categorias as mockCategorias } from "../../mocks/data";
// Futuramente: import { categoriaService } from "../../services/categoriaService";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    const encontrada = mockCategorias.find((item) => item.id.toString() === id);
    if (encontrada) setCategoria(encontrada);
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const indice = mockCategorias.findIndex((item) => item.id.toString() === id);
      if (indice < 0) throw new Error("Categoria não encontrada.");
      mockCategorias[indice] = { ...mockCategorias[indice], ...formData };
      // Futuramente: await categoriaService.update(id, formData);
      navigate("/categorias");
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      alert("Não foi possível atualizar a categoria.");
    }
  };

  if (!categoria) return <div className="inicio-page"><h1>Categoria não encontrada</h1></div>;
  if (!categoria) return <p>Carregando...</p>;

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
