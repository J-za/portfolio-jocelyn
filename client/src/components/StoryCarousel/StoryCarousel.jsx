import { useRef, useState, useEffect } from "react";
import StoryBox from "../StorySlide/StoryBox";
import data from "../../datas/storyData.json";
import "./storycarousel.scss";

function StoryCarousel() {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    const card = slider.children[activeIndex];
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest", // évite le scroll vertical
      });
    }
  }, [activeIndex]);

  return (
    <div className="story-carousel">
      <div className="story-slider-wrapper">
        <div className="story-slider" ref={sliderRef}>
          {data.map((item, index) => (
            <div className="story-card" key={index}>
              <StoryBox
                title={item.title}
                intro={item.intro}
                points={item.points}
                conclusion={item.conclusion}
              />
            </div>
          ))}
        </div>
        <div className="story-dots">
          {data.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoryCarousel;
