import { createContext, useState } from "react";
import { bemService } from "../services/bemService";

const BemContext = createContext(null);

export function BemProvider({ children }) {
  const [bem, setBem] = useState(null);

  const loadBem = async () => {
    try {
      const data = await bemService.getAll();
      setBem(data);
    } catch (error) {
      console.error("Erro ao carregar os bens:", error);
    }
  };

  return (
    <BemContext.Provider value={{ bem, loadBem }}>
      {children}
    </BemContext.Provider>
  );
}
