import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./categories.scss";
import { API_URL } from "../../../config/api";

function Categories() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  // Charger les catégories
  async function load() {
    const res = await fetch(`${API_URL}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setItems(await res.json());
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Ajouter une catégorie
  async function add(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const res = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setName("");
      load();
    }
  }

  // Supprimer une catégorie
  async function remove(id) {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i._id !== id));
    }
    setShowModal(false);
    setSelectedCategory(null);
  }

  // Modifier une catégorie
  async function update(id, newName) {
    if (!newName.trim()) return;
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newName }),
    });
    if (res.ok) {
      load();
    }
  }

  return (
    <div className="categories">
      <h3>Catégories</h3>

      {/* Bouton retour */}
      <button className="back-button" onClick={() => navigate("/admin")}>
        ← Retour au Dashboard
      </button>

      <form onSubmit={add} className="categories-form">
        <input
          placeholder="Nouvelle catégorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul className="categories-list">
        {items.map((c) => (
          <li key={c._id}>
            <input
              value={c.name}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((item) =>
                    item._id === c._id
                      ? { ...item, name: e.target.value }
                      : item
                  )
                )
              }
            />
            <button
              className="update-button"
              onClick={() => update(c._id, c.name)}
            >
              Modifier
            </button>
            <button
              className="delete-button"
              onClick={() => {
                setSelectedCategory(c);
                setShowModal(true);
              }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      {showModal && selectedCategory && (
        <div className="modal">
          <div className="modal-content">
            <p>
              ⚠️ Voulez-vous vraiment supprimer la catégorie{" "}
              <strong>{selectedCategory.name}</strong> ? <br />
              Cela va également supprimer la liaison avec les compétences
              existantes.
            </p>
            <div className="modal-actions">
              <button
                className="confirm"
                onClick={() => remove(selectedCategory._id)}
              >
                Oui, supprimer
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setShowModal(false);
                  setSelectedCategory(null);
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
