import css from "./FilterSideBar.module.css";
import { useState, useCallback, useEffect } from "react";
import { categories } from "../../data/vehicleEquipment.js";
import { vehicleTypes } from "../../data/vehicleType.js";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Icon from "../../../public/Icon/Icon.jsx";
import { useDispatch } from "react-redux";

const ValidationLocationSchema = Yup.object().shape({
  location: Yup.string()
    .matches(
      /^[a-zA-Z\s]*$/,
      "Location can only contain Latin letters and spaces."
    )
    .min(2, "Location name must be minimum 2 characters.")
    .max(20, "Location name cannot exceed 20 characters."),
});

const FilterSideBar = ({ setFilters }) => {
  const [elementFilters, setElementFilters] = useState([]);
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch();

  const basicFiltersElement = [
    "AC",
    "transmission",
    "kitchen",
    "TV",
    "bathroom",
  ];

  const handleVehicleTypeSelect = useCallback(
    (vehicleTypeName) => {
      setElementFilters((prevFilters) => {
        const newFilters = { ...prevFilters };
        newFilters.form =
          newFilters.form === vehicleTypeName ? "" : vehicleTypeName;
        return newFilters;
      });
    },
    [setElementFilters]
  );

  const handleLocationChange = (event) => {
    const newLocation = event.target.value.trim();
    setLocation(newLocation ? newLocation : "");
  };

  const handleElementSelect = (categoryName) => {
    setElementFilters((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  return (
    <Formik
      initialValues={{
        location: "",
      }}
      validationSchema={ValidationLocationSchema}
      onSubmit={(values) => {
        const formattedFilters = {
          ...elementFilters,
          location: values.location,
        };
        setFilters(formattedFilters);
      }}
    >
      {({ values, handleChange }) => (
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
                onChange={handleChange}
                value={values.location}
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
                    className={`${css.category} ${
                      elementFilters[category.name] ? css.active : ""
                    }`}
                    onClick={() => handleElementSelect(category.name)}
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
                  className={`${css.category} ${
                    elementFilters.form === type.name ? css.active : ""
                  }`}
                  onClick={() => {
                    handleVehicleTypeSelect(type.name);
                  }}
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
            //disabled={!isValid || isSearching || isSubmitting}
            disabled={isSearching}
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterSideBar;
