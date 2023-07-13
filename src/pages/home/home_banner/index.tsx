import { FC } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

type HomeBannerProps = {
  type: number;
  link: string;
  banner: string;
  cover: string;
  target: string;
  title?: string;
  description?: string;
  ispr: number;
  encodeId: string;
}[];

const data = [
  {
    src: "https://photo-zmp3.zmdcdn.me/banner/3/3/6/2/3362cbc365ea9e288011b5708399c64c.jpg",
  },
  {
    src: "https://photo-zmp3.zmdcdn.me/banner/5/a/8/a/5a8a558ebcd1ec3d041f562c744a5e78.jpg",
  },
  {
    src: "https://photo-zmp3.zmdcdn.me/banner/a/b/d/9/abd969c915ae1ba32018654fea49039f.jpg",
  },
  {
    src: "https://photo-zmp3.zmdcdn.me/banner/9/c/7/2/9c724b3a40bb42c975652b2ef114dafa.jpg",
  },
];

const HomeBanner: FC = () => {
  return (
    <div className="pt-6 px-2">
      <Splide
        options={{
          rewind: true,
          type: "loop",
          drag: "free",
          focus: "center",
          perPage: 2,
          arrows: false,
          pagination: false,
          autoScroll: {
            pauseOnHover: true,
            pauseOnFocus: false,
            rewind: true,
            speed: 0.8,
          },
        }}
        extensions={{ AutoScroll }}
      >
        {data.map((slideItem, index) => (
          <SplideSlide key={index} className="p-3">
            <img className="overflow-hidden rounded-md" src={slideItem.src} />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
export default HomeBanner;
