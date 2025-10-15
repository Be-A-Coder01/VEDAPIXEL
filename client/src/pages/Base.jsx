// pages/Base.jsx

import React from "react";
import Face from "./Face";
import LandingPage from "./LandingPage";
import { useScroll } from "framer-motion"; // <-- CRITICAL Import

const Base = () => {
  // CRITICAL: Tracks the global document scroll position (0 to 1)
  const { scrollYProgress } = useScroll();

  return (
    <>
      <div className="bg-[#1A1C22] w-screen">
        {/* 1. HERO SECTION: Must be sticky and pass the scroll progress */}
        <div className="sticky top-0 z-10">
          <Face scrollProgress={scrollYProgress} /> {/* Passed prop */}
        </div>

        {/* 2. CONTENT SECTION: Must have higher z-index to overlap */}
        <div className="relative z-20">
          <LandingPage />
        </div>
      </div>
    </>
  );
};

export default Base;
