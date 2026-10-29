import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormularioManutencao from "../../components/FormularioManutencao";
import { manutencaoService } from "../../services/manutencaoService";
import { bemService } from "../../services/bemService";
import { usuarioService } from "../../services/usuarioService";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manutencao, setManutencao] = useState(null);
  const [bens, setBens] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");
        const [dadosManutencao, dadosBens, dadosUsuarios] = await Promise.all([
          manutencaoService.getById(id),
          bemService.getAll(),
          usuarioService.getAll(),
        ]);
        const listaBens = Array.isArray(dadosBens) ? dadosBens : [];
        const listaUsuarios = Array.isArray(dadosUsuarios) ? dadosUsuarios : [];
        const resolverId = (referencia, lista) => {
          const valor = referencia?.id ?? referencia;
          return lista.find((item) => String(item.id) === String(valor) || item.nome === valor)?.id ?? "";
        };
        setManutencao({
          ...dadosManutencao,
          data_manutencao: (dadosManutencao.data_manutencao || dadosManutencao.dataManutencao || "").slice(0, 10),
          bem_id: resolverId(dadosManutencao.bem_id ?? dadosManutencao.bemId ?? dadosManutencao.bem, listaBens),
          usuario_id: resolverId(dadosManutencao.usuario_id ?? dadosManutencao.usuarioId ?? dadosManutencao.usuario, listaUsuarios),
        });
        setBens(listaBens);
        setUsuarios(listaUsuarios);
      } catch (error) {
        console.error("Erro ao carregar dados da manutenção:", error);
        setErro("Não foi possível carregar a manutenção, os bens ou responsáveis.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) carregarDados();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await manutencaoService.update(id, formData);
      navigate("/manutencoes");
    } catch (error) {
      console.error("Erro ao atualizar manutenção:", error);
      alert(error.response?.data?.message || "Não foi possível atualizar a manutenção.");
    }
  };

  if (carregando) return <div className="inicio-page"><h1>Carregando manutenção...</h1></div>;
  if (erro || !manutencao) return <div className="inicio-page"><h1 className="form-error">{erro || "Manutenção não encontrada"}</h1></div>;

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
