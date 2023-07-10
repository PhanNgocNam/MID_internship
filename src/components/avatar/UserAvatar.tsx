import React, { FC } from "react";
import { Avatar } from "antd";

interface UserAvatarProps {
  alt: string;
  src: string;
  size: number;
}

const UserAvatar: FC<UserAvatarProps> = ({ alt, src, size }) => {
  return <Avatar alt={alt} src={src} size={size} shape="circle" />;
};

export default UserAvatar;
