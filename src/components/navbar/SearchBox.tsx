import { FC, useState } from "react";
import {
  ArrowLeftOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

type SearchProps = {};

const SearchBox: FC<SearchProps> = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <>
      {isOpen ? (
        <div className="w-[80%] bg-stone-600 fixed flex items-center px-2 border border-solid border-slate-200 rounded-md">
          <ArrowLeftOutlined onClick={() => setIsOpen(false)} />
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
