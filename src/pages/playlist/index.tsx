import { useEffect, FC, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { get } from "../../utils/request";
import apiInstance from "../../configs/api";
import { Skeleton } from "antd";
import Suffle from "../../assets/icons/Suffle";
import SingleSong from "../../components/single_song/SingleSong";
import { motion } from "framer-motion";
import { useGetPlaylistInfoByIdQuery } from "../../features/apiSlice";
import { useDispatch } from "react-redux";
import { dispatchCurrentPlaylist } from "../../features/playListActiveSlice";

export interface ISong {
  artistsNames: string;
  duration: number;
  encodeId: string;
  releaseDate: number;
  title: string;
  thumbnail: string;
  thumbnailM: string;
  playlistId: string;
  onCLick?: () => void;
  nextSongId?: string;
  prevSongId?: string;
}

type playlistType = {
  encodeId: string;
  artistsNames: string;
  contentLastUpdate: number;
  listen: number;
  like: number;
  song: {
    items: ISong[];
    total: number;
    totalDuration: number;
  };
  thumbnail: string;
  thumbnailM: string;
  title: string;
};

const Playlist: FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState<playlistType>({
    encodeId: "",
    artistsNames: "",
    contentLastUpdate: 0,
    listen: 0,
    like: 0,
    song: {
      items: [],
      total: 0,
      totalDuration: 0,
    },
    thumbnail: "",
    thumbnailM: "",
    title: "",
  });
  const { data: playListInfo } = useGetPlaylistInfoByIdQuery(
    searchParams.get("list")
  );
  const hanlePreProcessingPlaylistInfoData = (playLists: any) => {
    const activePlaylist = playLists?.song?.items.map(
      (song: any) => song.encodeId
    );
    activePlaylist && dispatch(dispatchCurrentPlaylist([...activePlaylist]));
  };

  useEffect(() => {
    setPlaylist(playListInfo?.data?.data);
  }, [playListInfo]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-black h-[100vh] px-2 text-white/80 overflow-hidden"
    >
      {playlist ? (
        <>
          <div className="mt-[64px] h-fit py-3  flex justify-between items-center">
            <img src={playlist.thumbnailM} className="h-[160px] rounded-md" />
            <div className="ml-2 flex items-start flex-col">
              <h1 className="text-lg">{playlist.title}</h1>
              <p className="text-white/60 text-sm py-[2px]">
                Cập nhật:{" "}
                {new Date(playlist.contentLastUpdate * 1000).toLocaleString(
                  "en-GB",
                  {
                    timeZone: "UTC",
                  }
                )}
              </p>
              <p className="text-white/60 text-sm py-[2px]">
                {playlist.artistsNames}
              </p>
              <p className="text-white/60 text-sm py-[2px]">
                {Math.floor(playlist.like / 1000)}k yêu thích
              </p>
              <button className="flex items-center p-2 justify-between w-fit border border-solid border-white/40  rounded-full text-black bg-white/70">
                <Suffle width={20} height={20} /> Phát ngẫu nhiên
              </button>
            </div>
          </div>
          <div
            onClick={() => hanlePreProcessingPlaylistInfoData(playlist)}
            className="text-white/70 overflow-y-auto pb-40 h-[70%]"
          >
            {playlist.song.items.map((song) => (
              <SingleSong
                artistsNames={song.artistsNames}
                duration={song.duration}
                encodeId={song.encodeId}
                thumbnail={song.thumbnail}
                thumbnailM={song.thumbnailM}
                releaseDate={song.releaseDate}
                title={song.title}
                key={song.encodeId}
                playlistId={playlist.encodeId}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="h-full overflow-hidden">
          <Skeleton className="bg-slate-200/30  py-16" active />
          <Skeleton className="bg-slate-200/30  py-16" active />
          <Skeleton className="bg-slate-200/30  py-16" active />
          <Skeleton className="bg-slate-200/30  py-16" active />
        </div>
      )}
    </motion.div>
  );
};

export default Playlist;
