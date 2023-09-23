import { useSelector } from "react-redux";
import { FC, KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { RootState } from "../../configs/store";
import {
  ArrowLeftOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import useDebounce from "../../hooks/useDebounce";
import useToggle from "../../hooks/useToggle";
import {
  useGetPlaylistInfoByIdQuery,
  useGetSearchDataQuery,
} from "../../features/apiSlice";
import { get } from "../../utils/request";
import apiInstance from "../../configs/api";
import { Avatar } from "antd";
import { triggerPlayASong } from "../../utils/triggerPlayASong";
import { navigateToWatch } from "../../utils/navigateToWatchRoute";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { handlePreProcessingPlaylistInfoData } from "../../utils/handlePreProcessingPlaylistInfoData";
import Skeleton from "../skeleton/Skeleton";
import SearchIcon from "../../assets/icons/Search";

type SearchProps = {};

interface ISearchSong {
  encodeId: string;
  title: string;
  thumbnail: string;
  thumbnailM: string;
  artistsNames: string;
  duration: number;
}

const SearchBox: FC<SearchProps> = ({}) => {
  const [value, toggleValue] = useToggle(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const searchFocusRef = useRef<HTMLDivElement | null>(null);
  const [focusFlag, setFocusFlag] = useState<number>(0);

  const [searchData, setSearchData] = useState<any>({});
  useDebounce(
    async () => {
      if (!searchInput) return;
      const res = await get(`${apiInstance.SEARCH_API}?id=${searchInput}`);
      if (!res.result) return;
      setSearchData(res?.data?.data);
    },
    1000,
    searchInput
  );

  // console.log(searchData);

  const { size } = useSelector((state: RootState) => state.size);
  useEffect(() => {
    if (size >= 768) {
      toggleValue(true);
    } else {
      toggleValue(false);
    }
  }, [size]);

  const handleFocusWhenPressKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusFlag((focusFlag) => (focusFlag + 1) % 3);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusFlag((focusFlag) => (focusFlag - 1) % 3);
    }
  };

  useEffect(() => {
    searchFocusRef.current?.focus();
  }, [focusFlag]);

  return (
    <>
      {value ? (
        <div className="w-[80%] bg-stone-600 fixed left-1/2 -translate-x-1/2 top-[65px] flex items-center px-2 border border-solid border-slate-200 rounded-md md:relative md:top-0 md:border-white/20 md:bg-stone-600/50  md:max-w-[60%]">
          <ArrowLeftOutlined
            className="md:hidden"
            onClick={() => toggleValue(false)}
          />
          <input
            className="w-full bg-transparent p-2 outline-none"
            placeholder="Tìm kiếm bài hát..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                searchFocusRef.current?.focus();
              }
            }}
          />
          {searchInput ? (
            ""
          ) : (
            <SearchIcon height={16} width={16} color="rgba(255,255, 255, .7)" />
          )}
          {searchInput ? (
            <div className="w-full h-fit absolute top-[36px] left-0 bottom-0 bg-black rounded-sm">
              {searchData ? (
                searchData?.songs
                  ?.slice(0, 3)
                  ?.map((song: ISearchSong, index: number) => (
                    <div
                      tabIndex={1}
                      ref={index === focusFlag ? searchFocusRef : null}
                      onKeyDown={(e) => handleFocusWhenPressKeyDown(e)}
                      onClick={async () => {
                        triggerPlayASong(song.encodeId);
                        navigateToWatch({
                          pathname: "/watch",
                          search: `${createSearchParams({
                            v: song.encodeId,
                            list: searchData?.playlists[0]?.encodeId,
                          })}`,
                        });
                        const playlistData = await get(
                          `${apiInstance.PLAYLIST_INFO_API}?id=${searchData?.playlists[0]?.encodeId}`
                        );
                        handlePreProcessingPlaylistInfoData(
                          playlistData?.data?.data
                        );
                        setSearchInput("");
                        setSearchData({});
                      }}
                      className="flex p-1 my-2 outline-none active:bg-white/10 focus:bg-white/20 hover:bg-white/10"
                    >
                      <Avatar
                        alt=""
                        src={song.thumbnail}
                        size={50}
                        shape="square"
                      />
                      <div className="flex justify-center flex-col pl-4 grow select-none">
                        <h2 className="text-[16px] py-1">{song.title}</h2>
                        <p className="text-xs">{song.artistsNames}</p>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="h-20 flex flex-col justify-between">
                  <Skeleton height={20} width={100} unit="%" />
                  <Skeleton height={20} width={100} unit="%" />
                  <Skeleton height={20} width={100} unit="%" />
                  <Skeleton height={20} width={100} unit="%" />
                </div>
              )}
            </div>
          ) : (
            ""
          )}

          {searchInput ? (
            <CloseOutlined
              onClick={() => {
                setSearchInput("");
                setSearchData({});
              }}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <SearchOutlined
          className="text-xl font-thin"
          onClick={() => toggleValue(true)}
        />
      )}
    </>
  );
};

export default SearchBox;
