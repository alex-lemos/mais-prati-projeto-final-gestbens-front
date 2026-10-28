import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioManutencao from "../../components/FormularioManutencao";
import { manutencoes as mockManutencoes, bens, usuarios } from "../../mocks/data";
// Futuramente: import { manutencaoService } from "../../services/manutencaoService";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manutencao, setManutencao] = useState(null);

  useEffect(() => {
    setManutencao(mockManutencoes.find((item) => item.id.toString() === id) || null);
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const indice = mockManutencoes.findIndex((item) => item.id.toString() === id);
      if (indice < 0) throw new Error("Manutenção não encontrada.");
      mockManutencoes[indice] = { ...mockManutencoes[indice], ...formData };
      // Futuramente: await manutencaoService.update(id, formData);
      navigate("/manutencoes");
    } catch (error) {
      console.error("Erro ao atualizar manutenção:", error);
      alert("Não foi possível atualizar a manutenção.");
    }
  };

  if (!manutencao) return <div className="inicio-page"><h1>Manutenção não encontrada</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Editar Manutenção #{manutencao.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/manutencoes")} className="atalho-btn vermelho">Cancelar</button>
          </div>
        </div>
        <div className="card">
          <FormularioManutencao key={id} bens={bens} usuarios={usuarios} onSubmit={handleSubmit} initialData={manutencao} modo="edit" />
        </div>
      </div>
    </div>
  );
}
