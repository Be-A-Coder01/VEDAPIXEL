// pages/LandingPage.jsx

import React from "react";
import Menu from "./Menu";
import Body from "./Body";
import Contact from "./Contact";
import Footer from "./Footer";
import ContactPage from "./ContactPage";

const LandingPage = () => {
  return (
    <>
      <div className=" ">
        <Menu />
        <div className=" w-full pt-[32px] h-fit border border-[#101820]">
          {/* <Body />
          <Contact />
          <Footer /> */}
          <ContactPage></ContactPage>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
