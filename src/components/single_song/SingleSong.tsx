import { FC } from "react";
import { ISong } from "../../pages/playlist";
import { createSearchParams } from "react-router-dom";
import { navigateToWatch } from "../../utils/navigateToWatchRoute";
import { triggerPlayASong } from "../../utils/triggerPlayASong";
import Volume from "../../assets/icons/Volume";
import Thumbnail from "../thumbnail/Thumbnail";

const SingleSong: FC<ISong> = (props) => {
  const params = { v: props.encodeId, list: props.playlistId };

  return (
    <div
      onClick={() => {
        navigateToWatch({
          pathname: "/watch",
          search: `${createSearchParams(params)}`,
        });
        triggerPlayASong(props.encodeId);
      }}
    >
      <div
        className="flex justify-between text-white/70 py-2 items-center border-t border-solid border-white/10 md:px-2 cursor-pointer"
        key={props.encodeId}
      >
        <div className="flex items-center relative">
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Volume height={16} width={16} color="white" />
          </div> */}
          {/* <img className="h-10 rounded-sm pr-2 md:h-8" src={props.thumbnail} /> */}
          <Thumbnail
            songId={props.encodeId}
            alt={props.title}
            size={50}
            src={props.thumbnailM}
          />
          <div className="px-2">
            <h1 className="one_line mb-1 text-sm">{props.title}</h1>
            <p className="text-white/40 text-xs">{props.artistsNames}</p>
          </div>
        </div>
        <p>
          {Math.floor(props.duration / 60)
            .toString()
            .padStart(2, "0")}
          :
          {Math.floor(props.duration % 60)
            .toString()
            .padStart(2, "0")}
        </p>
      </div>
    </div>
  );
};

export default SingleSong;
