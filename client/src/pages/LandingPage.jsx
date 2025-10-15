// pages/LandingPage.jsx

import React from "react";
import Menu from "./Menu";
import Body from "./Body";

const LandingPage = () => {
  return (
    <>
      <Menu />
      <div className="min-h-[200vh]">
        <Body />
      </div>
    </>
  );
};

export default LandingPage;
