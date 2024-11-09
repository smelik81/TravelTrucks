import { useDispatch } from "react-redux";
import { categories } from "../../data/vehicleEquipment.js";
import css from "./CatalogTrailerCard.module.css";
import { Link } from "react-router-dom";

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
    <div className={css.trailerCard}>
      <div className={css.imgWrapper}>
        <img
          src={camper.gallery[0]?.thumb}
          alt={camper.name}
          className={css.vehicleImage}
        />
      </div>
      <div className={css.wrapperCard}>
        <div className={css.block}>
          <div className={css.textContainer}>
            <h2 className={css.nameInfo}>{camper.name}</h2>
            <div className={css.priceBlock}>
              <p className={css.priceInfo}>
                €{Number(camper.price).toFixed(2)}
              </p>
              <span>K</span>
            </div>
          </div>
          <div className={css.details}>
            <div className={css.rating}>
              <span>Z</span>
              {camper.rating} ({camper.reviews?.length || 0} Reviews)
            </div>
            <div className={css.location}>
              <span>B</span>
              {camper.location}
            </div>
          </div>
        </div>
        <div className={css.supportingText}>
          <p className={css.description}>{camper.description}</p>
        </div>
        <ul className={css.variatiesList}>
          {trailerChar.map((varieties, index) => (
            <li key={index} className={css.variatiesItem}>
              <img src={varieties.icon} alt={varieties.label} />
              <span>{varieties.label}</span>
            </li>
          ))}
        </ul>
        <Link to={`/catalog/${camper.id}`} className={css.showMoreBtn}>
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CatalogTrailerCard;
