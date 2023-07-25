import { useSelector } from "react-redux";
import { FC, useState } from "react";
import { RootState } from "../../configs/store";
import {
  ArrowLeftOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

type SearchProps = {};

const SearchBox: FC<SearchProps> = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const { size } = useSelector((state: RootState) => state.size);
  return (
    <>
      {size > 768 ? (
        <div className="w-[80%] bg-stone-600/50 fixed flex items-center px-2 border border-solid border-slate-200 rounded-md md:relative md:w-[40%] md:border-white/20">
          <ArrowLeftOutlined
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <input
            className="w-full bg-transparent p-2 outline-none "
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
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
