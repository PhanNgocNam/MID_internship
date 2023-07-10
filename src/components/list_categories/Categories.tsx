import React, { FC } from "react";
import { music_genre_categories } from "../../items/categories/categories.item";

type Props = {};

const Categories: FC = (props: Props) => {
  return (
    <div className="flex justify-start px-2 overflow-auto pt-20">
      {music_genre_categories.map((item) => (
        <div
          className="my-6 py-4 flex items-center mr-6 px-2 bg-white/10 rounded-lg text-white/80"
          key={item.id}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default Categories;
