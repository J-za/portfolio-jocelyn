import { useRef, useState, useEffect } from "react";
import HighlightBox from "../HighlightBox/HighlightBox";
import "./highlightcarousel.scss";
import data from "../../datas/highlightData.json";
import IconCode from "../../assets/Icon-Code.svg?react";
import IconTarget from "../../assets/ri_target-fill.svg?react";
import IconFlash from "../../assets/Icon-Flash.svg?react";

const iconMap = {
  "Icon-Code": <IconCode className="icon" />,
  "Icon-Target": <IconTarget className="icon" />,
  "Icon-Flash": <IconFlash className="icon" />,
};

function HighlightCarousel() {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const ChevronLeft = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const ChevronRight = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % data.length);
  };

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    const card = slider.children[activeIndex];
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest", //<-- empêche le scroll vertical
      });
    }
  }, [activeIndex]);

  return (
    <div className="highlight-carousel">
      <div className="highlight-slider-wrapper">
        <div className="highlight-slider" ref={sliderRef}>
          {data.map((item, index) => (
            <HighlightBox
              key={index}
              title={item.title}
              description={item.description}
              icon={iconMap[item.icon]}
            />
          ))}
        </div>

        <div className="highlight-nav">
          <button onClick={goToPrevious} className="chevron chevron-left">
            <ChevronLeft />
          </button>
          <button onClick={goToNext} className="chevron chevron-right">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="highlight-dots">
        {data.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default HighlightCarousel;
