import { FC, useEffect, useState } from "react";
import { Avatar } from "antd";
import IsPlaying from "../../assets/icons/IsPlaying";
import PlayIcon from "../../assets/icons/PlayIconOnThmbnail";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../configs/store";
import {
  triggerPlayASingleSong,
  triggerEndASingleSong,
} from "../../features/currentSongActiveSlice";
interface ThumbnailProps {
  alt: string;
  size: number;
  src: string;
  songId: string;
  onClick?: () => void;
}

const Thumbnail: FC<ThumbnailProps> = ({ alt, size, src, onClick, songId }) => {
  const { activeSongId } = useSelector((state: RootState) => state.activeSong);
  const [isPlayingItSelf, setIsPlayingItSelf] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    activeSongId === songId
      ? setIsPlayingItSelf(true)
      : setIsPlayingItSelf(false);
  }, [activeSongId]);

  return (
    <div className="relative cursor-pointer">
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
            dispatch(triggerPlayASingleSong({ activeSongId: songId }));
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
