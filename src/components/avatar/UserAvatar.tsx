import { FC } from "react";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/store";

interface UserAvatarProps {
  alt: string;
  size: number;
  onClick?: () => void;
}

const UserAvatar: FC<UserAvatarProps> = ({ alt, size, onClick }) => {
  const { photoURL } = useSelector((state: RootState) => state.user);
  return (
    <Avatar
      onClick={onClick}
      alt={alt}
      src={photoURL}
      size={size}
      shape="circle"
    />
  );
};

export default UserAvatar;
