/* eslint-disable no-unused-vars */
import "./Header.css";

import { useState } from "react";
export default function Header() {   
    const [logado, setLogado] = useState(false);
    return (
        <>
        <header className="header">
            <h1>GestBens - Painel Administrativo</h1>
            <button className="logout-button" onClick={() => {
                setLogado(!logado);
            }}>
                {logado ? 'Sair' : 'Entrar'}
            </button>
        </header>
        </>
    );
}