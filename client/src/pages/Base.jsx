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

    if (location.pathname === "/" && !hasShownFace) {
      setShowFace(true);

      const handleScroll = () => {
        // ✅ Hide Face when user scrolls down (past 100px)
        if (window.scrollY > 700) {
          setShowFace(false);
          sessionStorage.setItem("hasShownFace", "true");
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // Hide immediately on other pages
      setShowFace(false);
    }
  }, [location.pathname]);

  return (
    <div className="bg-[#101820] lg:w-[100vw] h-fit">
      <div className="sticky top-0 z-10">
        <Face scrollProgress={scrollYProgress} />
      </div>

      <div className="relative z-20">
        <LandingPage />
      </div>
    </div>
  );
};

export default Base;
