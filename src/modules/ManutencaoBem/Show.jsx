import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { manutencoes as mockManutencoes, bens, usuarios } from "../../mocks/data";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
// Futuramente: import { manutencaoService } from "../../services/manutencaoService";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    const manutencao = mockManutencoes.find((item) => item.id.toString() === id);
    if (manutencao) {
      setDados({
        ...manutencao,
        bem: bens.find((item) => String(item.id) === String(manutencao.bem_id)),
        usuario: usuarios.find((item) => String(item.id) === String(manutencao.usuario_id)),
      });
    }
  }, [id]);

  if (!dados) return <div className="inicio-page"><h1>Manutenção não encontrada</h1></div>;

  return (
    <div className="inicio-page">
      <h1>Detalhes da Manutenção #{dados.id}</h1>
      <div className="conteudo-wrapper">
        <div className="card atalhos">
          <h2>Ações:</h2>
          <div className="atalhos-buttons">
            <button onClick={() => navigate(-1)} className="atalho-btn"><FaArrowLeft /> Voltar</button>
            {usuario?.is_admin && <>
              <NavLink to={`/manutencoes/edit/${dados.id}`} className="atalho-btn"><FaEdit /> Editar Manutenção</NavLink>
              <NavLink to={`/manutencoes/delete/${dados.id}`} className="atalho-btn"><FaTrash /> Excluir Manutenção</NavLink>
            </>}
          </div>
        </div>
        <div className="card informacoes">
          <h2 className="titulo">Manutenção #{dados.id}</h2>
          <div className="informacoes-detalhes">
            <div className="campo"><strong>Data:</strong><p>{dados.data_manutencao?.slice(0, 10)}</p></div>
            <div className="campo"><strong>Bem:</strong><p>{dados.bem?.nome || `#${dados.bem_id}`}</p></div>
            <div className="campo"><strong>Responsável:</strong><p>{dados.usuario?.nome || `#${dados.usuario_id}`}</p></div>
            <div className="campo"><strong>Custo:</strong><p>{dados.custo == null ? "Não informado" : `R$ ${Number(dados.custo).toFixed(2)}`}</p></div>
          </div>
          <div className="campo"><strong>Descrição:</strong><p>{dados.descricao || "Sem descrição."}</p></div>
        </div>
      </div>
    </div>
  );
}
