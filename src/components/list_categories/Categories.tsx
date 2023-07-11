import React, { FC } from "react";
import { music_genre_categories } from "../../items/categories/categories.item";

type Props = {};

const Categories: FC = (props: Props) => {
  return (
    <div className="flex w-full relative top-0 bottom-0 left-0 right-0  justify-start px-2 overflow-auto pt-20 pb-16 bg-gradient-to-b from-pink-500/50 via-black-500/40 to-black">
      {music_genre_categories.map((item) => (
        <div
          className="my-6 py-4 flex items-center mr-6 px-2 z-10 bg-white/10 rounded-lg text-white/80"
          key={item.id}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default Categories;
