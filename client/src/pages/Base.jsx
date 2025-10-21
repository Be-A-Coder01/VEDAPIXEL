// pages/Base.jsx
import React from "react";
import Face from "./Face";
import LandingPage from "./LandingPage";
import { useScroll } from "framer-motion";
import { useLocation } from "react-router-dom";

const Base = () => {
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  return (
    <div className="bg-[#101820] lg:w-[100vw] h-fit">
      {/* ✅ Show Face only when on the homepage */}
      {location.pathname === "/" && (
        <div className="sticky top-0 z-10">
          <Face scrollProgress={scrollYProgress} />
        </div>
      )}

      {/* ✅ Always show LandingPage (routing happens inside it) */}
      <div className="relative z-20">
        <LandingPage />
      </div>
    </div>
  );
};

export default Base;
