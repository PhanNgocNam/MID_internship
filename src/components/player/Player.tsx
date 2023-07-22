import { FC, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetCurrentSongByIdQuery } from "../../features/apiSlice";
import { RootState } from "../../configs/store";
import { Spin } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";
import PauseIcon from "../../assets/icons/PauseIcon";
import PlayIcon from "../../assets/icons/PlayIcon";
import UpIcon from "../../assets/icons/UpIcon";
import DownIcon from "../../assets/icons/DownIcon";
import { dispatchCurrenttime } from "../../features/currentTimeSlice";
import { Slider } from "antd";
import clsx from "clsx";
import Audio from "./Audio";

import {
  BiSkipNext,
  BiSkipPrevious,
  BiVolumeFull,
  BiShuffle,
  BiRepeat,
} from "react-icons/bi";
import { triggerPlayASingleSong } from "../../features/currentSongActiveSlice";

const Player: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [currentSongURL, setCurrentSongURL] = useState<string>("");
  const [percent, setPercent] = useState<number>(0);
  const audioRef = useRef<any>(null);
  const [loop, setloop] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [loaded, setLoaded] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const { activeSongId } = useSelector((state: RootState) => state.activeSong);
  const { playlistIsActive } = useSelector(
    (state: RootState) => state.activePlaylist
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(
    activeSongId ? false : true
  );

  const { data } = useGetCurrentSongByIdQuery(activeSongId);
  useEffect(() => {
    if (data) {
      setCurrentSongURL(data?.data?.data?.[128]);
    }
  }, [data]);

  useEffect(() => {
    audioRef.current?.seekTo(percent / 100, "fraction");
  }, [percent]);

  useEffect(() => {
    setLoading(true);
  }, [activeSongId]);

  const handleNextSong = () => {
    const index: number = playlistIsActive.findIndex(
      (song: string) => song === activeSongId
    );
    index + 1 &&
      navigate({
        pathname: "/watch",
        search: `?v=${playlistIsActive[index + 1]}&list=${searchParams.get(
          "list"
        )}`,
      });
    dispatch(
      triggerPlayASingleSong({
        activeSongId: playlistIsActive[index + 1],
      })
    );
  };
  const handlePrevSong = () => {
    const index: number = playlistIsActive.findIndex(
      (song: string) => song === activeSongId
    );
    index - 1 &&
      navigate({
        pathname: "/watch",
        search: `?v=${playlistIsActive[index - 1]}&list=${searchParams.get(
          "list"
        )}`,
      });
    dispatch(
      triggerPlayASingleSong({
        activeSongId: playlistIsActive[index - 1],
      })
    );
  };

  // console.log(audioRef.current?.duration);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-slate-200 flex justify-between px-2 items-center">
      <Audio
        audioRef={audioRef}
        currentSongURL={currentSongURL}
        loop={loop}
        isPlaying={isPlaying}
        setLoaded={setLoaded}
        setPercent={setPercent}
        volume={volume}
        setLoading={setLoading}
      />
      <div className="z-10 w-[100%] absolute top-0  right-0 left-0 overflow-hidden -translate-y-[50%]">
        <Slider
          defaultValue={0}
          value={percent}
          onChange={(percentE) => {
            setPercent(percentE);
          }}
          style={{ margin: 0 }}
          trackStyle={{
            background: "red",
          }}
          railStyle={{
            background: "gray",
            width: `${loaded}%`,
          }}
        />
      </div>

      <div className=" flex items-center justify-center">
        <BiSkipPrevious size={30} onClick={handlePrevSong} />
        {loading ? (
          <Spin />
        ) : (
          <>
            {isPlaying ? (
              <PauseIcon
                height={30}
                width={30}
                color="balck"
                onClick={() => setIsPlaying(false)}
              />
            ) : (
              <PlayIcon
                height={30}
                width={30}
                color="black"
                onClick={() => setIsPlaying(true)}
              />
            )}
          </>
        )}

        <BiSkipNext size={30} onClick={handleNextSong} />
      </div>

      <div className="flex grow items-center justify-around">
        <div>
          <Slider
            style={{ width: "80px" }}
            defaultValue={100}
            onChange={(e) => setVolume(e / 100)}
          />
        </div>
        <div>
          <BiVolumeFull />
        </div>
        <div>
          <BiShuffle />
        </div>
        <div
          className={`${clsx({
            "bg-black/10": loop,
          })} rounded-full h-7 w-7 flex items-center justify-center`}
        >
          <BiRepeat onClick={() => setloop(!loop)} />
        </div>
      </div>

      <div className="flex items-center">
        {searchParams.get("v") ? (
          <button
            className="px-2"
            onClick={() =>
              navigate({
                pathname: "/playlist",
                search: `?list=${searchParams.get("list")}`,
              })
            }
          >
            <DownIcon width={16} height={16} color="black" />
          </button>
        ) : (
          <button
            className="px-2"
            onClick={() =>
              navigate({
                pathname: "/watch",
                search: `?v=${activeSongId}&list=${searchParams.get("list")}`,
              })
            }
          >
            <UpIcon width={16} height={16} color="black" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Player;
