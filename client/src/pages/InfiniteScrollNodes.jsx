import React, { useState } from "react";
import "../CSS/Body.css";

const InfiniteScrollNodes = ({ direction = "left", baseSpeed = 25 }) => {
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

  // ✅ Duplicate items only once for seamless scrolling
  const loopItems = [...items, ...items];

  return (
    <div className="relative w-full h-[70px] overflow-hidden flex items-center justify-center">
      <div
        className={`flex gap-[14px] whitespace-nowrap ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
        onMouseEnter={() => setSpeed(baseSpeed * 4)} // slows down slightly on hover
        onMouseLeave={() => setSpeed(baseSpeed)}
      >
        {loopItems.map((text, index) => (
          <div
            key={index}
            className="
              infinite-scroll-node
              flex items-center justify-center
              text-white font-medium select-none
              border border-white rounded-md
              px-2 sm:px-3 md:px-4
              h-[7vh] sm:h-[6vh] md:h-[40px] lg:h-[68px]
              w-[70vw] sm:w-[60vw] md:w-[220px] lg:w-[287px]
              text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px]
              hover:bg-gradient-to-r hover:from-[#BBABEB] hover:to-[#6A6185]
              transition-all duration-300 ease-in-out
            "
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScrollNodes;
