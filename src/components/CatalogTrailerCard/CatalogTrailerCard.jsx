import { useDispatch } from "react-redux";
import { categories } from "../../data/vehicleEquipment.js";
import css from "./CatalogTrailerCard.module.css";

const CatalogTrailerCard = ({ camper }) => {
  const dispatch = useDispatch();

  const mainAttributes = ["transmission", "engine", "kitchen", "AC"];

  const trailerChar = mainAttributes
    .map((item) => categories.find((category) => category.name === item))
    .filter((category) => category && camper[category.name])
    .map((category) => ({
      icon: category.icon,
      label: category.label,
    }));

  return (
    <div>
      <p>Trailer Features:</p>
      <ul>
        {trailerChar.map((feature, index) => (
          <li key={index}>
            <img src={feature.icon} alt={feature.label} />
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>
      <div className={css.imgWrapper}>
        <img
          src={camper.gallery[0]?.thumb}
          alt={camper.name}
          className={css.vehicleImage}
        />
      </div>
    </div>
  );
};

export default CatalogTrailerCard;
