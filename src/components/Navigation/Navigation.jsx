import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import Icon from "../Icons/Icon.jsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <div>
      <div className={css.iconContainer}>
        <Icon
          src="/icon-logo.svg"
          width={136}
          height={15}
          className={css.logo}
        />
      </div>
      <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={buildLinkClass}>
          Catalog
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
