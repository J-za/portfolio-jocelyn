import { Link, Outlet, useNavigate } from "react-router";
import "./Dashboard.scss";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h3>Administration</h3>
        <nav>
          <Link to="categories">Catégories</Link>
          <Link to="competences">Compétences</Link>
          <Link to="projets">Projets</Link>
        </nav>
        <button onClick={logout}>Déconnexion</button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
