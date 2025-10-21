import React from "react";
import "../CSS/About.css";
import { motion } from "framer-motion";
import { useEffect } from "react";

const AboutPage = () => {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  // }, []);

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

  const layoutVariant = {
    hidden: { opacity: 0.25 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <>
      <div className="flex mt-16 flex-col gap-40 relative overflow-hidden">
        {/* --- Top Text Section --- */}
        <div className="w-[85%] h-[auto] md:h-[40vh] p-[10px] mx-auto">
          <motion.p
            className="about-part-title text-[2rem] md:text-[3rem] text-white text-center md:text-left"
            variants={headingVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            Our Company
          </motion.p>

          <motion.p
            className="about-part1-desc text-[1rem] md:text-[1.5rem] text-[#C8C1C1] text-center md:text-left"
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
            className="about-part-title text-[2rem] md:text-[3rem] text-[#BBABEB] text-end"
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

        {/* --- Background + Boxes Section --- */}
        <motion.div
          id="layout"
          className="w-[90%]  md:w-[66%] h-fit mx-auto flex flex-col items-center gap-16 md:gap-0"
          variants={layoutVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* --- Info Cards --- */}
          <div className="w-full  flex justify-end md:justify-end">
            <div className="about-card w-[90%] md:w-1/2 lg:w-1/3 h-auto md:h-[40vh]">
              <p className="about-part-title text-[1.4rem] md:text-[1.75rem] text-[#F8F9FA]">
                Our Mission
              </p>
              <p className="about-part-title text-[1.1rem] md:text-[1.5rem] text-[#C8C1C1]">
                Vedapixel uses tech to bring clarity, speed, and reliability to
                outdated sectors, building ecosystems where innovation can
                thrive.
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center md:justify-center">
            <div className="about-card w-[90%] md:w-1/2 lg:w-1/3 h-auto md:h-[40vh]">
              <p className="about-part-title text-[1.4rem] md:text-[1.75rem] text-[#F8F9FA]">
                Our Vision
              </p>
              <p className="about-part-title text-[1.1rem] md:text-[1.5rem] text-[#C8C1C1]">
                We redefine how businesses use tech by creating integrated
                platforms that simplify workflows and unlock new growth.
              </p>
            </div>
          </div>

          <div className="w-full flex justify-start md:justify-start">
            <div className="about-card w-[90%] md:w-1/2 lg:w-1/3 h-auto md:h-[40vh]">
              <p className="about-part-title text-[1.4rem] md:text-[1.75rem] text-[#F8F9FA]">
                Our Story
              </p>
              <p className="about-part-title text-[1.1rem] md:text-[1.5rem] text-[#C8C1C1]">
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
