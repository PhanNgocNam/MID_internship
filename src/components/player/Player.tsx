import { FC, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetCurrentSongByIdQuery } from "../../features/apiSlice";
import { RootState } from "../../configs/store";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import PauseIcon from "../../assets/icons/PauseIcon";
import PlayIcon from "../../assets/icons/PlayIcon";
import { dispatchCurrenttime } from "../../features/currentTimeSlice";

const Player: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [currentSongURL, setCurrentSongURL] = useState({});
  const audioRef = useRef<HTMLAudioElement>(null);
  const { activeSongId, nextSongId, prevSongId } = useSelector(
    (state: RootState) => state.activeSong
  );

  const { data } = useGetCurrentSongByIdQuery(activeSongId);
  useEffect(() => {
    if (data) {
      setCurrentSongURL(data?.data?.data?.[128]);
    }
  }, [data]);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-slate-200 flex items-center justify-center">
      <audio
        className="py-2 bg-transparent"
        src={`${currentSongURL}`}
        controls
        ref={audioRef}
        onTimeUpdate={(e) =>
          dispatch(
            dispatchCurrenttime(
              audioRef.current?.currentTime
                ? audioRef.current?.currentTime * 1000
                : 0
            )
          )
        }
      />
      <button
        className="px-2"
        onClick={() =>
          navigate({
            pathname: "/playlist",
            search: `?list=${searchParams.get("list")}`,
          })
        }
      >
        Down
      </button>
      <button
        className="px-2"
        onClick={() =>
          navigate({
            pathname: "/watch",
            search: `?v=${activeSongId}&list=${searchParams.get("list")}`,
          })
        }
      >
        up
      </button>
    </div>
  );
};

export default Player;
