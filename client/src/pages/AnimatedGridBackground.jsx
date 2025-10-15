import React from "react";
import { motion } from "framer-motion";

// Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      when: "beforeChildren",
      opacity: {
        delay: 0.2,
        duration: 2.0,
        ease: "easeInOut",
      },
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 0.5,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const AnimatedGridBackground = () => {
  // Grid Configs
  const topRightGrid = {
    startX: "50%",
    startY: "0%",
    width: "100%",
    height: "35%",
    numHorizontalLines: 4,
    numVerticalLines: 20,
    sectionId: "top-right",
  };

  const bottomRightGrid = {
    startX: "50%",
    startY: "60%",
    width: "100%",
    height: "50%",
    numHorizontalLines: 4,
    numVerticalLines: 20,
    sectionId: "bottom-right",
  };

  // Render lines + dots
  const renderGridSection = (config) => {
    const lines = [];

    // Horizontal Lines
    for (let i = 0; i < config.numHorizontalLines; i++) {
      if (
        (config.sectionId === "top-right" && i === 3) ||
        (config.sectionId === "bottom-right" && i === 0)
      )
        continue;

      const top = `calc(${config.startY} + ${
        (i / (config.numHorizontalLines - 1)) * parseFloat(config.height)
      }%)`;

      const isWhiteLine =
        (config.sectionId === "top-right" && (i === 1 || i === 2)) ||
        (config.sectionId === "bottom-right" && (i === 1 || i === 2));

      lines.push(
        <motion.div
          key={`${config.sectionId}-h-${i}`}
          className={`absolute ${isWhiteLine ? "bg-white" : "bg-gray-700"}`}
          style={{
            top,
            left: "40%",
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
        (config.sectionId === "top-right" && [4, 5, 8].includes(i)) ||
        (config.sectionId === "bottom-right" && [1, 2, 5, 6, 7].includes(i));

      lines.push(
        <motion.div
          key={`${config.sectionId}-v-${i}`}
          className={`absolute ${isWhiteLine ? "bg-white" : "bg-gray-800"}`}
          style={{
            left,
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
      config.sectionId === "top-right"
        ? [
            { h: 2, v: 4 },
            { h: 1, v: 5 },
            { h: 2, v: 5 },
            { h: 1, v: 8 },
          ]
        : [
            { h: 1, v: 1 },
            { h: 2, v: 1 },
            { h: 2, v: 2 },
            { h: 1, v: 5 },
            { h: 2, v: 5 },
            { h: 2, v: 7 },
          ];

    dotPositions.forEach(({ h, v }, index) => {
      const top = `calc(${config.startY} + ${
        (h / (config.numHorizontalLines - 1)) * parseFloat(config.height)
      }% - 4px)`;
      const left = `calc(${config.startX} + ${
        (v / (config.numVerticalLines - 1)) * parseFloat(config.width)
      }% - 4px)`;

      lines.push(
        <motion.div
          key={`${config.sectionId}-dot-${index}`}
          className="absolute bg-white rounded-full"
          style={{
            top,
            left,
            width: "8px",
            height: "8px",
            opacity: 0.9,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
        />
      );
    });

    return lines;
  };

  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {renderGridSection(topRightGrid)}
      {renderGridSection(bottomRightGrid)}
    </motion.div>
  );
};

export default AnimatedGridBackground;
