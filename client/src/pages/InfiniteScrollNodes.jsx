import React, { useState } from "react";
import "../CSS/Body.css";

const InfiniteScrollNodes = ({ direction = "left", baseSpeed = 90 }) => {
  const [speed, setSpeed] = useState(baseSpeed);

  const items = [
    "WEB DESIGN",
    "IOS DEVELOPMENT",
    "WEB DEVELOPMENT",
    "UX RESEARCH",
    "USER EXPERIENCE",
    "CUSTOM SOFTWARE",
    "CLOUD APPLICATIONS",
    "MOBILE APPLICATIONS",
  ];

  // Duplicate items for seamless loop
  const loopItems = Array(8).fill(items).flat();

  return (
    <div className="relative  w-full h-[70px] overflow-hidden flex items-center justify-center">
      <div
        className={`flex gap-[14px] whitespace-nowrap ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
        onMouseEnter={() => setSpeed(200)}
        onMouseLeave={() => setSpeed(baseSpeed)}
      >
        {loopItems.map((text, index) => (
          <div
            key={index}
            className="infinite-scroll-node md:w-[220px] md:h-[40px] lg:h-[68px] lg:w-[287px] md:text-[18px] lg:text-[24px] flex items-center justify-center text-white rounded-md border border-white font-medium select-none hover:bg-gradient-to-r hover:from-[#BBABEB] hover:to-[#6A6185]"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScrollNodes;
