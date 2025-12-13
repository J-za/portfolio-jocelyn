import { useEffect, useState } from "react";
import "./dashboard.scss";
import { API_URL } from "../../../config/api";

function Dashboard() {
  const [stats, setStats] = useState({ categories: 0, skills: 0, projects: 0 });
  const token = sessionStorage.getItem("token");

  async function loadStats() {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [catRes, skillRes, projRes] = await Promise.all([
        fetch(`${API_URL}/categories`, { headers }),
        fetch(`${API_URL}/skills`, { headers }),
        fetch(`${API_URL}/projects`, { headers }),
      ]);

      const categories = catRes.ok ? await catRes.json() : [];
      const skills = skillRes.ok ? await skillRes.json() : [];
      const projects = projRes.ok ? await projRes.json() : [];

      setStats({
        categories: categories.length,
        skills: skills.length,
        projects: projects.length,
      });
    } catch (err) {
      console.error("Erreur stats dashboard:", err);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="dashboard-home">
      <h2>Prêt à tout changer ? 😱👊💪</h2>

      {/* Stats rapides */}
      <div className="stats">
        <div className="card">
          <h3>{stats.categories}</h3>
          <p>Catégories</p>
        </div>
        <div className="card">
          <h3>{stats.skills}</h3>
          <p>Compétences</p>
        </div>
        <div className="card">
          <h3>{stats.projects}</h3>
          <p>Projets</p>
        </div>
      </div>

      {/* Preview du site */}
      <div className="preview">
        <h3>Preview du site</h3>
        <iframe
          src="http://localhost:5173/"
          title="Site Preview"
          className="preview-frame"
        />
      </div>
    </div>
  );
}

export default Dashboard;
