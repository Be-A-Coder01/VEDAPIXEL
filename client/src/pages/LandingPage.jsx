// pages/LandingPage.jsx

import React from "react";
import Menu from "./Menu";
import Body from "./Body";
import Contact from "./Contact";
import Footer from "./Footer";
import ContactPage from "./ContactPage";
import MainSection from "./MainSection";
import AboutPage from "./AboutPage";
import { Routes, Route } from "react-router-dom"; // ✅ Correct import

const LandingPage = () => {
  return (
    <>
      <div>
        <Menu />
        <div className="w-[99vw] pt-[32px] h-fit ">
          <Routes>
            <Route path="/" element={<MainSection />} />
            {/* <Route path="/contactus" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} /> */}
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default LandingPage;
