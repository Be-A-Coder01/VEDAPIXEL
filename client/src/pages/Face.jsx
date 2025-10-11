import React from "react";
import facelogo from "../assets/facelogo.png";
import "../CSS/Face.css";
import { motion } from "framer-motion";

const Face = () => {
  const lineVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.5,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, when: "beforeChildren" },
    },
  };

  const topRightGrid = {
    startX: "50%",
    startY: "0%",
    width: "100%",
    height: "35%",
    numHorizontalLines: 4,
    numVerticalLines: 20,
  };

  const bottomRightGrid = {
    startX: "50%",
    startY: "60%",
    width: "100%",
    height: "50%",
    numHorizontalLines: 4,
    numVerticalLines: 20,
  };

  const renderGridSection = (config, sectionId) => {
    const lines = [];

    // Horizontal Lines
    for (let i = 0; i < config.numHorizontalLines; i++) {
      // Hide specific lines completely
      if (
        (sectionId === "top-right" && i === 3) ||
        (sectionId === "bottom-right" && i === 0)
      ) {
        continue; // Skip rendering this line
      }

      const top = `calc(${config.startY} + ${
        (i / (config.numHorizontalLines - 1)) * parseFloat(config.height)
      }%)`;

      const isWhiteLine =
        (sectionId === "top-right" && (i === 1 || i === 2)) ||
        (sectionId === "bottom-right" && (i === 1 || i === 2));

      lines.push(
        <motion.div
          key={`${sectionId}-h-line-${i}`}
          className={`absolute ${isWhiteLine ? "bg-white" : "bg-gray-500"}`}
          style={{
            top: top,
            left: 540,
            width: config.width,
            height: "1px",
            opacity: isWhiteLine ? 1 : 0.2,
            ...(isWhiteLine && {
              maskImage:
                "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            }),
          }}
          variants={lineVariants}
        />
      );
    }

    // Vertical Lines
    for (let i = 0; i < config.numVerticalLines; i++) {
      const left = `calc(${config.startX} + ${
        (i / (config.numVerticalLines - 1)) * parseFloat(config.width)
      }%)`;

      const isWhiteLine =
        (sectionId === "top-right" && (i === 4 || i === 5 || i === 8)) ||
        (sectionId === "bottom-right" && [1, 2, 5, 6, 7].includes(i));

      lines.push(
        <motion.div
          key={`${sectionId}-v-line-${i}`}
          className={`absolute ${isWhiteLine ? "bg-white" : "bg-gray-800"}`}
          style={{
            left: left,
            top: config.startY,
            height: config.height,
            width: "1px",
            opacity: isWhiteLine ? 1 : 0.2,
            ...(isWhiteLine && {
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            }),
          }}
          variants={lineVariants}
        />
      );
    }

    // Dots
    const dotPositions =
      sectionId === "top-right"
        ? [
            { h: 2, v: 4 },
            { h: 1, v: 5 },
            { h: 2, v: 5 },
            { h: 1, v: 8 },
          ]
        : sectionId === "bottom-right"
        ? [
            { h: 1, v: 1 },
            { h: 2, v: 1 },
            { h: 2, v: 2 },
            { h: 1, v: 5 },
            { h: 2, v: 5 },
            { h: 2, v: 7 },
          ]
        : [];

    dotPositions.forEach(({ h, v }) => {
      const top = `calc(${config.startY} + ${
        (h / (config.numHorizontalLines - 1)) * parseFloat(config.height)
      }% - 4px)`;
      const left = `calc(${config.startX} + ${
        (v / (config.numVerticalLines - 1)) * parseFloat(config.width)
      }% - 4px)`;

      lines.push(
        <motion.div
          key={`${sectionId}-dot-${h}-${v}`}
          className="absolute bg-white rounded-full"
          style={{
            top: top,
            left: left,
            width: "8px",
            height: "8px",
            opacity: 0.9,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      );
    });

    return lines;
  };

  return (
    <div className="h-screen w-screen flex place-items-center px-20 relative overflow-hidden bg-[#1a1c22]">
      {/* Grid Lines & Dots */}
      <motion.div
        className="absolute inset-0 z-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {renderGridSection(topRightGrid, "top-right")}
        {renderGridSection(bottomRightGrid, "bottom-right")}
      </motion.div>

      {/* Content */}
      <div className="z-10 flex w-full justify-between items-center">
        <div>
          <img src={facelogo} className="h-[60vh]" alt="VedaPixel Logo" />
        </div>

        <div className="text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="faceCSS-head text-[150px] font-bold leading-32"
          >
            VedaPixel
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="faceCSS-tagline text-[25px] px-8"
          >
            Innovation in every Pixel
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Face;
