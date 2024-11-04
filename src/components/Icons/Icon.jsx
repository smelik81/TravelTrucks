import css from "./Icon.module.css";

const Icon = ({ src, width = 32, height = 32, className = "" }) => (
  <img
    src={src}
    alt="Icon"
    width={width}
    height={height}
    className={className}
  />
);

export default Icon;
