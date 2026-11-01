import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioMovimentacao from "../../components/FormularioMovimentacao";
import { movimentacaoService } from "../../services/movimentacaoService";
import { bemService } from "../../services/bemService";
import { localidadeService } from "../../services/localidadeService";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movimentacao, setMovimentacao] = useState(null);
  const [bens, setBens] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");
        const [dadosMovimentacao, dadosBens, dadosLocalidades] = await Promise.all([
          movimentacaoService.getById(id),
          bemService.getAll(),
          localidadeService.getAll(),
        ]);
        const listaBens = Array.isArray(dadosBens) ? dadosBens : [];
        const listaLocalidades = Array.isArray(dadosLocalidades) ? dadosLocalidades : [];
        const resolverId = (referencia, lista) => {
          const valor = referencia?.id ?? referencia;
          return lista.find((item) => String(item.id) === String(valor) || item.nome === valor)?.id ?? "";
        };
        setMovimentacao({
          ...dadosMovimentacao,
          bemId: resolverId(dadosMovimentacao.bemId ?? dadosMovimentacao.bem_id ?? dadosMovimentacao.bem, listaBens),
          localidadeDestinoId: resolverId(dadosMovimentacao.localidadeDestinoId ?? dadosMovimentacao.localidade_destino_id ?? dadosMovimentacao.localidadeDestino, listaLocalidades),
        });
        setBens(listaBens);
        setLocalidades(listaLocalidades);
      } catch (error) {
        console.error("Erro ao carregar dados da movimentação:", error);
        setErro("Não foi possível carregar a movimentação ou as listas auxiliares.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarDados();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await movimentacaoService.update(id, formData);
      navigate("/movimentacoes");
    } catch (error) {
      console.error("Erro ao atualizar movimentação:", error);
      alert(error.response?.data?.message || "Não foi possível atualizar a movimentação.");
    }
  };

  if (carregando) return <div className="inicio-page"><h1>Carregando movimentação...</h1></div>;
  if (erro || !movimentacao) return <div className="inicio-page"><h1 className="form-error">{erro || "Movimentação não encontrada"}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Editar Movimentação #{movimentacao.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/movimentacoes")} className="atalho-btn vermelho">Cancelar</button>
          </div>
        </div>
        <div className="card">
          <FormularioMovimentacao key={id} bens={bens} localidades={localidades} onSubmit={handleSubmit} initialData={movimentacao} modo="edit" />
        </div>
      </div>
    </div>
  );
}
