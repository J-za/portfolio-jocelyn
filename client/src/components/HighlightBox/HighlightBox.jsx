import "./highlightbox.scss";

function HighlightBox({ title, description, icon }) {
  return (
    <article className="highlight-card">
      <div className="highlight-inner">
        <div className="icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default HighlightBox;
