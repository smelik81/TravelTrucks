import css from "./DetailsCampersPage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampersDetails } from "../../redux/campers/operation.js";
import {
  selectCampers,
  selectCampersDetails,
  selectCampersDetailsStatus,
} from "../../redux/campers/selectors";
import Icon from "../../../public/Icon/Icon.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import GalleryTrailer from "../../components/GalleryTrailer/GalleryTrailer.jsx";
import Features from "../../components/Features/Features.jsx";
import Reviews from "../../components/Reviews/Reviews.jsx";
import BookForm from "../../components/BookForm/BookForm.jsx";

const DetailsCampersPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCampers);
  const camperDetail = useSelector(selectCampersDetails);

  const status = useSelector(selectCampersDetailsStatus);
  const [activeChoice, setActiveChoice] = useState("features");

  useEffect(() => {
    dispatch(fetchCampersDetails(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <Loader />;
  }

  if (!camperDetail) {
    return <p>Loading camper details...</p>;
  }

  return (
    <div className={css.detailsPageContainer}>
      <div className={css.container}>
        <h2 className={css.camperDetailName}>
          {camperDetail?.name || "No name"}
        </h2>
        <div className={css.wrapper}>
          <div className={css.ratingInfo}>
            <Icon name="icon-star-like" width={16} height={16} fill="#FFC531" />
            <span>
              {camperDetail?.rating || 0} ({camperDetail?.reviews?.length || 0}{" "}
              Reviews)
            </span>
          </div>
          <div className={css.locationInfo}>
            <Icon name="icon-location" width={16} height={16} fill="#101828" />
            {/*  <LocationFormatter location={camper.location} /> */}
            <p>{camperDetail?.location || "No location"}</p>
          </div>
        </div>
        <p className={css.camperDetailPrice}>€{camperDetail.price}</p>
      </div>
      <div className={css.galleryContainer}>
        <div className={css.galleryWrapper}>
          {camperDetail.gallery && (
            <GalleryTrailer images={camperDetail.gallery} />
          )}
        </div>
        <p className={css.description}>{camperDetail.description}</p>
      </div>
      <div className={css.choiceContainer}>
        <div className={css.choiceWrapper}>
          <button
            className={activeChoice === "features" ? css.activeChoice : ""}
            onClick={() => setActiveChoice("features")}
          >
            Features
          </button>
          <button
            className={activeChoice === "reviews" ? css.activeChoice : ""}
            onClick={() => setActiveChoice("reviews")}
          >
            Reviews
          </button>
        </div>
      </div>
      <div className={css.contentContainer}>
        <div
          className={
            activeChoice === "features"
              ? css.backgroundActive
              : css.backgroundNoActive
          }
        >
          {activeChoice === "features" && <Features features={camperDetail} />}
          {activeChoice === "reviews" && (
            <Reviews reviews={camperDetail.reviews} />
          )}
        </div>
        <div className={css.bookingForm}>
          <BookForm camperId={id} />
        </div>
      </div>
    </div>
  );
};

export default DetailsCampersPage;
