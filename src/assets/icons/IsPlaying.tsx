import { FC } from "react";
import { IconProps } from "./IconProps";
import playingIcon from "../img/icon-playing.gif";

const IsPlaying: FC<IconProps> = ({ height, width, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-[50%] left-[50%} -translate-y-[50%] -translate-x-[-50%]"
      style={{ height: height, width: width }}
    >
      <img height="100%" width="100%" src={playingIcon} alt="Icon Is Playing" />
    </div>
  );
};

export default IsPlaying;
