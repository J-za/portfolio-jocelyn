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
      <p>
        © {import.meta.env.VITE_LAST_UPDATE} Portfolio Jocelyn -{" "}
        <span
          onClick={handleMentionsClick}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Mentions légales & RGPD
        </span>
      </p>
    </footer>
  );
}

export default Footer;
