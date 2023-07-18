import { FC, useEffect, useState } from "react";
import { Avatar } from "antd";
import IsPlaying from "../../assets/icons/IsPlaying";
import PlayIcon from "../../assets/icons/PlayIcon";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../configs/store";
import {
  triggerEndASingleSong,
  triggerPlayASingleSong,
} from "../../features/currentSongIdActive";

interface ThumbnailProps {
  alt: string;
  size: number;
  src: string;
  songId: string;
  onClick?: () => void;
}

const Thumbnail: FC<ThumbnailProps> = ({ alt, size, src, onClick, songId }) => {
  const activeSongId = useSelector((state: RootState) => state.activeSong);
  const [isPlayingItSelf, setIsPlayingItSelf] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    activeSongId.activeSongId === songId
      ? setIsPlayingItSelf(true)
      : setIsPlayingItSelf(false);
  }, [activeSongId.activeSongId]);

  return (
    <div className="relative">
      <Avatar
        onClick={onClick}
        alt={alt}
        src={src}
        size={size}
        shape="square"
      />
      {isPlayingItSelf ? (
        <IsPlaying
          onClick={() => {
            dispatch(triggerEndASingleSong());
            setIsPlayingItSelf(false);
          }}
          height={size / 2}
          width={size / 2}
        />
      ) : (
        <PlayIcon
          onClick={() => {
            setIsPlayingItSelf(true);
            dispatch(triggerPlayASingleSong(songId));
          }}
          height={size / 2}
          width={size / 2}
          color="white"
        />
      )}
    </div>
  );
};

export default Thumbnail;
