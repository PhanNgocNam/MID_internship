import { FC, useEffect, useState, useRef } from "react";
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
import clsx from "clsx";

const Watch: FC = () => {
  const [searchParams] = useSearchParams();
  const { data: playList } = useGetPlaylistInfoByIdQuery(
    searchParams.get("list")
  );
  const activeRef = useRef<HTMLDivElement | null>(null);
  const { activeSongId } = useSelector((state: RootState) => state.activeSong);
  const { data: song } = useGetSongInfoByIdQuery(searchParams.get("v"));
  const [playLists, setPlayLists] = useState<any>([]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `DANH SÁCH PHÁT`,
      children: (
        <div className="md:overflow-y-auto h-[60vh] pt-10 upnext_container">
          {playLists?.map((item: ISong) => {
            if (searchParams.get("v") === item.encodeId) {
              activeRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
            return (
              <div
                key={item.encodeId}
                ref={searchParams.get("v") === item.encodeId ? activeRef : null}
                className={clsx({
                  "bg-white/10": searchParams.get("v") === item.encodeId,
                })}
              >
                <SingleSong
                  artistsNames={item.artistsNames}
                  duration={item.duration}
                  encodeId={item.encodeId}
                  title={item.title}
                  releaseDate={item.releaseDate}
                  thumbnail={item.thumbnail}
                  thumbnailM={item.thumbnailM}
                  playlistId={playList?.data?.data?.encodeId}
                />
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: "2",
      label: `LỜI BÀI HÁT`,
      children: (
        <div className="text-white relative overflow-hidden md:h-fit md:pl-2">
          <Lyric />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (playList) {
      setPlayLists(playList?.data?.data?.song?.items);
    }
  }, [playList]);

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0.6 }}
      animate={{ y: 0, x: 0, opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
      className="overflow-y-auto"
    >
      <div className="bg-gradient-to-b from-pink-500/50 via-black-500/40 to-black h-[20dvh] relative z-10 "></div>
      <div className="h-[80dvh] overflow-hidden bg-black p-2 md:flex md:justify-between md:items-center md:px-10">
        <div
          style={{ backgroundImage: `url(${song?.data?.data?.thumbnailM})` }}
          className="relative bg-cover rounded-sm  flex items-center justify-center  md:max-h-[60vh] md:h-[60vh] md:w-[50%] border border-solid border-white/30"
        >
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/80" />
          <motion.img
            className="rounded-md border-2 p-2 border-gray-600/50 border-solid z-10 
            "
            src={song?.data?.data?.thumbnailM}
            alt={"img-thumb"}
          />
        </div>
        <div className="md:w-1/3 md:h-[60dvh] md:overflow-y-hidden border border-solid border-white/10 rounded-sm relative ">
          <Tabs
            className="absolute top-0 left-0 right-0 bottom-0"
            defaultActiveKey="1"
            items={items}
            centered
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Watch;
