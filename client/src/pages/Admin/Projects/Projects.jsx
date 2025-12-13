import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../../../config/api";
import "./Projects.scss";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [techLogos, setTechLogos] = useState([""]);
  const [githubLink, setGithubLink] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [carouselFiles, setCarouselFiles] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editCarouselFiles, setEditCarouselFiles] = useState([]);

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  async function authFetch(url, options = {}) {
    const res = await fetch(url, {
      ...options,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Erreur API");
    return res;
  }

  async function loadProjects() {
    const res = await authFetch(`${API_URL}/projects`);
    setProjects(await res.json());
  }

  useEffect(() => {
    loadProjects();
  }, []);

  // Ajout
  async function addProject(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", title);
    descriptions.forEach((d) => d && fd.append("description", d));
    tags.forEach((t) => t && fd.append("tags", t));
    techLogos.forEach((l) => l && fd.append("techLogos", l));
    if (githubLink) fd.append("githubLink", githubLink);
    if (demoLink) fd.append("demoLink", demoLink);
    carouselFiles.forEach((f) => fd.append("carousel", f));
    await authFetch(`${API_URL}/projects`, { method: "POST", body: fd });
    setTitle("");
    setDescriptions([""]);
    setTags([""]);
    setTechLogos([""]);
    setGithubLink("");
    setDemoLink("");
    setCarouselFiles([]);
    loadProjects();
  }

  // Suppression
  async function removeProject(id) {
    await authFetch(`${API_URL}/projects/${id}`, { method: "DELETE" });
    setProjects((p) => p.filter((pr) => pr._id !== id));
  }

  // Edition
  async function saveEdit(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", editingProject.title);
    editingProject.descriptions.forEach(
      (d) => d && fd.append("description", d)
    );
    editingProject.tags.forEach((t) => t && fd.append("tags", t));
    editingProject.techLogos.forEach((l) => l && fd.append("techLogos", l));
    if (editingProject.githubLink)
      fd.append("githubLink", editingProject.githubLink);
    if (editingProject.demoLink) fd.append("demoLink", editingProject.demoLink);
    editCarouselFiles.forEach((f) => fd.append("carousel", f));
    await authFetch(`${API_URL}/projects/${editingProject._id}`, {
      method: "PUT",
      body: fd,
    });
    setEditingProject(null);
    setEditCarouselFiles([]);
    loadProjects();
  }

  return (
    <div className="projects">
      <h3>Ajouter un projet</h3>

      <button className="back-button" onClick={() => navigate("/admin")}>
        ← Retour au Dashboard
      </button>
      <form onSubmit={addProject} className="projects-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre"
          required
        />
        {descriptions.map((d, i) => (
          <textarea
            key={i}
            value={d}
            placeholder="Description"
            onChange={(e) => {
              const c = [...descriptions];
              c[i] = e.target.value;
              setDescriptions(c);
            }}
          />
        ))}
        <button
          type="button"
          onClick={() => setDescriptions([...descriptions, ""])}
        >
          + Description
        </button>
        {tags.map((t, i) => (
          <input
            key={i}
            value={t}
            placeholder="Tag"
            onChange={(e) => {
              const c = [...tags];
              c[i] = e.target.value;
              setTags(c);
            }}
          />
        ))}
        <button type="button" onClick={() => setTags([...tags, ""])}>
          + Tag
        </button>
        {techLogos.map((l, i) => (
          <input
            key={i}
            value={l}
            placeholder="URL Logo"
            onChange={(e) => {
              const c = [...techLogos];
              c[i] = e.target.value;
              setTechLogos(c);
            }}
          />
        ))}
        <button type="button" onClick={() => setTechLogos([...techLogos, ""])}>
          + Logo
        </button>
        <input
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          placeholder="Lien GitHub"
        />
        <input
          value={demoLink}
          onChange={(e) => setDemoLink(e.target.value)}
          placeholder="Lien Démo"
        />
        <input
          type="file"
          multiple
          onChange={(e) => setCarouselFiles([...e.target.files])}
        />
        <button type="submit" className="btn-create">
          Créer
        </button>
      </form>

      <h3>Projets existants</h3>
      <ul className="projects-list">
        {projects.map((p) => (
          <li key={p._id}>
            <strong>{p.title}</strong>
            {p.imageCover && (
              <img src={p.imageCover} alt={p.title} width="80" />
            )}
            <span>{p.tags?.join(", ")}</span>
            <button
              className="btn-edit"
              onClick={() =>
                setEditingProject({
                  ...p,
                  descriptions: p.description || [],
                  tags: p.tags || [],
                  techLogos: p.techLogos || [],
                })
              }
            >
              Modifier
            </button>
            <button className="btn-delete" onClick={() => removeProject(p._id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      {editingProject && (
        <div className="modal">
          <div className="modal-content">
            <h4>Modifier</h4>
            <form onSubmit={saveEdit}>
              <input
                value={editingProject.title}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    title: e.target.value,
                  })
                }
              />
              {editingProject.descriptions.map((d, i) => (
                <textarea
                  key={i}
                  value={d}
                  onChange={(e) => {
                    const c = [...editingProject.descriptions];
                    c[i] = e.target.value;
                    setEditingProject({ ...editingProject, descriptions: c });
                  }}
                />
              ))}
              <button
                type="button"
                onClick={() =>
                  setEditingProject({
                    ...editingProject,
                    descriptions: [...editingProject.descriptions, ""],
                  })
                }
              >
                + Description
              </button>
              {editingProject.tags.map((t, i) => (
                <input
                  key={i}
                  value={t}
                  onChange={(e) => {
                    const c = [...editingProject.tags];
                    c[i] = e.target.value;
                    setEditingProject({ ...editingProject, tags: c });
                  }}
                />
              ))}
              <button
                type="button"
                onClick={() =>
                  setEditingProject({
                    ...editingProject,
                    tags: [...editingProject.tags, ""],
                  })
                }
              >
                + Tag
              </button>
              {editingProject.techLogos.map((l, i) => (
                <input
                  key={i}
                  value={l}
                  onChange={(e) => {
                    const c = [...editingProject.techLogos];
                    c[i] = e.target.value;
                    setEditingProject({ ...editingProject, techLogos: c });
                  }}
                />
              ))}
              <button
                type="button"
                onClick={() =>
                  setEditingProject({
                    ...editingProject,
                    techLogos: [...editingProject.techLogos, ""],
                  })
                }
              >
                + Logo
              </button>
              <input
                value={editingProject.githubLink || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    githubLink: e.target.value,
                  })
                }
              />
              <input
                value={editingProject.demoLink || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    demoLink: e.target.value,
                  })
                }
              />
              <input
                type="file"
                multiple
                onChange={(e) => setEditCarouselFiles([...e.target.files])}
              />
              <div className="modal-actions">
                <button type="submit" className="btn-save">
                  Sauvegarder
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setEditingProject(null)}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
