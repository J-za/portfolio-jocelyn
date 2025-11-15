import { useAnimation, motion } from "framer-motion";
import { NavLink, useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import "./header.scss";

function Header() {
  const controls = useAnimation();
  const lastScrollY = useRef(0);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  //Animation au scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        controls.start({ y: -100 });
      } else {
        controls.start({ y: 0 });
      }
      lastScrollY.current = window.scrollY;

      // Ferme le menu burger si on scroll
      setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  //Fermer le menu quand on clique sur un lien
  const handleLinkClick = () => setIsOpen(false);

  //Fermer le menu quand on change de route
  useEffect(() => {
    setIsOpen(false); // ferme le menu à chaque changement de route
  }, [location]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={controls}
      transition={{ duration: 0.3 }}
    >
      <nav id="main-navigation" className={`nav-links ${isOpen ? "open" : ""}`}>
        <NavLink className="nav-link" to="/" onClick={handleLinkClick}>
          Accueil
        </NavLink>
        <NavLink className="nav-link" to="/about" onClick={handleLinkClick}>
          Mon ADN
        </NavLink>
        <NavLink className="nav-link" to="/about" onClick={handleLinkClick}>
          Projets
        </NavLink>
        <a className="nav-link" href="/#contact" onClick={handleLinkClick}>
          Contact
        </a>
      </nav>

      <button
        className={`burger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Menu"
        aria-expanded={isOpen}
        aria-controls="main-navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </motion.header>
  );
}

export default Header;
