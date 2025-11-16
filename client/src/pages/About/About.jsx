import myPhoto from "../../assets/me.png";
import { useRef, useState, useEffect } from "react";
import StoryCarousel from "../../components/StoryCarousel/StoryCarousel";
import "./about.scss";

function About() {
  return (
    <>
      <section className="personnal-infos">
        <h1>"Créer avec sens, connecter avec simplicité"</h1>
        <div className="infos-content">
          <div className="img-content">
            <img src={myPhoto} alt="Photo de Jocelyn ZARROUK" />
          </div>
          <StoryCarousel />
        </div>
      </section>
    </>
  );
}

export default About;
