import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useGetCurrentSongByIdQuery } from "../../features/apiSlice";
import { RootState } from "../../configs/store";
import ReactPlayer from "react-player";
import PauseIcon from "../../assets/icons/PauseIcon";
import PlayIcon from "../../assets/icons/PlayIcon";

const Player: FC = () => {
  const [currentSongURL, setCurrentSongURL] = useState({});
  const { activeSongId, nextSongId, prevSongId } = useSelector(
    (state: RootState) => state.activeSong
  );

  const { data } = useGetCurrentSongByIdQuery(activeSongId);
  useEffect(() => {
    if (data) {
      setCurrentSongURL(data?.data?.data?.[128]);
    }
  }, [data]);
  // console.log(data, activeSongId);
  // console.log(currentSongURL);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-slate-200 flex items-center justify-center">
      <audio
        className="py-2 bg-transparent"
        src={`${currentSongURL}`}
        controls
        autoPlay
      ></audio>
    </div>
  );
};

export default Player;
