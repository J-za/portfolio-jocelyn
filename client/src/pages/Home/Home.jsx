import "./home.scss";

function Home() {
  return (
    <>
      <section className="hero-content">
        <h1>
          Développeur Web <br /> <span class="accent">Full-Stack</span>
        </h1>
        <p>
          Je développe des <strong>applications web modernes</strong>,
          performantes et élégantes, pensées pour offrir une{" "}
          <strong>expérience utilisateur fluide et intuitive</strong>
        </p>
        <div className="button-content">
          <button>Mes projets</button>
          <button>Me contacter</button>
        </div>
      </section>
    </>
  );
}

export default Home;
