import React from "react";
import "../CSS/Face.css";
import faceLogo from "../assets/faceLogo.png"; // Ensure this path is correct
import { motion, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import PixelCubeScene from "./PixelCubeScene"; // Make sure this file exists

const Face = ({ scrollProgress }) => {
  const opacity = useTransform(
    scrollProgress,
    // Input Range (When to start and stop the fade, based on document scroll percentage):
    // Start fading at 5% scroll, finish fading at 20% scroll.
    [0.05, 0.2],
    // Output Range (The opacity we want):
    [1, 0] // Go from fully visible (1) to fully transparent (0)
  );
  const textDelay = 1.5;

  // --- Framer Motion Grid & Sunlight Container Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Stagger children for lines/dots
        staggerChildren: 0.03,
        when: "beforeChildren",
        // Sunlight/Glow fade-in transition (applies to container opacity)
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

  const cubeVariants = {
    hidden: { opacity: 0, scale: 0.5, rotateY: 90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.5,
        type: "spring",
        bounce: 0.4,
        delay: 0.2,
      },
    },
  };

  // --- Grid Configuration ---
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

  // --- Grid Rendering Function ---
  const renderGridSection = (config, sectionId) => {
    const lines = [];

    // Horizontal Lines
    for (let i = 0; i < config.numHorizontalLines; i++) {
      if (
        (sectionId === "top-right" && i === 3) ||
        (sectionId === "bottom-right" && i === 0)
      ) {
        continue;
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
          transition={{ duration: 1, ease: "easeOut", delay: textDelay }}
        />
      );
    });

    return lines;
  };

  return (
    <motion.div
      className="h-screen w-screen flex place-items-center px-20 relative overflow-hidden bg-[#101820]"
      style={{ opacity }}
    >
      {/* Grid Lines & Dots (Z-0) - This motion.div controls the sunlight transition */}
      <motion.div
        className="absolute inset-0 z-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {renderGridSection(topRightGrid, "top-right")}
        {renderGridSection(bottomRightGrid, "bottom-right")}
      </motion.div>

      {/* Content (Z-10) */}
      <div className="z-10 flex w-full justify-between items-center">
        {/* --- 3D CUBE SECTION --- */}
        <motion.div
          className="h-[60vh] aspect-square"
          variants={cubeVariants}
          initial="hidden"
          animate="visible"
        >
          {/* <PixelCubeScene /> */}
          <img src={faceLogo} alt="" />
        </motion.div>

        {/* --- TEXT SECTION --- */}
        <div className="text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: textDelay }}
            className="faceCSS-head text-[150px] font-bold leading-35"
          >
            VedaPixel
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: textDelay + 0.2 }}
            className="faceCSS-tagline text-[25px] px-8"
          >
            Innovation in every Pixel
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Face;
