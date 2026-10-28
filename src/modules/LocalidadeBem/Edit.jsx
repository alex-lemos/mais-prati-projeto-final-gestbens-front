import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioLocalidade from "../../components/FormularioLocalidade";
import { localidades as mockLocalidades } from "../../mocks/data";
// Futuramente: import { localidadeService } from "../../services/localidadeService";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [localidade, setLocalidade] = useState(null);

  useEffect(() => {
    setLocalidade(mockLocalidades.find((item) => item.id.toString() === id) || null);
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const indice = mockLocalidades.findIndex((item) => item.id.toString() === id);
      if (indice < 0) throw new Error("Localidade não encontrada.");
      mockLocalidades[indice] = { ...mockLocalidades[indice], ...formData };
      // Futuramente: await localidadeService.update(id, formData);
      navigate("/locais");
    } catch (error) {
      console.error("Erro ao atualizar localidade:", error);
      alert("Não foi possível atualizar a localidade.");
    }
  };

  if (!localidade) return <div className="inicio-page"><h1>Localidade não encontrada</h1></div>;

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
