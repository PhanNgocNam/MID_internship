import React, { FC } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { useDispatch } from "react-redux";
import { dispatchCurrenttime } from "../../features/currentTimeSlice";
import { triggerReadySatate } from "../../features/isPlayingFlagSlice";

type AudioProps = {
  currentSongURL: string;
  loop: boolean;
  isPlaying: boolean;
  volume: number;
  setPercent: (params: number) => void;
  setLoaded: (params: number) => void;
  setLoading: (params: boolean) => void;
  handleNextSong: () => void;
  ref: ReactPlayerProps;
};

const Audio = React.forwardRef<any, AudioProps>((props, forwardRef) => {
  const dispatch = useDispatch();
  return (
    <ReactPlayer
      ref={forwardRef}
      style={{ display: "none" }}
      url={`${props.currentSongURL}`}
      config={{ file: { forceAudio: true } }}
      playing={props.isPlaying}
      onEnded={() => props.handleNextSong()}
      loop={props.loop}
      volume={props.volume}
      // onPause={() => dispatch(triggerReadySatate(false))}
      onPlay={() => dispatch(triggerReadySatate(true))}
      // onStart={() => dispatch(triggerReadySatate(false))}
      // muted={true}
      onReady={(e) => {
        props.setLoading(false);
        dispatch(triggerReadySatate(true));
        console.log(e);
      }}
      onProgress={(e) => {
        dispatch(dispatchCurrenttime(e.playedSeconds * 1000));
        props.setPercent(e.played * 100);
        props.setLoaded(e.loaded * 100);
      }}
    />
  );
});

export default React.memo(Audio);
