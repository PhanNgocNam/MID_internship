import { FC } from "react";
import { IconProps } from "./IconProps";

const PlayIcon: FC<IconProps> = ({ height, width, color, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className="bi bi-play flex justify-center items-center"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 16 16"
      width={width}
      height={height}
    >
      <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
    </svg>
  );
};

export default PlayIcon;
