import { FC, useEffect, useState } from "react";
import Thumbnail from "../../../components/thumbnail/Thumbnail";
import { useDispatch, useSelector } from "react-redux";
import { data } from "../../../items/new_release/new_release.item";
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

interface ISwitch {
  all: boolean;
  vi: boolean;
  other: boolean;
}

const NewRelease: FC<INewRelease> = ({ items, title }) => {
  const dispatch = useDispatch();
  const activeSongId = useSelector((state: RootState) => state.activeSong);
  const [newReleaseData, setNewReleaseData] = useState<any>([]);
  const [switchData, setSwitchData] = useState<ISwitch>({
    all: true,
    vi: false,
    other: false,
  });

  useEffect(() => {
    switchData.all && setNewReleaseData(items.all);
    switchData.vi && setNewReleaseData(items.vPop);
    switchData.other && setNewReleaseData(items.others);
  }, [switchData]);

  return (
    <div className="new_release p-2 text-white/80 h-[300px] overflow-auto border-solid border border-white/10 md:px-10 md:border-0 md:h-fit">
      <h3 className="py-2 text-xl md:text-2xl">{title}</h3>
      <div className="flex justify-between items-center">
        <div className="w-[80%] py-2">
          {data.map((item) => (
            <button className="border border-solid border-white/10 px-4 py-1 mr-2 rounded-full">
              {item.label}
            </button>
          ))}
        </div>
        <div className="w-[20%] text-right">
          <button>Tất cả </button>
        </div>
      </div>
      <div className="md:grid md:grid-cols-3 md:grid-rows-3 gap-4 lg:grid-cols-4">
        {newReleaseData.slice(0, 15).map((song: any) => (
          <div
            key={song.encodeId}
            className={`flex justify-between items-center border-t border-solid border-white/10 py-2 ${clsx(
              { ["bg-gray-50/10"]: activeSongId.activeSongId === song.encodeId }
            )} md:px-2 md:border md:border-solid md:border-white/10 md:rounded-s`}
          >
            <Thumbnail
              songId={song.encodeId}
              alt={song.title}
              size={50}
              src={song.thumbnailM}
            />
            <div className="flex flex-col text-right text-white md:text-right ">
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
