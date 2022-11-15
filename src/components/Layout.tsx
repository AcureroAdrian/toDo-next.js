import { NextPage } from "next";
import { FC } from "react";
import Navbar from "./Navbar";

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const Layout: NextPage<Props> = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

export default Layout;
