import HighlightBox from "../../components/HighlightBox/HighlightBox";
import IconCode from "../../assets/Icon-Code.svg?react";
import IconTarget from "../../assets/ri_target-fill.svg?react";
import IconFlash from "../../assets/Icon-Flash.svg?react";
import "./home.scss";

function Home() {
  return (
    <>
      <section className="hero-content">
        <h1>
          Développeur Web <br /> <span className="accent">Full-Stack</span>
        </h1>
        <h2>
          Je développe des <strong>applications web modernes</strong>,
          performantes et élégantes, pensées pour offrir une{" "}
          <strong>expérience utilisateur fluide et intuitive</strong>
        </h2>
        <div className="button-content">
          <button>Mes projets</button>
          <button>Me contacter</button>
        </div>
      </section>
      <section className="highlight-content">
        <HighlightBox
          icon={<IconCode className="icon" />}
          title="Architecture solide"
          description="Un code structuré évolutif et pensé pour durer"
        />
        <HighlightBox
          icon={<IconTarget className="icon" />}
          title="Vision produit"
          description="Une approche issue de mon expérience en tant que Product Owner"
        />
        <HighlightBox
          icon={<IconFlash className="icon" />}
          title="Perfomance web"
          description="Des sites rapides, optimisés et bien référencés"
        />
      </section>
    </>
  );
}

export default Home;
