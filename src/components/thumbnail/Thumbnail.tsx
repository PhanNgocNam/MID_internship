import { FC } from "react";
import { Avatar } from "antd";

interface ThumbnailProps {
  alt: string;
  size: number;
  src: string;
  onClick?: () => void;
}

const Thumbnail: FC<ThumbnailProps> = ({ alt, size, src, onClick }) => {
  return (
    <Avatar onClick={onClick} alt={alt} src={src} size={size} shape="square" />
  );
};

export default Thumbnail;
