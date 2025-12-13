import { Navigate, Outlet, Link, useNavigate } from "react-router";
import { useState } from "react";
import "./adminlayout.scss";

function AdminLayout() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      {/* Bouton burger visible en mobile */}
      <button className="burger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h3>Administration</h3>
        <nav>
          <Link to="/admin" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link to="/admin/categories" onClick={() => setIsOpen(false)}>
            Catégories
          </Link>
          <Link to="/admin/competences" onClick={() => setIsOpen(false)}>
            Compétences
          </Link>
          <Link to="/admin/projets" onClick={() => setIsOpen(false)}>
            Projets
          </Link>
        </nav>
        <button onClick={logout}>Déconnexion</button>
      </aside>

      {/* Contenu */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
