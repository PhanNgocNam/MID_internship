import React, { FC, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Categories from "../../components/list_categories/Categories";

const Home: FC = () => {
  // const [x, setX] = useState<string>("");
  // console.log(x);
  return (
    <div
      className="bg-black h-[120vh]"
      onScroll={() => console.log("scroling...")}
    >
      <Navbar />
      <Categories />
    </div>
  );
};

export default Home;
