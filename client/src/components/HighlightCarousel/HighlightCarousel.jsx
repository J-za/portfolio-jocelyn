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
    const newIndex = (activeIndex + 1) % data.length;
    setActiveIndex(newIndex);
    sliderRef.current.children[newIndex].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest", //<-- empêche le scroll vertical
    });
  };

  const goToPrevious = () => {
    const newIndex = (activeIndex - 1 + data.length) % data.length;
    setActiveIndex(newIndex);
    sliderRef.current.children[newIndex].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest", //<-- empêche le scroll vertical
    });
  };

  //écoute le scroll natif pour mettre à jour l’index
  useEffect(() => {
    const slider = sliderRef.current;

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const width = slider.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index); // met à jour l’index en fonction du scroll
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

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
            onClick={() => {
              setActiveIndex(i);
              sliderRef.current.children[i].scrollIntoView({
                behavior: "smooth",
                inline: "start",
                block: "nearest",
              });
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default HighlightCarousel;
