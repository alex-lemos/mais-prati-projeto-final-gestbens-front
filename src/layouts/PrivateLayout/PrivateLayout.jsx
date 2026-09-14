import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

import "./PrivateLayout.css";

export default function PrivateLayout() {
  return (
    <div className="private-layout">
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
