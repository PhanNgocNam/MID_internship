import { FC } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useNavigate, createSearchParams } from "react-router-dom";

interface IArtists {
  id: string;
  name: string;
  playlistId: string;
  thumbnail: string;
  totalFollow: number;
}

interface IPlaylistInfo {
  encodeId: string;
  sortDescription: string;
  title: string;
  thumbnail: string;
  artistsNames: string;
  artists: IArtists;
}

type SectionProps = {
  title: string;
  sectionId?: string;
  viewType?: string;
  items: IPlaylistInfo[];
};

const Section: FC<SectionProps> = ({ title, items }) => {
  const navigate = useNavigate();
  return (
    <div className="p-2 text-white/90 mt-2">
      <h3 className="py-2 text-xl">{title}</h3>
      <Splide options={{ perPage: 2, drag: "free", pagination: false }}>
        {items?.map((playlist) => {
          const params = { list: playlist.encodeId };
          return (
            <SplideSlide
              onClick={() =>
                navigate({
                  pathname: "/playlist",
                  search: `${createSearchParams(params)}`,
                })
              }
              key={playlist.encodeId}
            >
              <img
                className="p-2 rounded-[10px] overflow-hidden"
                src={playlist.thumbnail}
              />
              <p className="two_line text-white/70 m-2">
                {playlist.sortDescription}
              </p>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default Section;
