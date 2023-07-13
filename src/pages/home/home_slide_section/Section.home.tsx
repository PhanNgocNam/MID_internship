import { FC } from "react";

type SectionProps = {
  title: string;
  sectionId: string;
  viewType?: string;
  items: {
    encodeId: string;
    sortDescription: string;
    title: string;
    thumbnail: string;
    artistsNames: string;
    artists: {
      id: string;
      name: string;
      playlistId: string;
      thumbnail: string;
      totalFollow: number;
    }[];
  };
};

const Section: FC<SectionProps> = () => {
  return <div>Section</div>;
};

export default Section;
