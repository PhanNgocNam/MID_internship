import React from "react";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import Thumbnail from "../../../components/thumbnail/Thumbnail";

type Props = {};

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload?.length) {
    return (
      <div className="custom-tooltip">
        <div className="text-white flex items-center bg-[#8884d8]/40 p-1 rounded-md">
          <h1 className="text-3xl font-bold bg-transparent px-1">1</h1>
          <Thumbnail
            size={50}
            songId={payload[0].payload.top_1_info.encodeId}
            src={payload[0].payload.top_1_info.thumbnailM}
            alt="img_thumb"
          />
          <div className="px-2">
            <h2>{payload[0].payload.top_1_info.title}</h2>
            <h3 className="text-sm">
              {payload[0].payload.top_1_info.artistsNames}
            </h3>
          </div>
        </div>
        <div className="text-white flex my-2 p-1 rounded-md items-center bg-[#82ca9d]/40">
          <h1 className="text-3xl font-bold bg-transparent px-1">2</h1>
          <Thumbnail
            size={50}
            songId={payload[0].payload.top_2_info.encodeId}
            src={payload[0].payload.top_2_info.thumbnailM}
            alt="img_thumb"
          />
          <div className="px-2">
            <h2>{payload[0].payload.top_2_info.title}</h2>
            <h3 className="text-sm">
              {payload[0].payload.top_2_info.artistsNames}
            </h3>
          </div>
        </div>
        <div className="text-white flex items-center bg-[#62ca2d]/40 p-1 rounded-md">
          <h1 className="text-3xl font-bold bg-transparent px-1">3</h1>
          <Thumbnail
            size={50}
            songId={payload[0].payload.top_3_info.encodeId}
            src={payload[0].payload.top_3_info.thumbnailM}
            alt="img_thumb"
          />
          <div className="px-2">
            <h2>{payload[0].payload.top_3_info.title}</h2>
            <h3 className="text-sm">
              {payload[0].payload.top_3_info.artistsNames}
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
export default CustomTooltip;
