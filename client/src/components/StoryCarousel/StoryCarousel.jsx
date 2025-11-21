import { useRef, useState, useEffect } from "react";
import StoryBox from "../StoryBox/StoryBox";
import data from "../../datas/storyData.json";
import "./storycarousel.scss";

function StoryCarousel() {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // fonction pour scroller vers une slide précise (clic sur bullet)
  const scrollToIndex = (i) => {
    const slider = sliderRef.current;
    const card = slider.children[i];
    if (!card) return;
    card.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  // écoute le scroll natif pour mettre à jour l’index
  useEffect(() => {
    const slider = sliderRef.current;

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const width = slider.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    };

    slider.addEventListener("scroll", handleScroll, { passive: true });
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="story-carousel">
      <div className="story-slider-wrapper">
        <div className="story-slider" ref={sliderRef}>
          {data.map((item, index) => (
            <div className="story-card" key={index}>
              <StoryBox
                title={item.title}
                intro={item.intro}
                paragraphe={item.paragraphe}
                points={item.points}
              />
            </div>
          ))}
        </div>
        <div className="story-dots">
          {data.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => {
                setActiveIndex(i);
                scrollToIndex(i);
              }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoryCarousel;
