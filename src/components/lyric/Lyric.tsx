import { useRef } from "react";
import { useGetLyricByIdQuery } from "../../features/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/store";
import clsx from "clsx";

type Props = {};

interface IWords {
  startTime: number;
  endTime: number;
  data: string;
}

interface ICentence {
  words: IWords[];
}

interface ILyric {
  startTime: number;
  endTime: number;
  lyric: string;
}

export default function Lyric({}: Props) {
  const { activeSongId } = useSelector((state: RootState) => state.activeSong);
  const { time } = useSelector((state: RootState) => state.currentTime);
  const { data: lyricRawData } = useGetLyricByIdQuery(activeSongId);
  const lyricRef = useRef<HTMLParagraphElement>(null);
  const lyricData = lyricRawData?.data?.data?.sentences?.map(
    (sentence: ICentence) => {
      const rawLyric = sentence.words.map((word) => word.data);
      return {
        startTime: sentence.words[0].startTime,
        endTime: sentence.words[sentence.words.length - 1].endTime,
        lyric: rawLyric.join(" "),
      };
    }
  );

  return (
    <div className="h-[30vh] overflow-y-scroll md:h-[70vh] lyric_container">
      <div className="h-fit">
        {lyricData?.map((l: ILyric) => {
          if (time > l.startTime && time < l.endTime) {
            lyricRef.current?.scrollIntoView({ behavior: "smooth" });
          }
          return (
            <p
              ref={time > l.startTime && time < l.endTime ? lyricRef : null}
              key={l.startTime}
              className={`py-2 ${clsx({
                ["s"]: time >= l.startTime && time <= l.endTime + 1,
              })} md:text-left`}
            >
              {l.lyric}
            </p>
          );
        })}
      </div>
    </div>
  );
}
