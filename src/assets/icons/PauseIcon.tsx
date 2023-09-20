import React, { FC } from "react";

import { IconProps } from "./IconProps";

const PauseIcon: FC<IconProps> = ({ width, height, onClick, color }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      className="bi bi-pause cursor-pointer"
      viewBox="0 0 16 16"
    >
      <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
    </svg>
  );
};

export default PauseIcon;
