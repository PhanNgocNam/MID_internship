import { FC, useState, useEffect } from "react";
import Categories from "../../components/list_categories/Categories";
import HomeBanner from "./home_banner";
import NewRelease from "./new_release";
import { get } from "../../utils/request";
import apiInstance from "../../configs/api";
import { Spin } from "antd";
import Section from "./home_slide_section/Section.home";
import { useGetHomepageDateQuery } from "../../features/apiSlice";
import Skeleton from "../../components/skeleton/Skeleton";
import { motion } from "framer-motion";

const Home: FC = () => {
  const [homeData, setHomeData] = useState<Array<any>>([]);
  const { data: HomePageData } = useGetHomepageDateQuery();
  useEffect(() => {
    if (HomePageData) {
      setHomeData(HomePageData?.data?.data?.items);
    }
  }, [HomePageData]);

  // console.log(homeData[1]);

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0.6 }}
      animate={{ y: 0, x: 0, opacity: 1 }}
      // exit={{ opacity: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
      className="bg-black h-fit min-h-[100dvh]"
    >
      <Categories />

      {homeData.length ? (
        <>
          <HomeBanner items={homeData[1]?.items} />
          <NewRelease
            items={homeData[3]?.items}
            sectionType={homeData[3]?.sectionType}
            title={homeData[3]?.title}
            link={homeData[3]?.link}
          />
          {homeData.slice(4, 9)?.map((sec, index) => (
            <Section title={sec.title} items={sec.items} key={index} />
          ))}
        </>
      ) : (
        <div className="min-h-[100px] flex items-center justify-center flex-col">
          <div className="pt-6 px-2 w-full md:px-10 h-[100px] md:h-[160px] flex justify-between">
            <Skeleton height={100} width={32} unit="%" />
            <Skeleton height={100} width={32} unit="%" />
            <Skeleton height={100} width={32} unit="%" />
          </div>
          <div className="h-[300px] w-full mt-10 md:px-10">
            <div className="w-full h-[80px] flex justify-between">
              <Skeleton height={100} width={24} unit="%" />
              <Skeleton height={100} width={24} unit="%" />
              <Skeleton height={100} width={24} unit="%" />
              <Skeleton height={100} width={24} unit="%" />
            </div>
            <div className="w-full h-[80px] flex justify-between pt-2">
              <Skeleton height={100} width={24} unit="%" />
              <Skeleton height={100} width={24} unit="%" />
              <Skeleton height={100} width={24} unit="%" />
              <Skeleton height={100} width={24} unit="%" />
            </div>
            <div className="w-full h-[80px] flex justify-between pt-2">
              <Skeleton height={100} width={24} unit="%" />
              <Skeleton height={100} width={24} unit="%" />
              <Skeleton height={100} width={24} unit="%" />
              <Skeleton height={100} width={24} unit="%" />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Home;
