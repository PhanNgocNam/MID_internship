import { FC } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { navigateToWatch } from "../../../utils/navigateToWatchRoute";
import { triggerPlayASong } from "../../../utils/triggerPlayASong";
import { createSearchParams } from "react-router-dom";

type HomeBannerItems = {
  type: number;
  link: string;
  banner: string;
  cover: string;
  target: string;
  title?: string;
  description?: string;
  ispr: number;
  encodeId: string;
};

type HomeBannerProps = {
  sectionType?: string;
  items: HomeBannerItems[];
};

const HomeBanner: FC<HomeBannerProps> = ({ items }) => {
  return (
    <div className="pt-6 px-2 md:w-full md:px-10">
      <Splide
        options={{
          rewind: true,
          type: "loop",
          drag: "free",
          // focus: "center",
          perPage: 2,
          // arrows: false,
          pagination: false,
          autoplay: true,
        }}
      >
        {items.map((slideItem, index) => {
          const params = { list: slideItem.encodeId };
          return (
            <SplideSlide key={index} className="md:max-w-[30%] flex">
              <img
                onClick={() => {
                  navigateToWatch({
                    pathname: "/playlist",
                    search: `${createSearchParams(params)}`,
                  });
                }}
                className="overflow-hidden rounded-md md:max-w-[100%]  cursor-pointer"
                src={slideItem.banner}
              />
              <div className="px-1 w-1" />
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};
export default HomeBanner;
