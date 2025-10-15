import React, { useEffect, useState } from "react";
import "../CSS/Body.css";
import AnimatedGridBackground from "./AnimatedGridBackground";
import { motion } from "framer-motion";
import InfiniteScrollNodes from "./InfiniteScrollNodes";

// ----------------------------------------------
// 1. Reusable Node Component
// ----------------------------------------------
const Node = ({ children, isHighlighted, className = "", style }) => {
  const baseClasses =
    "p-3 sm:p-4 text-white text-xs sm:text-sm font-medium uppercase tracking-wider rounded-lg cursor-pointer transition-all duration-200 ease-in-out border border-gray-700 whitespace-nowrap";

  const defaultClasses = `${baseClasses} bg-gray-900 hover:scale-[1.03] shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/40`;

  const highlightedClasses = `${baseClasses} font-bold 
    bg-gradient-to-r from-indigo-600 to-purple-600 border-none relative z-10`;

  const glowStyle = {
    boxShadow: isHighlighted
      ? "0 0 25px rgba(130, 94, 228, 0.9), 0 0 50px rgba(130, 94, 228, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.4)"
      : "",
    ...style,
  };

  return (
    <div
      className={`${
        isHighlighted ? highlightedClasses : defaultClasses
      } ${className}`}
      style={glowStyle}
    >
      {children}
    </div>
  );
};

// ----------------------------------------------
// 2. Futuristic Grid Component (Perfect Seamless Loop)
// ----------------------------------------------
const FuturisticGrid = ({ direction = "right", speed = 35 }) => {
  const nodesData = [
    "Mobile Applications",
    "Web Developments",
    "iOS Development",
    "Web Design",
    "UX Research",
    "User Experience",
    "Custom Software",
    "Cloud Applications",
  ];

  // Duplicate for continuous loop
  const repeatedNodes = [...nodesData, ...nodesData];

  return (
    <div className="relative overflow-hidden w-[70vw]">
      <motion.div
        className={`flex gap-5 ${
          direction === "right" ? "flex-row" : "flex-row-reverse"
        }`}
        animate={{
          x: direction === "right" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {repeatedNodes.map((label, i) => (
          <Node key={i}>{label}</Node>
        ))}
      </motion.div>
    </div>
  );
};

// ----------------------------------------------
// 3. Main Body Component
// ----------------------------------------------
const Body = () => {
  const [showBody, setShowBody] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const menu = document.querySelector(".menu-sticky");
      if (!menu) return;

      const menuRect = menu.getBoundingClientRect();
      if (menuRect.top <= 0) {
        setShowBody(true);
      } else {
        setShowBody(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ✅ Animated Background */}
      <div
        className={`body-content relative z-10 pt-30 h-screen pl-20 flex transition-all justify-evenly duration-700 ease-out ${
          showBody
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-20 pointer-events-none"
        }`}
      >
        {/* Background Animation */}
        <div className="absolute z-0 pointer-events-none left-[30%] top-[120px] w-[70%] h-full">
          <AnimatedGridBackground />
        </div>

        {/* Sidebar Navigation */}
        <nav className="body-nav w-fit text-white mt-40 leading-10 text-xl flex h-fit flex-col gap-5">
          <p>About Us</p>
          <p>Our Service</p>
          <p>Our Team</p>
        </nav>

        {/* Scrollable Main Content */}
        <div className="flex pl-20 flex-col h-full w-[80vw] overflow-auto no-scrollbar gap-[10rem]">
          {/* About Section */}
          <section id="about-card" className="h-full w-full">
            <p className="text-white text-[80px] leading-20 font-semibold">
              We're a Global UI UX <br />
              Design Agency Curating <br />
              User Experiences That <br />
              <span className="text-[#b19cd9] font-semibold">
                scale businesses
              </span>
            </p>
            <p className="text-gray-400 text-lg mt-6 max-w-[700px] leading-relaxed">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
              laborum facilis assumenda qui corrupti aperiam ipsum accusamus
              perspiciatis itaque, illo, nostrum, quo tenetur. Repudiandae,
              doloribus.
            </p>
          </section>

          {/* Services Section */}
          <section
            id="service-card"
            className="min-h-[100vh] flex flex-col pt-30"
          >
            <h2 className="text-white text-[58px] font-semibold mb-10">
              Our Core Services
            </h2>
            <div className="w-[70vw] flex flex-col gap-5">
              <InfiniteScrollNodes />
              <InfiniteScrollNodes />
              {/* <FuturisticGrid direction="left" speed={38} />
              <FuturisticGrid direction="right" speed={33} />
              <FuturisticGrid direction="left" speed={40} /> */}
            </div>

            <p className="text-gray-400 text-lg mt-10 max-w-[700px] leading-relaxed">
              This interactive grid showcases our expertise in Mobile
              Applications development and strategy.
            </p>
          </section>

          {/* Team Section */}
          <section id="team-card" className="min-h-[80vh] pt-10">
            <p className="text-white text-[80px] leading-20 font-semibold">
              We're a Global UI UX <br />
              Design Agency Curating <br />
              User Experiences That <br />
              <span className="text-[#b19cd9] font-semibold">
                scale businesses
              </span>
            </p>
            <p className="text-gray-400 text-lg mt-6 max-w-[700px] leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              laborum facilis assumenda qui corrupti aperiam ipsum accusamus
              perspiciatis itaque, illo, nostrum, quo tenetur. Repudiandae,
              doloribus.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Body;
