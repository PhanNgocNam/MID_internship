import { List } from "antd";
import { FC } from "react";
import UserAvatar from "../../../components/avatar/UserAvatar";
import Thumbnail from "../../../components/thumbnail/Thumbnail";

interface IItems {
  all: Array<any>;
  vPop: Array<any>;
  others: Array<any>;
}

interface INewRelease {
  items: IItems;
  link?: string;
  sectionType: string;
  title: string;
}

const NewRelease: FC<INewRelease> = ({ items, link, sectionType, title }) => {
  return (
    <div className="new_release p-2 text-white/80 h-[300px] overflow-auto">
      <h3 className="py-2 text-xl">{title}</h3>
      <div>
        <List
          className="border-solid border border-white/10 rounded-md"
          size="small"
          loading={items.all.length !== 0 ? false : true}
          dataSource={items.all}
          renderItem={(item) => (
            <List.Item className="border-solid border-t border-t-white/10 first:border-0">
              <Thumbnail alt={item.title} size={50} src={item.thumbnailM} />
              <div className="flex flex-col text-right text-white">
                <h2>{item.title}</h2>
                <h3 className="text-white/50 text-xs">{item.artistsNames}</h3>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default NewRelease;
