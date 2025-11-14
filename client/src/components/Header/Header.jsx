import { useAnimation, motion } from "framer-motion";
import { NavLink } from "react-router";
import { useEffect, useRef } from "react";
import "./header.scss";

function Header() {
  const controls = useAnimation();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        controls.start({ y: -100 });
      } else {
        controls.start({ y: 0 });
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={controls}
      transition={{ duration: 0.3 }}
    >
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
        <a className="nav-link" href="/#contact">
          Contact
        </a>
      </nav>
    </motion.header>
  );
}

export default Header;
