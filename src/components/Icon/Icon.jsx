import icons from "@public/icons.svg";

export const Icon = ({ id, size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} fill={color}>
    <use xlinkHref={`${icons}#${id}`} />
  </svg>
);
