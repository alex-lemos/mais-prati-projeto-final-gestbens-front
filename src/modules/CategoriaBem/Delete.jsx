import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categorias as mockCategorias } from "../../mocks/data";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
// Futuramente: import { categoriaService } from "../../services/categoriaService";

export default function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    setCategoria(mockCategorias.find((item) => item.id.toString() === id) || null);
  }, [id]);

  const handleDelete = async () => {
    try {
      const indice = mockCategorias.findIndex((item) => item.id.toString() === id);
      if (indice < 0) throw new Error("Categoria não encontrada.");
      mockCategorias.splice(indice, 1);
      // Futuramente: await categoriaService.remove(id);
      navigate("/categorias");
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      alert("Não foi possível excluir a categoria.");
    }
  };

  if (!categoria) return <div className="inicio-page"><h1>Categoria não encontrada</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Excluir Categoria #{categoria.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/categorias")} className="atalho-btn vermelho">Cancelar</button>
          </div>
        </div>
        <div className="conteudo">
          <div className="card informacoes">
            <h2 className="titulo">{categoria.nome}</h2>
            <div className="campo"><strong>Descrição:</strong><p>{categoria.descricao || "Sem descrição."}</p></div>
          </div>
          <div className="card alerta-exclusao">
            <h2>Tem certeza que deseja excluir esta categoria? Essa ação não poderá ser desfeita.</h2>
            <button onClick={handleDelete} className="btn-excluir"><FaTrash /> Confirmar Exclusão</button>
          </div>
        </div>
      </div>
    </div>
  );
}
