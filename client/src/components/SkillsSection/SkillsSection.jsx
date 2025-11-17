import { useEffect, useState } from "react";
import SkillCard from "../SkillCard/SkillCard";
import "./skillssection.scss";

function SkillsSection() {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Récupération des catégories
        const catRes = await fetch("http://localhost:4000/api/categories");
        if (!catRes.ok) {
          throw new Error(`Categories HTTP error: ${catRes.status}`);
        }
        const catData = await catRes.json();
        setCategories([{ _id: "tous", name: "Tous" }, ...catData]);

        //Récupération des skills
        const skillRes = await fetch("http://localhost:4000/api/skills");
        if (!skillRes.ok) {
          throw new Error(`Skills HTTP erro: ${skillRes.status}`);
        }
        const skillData = await skillRes.json();
        setSkills(skillData);
      } catch (err) {
        console.error("Fetch error :", err);
        setError("Unable to load skills at this time");
      }
    };

    fetchData();
  }, []);

  const filteredSkills =
    activeCategory === "Tous"
      ? skills
      : skills.filter((skill) => skill.category?.name === activeCategory);

  return (
    <section className="skills-section">
      <h2>Mes compétences</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat._id}
            className={cat.name === activeCategory ? "active" : ""}
            onClick={() => setActiveCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className="skills-grid">
        {filteredSkills.map((skill) => (
          <SkillCard
            key={skill._id}
            name={skill.name}
            logoUrl={skill.logoUrl}
          />
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
