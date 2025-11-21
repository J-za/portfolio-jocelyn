import { useEffect, useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import ProjectModal from "../ProjectModal/ProjectModal";
import IconFilter from "../../assets/mi_filter.svg?react";
import "./projectsection.scss";
import { API_URL } from "../../config/api";

function ProjectSection() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState(null);
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/projects`);
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Fetch projects error", err);
        setError("Impossible to upload projects");
      }
    };

    fetchProjects();
  }, []);

  //Récupération de tous les tags uniques
  const allTags = [...new Set(projects.flatMap((p) => p.tags))];

  // Filtration des projets selon les tags actifs
  const filteredProjects = projects.filter((project) => {
    return activeTags.length === 0
      ? true
      : activeTags.every((tag) => project.tags.includes(tag));
  });

  return (
    <section className="projects-section">
      <h1 className="section-title">
        Plongez dans <strong>mon univers</strong> et découvrez{" "}
        <strong>mes créations</strong>
      </h1>

      {error && <p className="error-message">{error}</p>}

      <h2 className="filters-title">
        {" "}
        Trouvez les projets qui vous ressemblent
      </h2>

      <IconFilter className="filter-icon" />

      <div className="filters">
        {allTags.map((tag) => (
          <button
            key={tag}
            className={activeTags.includes(tag) ? "active" : ""}
            onClick={() =>
              setActiveTags(
                (prev) =>
                  prev.includes(tag)
                    ? prev.filter((t) => t !== tag) // si déjà sélectionné → on l’enlève
                    : [...prev, tag] // sinon → on l’ajoute
              )
            }
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))
        ) : (
          <p className="no-projects">
            Aucun projet n'a été réalisé avec l’ensemble des technologies
            sélectionnées à ce jour.
          </p>
        )}
      </div>

      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}
    </section>
  );
}

export default ProjectSection;
