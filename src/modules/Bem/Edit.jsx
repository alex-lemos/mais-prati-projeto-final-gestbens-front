// src/modules/Bem/Edit.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { bens as mockBens, categorias, localidades } from "../../mocks/data";
import FormularioBem from "../../components/FormularioBem";
import { FaArrowLeft } from "react-icons/fa";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bem, setBem] = useState(null);

  useEffect(() => {
    const carregar = () => {
      // Busca o bem nos mocks (simulando o getById do service)
      const bemEncontrado = mockBens.find((b) => b.id.toString() === id);
      if (bemEncontrado) {
        setBem(bemEncontrado);
      }
    };
    carregar();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      // Futuramente: bemService.update(id, formData)
      console.log("Bem atualizado (mock):", { id, ...formData });

      // Redireciona para lista de bens
      navigate("/bens");
    } catch (error) {
      console.error("Erro ao atualizar bem:", error);
      alert("Não foi possível atualizar o bem.");
    }
  };

  if (!bem) return <p>Carregando...</p>;

  return (
    <div className="inicio-page">
      <h1>Editar Bem</h1>

      <div className="conteudo-wrapper">
        {/* Barra superior de ações */}
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn">
              <FaArrowLeft /> Voltar
            </button>
            <button onClick={() => navigate("/")} className="atalho-btn vermelho">
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
            initialData={bem}
            modo="edit"
          />
        </div>
      </div>
    </div>
  );
}
