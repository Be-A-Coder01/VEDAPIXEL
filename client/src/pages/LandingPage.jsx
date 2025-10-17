// pages/LandingPage.jsx

import React from "react";
import Menu from "./Menu";
import Body from "./Body";
import Contact from "./Contact";

const LandingPage = () => {
  return (
    <>
      <div className=" ">
        <Menu />
        <div className=" w-full pt-[32px] ">
          <Body />
          <Contact />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
