import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Skills.scss";
import { API_URL } from "../../../config/api";

function Skills() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [category, setCategory] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  //Wrappe la fonction fetch avec gestion d'erreur
  async function authFetch(url, options = {}) {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      let errorMessage = "Erreur inconnue";
      try {
        const data = await res.json();
        errorMessage = data.error || data.message || errorMessage;
      } catch {
        // si pas de JSON, garde le message par défaut
      }
      throw new Error(errorMessage);
    }

    return res;
  }

  async function loadSkills() {
    const res = await authFetch(`${API_URL}/skills`);
    if (res.ok) {
      setItems(await res.json());
    }
  }

  async function loadCategories() {
    const res = await authFetch(`${API_URL}/categories`);
    if (res.ok) {
      setCategories(await res.json());
    }
  }

  useEffect(() => {
    loadSkills();
    loadCategories();
  }, []);

  // Prévisualisation logo
  function onLogoFileChange(file) {
    setLogoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setLogoPreview("");
    }
  }

  // Ajouter un skill
  async function add(e) {
    e.preventDefault();
    if (!name.trim() || !category) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    const res = await fetch(`${API_URL}/skills`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      setName("");
      setLogoFile(null);
      setLogoPreview("");
      setCategory("");
      loadSkills();
    }
  }

  // Supprimer un skill
  async function remove(id) {
    const res = await authFetch(`${API_URL}/skills/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i._id !== id));
    }
    setShowDeleteModal(false);
    setSelectedSkill(null);
  }

  // Ouvrir modal édition
  function openEdit(skill) {
    setEditingSkill({
      _id: skill._id,
      name: skill.name || "",
      category: skill.category?._id || "",
    });
    setLogoPreview(skill.logoUrl || "");
    setLogoFile(null);
  }

  // Sauvegarder édition
  async function saveEdit(e) {
    e.preventDefault();
    if (!editingSkill) return;

    const formData = new FormData();
    formData.append("name", editingSkill.name);
    formData.append("category", editingSkill.category);
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    const res = await fetch(`${API_URL}/skills/${editingSkill._id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      setEditingSkill(null);
      setLogoFile(null);
      setLogoPreview("");
      loadSkills();
    }
  }

  return (
    <div className="skills">
      <h3>Compétences</h3>

      <button className="back-button" onClick={() => navigate("/admin")}>
        ← Retour au Dashboard
      </button>

      {/* Formulaire ajout */}
      <form onSubmit={add} className="skills-form">
        <input
          placeholder="Nom du skill"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="file-input">
          <label>Logo (SVG)</label>
          <input
            type="file"
            accept="image/svg+xml"
            onChange={(e) => onLogoFileChange(e.target.files[0] || null)}
          />
          {logoPreview && (
            <img
              className="logo-preview"
              src={logoPreview}
              alt="Prévisualisation"
            />
          )}
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Choisir une catégorie</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button type="submit">Ajouter</button>
      </form>

      {/* Liste */}
      <ul className="skills-list">
        {items.map((s) => (
          <li key={s._id}>
            <span>{s.name}</span>
            {s.logoUrl && <img src={s.logoUrl} alt={s.name} width="40" />}
            <span>{s.category?.name}</span>
            <button className="update-button" onClick={() => openEdit(s)}>
              Modifier
            </button>
            <button
              className="delete-button"
              onClick={() => {
                setSelectedSkill(s);
                setShowDeleteModal(true);
              }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      {/* Modal suppression */}
      {showDeleteModal && selectedSkill && (
        <div className="modal">
          <div className="modal-content">
            <p>
              ⚠️ Supprimer la compétence <strong>{selectedSkill.name}</strong> ?
            </p>
            <div className="modal-actions">
              <button
                className="confirm"
                onClick={() => remove(selectedSkill._id)}
              >
                Oui, supprimer
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedSkill(null);
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal édition */}
      {editingSkill && (
        <div className="modal">
          <div className="modal-content">
            <h4>Modifier la compétence</h4>
            <form onSubmit={saveEdit}>
              <input
                value={editingSkill.name}
                onChange={(e) =>
                  setEditingSkill((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />

              <div className="file-input">
                <label>Nouveau logo (SVG)</label>
                <input
                  type="file"
                  accept="image/svg+xml"
                  onChange={(e) => onLogoFileChange(e.target.files[0] || null)}
                />
                {logoPreview && (
                  <img
                    className="logo-preview"
                    src={logoPreview}
                    alt="Prévisualisation"
                  />
                )}
              </div>

              <select
                value={editingSkill.category}
                onChange={(e) =>
                  setEditingSkill((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                required
              >
                <option value="">Choisir une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <div className="modal-actions">
                <button type="submit" className="confirm">
                  Sauvegarder
                </button>
                <button
                  type="button"
                  className="cancel"
                  onClick={() => {
                    setEditingSkill(null);
                    setLogoFile(null);
                    setLogoPreview("");
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Skills;
