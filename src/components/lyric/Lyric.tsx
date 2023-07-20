import React, { useRef, useState } from "react";
import { useGetLyricByIdQuery } from "../../features/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../configs/store";
import { motion } from "framer-motion";

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
  pre: string;
  now: string;
  next: string;
}

export default function Lyric({}: Props) {
  const { activeSongId } = useSelector((state: RootState) => state.activeSong);
  const { time } = useSelector((state: RootState) => state.currentTime);
  const { data: lyricRawData } = useGetLyricByIdQuery(activeSongId);
  const moveFowardRef = useRef<number>(0);
  const lyricRef = useRef<ILyric>({ pre: "", now: "", next: "" });
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

  // console.log(lyricData);
  return (
    <div className="text-white h-[40vh] overflow-x-hidden overflow-y-scroll relative">
      <div
        style={{ top: `${moveFowardRef.current}px` }}
        className="absolute right-0 left-0 bottom-0"
      >
        {lyricData?.map((l: any, index: number, original: any) => {
          if (time > l.startTime && time < l.endTime) {
            const { pre, now, next } = lyricRef.current;
            lyricRef.current.pre = original[index - 1]?.lyric;
            lyricRef.current.now = original[index]?.lyric;
            lyricRef.current.next = original[index + 1]?.lyric;
            return (
              <>
                {now ? (
                  <motion.div
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: 1 }}
                    // exit={{ y: "-30px" }}
                    transition={{ duration: 0.1 }}
                    className="text-center"
                  >
                    <p className="py-4">{pre}</p>
                    <h1 className="text-lg text-center bg-slate-400 text-purple-800 font-bold">
                      {now}
                    </h1>
                    <p className="py-4">{next} </p>
                  </motion.div>
                ) : (
                  <h1>...</h1>
                )}
              </>
            );
          }
        })}
      </div>
    </div>
  );
}
