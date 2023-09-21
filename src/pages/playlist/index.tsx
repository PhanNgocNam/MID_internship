import { useEffect, FC, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { get } from "../../utils/request";
import apiInstance from "../../configs/api";
import Suffle from "../../assets/icons/Suffle";
import SingleSong from "../../components/single_song/SingleSong";
import { motion } from "framer-motion";
import { useGetPlaylistInfoByIdQuery } from "../../features/apiSlice";
import { useDispatch } from "react-redux";
import { handlePreProcessingPlaylistInfoData } from "../../utils/handlePreProcessingPlaylistInfoData";
import Skeleton from "../../components/skeleton/Skeleton";

export interface ISong {
  artistsNames: string;
  duration: number;
  encodeId: string;
  releaseDate: number;
  title: string;
  thumbnail: string;
  thumbnailM: string;
  playlistId: string;
}

export type playlistType = {
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

  useEffect(() => {
    if (playlist) {
      handlePreProcessingPlaylistInfoData(playlist);
    }
  }, [searchParams.get("list"), playlist]);

  useEffect(() => {
    setPlaylist(playListInfo?.data?.data);
  }, [playListInfo]);

  return (
    <div className="bg-black h-[100dvh] p-2 text-white/80 overflow-hidden">
      {playlist ? (
        <>
          <div className="h-fit pt-[60px] flex justify-between items-center md:justify-start">
            <img
              src={playlist.thumbnailM}
              className="h-[160px] rounded-md md:h-60"
            />
            <div className="ml-2 flex items-start flex-col md:pl-8">
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

              <div className="pt-3 hidden md:block">
                <button className="p-2 border border-solid border-white/80 rounded-full mr-2">
                  Shuffer
                </button>
                <button className="p-2 border border-solid border-white/80 rounded-full">
                  Save to library
                </button>
              </div>
            </div>
          </div>
          <div className="pb-2 md:hidden">
            <button className="py-1 px-2 border border-solid border-white/80 rounded-full mr-2 text-sm">
              Shuffer
            </button>
            <button className="py-1 px-2 border border-solid border-white/80 rounded-full text-sm">
              Save to library
            </button>
          </div>
          <div className="text-white/70 overflow-y-auto pb-40 h-[70%] none_scrollbar listsong_palaylist_container">
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
        <div className="h-full pt-[60px]">
          <div className="h-[240px] flex">
            <Skeleton height={240} width={240} unit="px" />
            <div className="flex-1 flex flex-col justify-evenly px-4">
              <Skeleton height={16} width={40} unit="%" />
              <Skeleton height={16} width={40} unit="%" />
              <Skeleton height={16} width={40} unit="%" />
              <Skeleton height={16} width={40} unit="%" />
            </div>
          </div>
          <div className="h-[70%] flex justify-evenly flex-col">
            <Skeleton height={16} width={100} unit="%" />
            <Skeleton height={16} width={100} unit="%" />
            <Skeleton height={16} width={100} unit="%" />
            <Skeleton height={16} width={100} unit="%" />
            <Skeleton height={16} width={100} unit="%" />
            <Skeleton height={16} width={100} unit="%" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlist;
