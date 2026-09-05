import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateLayout from "../layouts/PrivateLayout";

export const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PrivateLayout />} />
        </Routes>
    </BrowserRouter>
)