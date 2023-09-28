import { useEffect, useState } from "react";
import { get } from "../../utils/request";
import API from "../../configs/api";
import {
  Line,
  LineChart,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import CustomTooltip from "./custome_tooltip/CustomeToolTip";
import SingleSong from "../../components/single_song/SingleSong";
import { ISong } from "../playlist";

type Props = {};

const Explore = (props: Props) => {
  const [chartData, setChartData] = useState<any>([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await get(API.GET_HOME_CHART_API);
      setItems(data?.data?.RTChart?.items);
      setChartData(data?.data?.RTChart?.chart?.items);
    })();
  }, []);

  const n = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  const y = Object.keys(chartData).map((id: string) => chartData[id]);

  interface IItem {
    encodeId: string;
  }

  const result = n.map((el: number) => {
    if (!y.length) return 0;
    return {
      hour: y[0][el].hour + `:00`,
      top_1: y[0][el].counter,
      top_1_info: items.filter(
        (item: IItem) => item.encodeId === Object.keys(chartData)[0]
      )[0],

      top_2: y[1][el].counter,
      top_2_info: items.filter(
        (item: IItem) => item.encodeId === Object.keys(chartData)[1]
      )[0],

      top_3: y[2][el].counter,
      top_3_info: items.filter(
        (item: IItem) => item.encodeId === Object.keys(chartData)[2]
      )[0],
    };
  });

  return (
    <div className="h-[100dvh]">
      <div className="bg-gradient-to-b from-pink-500/50 via-black-500/40 to-black h-[20dvh]"></div>
      <div className="px-10">
        <div className="text-white pb-3">Xu Hướng</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={result} margin={{ top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="4 1 2" vertical={false} />
            <XAxis dataKey="hour" type="category" />

            <Tooltip content={<CustomTooltip />} />

            <Line type="monotone" dataKey="top_1" stroke="#8884d8" />
            <Line type="monotone" dataKey="top_2" stroke="#82ca9d" />
            <Line type="monotone" dataKey="top_3" stroke="#62ca2d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="px-10">
        {items.slice(0, 10)?.map((song: ISong, index: number) => (
          <div className="flex items-center">
            <div className="text-white text-lg font-bold">{index + 1}</div>
            <div className="flex-1">
              <SingleSong
                title={song.title}
                artistsNames={song.artistsNames}
                duration={song.duration}
                encodeId={song.encodeId}
                playlistId={
                  song.artists?.length
                    ? song.artists[0].playlistId
                    : "non-playlist"
                }
                releaseDate={song.releaseDate}
                thumbnail={song.thumbnail}
                thumbnailM={song.thumbnailM}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
