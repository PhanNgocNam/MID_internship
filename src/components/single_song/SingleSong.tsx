import React, { FC } from "react";
import { ISong } from "../../pages/playlist";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { triggerPlayASingleSong } from "../../features/currentSongActiveSlice";
const SingleSong: FC<ISong> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = { v: props.encodeId, list: props.playlistId };

  return (
    <div
      onClick={() => {
        navigate({
          pathname: "/watch",
          search: `${createSearchParams(params)}`,
        });
        dispatch(
          triggerPlayASingleSong({
            activeSongId: props.encodeId,
          })
        );
      }}
    >
      <div
        className="flex justify-between text-white/70 py-2 px-9 items-center border-t border-solid border-white/10"
        key={props.encodeId}
      >
        <div className="flex items-center">
          <img className="h-12 rounded-sm pr-2" src={props.thumbnail} />
          <div className="pr-6">
            <h1 className="text-lg one_line mb-1">{props.title}</h1>
            <p className="text-white/40 text-xs">{props.artistsNames}</p>
          </div>
        </div>
        <p>
          {Math.floor(props.duration / 60)}:{Math.floor(props.duration % 60)}
        </p>
      </div>
    </div>
  );
};

export default SingleSong;
