import css from "./Loader.module.css";
import { Blocks } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <Blocks
        height="120"
        width="120"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    </div>
  );
};

export default Loader;
