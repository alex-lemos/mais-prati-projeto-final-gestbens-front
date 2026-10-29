import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormularioBem from "../../components/FormularioBem";
import { FaArrowLeft } from "react-icons/fa";

// 1. Importações dos services necessários
import { bemService } from "../../services/bemService";
import { categoriaService } from "../../services/categoriaService"; // Ajuste o nome/caminho se necessário
import { localidadeService } from "../../services/localidadeService"; // Ajuste o nome/caminho se necessário

export default function Create() {
  const navigate = useNavigate();

  // 2. Estados locais para as opções vindas da API e controle de tela
  const [categorias, setCategorias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // 3. Buscar as categorias e localidades reais ao abrir a tela
  useEffect(() => {
    async function carregarDadosFormulario() {
      try {
        setCarregando(true);
        setErro("");

        // Busca ambos em paralelo para otimizar tempo
        const [dadosCategorias, dadosLocalidades] = await Promise.all([
          categoriaService.getAll(),
          localidadeService.getAll(),
        ]);

        setCategorias(Array.isArray(dadosCategorias) ? dadosCategorias : []);
        setLocalidades(Array.isArray(dadosLocalidades) ? dadosLocalidades : []);
      } catch (error) {
        console.error("Erro ao carregar dados do formulário:", error);
        setErro("Não foi possível carregar as categorias ou localidades.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDadosFormulario();
  }, []);

  // 4. Envio do formulário para o backend
  const handleSubmit = async (formData) => {
    try {
      // chamada real ao back enviando o payload estruturado pelo seu FormularioBem
      await bemService.create(formData);

      // redireciona para lista de bens
      navigate("/bens");
    } catch (error) {
      console.error("Erro ao salvar bem:", error);
      const mensagemErro = error.response?.data?.message || "Não foi possível salvar o bem. Tente novamente.";
      alert(`❌ Erro: ${mensagemErro}`);
    }
  };

  // Retornos de feedback visual
  if (carregando) return <div className="inicio-page"><h1>Carregando formulário...</h1></div>;
  if (erro) return <div className="inicio-page"><h1 className="form-error">⚠️ {erro}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Cadastrar Novo Bem</h1>

      <div className="conteudo-wrapper">
        {/* Barra superior de ações */}
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)}>
              <FaArrowLeft /> Voltar
            </button>
            <button onClick={() => navigate("/")}>
              Cancelar
            </button>
          </div>
        </div>

        {/* Formulário alimentado com dados reais da API */}
        <div className="card">
          <FormularioBem
            categorias={categorias}
            localidades={localidades}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}