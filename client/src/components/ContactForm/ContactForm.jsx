import { useForm } from "react-hook-form";
import { useState } from "react";
import "./contactform.scss";
import { API_URL } from "../../config/api";

function ContactForm() {
  const [status, setStatus] = useState(null);
  const {
    register, //<-- Connecter chaque champ au système de validation
    handleSubmit, //<-- Function qui gère la validation avant d'appeler onSubmit
    reset, // <-- Vide le formulaire
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API_URL}/send-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        setStatus("success");
        reset(); //<-- vide tous les champs
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <>
      <h2 className="form-title">
        Mes projets vous intéressent ? <br />
        <span className="accent">Contactez-moi</span>
      </h2>
      <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className="visually-hidden">
          Votre nom
        </label>
        <div className="form-group">
          <input
            id="name"
            type="text"
            placeholder="Votre nom"
            {...register("name", { required: "Le nom est obligatoire" })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <label htmlFor="email" className="visually-hidden">
          Votre email
        </label>
        <div className="form-group">
          <input
            id="email"
            type="email"
            placeholder="Votre email"
            {...register("email", {
              required: "L'email est obligatoire",
              pattern: {
                value: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
                message: "Adresse email invalide",
              },
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        <label htmlFor="message" className="visually-hidden">
          Votre message
        </label>
        <div className="form-group">
          <textarea
            id="message"
            rows="5"
            placeholder="Votre message"
            {...register("message", {
              required: "Le message est obligatoire",
              minLength: {
                value: 10,
                message: "Le message doit contenir au moins 10 caractères",
              },
            })}
          />
          {errors.message && (
            <span className="error">{errors.message.message}</span>
          )}
        </div>

        <button type="submit">Envoyer le message</button>
        {status === "success" && (
          <p className="message send-success">Message envoyé !</p>
        )}
        {status === "error" && (
          <p className="message send-error">Erreur lors de l'envoi.</p>
        )}
      </form>
    </>
  );
}

export default ContactForm;
