import { Navigate, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import HighlightCarousel from "../../components/HighlightCarousel/HighlightCarousel";
import HighlightGrid from "../../components/HighlightGrid.jsx/HighlightGrid";
import useIsMobileOrTablet from "../../hooks/useMobileOrTablet";
import IconCode from "../../assets/Icon-Code.svg?react";
import IconTarget from "../../assets/ri_target-fill.svg?react";
import IconFlash from "../../assets/Icon-Flash.svg?react";
import "./home.scss";
import ContactForm from "../../components/ContactForm/ContactForm";

const iconMap = {
  "Icon-Code": <IconCode className="icon" />,
  "Icon-Target": <IconTarget className="icon" />,
  "Icon-Flash": <IconFlash className="icon" />,
};

function Home() {
  const location = useLocation();
  const isMobileOrTablet = useIsMobileOrTablet();
  const navigate = useNavigate();

  //Permet de gérer le lien vers contact depuis une autre page
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <section className="hero-content">
        <h1>
          Développeur Web <br /> <span className="accent">Full-Stack</span>
        </h1>
        <h2>
          Je développe des{" "}
          <strong>applications web modernes et performantes</strong>, pensées
          pour offrir une{" "}
          <strong>expérience utilisateur fluide et intuitive</strong>
        </h2>
        <div className="button-content">
          <button onClick={() => navigate("/projets")}>Mes projets</button>
          <button
            className="hero-button"
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Me contacter
          </button>
        </div>
      </section>
      <section className="highlight-content">
        {isMobileOrTablet ? <HighlightCarousel /> : <HighlightGrid />}
      </section>
      <section id="contact" className="form-content">
        <ContactForm />
      </section>
    </>
  );
}

export default Home;
