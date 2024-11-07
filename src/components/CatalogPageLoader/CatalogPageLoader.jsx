import css from "./CatalogPageLoader.module.css";
import { FadeLoader } from "react-spinners";

const CatalogPageLoader = () => {
  return (
    <div className={css.loader}>
      <FadeLoader loading={true} size={40} />
    </div>
  );
};

export default CatalogPageLoader;
