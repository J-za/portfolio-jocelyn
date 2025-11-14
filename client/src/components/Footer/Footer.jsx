import "./footer.scss";
import GitHubIcon from "../../assets/mdi_github.svg?react";
import LinkedInIcon from "../../assets/mdi_linkedin.svg?react";

function Footer() {
  return (
    <footer>
      <a
        href="https://github.com/J-za"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon className="icon" />
      </a>
      <a
        href="https://www.linkedin.com/in/jocelyn-zarrouk"
        target="_blank"
        rel=""
      >
        <LinkedInIcon className="icon" />
      </a>
    </footer>
  );
}

export default Footer;
