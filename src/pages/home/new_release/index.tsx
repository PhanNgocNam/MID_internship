import { FC } from "react";
import Thumbnail from "../../../components/thumbnail/Thumbnail";
import { useDispatch, useSelector } from "react-redux";
import { triggerPlayASingleSong } from "../../../features/currentSongActiveSlice";
import { RootState } from "../../../configs/store";
import clsx from "clsx";

interface IItems {
  all: Array<any>;
  vPop: Array<any>;
  others: Array<any>;
}

interface INewRelease {
  items: IItems;
  link?: string;
  sectionType: string;
  title: string;
}

const NewRelease: FC<INewRelease> = ({ items, title }) => {
  const dispatch = useDispatch();
  const activeSongId = useSelector((state: RootState) => state.activeSong);

  return (
    <div className="new_release p-2 text-white/80 h-[300px] overflow-auto border-solid border border-white/10">
      <h3 className="py-2 text-xl">{title}</h3>
      <div>
        {items?.all.map((song) => (
          <div
            key={song.encodeId}
            className={`flex justify-between items-center border-t border-solid border-white/10 py-2 ${clsx(
              { ["bg-gray-50/10"]: activeSongId.activeSongId === song.encodeId }
            )}`}
          >
            <Thumbnail
              songId={song.encodeId}
              alt={song.title}
              size={50}
              src={song.thumbnailM}
            />
            <div className="flex flex-col text-right text-white">
              <h2 className="py-1">{song.title}</h2>
              <h4 className="text-white/50 text-xs">{song.artistsNames}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
