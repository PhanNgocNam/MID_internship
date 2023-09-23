import React, { FC } from "react";
import { music_genre_categories } from "../../items/categories/categories.item";
import { useTranslation } from "react-i18next";

type Props = {};

const Categories: FC = (props: Props) => {
  const { t } = useTranslation();
  return (
    <div className="cate flex relative top-0 bottom-0 left-0 right-0 w-full justify-start px-2 overflow-auto pt-20 pb-1 bg-gradient-to-b from-pink-500/50 via-black-500/40 to-black md:px-10  select-none">
      <div className=" my-6 py-3 min-w-fit  cursor-pointer mr-6 px-2 z-10 bg-white/10 rounded-lg text-white/80">
        {t("workout")}
      </div>
      <div className="my-6 py-3 min-w-fit cursor-pointer flex items-center mr-6 px-2 z-10 bg-white/10 rounded-lg text-white/80">
        {t("relax")}
      </div>
      <div className="my-6 py-3 min-w-fit cursor-pointer flex items-center mr-6 px-2 z-10 bg-white/10 rounded-lg text-white/80">
        {t("commute")}
      </div>
      <div className="my-6 py-3 min-w-fit flex cursor-pointer items-center mr-6 px-2 z-10 bg-white/10 rounded-lg text-white/80">
        {t("focus")}
      </div>
      <div className="my-6 py-3 min-w-fit flex cursor-pointer items-center mr-6 px-2 z-10 bg-white/10 rounded-lg text-white/80">
        {t("energlize")}
      </div>
    </div>
  );
};

export default Categories;
