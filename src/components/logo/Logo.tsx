import React, { FC } from "react";
import { Avatar } from "antd";

type LogoProps = {
  alt: string;
  src: string;
  size: number;
  shape: "circle" | "square";
};

const Logo: FC<LogoProps> = ({ alt, src, size, shape }) => {
  return <Avatar alt={alt} src={src} size={size} shape={shape} />;
};

export default Logo;
