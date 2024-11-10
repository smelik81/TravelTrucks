const Icon = ({ name, width = 32, height = 32, fill = "currentColor" }) => (
  <svg width={width} height={height} fill={fill}>
    <use xlinkHref={`/Icon/icons.svg#${name}`} />
  </svg>
);

export default Icon;
