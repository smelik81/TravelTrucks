import css from "./Features.module.css";
import Icon from "../../../public/Icon/Icon.jsx";
import { categories } from "../../data/vehicleEquipment.js";

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Features = ({ features }) => {
  const featuresAttributes = [
    "AC",
    "transmission",
    "kitchen",
    "TV",
    "bathroom",
    "engine",
    "radio",
    "refrigerator",
    "water",
  ];

  const formattedCamper = {
    form: capitalizeFirstLetter(features.form),
    length: capitalizeFirstLetter(features.length),
    width: capitalizeFirstLetter(features.width),
    height: capitalizeFirstLetter(features.height),
    tank: capitalizeFirstLetter(features.tank),
    consumption: capitalizeFirstLetter(features.consumption),
  };

  const featuresInfo = featuresAttributes
    .map((feature) => categories.find((category) => category.name === feature))
    .filter((category) => category && features[category.name])
    .map((category) => ({
      label: category.label,
      icon: category.icon,
    }));
  console.log(featuresInfo);

  return (
    <div className={css.featureContainer}>
      <ul className={css.featureList}>
        {featuresInfo.map((feature, index) => (
          <li key={index} className={css.featureItem}>
            <Icon name={feature.icon} width={20} height={20} />
            {feature.label}
          </li>
        ))}
      </ul>

      <div className={css.vehicleDetails}>
        <h3 className={css.title}>Vehicle details</h3>
        <hr className={css.hrLine} />
        <ul className={css.formList}>
          <li>
            <span>Form</span>
            <span>{formattedCamper.form}</span>
          </li>
          <li>
            <span>Length</span>
            <span>{formattedCamper.length}</span>
          </li>
          <li>
            <span>Width</span>
            <span>{formattedCamper.width}</span>
          </li>
          <li>
            <span>Height</span>
            <span>{formattedCamper.height}</span>
          </li>
          <li>
            <span>Tank</span>
            <span>{formattedCamper.tank}</span>
          </li>
          <li>
            <span>Consumption</span>
            <span>{formattedCamper.consumption}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Features;
