import React, { FC, ReactNode } from "react";
import Navbar from "../../components/navbar/Navbar";

interface IProps {
  children: ReactNode;
}

const DefaultLayout: FC<IProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default DefaultLayout;
