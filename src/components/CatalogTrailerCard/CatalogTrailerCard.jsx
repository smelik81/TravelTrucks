import { useDispatch, useSelector } from "react-redux";
import { categories } from "../../data/vehicleEquipment.js";
import Icon from "../../../public/Icon/Icon.jsx";
import css from "./CatalogTrailerCard.module.css";
import { Link } from "react-router-dom";
import { selectFavorites } from "../../redux/campers/selectors.js";
import { toggleFavorite } from "../../redux/campers/slice.js";

const CatalogTrailerCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isSelected = favorites.includes(camper.id);

  const mainAttributes = ["transmission", "engine", "kitchen", "AC"];

  const trailerChar = mainAttributes
    .map((item) => categories.find((category) => category.name === item))
    .filter((category) => category && camper[category.name])
    .map((category) => ({
      icon: category.icon,
      label: category.label,
    }));
  const handleFavoriteClick = () => {
    console.log("toggle favorites", camper.id);

    dispatch(toggleFavorite(camper.id));
  };

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
              <div
                className={`${css.likeIcon} ${isSelected ? css.active : ""}`}
                onClick={handleFavoriteClick}
              >
                <Icon name="icon-heart" width={24} height={24} />
              </div>
            </div>
          </div>
          <div className={css.details}>
            <div className={css.rating}>
              <Icon
                name="icon-star-like"
                width={16}
                height={16}
                fill="#FFC531"
              />
              <span>
                {camper.rating} ({camper.reviews?.length || 0} Reviews)
              </span>
            </div>
            <div className={css.location}>
              <Icon name="icon-location" width={16} height={16} />
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
              <Icon name={varieties.icon} width={20} height={20} />
              {varieties.label}
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
