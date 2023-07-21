import React, { useRef, useState } from "react";
import { useGetLyricByIdQuery } from "../../features/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/store";
import { motion } from "framer-motion";
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
  const moveFowardRef = useRef<number>(0);
  const lyricRef = useRef<HTMLParagraphElement>(null);
  const lyricData = lyricRawData?.data?.data?.sentences.map(
    (sentence: ICentence) => {
      const rawLyric = sentence.words.map((word) => word.data);
      return {
        startTime: sentence.words[0].startTime,
        endTime: sentence.words[sentence.words.length - 1].endTime,
        lyric: rawLyric.join(" "),
      };
    }
  );

  // console.log(lyricData[0]);
  return (
    <div className="text-white h-[40vh] overflow-x-hidden overflow-y-scroll relative">
      <div className="pb-36">
        {lyricData?.map((l: ILyric, index: number, original: any) => {
          if (time > l.startTime && time < l.endTime) {
            lyricRef.current?.scrollIntoView({ behavior: "smooth" });
          }
          return (
            <p
              ref={time > l.startTime && time < l.endTime ? lyricRef : null}
              key={l.startTime}
              className={`text-center py-2 ${clsx({
                ["s"]: time >= l.startTime && time <= l.endTime,
              })}`}
            >
              {l.lyric}
            </p>
          );
        })}
      </div>
    </div>
  );
}
