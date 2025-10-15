import React from "react";
import { motion } from "framer-motion";

const InfiniteScrollNodes = () => {
  const items = [
    "WEB DESIGN",
    "IOS DEVELOPMENT",
    "WEB DEVELOPMENTS",
    "UX RESEARCH",
    "USER EXPERIENCE",
    "CUSTOM SOFTWARE",
    "CLOUD APPLICATIONS",
    "MOBILE APPLICATIONS",
    "WEB DESIGN",
    "IOS DEVELOPMENT",
    "WEB DEVELOPMENTS",
    "UX RESEARCH",
    "USER EXPERIENCE",
    "CUSTOM SOFTWARE",
    "CLOUD APPLICATIONS",
    "MOBILE APPLICATIONS",
    "WEB DESIGN",
    "IOS DEVELOPMENT",
    "WEB DEVELOPMENTS",
    "UX RESEARCH",
    "USER EXPERIENCE",
    "CUSTOM SOFTWARE",
    "CLOUD APPLICATIONS",
    "MOBILE APPLICATIONS",
  ];

  // Duplicate items enough times to create a seamless infinite loop
  const loopItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full min-h-[200px] overflow-hidden bg-[#0d0f16] flex items-center justify-center">
      <div className="absolute w-full">
        {/* First row (left to right) */}
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {loopItems.map((text, index) => (
            <div
              key={index}
              className="mx-3 px-6 py-3 bg-[#121826] text-white rounded-lg border border-gray-700 text-sm font-semibold"
            >
              {text}
            </div>
          ))}
        </motion.div>

        {/* Second row (right to left) */}
        <motion.div
          className="flex whitespace-nowrap mt-5"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {loopItems.map((text, index) => (
            <div
              key={`second-${index}`}
              className="mx-3 px-6 py-3 bg-[#121826] text-white rounded-lg border border-gray-700 text-sm font-semibold"
            >
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteScrollNodes;
