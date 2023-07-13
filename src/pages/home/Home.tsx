import React, { FC, useState, useEffect } from "react";
import Categories from "../../components/list_categories/Categories";
import HomeBanner from "./home_banner";
import NewRelease from "./new_release";
import { get } from "../../utils/request";
import apiInstance from "../../configs/api";
import { Skeleton, Spin } from "antd";

const Home: FC = () => {
  const [homeData, setHomeData] = useState<Array<any>>([]);
  useEffect(() => {
    get(`${apiInstance.GET_DISCOVER_API}`)
      .then((res) => setHomeData(res.data.data.items))
      .catch((err) => console.log(err));
  }, []);

  console.log(homeData);
  return (
    <div className="bg-black">
      <Categories />
      <HomeBanner />
      {homeData.length !== 0 ? (
        <NewRelease
          items={homeData[2].items}
          sectionType={homeData[2].sectionType}
          title={homeData[2].title}
          link={homeData[2].link}
        />
      ) : (
        <div className="min-h-[100px] flex items-center justify-center">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default Home;
