// pages/Admin/Login.jsx
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import "./Login.scss";
import { API_URL } from "../../../config/api";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Identifiants invalides");
      }

      const result = await res.json();
      sessionStorage.setItem("token", result.token);

      navigate("/admin");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <main className="login">
      <h2>Connexion admin</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <label>
          Email
          <input
            type="email"
            {...register("email", { required: "Email requis" })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            {...register("password", { required: "Mot de passe requis" })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </main>
  );
}

export default Login;
