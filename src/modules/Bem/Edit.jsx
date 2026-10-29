import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FormularioBem from "../../components/FormularioBem";
import { FaArrowLeft } from "react-icons/fa";

// 1. Importação de todos os services reais necessários
import { bemService } from "../../services/bemService";
import { categoriaService } from "../../services/categoriaService";
import { localidadeService } from "../../services/localidadeService";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [bem, setBem] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // 2. Carrega as listas de apoio e os dados atuais do bem em paralelo ao abrir a tela
  useEffect(() => {
    async function carregarDadosEdicao() {
      try {
        setCarregando(true);
        setErro("");

        const [dadosCategorias, dadosLocalidades, dadosBem] = await Promise.all([
          categoriaService.getAll(),
          localidadeService.getAll(),
          bemService.getById(id)
        ]);

        setCategorias(Array.isArray(dadosCategorias) ? dadosCategorias : []);
        setLocalidades(Array.isArray(dadosLocalidades) ? dadosLocalidades : []);
        setBem(dadosBem);
      } catch (error) {
        console.error("Erro ao carregar dados da edição:", error);
        setErro("Não foi possível carregar as informações do bem ou listas auxiliares.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      carregarDadosEdicao();
    }
  }, [id]);

  // 3. Envia as alterações reais para o backend
  const handleSubmit = async (formData) => {
    try {
      await bemService.update(id, formData);

      // Redireciona de volta para a lista de bens com sucesso
      navigate("/bens");
    } catch (error) {
      console.error("Erro ao atualizar bem:", error);
      const mensagemErro = error.response?.data?.message || "Não foi possível atualizar o bem. Tente novamente.";
      alert(`❌ Erro: ${mensagemErro}`);
    }
  };

  // Retornos de feedback visual de controle
  if (carregando) return <div className="inicio-page"><h1>Carregando dados para edição...</h1></div>;
  if (erro || !bem) return <div className="inicio-page"><h1 className="form-error">⚠️ {erro || "Bem não encontrado"}</h1></div>;

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

        {/* Formulário alimentado com dados dinâmicos da API */}
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