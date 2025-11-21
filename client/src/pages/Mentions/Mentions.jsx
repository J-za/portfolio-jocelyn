import React from "react";
import "./mentions.scss";

function Mentions() {
  return (
    <div className="mentions">
      <h1>Mentions légales & RGPD</h1>

      <section>
        <h2>Responsable de publication</h2>
        <p>Portfolio Jocelyn</p>
        <p>Contact : jzarrouk@outlook.com</p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          - Frontend hébergé sur <strong>Vercel</strong>
          <br />- Backend hébergé sur <strong>Render</strong>
        </p>
      </section>

      <section>
        <h2>Utilisation des données</h2>
        <p>
          - Ce site utilise le service externe <strong>SendGrid</strong> pour
          l’envoi des emails.
          <br />
          - Aucune donnée personnelle n’est conservée sur le backend.
          <br />- Les informations transmises via le formulaire de contact sont
          uniquement utilisées pour l’envoi du message.
        </p>
        <p>
          - Ce site utilise le service externe <strong>Cloudinary</strong> pour
          l’hébergement des images.
          <br />
          - Cloudinary peut déposer des cookies techniques ou analytiques lors
          du chargement des médias.
          <br />- Ces cookies sont gérés par Cloudinary conformément à leur
          politique de confidentialité.
        </p>
      </section>

      <section>
        <h2>Conformité RGPD</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous pouvez demander la suppression de vos données en nous
          contactant à l’adresse indiquée ci-dessus.
        </p>
      </section>

      <section>
        <h2>Dernière mise à jour</h2>
        <p>{import.meta.env.VITE_LAST_UPDATE}</p>
      </section>
    </div>
  );
}

export default Mentions;
