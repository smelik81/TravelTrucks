import { useEffect, useState } from "react";
import css from "./CatalogPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operation.js";
import {
  selectCampers,
  selectCampersStatus,
  selectFilters,
} from "../../redux/campers/selectors.js";

import CatalogPageLoader from "../../components/CatalogPageLoader/CatalogPageLoader.jsx";
import CatalogTrailerCard from "../../components/CatalogTrailerCard/CatalogTrailerCard.jsx";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const status = useSelector(selectCampersStatus);
  const filters = useSelector(selectFilters);

  const [showTrailerCard, setShowTrailerCard] = useState(4);

  useEffect(() => {
    setShowTrailerCard(4);
    dispatch(fetchCampers());
  }, [dispatch]);

  /* useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCampers(filters));
    }
  }, [dispatch, status, filters]); */

  return (
    <div>
      <h2>Campers:</h2>
      <div>
        {status === "loading" && <CatalogPageLoader />}
        {status === "succeeded" &&
          campers
            .slice(0, showTrailerCard)
            .map((camper) => (
              <CatalogTrailerCard key={camper.id} camper={camper} />
            ))}
      </div>
    </div>
  );
};

export default CatalogPage;
