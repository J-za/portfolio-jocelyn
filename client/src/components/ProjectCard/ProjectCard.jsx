import { ReactSVG } from "react-svg";
import "./projectcard.scss";

function ProjectCard({ project, onClick }) {
  const { title, imageCover, techLogos } = project;

  return (
    <div className="project-card" onClick={onClick}>
      <img src={imageCover} alt={title} className="cover" />
      <h2 className="card-title">{title}</h2>
      <div className="tech-logos">
        {techLogos.map((logo, index) => (
          <ReactSVG key={index} src={logo} className="tech-icon" />
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;
