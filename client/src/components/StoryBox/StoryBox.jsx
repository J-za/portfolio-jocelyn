import "./storybox.scss";

function StoryBox({ title, intro, points, conclusion }) {
  return (
    <article className="story-box">
      <h2>{title}</h2>
      <p className="intro">{intro}</p>
      <ul className="points">
        {points.map((points, i) => (
          <li key={i}>{points}</li>
        ))}
      </ul>
      <p className="conclusion">{conclusion}</p>
    </article>
  );
}

export default StoryBox;
