import React, { useEffect, useState, useRef } from "react";
import "../CSS/Body.css";
import AnimatedGridBackground from "./AnimatedGridBackground";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScrollNodes from "./InfiniteScrollNodes";

const Node = ({ children, isHighlighted, className = "", style }) => {
  const baseClasses =
    "p-3 sm:p-4 text-white text-xs sm:text-sm font-medium uppercase tracking-wider rounded-lg cursor-pointer transition-all duration-200 ease-in-out border border-gray-700 whitespace-nowrap";

  const defaultClasses = `${baseClasses} bg-gray-900 hover:scale-[1.03] shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/40`;
  const highlightedClasses = `${baseClasses} font-bold bg-gradient-to-r from-indigo-600 to-purple-600 border-none relative z-10`;

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

const Body = () => {
  const [showBody, setShowBody] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const teamRef = useRef(null);

  // ✅ Smooth highlight detection
  useEffect(() => {
    const sections = [
      { id: "about", ref: aboutRef },
      { id: "services", ref: servicesRef },
      { id: "team", ref: teamRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => {
      if (s.ref.current) observer.observe(s.ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // ✅ Body visibility trigger
  useEffect(() => {
    const handleScroll = () => {
      const menu = document.querySelector(".menu-sticky");
      if (!menu) return;
      const menuRect = menu.getBoundingClientRect();
      setShowBody(menuRect.top <= 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Animated Nav Item
  const navItem = (id, label) => {
    const isActive = activeSection === id;

    return (
      <motion.p
        onClick={() =>
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        className="relative cursor-pointer pl-2 pr-[12px] h-[42px] text-[28px] flex items-center transition-all duration-300"
        animate={{
          color: isActive ? "#b19cd9" : "#d1d5db",
          x: isActive ? 4 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Animated left border line */}
        <motion.span
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#b19cd9] rounded-full"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isActive ? "100%" : 0,
            width: isActive ? "3px" : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        {label}
      </motion.p>
    );
  };

  return (
    <>
      <div
        className={`body-content relative pr-[116px] pl-[132px] pt-[80px] pb-[40px] min-h-screen gap-[20px] flex transition-all duration-700 ease-out w-full ${
          showBody
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-20 pointer-events-none"
        }`}
        style={{ transform: "none" }}
      >
        {/* ✅ Animated Nav (kept inside) */}
        <AnimatePresence>
          {showBody && (
            <motion.nav
              className="text-white w-[242px] flex flex-col gap-[10px]"
              style={{
                position: "fixed",
                left: "132px",
                top: "180px",
                zIndex: 50,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {navItem("about", "Our Aim")}
              {navItem("services", "Our Services")}
              {navItem("team", "Ready to Begin?")}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex flex-col gap-[10rem] pl-[420px] pt-[54px]">
          <section
            id="about"
            ref={aboutRef}
            className="h-[358px] w-[832px] flex flex-col gap-[8px]"
          >
            <p className="about-card-title text-white text-[48px] leading-[52px]">
              We bridge innovation and execution with
              <br />
              user-centric, future-ready systems that
              <br />
              <span className="text-[#b19cd9] font-semibold">
                streamline operations
              </span>
            </p>
            <p className="about-card-desc text-[#C8C1C1] text-[24px]">
              We offer future-ready solutions to streamline your business, drive
              growth, and put your processes in place. Explore our range of
              solutions below.
            </p>
            <button className="body-nav h-[52px] w-[149px] text-[24px] rounded-md border border-[#b19cd9] text-[#b19cd9] hover:bg-[#b19cd9] hover:text-black font-garota transition-all duration-300">
              Know More
            </button>
          </section>

          <section
            id="services"
            ref={servicesRef}
            className="h-[424px] w-[832px]"
          >
            <div className="flex flex-col gap-4">
              <InfiniteScrollNodes direction="left" baseSpeed={90} />
              <InfiniteScrollNodes direction="right" baseSpeed={90} />
              <InfiniteScrollNodes direction="left" baseSpeed={90} />
              <InfiniteScrollNodes direction="right" baseSpeed={90} />
            </div>
          </section>

          <section
            id="team"
            ref={teamRef}
            className="relative min-h-[80vh] w-[763px] h-[347px]"
          >
            <p className="begin-title absolute top-0 left-0 z-20 text-[64px] bg-gradient-to-b from-[#C7B9F6] via-[#A699D9] to-[#6A6185] bg-clip-text text-transparent leading-[1]">
              Hello!
            </p>

            <div
              className="relative w-[755px] h-[311px] p-[36px] ml-[8px] rounded-tr-[80px] rounded-b-[80px] mt-[30px]"
              style={{
                background:
                  "linear-gradient(139.47deg, rgba(47, 54, 64) -45.69%, rgba(16, 24, 32) 54.7%)",
                backdropFilter: "blur(10px) saturate(180%)",
                WebkitBackdropFilter: "blur(10px) saturate(180%)",
                border: "2px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
              }}
            >
              <div className="h-[159px]">
                <p className="begin-card-title text-[48px] text-white leading-13">
                  we are experienced innovators building scalable digital
                  platforms
                </p>
                <p className="begin-card-desc text-[#C8C1C1] text-[24px]">
                  Driving enterprise & consumer innovation
                </p>
                <button className="begin-card-button border-2 border-[#B1A2DF] h-[52px] mt-[25px] w-[149px] text-white py-2 rounded-[8px]">
                  Our Team
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Body;
