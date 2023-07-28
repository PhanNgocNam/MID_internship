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
      label: `UP NEXT`,
      children: (
        <div className="overflow-y-scroll h-[60vh] overflow-x-hidden md:h-[70vh] upnext_container">
          {playLists?.map((item: ISong) => {
            if (searchParams.get("v") === item.encodeId) {
              activeRef.current?.scrollIntoView({ behavior: "smooth" });
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
      label: `LYRICS`,
      children: (
        <div className="text-white relative overflow-hidden md:h-fit">
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
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[100vh]  overflow-hidden bg-black  p-2 md:flex md:justify-center md:items-center "
    >
      <motion.div
        initial={{ opacity: 0, x: "60%", y: "60%", scale: 0.6 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ backgroundImage: `url(${song?.data?.data?.thumbnailM})` }}
        className="relative bg-cover rounded-sm  flex items-center justify-center  md:max-h-[60vh] md:h-[60vh] md:mr-10 md:w-[50%] mt-[64px]"
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
      <div className="md:w-1/3 md:h-[70vh]">
        <Tabs defaultActiveKey="1" items={items} centered />
      </div>
    </motion.div>
  );
};

export default Watch;
