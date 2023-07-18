import { FC } from "react";
import { IconProps } from "./IconProps";

const PlayIcon: FC<IconProps> = ({ height, width, color, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className="absolute top-[50%] left-[50%} -translate-y-[50%] -translate-x-[-50%] bi bi-globe2"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 16 16"
      width={width}
      height={height}
    >
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
    </svg>
  );
};

export default PlayIcon;
