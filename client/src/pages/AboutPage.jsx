import React from "react";
import "../CSS/About.css";
import { motion } from "framer-motion";

const AboutPage = () => {
  // --- Grid setup ---
  const topLeftGrid = {
    startX: "0%",
    startY: "0%",
    width: "50%",
    height: "35%",
    numHorizontalLines: 4,
    numVerticalLines: 20,
  };

  const bottomRightGrid = {
    startX: "50%",
    startY: "60%",
    width: "50%",
    height: "50%",
    numHorizontalLines: 4,
    numVerticalLines: 20,
  };

  const textDelay = 1.5;

  // --- Variants ---
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
      transition: {
        staggerChildren: 0.03,
        when: "beforeChildren",
        opacity: { delay: 0.2, duration: 2.0, ease: "easeInOut" },
      },
    },
  };

  // --- Text animations ---
  const headingVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const paragraphVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: 0.4 },
    },
  };

  const glowTextVariant = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: 0.8 },
    },
  };

  // --- New: Layout dim/bright effect ---
  const layoutVariant = {
    hidden: { opacity: 0.25 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  // --- Grid renderer ---
  const renderGridSection = (config, sectionId) => {
    const lines = [];

    for (let i = 0; i < config.numHorizontalLines; i++) {
      if (
        (sectionId === "top-left" && i === 3) ||
        (sectionId === "bottom-right" && i === 0)
      )
        continue;

      const top = `calc(${config.startY} + ${
        (i / (config.numHorizontalLines - 1)) * parseFloat(config.height)
      }%)`;

      const isWhiteLine =
        (sectionId === "top-left" && (i === 1 || i === 2)) ||
        (sectionId === "bottom-right" && (i === 1 || i === 2));

      lines.push(
        <motion.div
          key={`${sectionId}-h-${i}`}
          className={`absolute ${isWhiteLine ? "bg-white" : "bg-gray-500"}`}
          style={{
            top,
            left: config.startX,
            width: config.width,
            height: "1px",
            opacity: isWhiteLine ? 1 : 0.25,
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

    for (let i = 0; i < config.numVerticalLines; i++) {
      const left = `calc(${config.startX} + ${
        (i / (config.numVerticalLines - 1)) * parseFloat(config.width)
      }%)`;

      const isWhiteLine =
        (sectionId === "top-left" && (i === 4 || i === 5 || i === 8)) ||
        (sectionId === "bottom-right" && [1, 2, 5, 6, 7].includes(i));

      lines.push(
        <motion.div
          key={`${sectionId}-v-${i}`}
          className={`absolute ${isWhiteLine ? "bg-white" : "bg-[#101820]"}`}
          style={{
            left,
            top: config.startY,
            height: config.height,
            width: "1px",
            opacity: isWhiteLine ? 1 : 0.25,
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
      sectionId === "top-left"
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
            top,
            left,
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
    <>
      <div className="flex  mt-16 flex-col gap-40 relative overflow-hidden">
        {/* --- Top Text Section --- */}
        <div className=" w-[85%] h-[40vh] p-[10px] mx-auto">
          <motion.p
            className="about-part-title text-[3rem] text-white"
            variants={headingVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            Our Company
          </motion.p>

          <motion.p
            className="about-part1-desc text-[1.5rem] text-[#C8C1C1]"
            variants={paragraphVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            Vedapixel Tech Solutions Pvt. Ltd. builds intelligent, scalable
            digital platforms that solve real-world business challenges. With
            over a decade of experience, we focus on creating solutions that
            streamline operations, enhance accessibility, and enable sustainable
            growth across industries. We don't just deliver technology.
          </motion.p>

          <motion.p
            className="about-part-title text-[3rem] text-[#BBABEB] text-end"
            variants={glowTextVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            style={{
              textShadow: "0px 0px 15px rgba(187,171,235,0.8)",
            }}
          >
            We deliver Impact
          </motion.p>
        </div>

        {/* --- Dimmed Layout Section --- */}
        <motion.div
          id="layout"
          className=" w-[66%] h-[135vh] mx-auto flex flex-col"
          variants={layoutVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 z-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {renderGridSection(topLeftGrid, "top-left")}
            {renderGridSection(bottomRightGrid, "bottom-right")}
          </motion.div>

          {/* Info Cards */}
          <div className="w-full  flex justify-end">
            <div
              className="w-1/3 h-[40vh]  flex flex-col gap-[12px] border-white pt-[20px] pr-[24px] pb-[33px] pl-[20px] rounded-[7px]"
              style={{
                background:
                  "linear-gradient(139.47deg, rgba(57,64,73) -45.69%, rgba(16,24,32) 54.7%)",
                backdropFilter: "blur(10px) saturate(180%)",
                WebkitBackdropFilter: "blur(10px) saturate(180%)",
                border: "2px solid rgba(255,255,255,0.15)",
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.37)",
              }}
            >
              <p className="about-part-title text-[1.75rem] text-[#F8F9FA]">
                Our Mission
              </p>
              <p className="about-part-title text-[1.5rem] text-[#C8C1C1]">
                Vedapixel uses tech to bring clarity, speed, and reliability to
                outdated sectors, building ecosystems where innovation can
                thrive.
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div
              className="w-1/3 h-[40vh] border flex flex-col gap-[12px] border-white pt-[20px] pr-[24px] pb-[33px] pl-[20px] rounded-[7px]"
              style={{
                background:
                  "linear-gradient(139.47deg, rgba(57,64,73) -45.69%, rgba(16,24,32) 54.7%)",
                backdropFilter: "blur(10px) saturate(180%)",
                WebkitBackdropFilter: "blur(10px) saturate(180%)",
                border: "2px solid rgba(255,255,255,0.15)",
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.37)",
              }}
            >
              <p className="about-part-title text-[1.75rem] text-[#F8F9FA]">
                Our Vision
              </p>
              <p className="about-part-title text-[1.5rem] text-[#C8C1C1]">
                We redefine how businesses use tech by creating integrated
                platforms that simplify workflows and unlock new growth.
              </p>
            </div>
          </div>

          <div className="w-full flex justify-start">
            <div
              className="w-1/3 h-[40vh] border flex flex-col gap-[12px] border-white pt-[20px] pr-[24px] pb-[33px] pl-[20px] rounded-[7px]"
              style={{
                background:
                  "linear-gradient(139.47deg, rgba(57,64,73) -45.69%, rgba(16,24,32) 54.7%)",
                backdropFilter: "blur(10px) saturate(180%)",
                WebkitBackdropFilter: "blur(10px) saturate(180%)",
                border: "2px solid rgba(255,255,255,0.15)",
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.37)",
              }}
            >
              <p className="about-part-title text-[1.75rem] text-[#F8F9FA]">
                Our Story
              </p>
              <p className="about-part-title text-[1.5rem] text-[#C8C1C1]">
                Vedapixel Tech Solutions Pvt. Ltd. builds intelligent, scalable
                digital platforms that solve real-world business challenges.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutPage;
