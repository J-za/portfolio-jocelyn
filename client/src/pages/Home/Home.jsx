import HighlightBox from "../../components/HighlightBox/HighlightBox";
import IconCode from "../../assets/Icon-Code.svg?react";
import IconTarget from "../../assets/ri_target-fill.svg?react";
import IconFlash from "../../assets/Icon-Flash.svg?react";
import data from "../../datas/highlightData.json";
import "./home.scss";
import ContactForm from "../../components/ContactForm/ContactForm";

const iconMap = {
  "Icon-Code": <IconCode className="icon" />,
  "Icon-Target": <IconTarget className="icon" />,
  "Icon-Flash": <IconFlash className="icon" />,
};

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
        {data.map((item, index) => (
          <HighlightBox
            key={index}
            icon={iconMap[item.icon]}
            title={item.title}
            description={item.description}
          />
        ))}
      </section>
      <section className="form-content">
        <ContactForm />
      </section>
    </>
  );
}

export default Home;
