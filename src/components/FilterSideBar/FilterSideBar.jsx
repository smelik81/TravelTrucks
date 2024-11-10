import css from "./FilterSideBar.module.css";
import { useState, useCallback, useEffect } from "react";
import { categories } from "../../data/vehicleEquipment.js";
import { vehicleTypes } from "../../data/vehicleType.js";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Icon from "../../../public/Icon/Icon.jsx";

const ValidationLocationSchema = Yup.object().shape({
  location: Yup.string()
    .matches(
      /^[a-zA-Z\s]*$/,
      "Location can only contain Latin letters and spaces."
    )
    .min(2, "Location name must be minimum 2 characters.")
    .max(20, "Location name cannot exceed 20 characters."),
});

const FilterSideBar = ({
  filters,
  setFilters,
  onFilterChange,
  onSearchClick,
}) => {
  const [elementFilters, setElementFilters] = useState({});

  const basicFiltersElement = [
    "AC",
    "transmission",
    "kitchen",
    "TV",
    "bathroom",
  ];

  useEffect(() => {
    setElementFilters(filters);
  }, [filters]);

  const handleCategoryClick = useCallback(
    (categoryName) => {
      if (!basicFiltersElement.includes(categoryName)) return;
      let newFilters = { ...elementFilters };
      console.log(newFilters);
      newFilters[categoryName] = !elementFilters[categoryName];
      setElementFilters(newFilters);
    },
    [elementFilters, basicFiltersElement]
  );

  const handleVehicleTypeClick = useCallback(
    (vehicleTypeName) => {
      let newFilters = { ...elementFilters };
      console.log(newFilters);

      newFilters.form =
        newFilters.form === vehicleTypeName ? null : vehicleTypeName;
      setElementFilters(newFilters);
    },
    [elementFilters]
  );

  const handleSearch = async (values, { setSubmitting }) => {
    //const trimmedLocation = values.location.trim();

    const updatedFilters = {
      ...elementFilters,
      //location: trimmedLocation,
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
    onSearchClick();
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        /* location: localFilters.location || "", */
        location: "",
      }}
      validationSchema={ValidationLocationSchema}
      onSubmit={handleSearch}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.inputContainer}>
            <label className={css.inputLabel}>Location</label>
            <div className={css.input}>
              <Icon
                name="icon-location"
                width={20}
                height={20}
                fill="#6C717B"
              />
              <Field
                name="location"
                type="text"
                placeholder="City"
                className={css.inputField}
              />
            </div>
            <ErrorMessage
              name="location"
              component="div"
              className={css.errorMessage}
            />
          </div>

          <h3 className={css.filtersText}>Filters</h3>
          <div className={css.filterCategoryWrapper}>
            <h3 className={css.sectionTitle}>Vehicle equipment</h3>
            <hr className={css.sectionLine} />

            <div className={css.categoryContainer}>
              {categories
                .filter((category) =>
                  basicFiltersElement.includes(category.name)
                )
                .map((category) => (
                  <div
                    key={category.name}
                    className={css.category}
                    /*  className={`${css.category} ${
                      elementFilters[category.name] ? css.active : ""
                    }`} */
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <Icon name={category.icon} />
                    <span>{category.label}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className={css.categoryWrapper}>
            <h3 className={css.sectionTitle}>Vehicle type</h3>
            <hr className={css.sectionLine} />

            <div className={css.categoryContainer}>
              {vehicleTypes.map((type) => (
                <div
                  key={type.name}
                  className={css.category}
                  /*  className={`${css.category} ${
                    localFilters.form === type.name ? css.active : ""
                  }`} */
                  onClick={() => handleVehicleTypeClick(type.name)}
                >
                  <Icon name={type.icon} />
                  <span>{type.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={css.searchBtn}
            /*  disabled={!isValid || isSubmitting} */
          >
            {isSubmitting ? "Searching..." : "Search"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterSideBar;
