import myPhoto from "../../assets/me.webp";
import StoryCarousel from "../../components/StoryCarousel/StoryCarousel";
import "./about.scss";
import SkillsSection from "../../components/SkillsSection/SkillsSection";

function About() {
  return (
    <>
      <section className="personnal-infos">
        <h1>"Créer avec sens, connecter avec simplicité"</h1>
        <div className="infos-content">
          <div className="img-content">
            <img
              src={myPhoto}
              alt="Photo de Jocelyn ZARROUK"
              fetchPriority="high"
            />
          </div>
          <StoryCarousel />
        </div>
      </section>
      <SkillsSection />
    </>
  );
}

export default About;
