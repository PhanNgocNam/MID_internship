import { FC } from "react";
import { ISong } from "../../pages/playlist";
import { createSearchParams } from "react-router-dom";
import { navigateToWatch } from "../../utils/navigateToWatchRoute";
import { triggerPlayASong } from "../../utils/triggerPlayASong";
import apiInstance from "../../configs/api";
import Thumbnail from "../thumbnail/Thumbnail";
import { handlePreProcessingPlaylistInfoData } from "../../utils/handlePreProcessingPlaylistInfoData";
import { get } from "../../utils/request";

const SingleSong: FC<ISong> = (props) => {
  const params = { v: props.encodeId, list: props.playlistId };

  return (
    <div
      onClick={async () => {
        navigateToWatch({
          pathname: "/watch",
          search: `${createSearchParams(params)}`,
        });
        triggerPlayASong(props.encodeId);
        const playlistData = await get(
          `${apiInstance.PLAYLIST_INFO_API}?id=${props.playlistId}`
        );
        handlePreProcessingPlaylistInfoData(playlistData?.data?.data);
      }}
    >
      <div
        className="flex justify-between text-white/70 py-2 items-center border-t border-solid border-white/10 md:px-2 cursor-pointer"
        key={props.encodeId}
      >
        <div className="flex items-center relative">
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
