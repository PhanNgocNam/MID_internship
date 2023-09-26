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
    <div className="new_release p-2 text-white/80 overflow-auto md:px-10 h-fit ">
      <h3 className="py-2 text-xl md:text-2xl">{title}</h3>
      <div className="flex justify-between items-center">
        <div className="w-[85%] py-2 flex">
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => setSwitchData(item.payload)}
              className={`break-normal text-xs border border-solid border-white/10 px-4 py-1 mr-2 rounded-full ${clsx(
                {
                  "bg-gradient-to-r from-pink-500/50 via-black-500/40 to-black":
                    JSON.stringify(switchData) === JSON.stringify(item.payload),
                }
              )}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="w-[15%] text-right text-xs">
          <button>Tất cả </button>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="w-[180%] grid grid-cols-3 grid-rows-3 gap-4 lg:grid-cols-4 md:w-full ">
          {newReleaseData.slice(0, 12).map((song: any) => (
            <div
              key={song.encodeId}
              className={`flex justify-between items-center py-2 ${clsx({
                ["bg-gray-50/10"]: activeSongId.activeSongId === song.encodeId,
              })} px-2 border border-solid border-white/10 rounded-md`}
            >
              <Thumbnail
                songId={song.encodeId}
                alt={song.title}
                size={50}
                src={song.thumbnailM}
              />
              <div className="flex flex-col text-sm text-right text-white md:text-right ">
                <h2 className="py-1">{song.title}</h2>
                <h4 className="text-white/50 text-xs">{song.artistsNames}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewRelease;
