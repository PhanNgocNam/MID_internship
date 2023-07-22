import React from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { dispatchCurrenttime } from "../../features/currentTimeSlice";

type AudioProps = {
  currentSongURL: string;
  loop: boolean;
  isPlaying: boolean;
  volume: number;
  setPercent: (params: number) => void;
  setLoaded: (params: number) => void;
  setLoading: (params: boolean) => void;
  audioRef: any;
};

const Audio = (props: AudioProps) => {
  const dispatch = useDispatch();
  console.log(props.audioRef.current.getCurrentTime());
  return (
    <ReactPlayer
      style={{ display: "none" }}
      url={`${props.currentSongURL}`}
      ref={props.audioRef}
      config={{ file: { forceAudio: true } }}
      playing={props.isPlaying}
      //   onEnded={() => handleNextSong()}
      loop={props.loop}
      volume={props.volume}
      // muted={true}
      onReady={() => props.setLoading(false)}
      onProgress={(e) => {
        console.log(e);
        dispatch(
          dispatchCurrenttime(props.audioRef.current.getCurrentTime() * 1000)
        );
        props.setPercent(e.played * 100);
        props.setLoaded(e.loaded * 100);
      }}
    />
  );
};

export default React.memo(Audio);
