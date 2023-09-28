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
import { triggerReadySatate } from "../../features/isPlayingFlagSlice";
import { triggerPause, triggerPlay } from "../../features/isSongPlayingSlice";
import { CgSpinner } from "react-icons/cg";
interface ThumbnailProps {
  alt: string;
  size: number;
  src: string;
  songId: string;
  onClick?: () => void;
}

const Thumbnail: FC<ThumbnailProps> = ({ alt, size, src, onClick, songId }) => {
  const { activeSongId } = useSelector((state: RootState) => state.activeSong);
  const { ready } = useSelector((state: RootState) => state.ready);
  const { isSongPlaying } = useSelector(
    (state: RootState) => state.isSongPlaying
  );
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
        isSongPlaying ? (
          ready ? (
            <IsPlaying
              onClick={() => {
                setIsPlayingItSelf(false);
                dispatch(triggerPause());
              }}
              height={size / 2}
              width={size / 2}
            />
          ) : (
            <div className=" absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
              <CgSpinner size={30} className="animate-spin" />
            </div>
          )
        ) : (
          <PlayIcon
            height={size / 2}
            width={size / 2}
            color="white"
            onClick={() => {
              setIsPlayingItSelf(true);
              dispatch(triggerReadySatate(false));
              dispatch(triggerPlay());
              dispatch(triggerPlayASingleSong({ activeSongId: songId }));
            }}
          />
        )
      ) : (
        <PlayIcon
          onClick={() => {
            dispatch(triggerReadySatate(false));
            setIsPlayingItSelf(true);
            dispatch(triggerPlay());
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
