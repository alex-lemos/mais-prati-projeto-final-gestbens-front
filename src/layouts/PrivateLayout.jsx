import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function PrivateLayout() {
  return (
    <>
      <Header />
      <div style={{ display: "flex", height: "100vh" }}> 
      <aside>
        <Sidebar />
      </aside>
            <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
                  <Outlet />
            </main>
    </div>
      <Footer />
    </>
  );
}

export default PrivateLayout;


/*
<div className="private-layout">
        <aside className="private-sidebar">
          <Sidebar />
        </aside>

        <main className="private-content">
          <Outlet />
        </main>
      </div>

*/ 