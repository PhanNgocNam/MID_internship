import React, { FC, useState } from "react";
import {
  ArrowLeftOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

type SearchProps = {};

const SearchBox: FC<SearchProps> = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      {isOpen ? (
        <div className="w-[70%] flex items-center px-2 border border-solid border-slate-200 rounded-sm">
          <ArrowLeftOutlined />
          <input className="w-full p-2 outline-none " placeholder="Search..." />
          <CloseOutlined />
        </div>
      ) : (
        <SearchOutlined className="text-xl font-thin" />
      )}
    </>
  );
};

export default SearchBox;
