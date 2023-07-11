import React, { FC, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Categories from "../../components/list_categories/Categories";

const Home: FC = () => {
  return (
    <div className="bg-black h-[123vh]">
      <Categories />
    </div>
  );
};

export default Home;
