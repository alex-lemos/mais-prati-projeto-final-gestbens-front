import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AdminRoute from "./AdminRoute";

import PublicLayout from "../layouts/PublicLayout/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout/PrivateLayout";

// páginas públicas
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";

// páginas privadas
import Inicio from "../pages/Inicio/Inicio";

// módulos privados
import BensIndex from "../modules/Bem/Index";
import BensCreate from "../modules/Bem/Create";
import BensEdit from "../modules/Bem/Edit";
import BensShow from "../modules/Bem/Show";
import BensDelete from "../modules/Bem/Delete";

import CategoriasIndex from "../modules/CategoriaBem/Index";
import CategoriasCreate from "../modules/CategoriaBem/Create";
import CategoriasEdit from "../modules/CategoriaBem/Edit";
import CategoriasShow from "../modules/CategoriaBem/Show";
import CategoriasDelete from "../modules/CategoriaBem/Delete";

import LocalidadesIndex from "../modules/LocalidadeBem/Index";
import LocalidadesCreate from "../modules/LocalidadeBem/Create";
import LocalidadesEdit from "../modules/LocalidadeBem/Edit";
import LocalidadesShow from "../modules/LocalidadeBem/Show";
import LocalidadesDelete from "../modules/LocalidadeBem/Delete";

import ManutencoesIndex from "../modules/ManutencaoBem/Index";
import ManutencoesCreate from "../modules/ManutencaoBem/Create";
import ManutencoesEdit from "../modules/ManutencaoBem/Edit";
import ManutencoesShow from "../modules/ManutencaoBem/Show";
import ManutencoesDelete from "../modules/ManutencaoBem/Delete";

import MovimentacoesIndex from "../modules/MovimentacaoBem/Index";
import MovimentacoesCreate from "../modules/MovimentacaoBem/Create";
import MovimentacoesEdit from "../modules/MovimentacaoBem/Edit";
import MovimentacoesShow from "../modules/MovimentacaoBem/Show";
import MovimentacoesDelete from "../modules/MovimentacaoBem/Delete";

import UsuariosIndex from "../modules/Usuario/Index";
import UsuariosCreate from "../modules/Usuario/Create";
import UsuariosEdit from "../modules/Usuario/Edit";
import UsuariosShow from "../modules/Usuario/Show";
import UsuariosDelete from "../modules/Usuario/Delete";

const AppRoutes = () => {
  const { usuario } = useAuth();
  const isAuthenticated = !!usuario;

  return (
    <Routes>
      {/* Rotas públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Route>

      {/* Rotas privadas */}
      <Route element={isAuthenticated ? <PrivateLayout /> : <Navigate to="/login" />}>
        <Route path="/" element={<Inicio />} />

        {/* Bem */}
        <Route path="/bens" element={<BensIndex />} />
        <Route path="/bens/create" element={<BensCreate />} />
        <Route path="/bens/edit/:id" element={<BensEdit />} />
        <Route path="/bens/show/:id" element={<BensShow />} />
        <Route path="/bens/delete/:id" element={<BensDelete />} />

        {/* ManutencaoBem */}
        <Route path="/manutencoes" element={<ManutencoesIndex />} />
        <Route path="/manutencoes/create" element={<ManutencoesCreate />} />
        <Route path="/manutencoes/edit/:id" element={<ManutencoesEdit />} />
        <Route path="/manutencoes/show/:id" element={<ManutencoesShow />} />
        <Route path="/manutencoes/delete/:id" element={<ManutencoesDelete />} />

        {/* MovimentacaoBem */}
        <Route path="/movimentacoes" element={<MovimentacoesIndex />} />
        <Route path="/movimentacoes/create" element={<MovimentacoesCreate />} />
        <Route path="/movimentacoes/edit/:id" element={<MovimentacoesEdit />} />
        <Route path="/movimentacoes/show/:id" element={<MovimentacoesShow />} />
        <Route path="/movimentacoes/delete/:id" element={<MovimentacoesDelete />} />

        {/* LocalidadeBem */}
        <Route path="/locais" element={<AdminRoute><LocalidadesIndex /></AdminRoute>} />
        <Route path="/locais/create" element={<AdminRoute><LocalidadesCreate /></AdminRoute>} />
        <Route path="/locais/edit/:id" element={<AdminRoute><LocalidadesEdit /></AdminRoute>} />
        <Route path="/locais/show/:id" element={<AdminRoute><LocalidadesShow /></AdminRoute>} />
        <Route path="/locais/delete/:id" element={<AdminRoute><LocalidadesDelete /></AdminRoute>} />

        {/* CategoriaBem */}
        <Route path="/categorias" element={<AdminRoute><CategoriasIndex /></AdminRoute>} />
        <Route path="/categorias/create" element={<AdminRoute><CategoriasCreate /></AdminRoute>} />
        <Route path="/categorias/edit/:id" element={<AdminRoute><CategoriasEdit /></AdminRoute>} />
        <Route path="/categorias/show/:id" element={<AdminRoute><CategoriasShow /></AdminRoute>} />
        <Route path="/categorias/delete/:id" element={<AdminRoute><CategoriasDelete /></AdminRoute>} />

        {/* Usuario */}
        <Route path="/usuarios" element={<AdminRoute><UsuariosIndex /></AdminRoute>} />
        <Route path="/usuarios/create" element={<AdminRoute><UsuariosCreate /></AdminRoute>} />
        <Route path="/usuarios/edit/:id" element={<AdminRoute><UsuariosEdit /></AdminRoute>} />
        <Route path="/usuarios/show/:id" element={<AdminRoute><UsuariosShow /></AdminRoute>} />
        <Route path="/usuarios/delete/:id" element={<AdminRoute><UsuariosDelete /></AdminRoute>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;