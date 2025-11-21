import "./storybox.scss";

function StoryBox({ title, intro, paragraphe, points }) {
  return (
    <article className="story-box">
      <h2>{title}</h2>
      <p className="intro">{intro}</p>
      <p className="intro">{paragraphe}</p>
      <ul className="points">
        {points.map((point, i) => {
          const match = point.match(/^(.*?)\((.*?)\)$/); // <-- Regex pour capturer le texte entre parenthèses
          return (
            <li key={i}>
              {match ? (
                <>
                  {match[1]} <em>({match[2]})</em>
                </>
              ) : (
                point
              )}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default StoryBox;
