import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/store";
import { useSearchParams } from "react-router-dom";
import { ISong } from "../playlist";
import {
  useGetPlaylistInfoByIdQuery,
  useGetSongInfoByIdQuery,
} from "../../features/apiSlice";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import SingleSong from "../../components/single_song/SingleSong";
import { motion } from "framer-motion";
import Lyric from "../../components/lyric/Lyric";

const Watch: FC = () => {
  const [searchParams] = useSearchParams();
  const { data: playList } = useGetPlaylistInfoByIdQuery(
    searchParams.get("list")
  );
  const { data: song } = useGetSongInfoByIdQuery(searchParams.get("v"));
  const [playLists, setPlayLists] = useState<any>([]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `UP NEXT`,
      children: (
        <div className="overflow-y-scroll overflow-x-hidden h-[40vh]">
          {playLists?.map((item: ISong, index: number, orignal: any) => (
            <div>
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
      children: <Lyric />,
    },
  ];

  useEffect(() => {
    if (playList) {
      setPlayLists(playList?.data?.data?.song?.items);
    }
  }, [playList]);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0, scaleY: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full bg-black pt-[64px] p-2"
    >
      <motion.div
        initial={{ opacity: 0, x: "60%", y: "60%", scale: 0.6 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ backgroundImage: `url(${song?.data?.data?.thumbnailM})` }}
        className="relative max-h-[40vh] bg-cover rounded-sm h-[40vh] flex items-center justify-center"
      >
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/80" />
        <motion.img
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="rounded-full border-2 p-2 border-gray-600/50 border-solid z-10"
          src={song?.data?.data?.thumbnailM}
          alt={""}
        />
      </motion.div>
      <div className="h-[41vh]">
        <Tabs defaultActiveKey="1" items={items} centered />
      </div>
    </motion.div>
  );
};

export default Watch;
