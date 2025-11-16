import HighlightBox from "../HighlightBox/HighlightBox";
import data from "../../datas/highlightData.json";
import IconCode from "../../assets/Icon-Code.svg?react";
import IconTarget from "../../assets/ri_target-fill.svg?react";
import IconFlash from "../../assets/Icon-Flash.svg?react";
import "./highlightgrid.scss";

const iconMap = {
  "Icon-Code": <IconCode className="icon" />,
  "Icon-Target": <IconTarget className="icon" />,
  "Icon-Flash": <IconFlash className="icon" />,
};

function HighlightGrid() {
  return (
    <div className="highlight-grid">
      {data.map((item, index) => (
        <HighlightBox
          key={index}
          title={item.title}
          description={item.description}
          icon={iconMap[item.icon]}
        />
      ))}
    </div>
  );
}

export default HighlightGrid;
