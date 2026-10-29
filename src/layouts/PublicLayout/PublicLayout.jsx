import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="public-layout">
      {/* Renderiza Login ou Cadastro */}
      <Outlet />
    </div>
  );
};

export default PublicLayout;
