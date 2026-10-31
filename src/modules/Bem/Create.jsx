import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormularioBem from "../../components/FormularioBem";
import { FaArrowLeft } from "react-icons/fa";

import { bemService } from "../../services/bemService";
import { categoriaService } from "../../services/categoriaService";
import { localidadeService } from "../../services/localidadeService";

export default function Create() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Busca as categorias e localidades
  useEffect(() => {
    async function carregarDadosFormulario() {
      try {
        setCarregando(true);
        setErro("");

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

  // Envia o formulário para o backend
  const handleSubmit = async (formData) => {
    try {
      await bemService.create(formData);
      navigate("/bens");
    } catch (error) {
      console.error("Erro ao salvar bem:", error);
      const mensagemErro = error.response?.data?.message || "Não foi possível salvar o bem. Tente novamente.";
      alert(`❌ Erro: ${mensagemErro}`);
    }
  };

  // Feedback visual na paggina
  if (carregando) return <div className="inicio-page"><h1>Carregando formulário...</h1></div>;
  if (erro) return <div className="inicio-page"><h1 className="form-error">⚠️ {erro}</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Cadastrar Novo Bem</h1>

      <div className="conteudo-wrapper">
        {/* Atalhos */}
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)}><FaArrowLeft /> Voltar</button>
            <button onClick={() => navigate("/bens")}>Cancelar</button>
          </div>
        </div>

        {/* Formulário */}
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