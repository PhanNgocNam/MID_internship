import { useSelector } from "react-redux";
import { FC, useEffect, useState } from "react";
import { RootState } from "../../configs/store";
import {
  ArrowLeftOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { AutoComplete, theme } from "antd";
const { useToken } = theme;

type SearchProps = {};

const SearchBox: FC<SearchProps> = ({}) => {
  const { token } = useToken();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const { size } = useSelector((state: RootState) => state.size);
  useEffect(() => {
    if (size >= 768) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [size]);
  return (
    <>
      {isOpen ? (
        <div className="w-[80%] bg-stone-600 fixed flex items-center px-2 border border-solid border-slate-200 rounded-md md:relative md:border-white/20 md:bg-stone-600/50  md:max-w-[60%]">
          <ArrowLeftOutlined
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <input
            className="w-full bg-transparent p-2 outline-none"
            placeholder="Search song, albums, artists, podcasts..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput ? (
            <div className="w-full h-44 absolute top-[34px] left-0 bottom-0 bg-black">
              adasd
            </div>
          ) : (
            ""
          )}
          {/* <AutoComplete style={{ width: "100%" }} /> */}
          {searchInput ? (
            <CloseOutlined onClick={() => setSearchInput("")} />
          ) : (
            ""
          )}
        </div>
      ) : (
        <SearchOutlined
          className="text-xl font-thin"
          onClick={() => setIsOpen(true)}
        />
      )}
    </>
  );
};

export default SearchBox;
