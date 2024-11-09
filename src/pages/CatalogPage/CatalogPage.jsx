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
import FilterSideBar from "../../components/FilterSideBar/FilterSideBar.jsx";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const status = useSelector(selectCampersStatus);
  const filters = useSelector(selectFilters);

  const [showTrailerCard, setShowTrailerCard] = useState(4);

  /*  useEffect(() => {
    startTransition(() => {
      setShowTrailerCard(4);
      dispatch(fetchCampers());
    });
  }, [dispatch]); */

  useEffect(() => {
    setShowTrailerCard(4);
    dispatch(fetchCampers());
  }, [dispatch]);

  const handleLoadMore = () => {
    setShowTrailerCard((prevCard) => prevCard + 4);
  };

  return (
    <div className={css.mainContainer}>
      <div className={css.filterContainer}>
        <FilterSideBar />
      </div>
      <div className={css.pageContainer}>
        {status === "loading" && <CatalogPageLoader />}
        {status === "succeeded" &&
          campers
            .slice(0, showTrailerCard)
            .map((camper) => (
              <CatalogTrailerCard key={camper.id} camper={camper} />
            ))}
        {showTrailerCard < campers.length && (
          <button className={css.loadMoreBtn} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
