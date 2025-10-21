// pages/Base.jsx

import React, { useState, useEffect } from "react";
import Face from "./Face";
import LandingPage from "./LandingPage";
import { useScroll } from "framer-motion";
import { useLocation } from "react-router-dom";

const Base = () => {
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  // ✅ Tracks whether the Face has already been shown
  const [hasShownFace, setHasShownFace] = useState(false);

  useEffect(() => {
    if (location.pathname === "/" && !hasShownFace) {
      setHasShownFace(true);
    }
  }, [location.pathname, hasShownFace]);

  // ✅ Show Face only the very first time on the home route
  const shouldShowFace = location.pathname === "/" && !hasShownFace;

  return (
    <div className="bg-[#101820] lg:w-[100vw] h-fit">
      {shouldShowFace && (
        <div className="sticky top-0 z-10">
          <Face scrollProgress={scrollYProgress} />
        </div>
      )}

      <div className="relative z-20">
        <LandingPage />
      </div>
    </div>
  );
};

export default Base;
