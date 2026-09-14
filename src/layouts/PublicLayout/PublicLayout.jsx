import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="public-layout">
        {/* Aqui o React Router vai renderizar Login ou Cadastro */}
        <Outlet />
    </div>
  );
};

export default PublicLayout;
