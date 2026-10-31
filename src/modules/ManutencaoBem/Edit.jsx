import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioManutencao from "../../components/FormularioManutencao";

import { manutencaoService } from "../../services/manutencaoService";
import { bemService } from "../../services/bemService";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manutencao, setManutencao] = useState(null);
  const [bens, setBens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");
        const [dadosManutencao, dadosBens] = await Promise.all([
          manutencaoService.getById(id),
          bemService.getAll(),
        ]);
        setManutencao(dadosManutencao);
        setBens(Array.isArray(dadosBens) ? dadosBens : []);
      } catch (error) {
        console.error("Erro ao carregar dados da manutenção:", error);
        setErro("Não foi possível carregar a manutenção e os bens.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarDados();
  }, [id]);

  const handleSubmit = async (formData) => {
    const retornoJaRegistrado = Boolean(manutencao.dataRetorno ?? manutencao.data_retorno);

    try {
      const dadosAtualizacao = { descricao: formData.descricao };
      if (retornoJaRegistrado && formData.custo != null) {
        dadosAtualizacao.custo = formData.custo;
      }
      await manutencaoService.update(id, dadosAtualizacao);
    } catch (error) {
      console.error("Erro ao atualizar dados da manutenção:", error);
      alert(error.response?.data?.mensagem || error.response?.data?.message || "Não foi possível atualizar a manutenção.");
      return;
    }

    if (!retornoJaRegistrado && formData.custo != null) {
      try {
        await manutencaoService.retorno(id, { custo: formData.custo });
      } catch (error) {
        console.error("Erro ao registrar retorno da manutenção:", error);
        const mensagem = error.response?.data?.mensagem || error.response?.data?.message;
        alert(`A descrição foi atualizada, mas não foi possível registrar o retorno.${mensagem ? ` ${mensagem}` : ""}`);
        return;
      }
    }

    navigate("/manutencoes");
  };

  if (carregando) return <div className="inicio-page"><h1>Carregando manutenção...</h1></div>;
  if (erro || !manutencao) return <div className="inicio-page"><h1 className="form-error">{erro || "Manutenção não encontrada"}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Editar Manutenção</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft />Voltar</button>
            <button onClick={() => navigate("/manutencoes")} className="atalho-btn vermelho">Cancelar</button>
          </div>
        </div>
        <div className="card">
          <FormularioManutencao key={id} bens={bens} onSubmit={handleSubmit} initialData={manutencao} modo="edit" />
        </div>
      </div>
    </div>
  );
}
