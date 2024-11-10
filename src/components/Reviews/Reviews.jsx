import css from "./Reviews.module.css";
import Icon from "../../../public/Icon/Icon.jsx";

const Reviews = ({ reviews }) => {
  const getFirstLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const ratingStar = (rating) => {
    const maxStar = 5;
    const getStar = Math.round(rating);
    const starArray = [];

    for (let i = 1; i <= maxStar; i++) {
      if (i <= getStar) {
        starArray.push(
          <Icon key={i} name="icon-star-like" width={16} height={16} />
        );
      } else {
        starArray.push(
          <Icon key={i} name="icon-star" width={16} height={16} />
        );
      }
    }
    return starArray;
  };

  return (
    <div className={css.reviewsContainer}>
      {reviews.map((reviev, index) => (
        <div key={index} className={css.reviewsList}>
          <div className={css.reviewsWrapper}>
            <div className={css.reviewsAvatar}>
              {getFirstLetter(reviev.reviewer_name)}
            </div>
            <div className={css.reviewsInfo}>
              <span className={css.reviewsName}>{reviev.reviewer_name}</span>
              <div className={css.reviewsStars}>
                {ratingStar(reviev.reviewer_rating)}
              </div>
            </div>
          </div>
          <p className={css.reviewsText}>{reviev.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
