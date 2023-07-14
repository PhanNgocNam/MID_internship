import { useEffect, FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { get } from "../../utils/request";
import apiInstance from "../../configs/api";
import { Skeleton } from "antd";
import Suffle from "../../assets/icons/Suffle";

interface ISong {
  artistsNames: string;
  duration: number;
  encodeId: string;
  releaseDate: number;
  title: string;
  thumbnail: string;
  thumbnailM: string;
}

type playlistType = {
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
  const location = useLocation();
  const { id } = location.state;
  const [playlist, setPlaylist] = useState<playlistType>({
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
  useEffect(() => {
    get(apiInstance.PLAYLIST_INFO_API + `?id=${id}`)
      .then((res) => setPlaylist(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(playlist);
  return (
    <div className="bg-black h-[100vh] px-2 text-white/80 overflow-hidden">
      {playlist.thumbnail ? (
        <div className="h-full pt-[64px]">
          <div className="py-2 h-fit  flex flex-col justify-center items-center">
            <img
              src={playlist.thumbnailM}
              className="max-h-[320px] rounded-md"
            />
            <h1 className="text-[22px] py-[2px] mt-3">{playlist.title}</h1>
            <p className="text-white/60 py-[2px]">
              Cập nhật:{" "}
              {new Date(playlist.contentLastUpdate * 1000).toLocaleString(
                "en-GB",
                {
                  timeZone: "UTC",
                }
              )}
            </p>
            <p className="text-white/60 py-[2px]">{playlist.artistsNames}</p>
            <p className="text-white/60 py-[2px]">
              {Math.floor(playlist.like / 1000)}k yêu thích
            </p>
            <button className="flex items-center justify-between w-fit border border-solid border-white/40 p-3 rounded-full text-black bg-white/70 mt-3">
              <Suffle width={20} height={20} /> Phát ngẫu nhiên
            </button>
          </div>
          <div className="text-white/70 overflow-y-auto h-[40%]">
            {playlist.song.items.map((song) => (
              <div
                className="flex py-2 px-9 items-center border-t border-solid border-white/10"
                key={song.encodeId}
              >
                <img className="h-12 rounded-sm pr-2" src={song.thumbnail} />
                <div className="pr-6">
                  <h1 className="text-lg one_line mb-1">{song.title}</h1>
                  <p className="text-white/40">{song.artistsNames}</p>
                </div>
                <p>
                  {Math.floor(song.duration / 60)}:
                  {Math.floor(song.duration % 60)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full overflow-hidden">
          <Skeleton className="bg-slate-200/30  py-16" active />
          <Skeleton className="bg-slate-200/30  py-16" active />
          <Skeleton className="bg-slate-200/30  py-16" active />
          <Skeleton className="bg-slate-200/30  py-16" active />
        </div>
      )}
    </div>
  );
};

export default Playlist;
