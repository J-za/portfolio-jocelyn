import "./highlightbox.scss";

function HighlightBox({ title, description, icon }) {
  return (
    <article className="highlight-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default HighlightBox;
