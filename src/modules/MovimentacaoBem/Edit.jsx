import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioMovimentacao from "../../components/FormularioMovimentacao";
import { movimentacaoService } from "../../services/movimentacaoService";
import { bemService } from "../../services/bemService";
import { localidadeService } from "../../services/localidadeService";
import { usuarioService } from "../../services/usuarioService";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movimentacao, setMovimentacao] = useState(null);
  const [bens, setBens] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");
        const [dadosMovimentacao, dadosBens, dadosLocalidades, dadosUsuarios] = await Promise.all([
          movimentacaoService.getById(id),
          bemService.getAll(),
          localidadeService.getAll(),
          usuarioService.getAll(),
        ]);
        const listaBens = Array.isArray(dadosBens) ? dadosBens : [];
        const listaLocalidades = Array.isArray(dadosLocalidades) ? dadosLocalidades : [];
        const listaUsuarios = Array.isArray(dadosUsuarios) ? dadosUsuarios : [];
        const resolverId = (referencia, lista) => {
          const valor = referencia?.id ?? referencia;
          return lista.find((item) => String(item.id) === String(valor) || item.nome === valor)?.id ?? "";
        };
        setMovimentacao({
          ...dadosMovimentacao,
          data_movimentacao: (dadosMovimentacao.data_movimentacao || dadosMovimentacao.dataMovimentacao || "").slice(0, 10),
          bem_id: resolverId(dadosMovimentacao.bem_id ?? dadosMovimentacao.bemId ?? dadosMovimentacao.bem, listaBens),
          usuario_id: resolverId(dadosMovimentacao.usuario_id ?? dadosMovimentacao.usuarioId ?? dadosMovimentacao.usuario, listaUsuarios),
          localidade_origem_id: resolverId(dadosMovimentacao.localidade_origem_id ?? dadosMovimentacao.localidadeOrigemId ?? dadosMovimentacao.localidadeOrigem, listaLocalidades),
          localidade_destino_id: resolverId(dadosMovimentacao.localidade_destino_id ?? dadosMovimentacao.localidadeDestinoId ?? dadosMovimentacao.localidadeDestino, listaLocalidades),
        });
        setBens(listaBens);
        setLocalidades(listaLocalidades);
        setUsuarios(listaUsuarios);
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
          <FormularioMovimentacao key={id} bens={bens} localidades={localidades} usuarios={usuarios} onSubmit={handleSubmit} initialData={movimentacao} modo="edit" />
        </div>
      </div>
    </div>
  );
}
