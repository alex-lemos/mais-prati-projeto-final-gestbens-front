import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateLayout from "../layouts/PrivateLayout";
import Inicio from "../pages/Inicio";

export const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PrivateLayout />}>
                <Route index element={<Inicio />} />
            </Route>
        </Routes>
    </BrowserRouter>
)