import React, { useEffect, useState } from "react";
import "../CSS/Face.css";
import faceLogo from "../assets/faceLogo.png"; // Ensure this path is correct
import { motion, useTransform } from "framer-motion";
import PixelCubeScene from "./PixelCubeScene"; // Optional 3D cube

const Face = ({ scrollProgress }) => {
  // 🟣 Detect device size to adjust fade timing
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth >= 768);
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🟢 Adjust fade range based on screen size
  const fadeRange = isTablet ? [0.03, 0.1] : [0.05, 0.2];

  // 🔥 Smooth fade-out on scroll (now works for both laptop + tablet)
  const opacity = useTransform(scrollProgress, fadeRange, [1, 0]);

  const textDelay = 1.5;

  // --- Framer Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        when: "beforeChildren",
        opacity: { delay: 0.2, duration: 2.0, ease: "easeInOut" },
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

  // --- Grid Config ---
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

  // --- Render Grid Function ---
  const renderGridSection = (config, sectionId) => {
    const lines = [];

    // Horizontal lines
    for (let i = 0; i < config.numHorizontalLines; i++) {
      if (
        (sectionId === "top-right" && i === 3) ||
        (sectionId === "bottom-right" && i === 0)
      )
        continue;

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

    // Vertical lines
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
      className="h-screen border-2 border-red-500 lg:w-[screen] flex place-items-center px-20 relative overflow-hidden bg-[#101820]"
      style={{ opacity }}
    >
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

      {/* Content Section */}
      <div className="z-10 flex w-full justify-between items-center">
        {/* --- 3D Cube --- */}
        <motion.div
          className="flex justify-center items-center 
             w-[clamp(180px,25vw,400px)] 
             h-[clamp(180px,25vw,400px)] 
             sm:w-[clamp(200px,30vw,450px)] 
             md:w-[clamp(250px,35vw,500px)] 
             lg:w-[clamp(300px,40vw,600px)] 
             xl:w-[clamp(350px,25vw,650px)]
             mx-auto"
          variants={cubeVariants}
          initial="hidden"
          animate="visible"
        >
          <img
            src={faceLogo}
            alt="Pixel Cube"
            className="object-contain w-full h-full drop-shadow-[0_0_20px_rgba(187,171,235,0.4)]"
          />
        </motion.div>

        {/* --- Text --- */}
        <div className="text-white text-center md:text-left flex flex-col items-center md:items-start">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: textDelay }}
            className="faceCSS-head 
      font-bold 
      text-[clamp(2.2rem,16vw,9rem)] 
      leading-[clamp(2.4rem,10vw,10.5rem)] 
      tracking-tight 
      drop-shadow-[0_0_16px_rgba(187,171,235,0.35)] 
      whitespace-nowrap"
          >
            VedaPixel
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: textDelay + 0.2 }}
            className="faceCSS-tagline 
      text-[clamp(0.95rem,1.6vw,1.8rem)] 
      px-[clamp(0.8rem,2.5vw,3rem)] 
      mt-[clamp(0.4rem,1.2vw,1.4rem)] 
      text-[#E4E3E3]/90 
      font-normal 
      tracking-[clamp(0.02em,0.3vw,0.08em)] 
      leading-[clamp(1.2rem,2.4vw,2rem)] 
      max-w-[clamp(280px,60vw,1000px)]"
          >
            Innovation in every Pixel
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Face;
