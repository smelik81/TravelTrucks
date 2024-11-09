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
import Loader from "../../components/Loader/Loader.jsx";

const DetailsCampersPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCampers);
  const camperDetail = useSelector(selectCampersDetails);

  const status = useSelector(selectCampersDetailsStatus);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    console.log("Перед dispatch");
    dispatch(fetchCampersDetails(id));
    console.log("Після dispatch");
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
            <span>Z</span>
            {camperDetail?.rating || 0} ({camperDetail?.reviews?.length || 0}{" "}
            Reviews)
          </div>
          <div className={css.locationWrapper}>
            <span>W</span>
            {/*  <LocationFormatter location={camper.location} /> */}
            <p>{camperDetail?.location || "No location"}</p>
          </div>
        </div>

        <p className={css.camperDetailPrice}>€{camperDetail.price}</p>
      </div>
    </div>
  );
};

export default DetailsCampersPage;
