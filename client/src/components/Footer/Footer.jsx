import "./footer.scss";
import { useNavigate } from "react-router";
import GitHubIcon from "../../assets/mdi_github.svg?react";
import LinkedInIcon from "../../assets/mdi_linkedin.svg?react";

function Footer() {
  const navigate = useNavigate();

  const handleMentionsClick = () => {
    navigate("/mentions");
  };

  return (
    <footer>
      <div className="links-content">
        <a
          href="https://github.com/J-za"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
        >
          <GitHubIcon className="icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/jocelyn-zarrouk"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedInIcon className="icon" />
        </a>
      </div>
      <button onClick={handleMentionsClick} className="mention">
        MENTIONS LÉGALES
      </button>
      <p>
        Portfolio Jocelyn © - Tous droits réservés - {new Date().getFullYear()}{" "}
      </p>
    </footer>
  );
}

export default Footer;
