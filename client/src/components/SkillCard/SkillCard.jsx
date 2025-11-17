import { ReactSVG } from "react-svg";
import "./skillcard.scss";

function SkillCard({ name, logoUrl }) {
  return (
    <div className="skill-card">
      <ReactSVG src={logoUrl} className="skill-icon" />
      <p>{name}</p>
    </div>
  );
}

export default SkillCard;
