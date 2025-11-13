import { NavLink } from "react-router";
import "./header.scss";

function Header() {
  return (
    <header>
      <nav>
        <NavLink className="nav-link" to="/">
          Accueil
        </NavLink>
        <NavLink className="nav-link" to="/about">
          Mon ADN
        </NavLink>
        <NavLink className="nav-link" to="/about">
          Projets
        </NavLink>
        <NavLink className="nav-link" to="/about">
          Contact
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
