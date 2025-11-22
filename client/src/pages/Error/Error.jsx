import { Link } from "react-router";
import "./error.scss";

function Error() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>Oups, cette page n'existe pas...</p>
      <Link to="/" className="error-link">
        Retourner à la page d'accueil
      </Link>
    </section>
  );
}

export default Error;
