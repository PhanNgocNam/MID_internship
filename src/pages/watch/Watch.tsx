import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RootState } from "../../configs/store";
import { ISong } from "../playlist";
import {
  useGetPlaylistByIdQuery,
  useGetSongInfoByIdQuery,
} from "../../features/apiSlice";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import SingleSong from "../../components/single_song/SingleSong";

const Watch: FC = () => {
  const [searchParams] = useSearchParams();
  const { activeThumnail } = useSelector(
    (state: RootState) => state.activeSong
  );
  const { data: playList } = useGetPlaylistByIdQuery(searchParams.get("list"));
  const { data: song } = useGetSongInfoByIdQuery(searchParams.get("v"));
  const [playLists, setPlayLists] = useState<any>([]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `UP NEXT`,
      children: (
        <div className="overflow-y-scroll overflow-x-hidden h-[40vh]">
          {playLists.map((item: ISong, index: number, orignal: any) => (
            <div className="">
              <SingleSong
                key={item.encodeId}
                artistsNames={item.artistsNames}
                duration={item.duration}
                encodeId={item.encodeId}
                title={item.title}
                releaseDate={item.releaseDate}
                thumbnail={item.thumbnail}
                thumbnailM={item.thumbnailM}
                playlistId={playList?.data?.data?.encodeId}
                nextSongId={orignal[index + 1]?.encodeId}
                prevSongId={orignal[index - 1]?.encodeId}
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: `LYRICS`,
      children: `Content of Tab Pane 2`,
    },
  ];

  useEffect(() => {
    if (playList) {
      setPlayLists(playList?.data?.data?.song?.items);
    }
  }, [playList]);

  return (
    <div className="min-h-full bg-black pt-[64px] p-2">
      <div className="max-h-[40vh] bg-white/80 h-[40vh] flex items-center justify-center">
        <img
          className="rounded-full"
          src={song?.data?.data?.thumbnailM}
          alt={activeThumnail}
        />
      </div>
      <div className="h-[41vh]">
        <Tabs defaultActiveKey="1" items={items} centered />
      </div>
    </div>
  );
};

export default Watch;
