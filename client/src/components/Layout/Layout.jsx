import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./layout.scss";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
