import { createContext, useCallback, useState } from "react";
import { bemService } from "../services/bemService";

// eslint-disable-next-line react-refresh/only-export-components
export const BemContext = createContext(null);

export function BemProvider({ children }) {
  const [bens, setBens] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const loadBens = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const data = await bemService.getAll();
      setBens(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar os bens:", error);
      setErro("Não foi possível carregar os bens.");
    } finally {
      setCarregando(false);
    }
  }, []);
  return (
    <BemContext.Provider
      value={{
        bens,
        loadBens,
        carregando,
        erro,
      }}
    >
      {children}
    </BemContext.Provider>
  );
}
