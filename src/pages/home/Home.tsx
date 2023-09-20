import { FC, useState, useEffect } from "react";
import Categories from "../../components/list_categories/Categories";
import HomeBanner from "./home_banner";
import NewRelease from "./new_release";
import { get } from "../../utils/request";
import apiInstance from "../../configs/api";
import { Skeleton, Spin } from "antd";
import Section from "./home_slide_section/Section.home";
import { useGetHomepageDateQuery } from "../../features/apiSlice";

const Home: FC = () => {
  const [homeData, setHomeData] = useState<Array<any>>([]);
  const { data: HomePageData } = useGetHomepageDateQuery();
  useEffect(() => {
    if (HomePageData) {
      setHomeData(HomePageData?.data?.data?.items);
    }
  }, [HomePageData]);

  return (
    <div className="bg-black h-fit min-h-[100dvh]">
      <Categories />
      <HomeBanner />

      {homeData.length ? (
        <>
          <NewRelease
            items={homeData[3].items}
            sectionType={homeData[3].sectionType}
            title={homeData[3].title}
            link={homeData[3].link}
          />
          {homeData.slice(4, 9)?.map((sec, index) => (
            <Section title={sec.title} items={sec.items} key={index} />
          ))}
          {/* <Section title={homeData[3].title} items={homeData[3].items.all} /> */}
        </>
      ) : (
        <div className="min-h-[100px] flex items-center justify-center">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default Home;
