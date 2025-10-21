// pages/Base.jsx
import React, { useState, useEffect } from "react";
import Face from "./Face";
import LandingPage from "./LandingPage";
import { useScroll } from "framer-motion";
import { useLocation } from "react-router-dom";

const Base = () => {
  const { scrollYProgress } = useScroll();
  const location = useLocation();

  const [showFace, setShowFace] = useState(false);

  useEffect(() => {
    const hasShownFace = sessionStorage.getItem("hasShownFace");

    // ✅ Only show Face if user is on "/" and hasn't seen it before
    if (location.pathname === "/" && !hasShownFace) {
      setShowFace(true);

      // After 3 seconds, hide Face and remember that it was shown
      const timer = setTimeout(() => {
        setShowFace(false);
        sessionStorage.setItem("hasShownFace", "true");
      }, 3000); // ⏱️ Adjust display duration here (in ms)

      return () => clearTimeout(timer);
    } else {
      // Hide Face immediately on any other route
      setShowFace(false);
    }
  }, [location.pathname]);

  return (
    <div className="bg-[#101820] lg:w-[100vw] h-fit">
      {showFace && (
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
