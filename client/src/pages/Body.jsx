import React, { useEffect, useState, useRef } from "react";
import "../CSS/Body.css";
import AnimatedGridBackground from "./AnimatedGridBackground";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScrollNodes from "./InfiniteScrollNodes";
import profileImg from "../assets/profileImg.png";

const Node = ({ children, isHighlighted, className = "", style }) => {
  const baseClasses =
    "p-3 sm:p-4 text-white text-xs sm:text-sm font-medium uppercase tracking-wider rounded-lg cursor-pointer transition-all duration-200 ease-in-out border border-gray-700 whitespace-nowrap";

  const defaultClasses = `${baseClasses} bg-gray-900 hover:scale-[1.03] shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/40`;

  const highlightedClasses = `${baseClasses} font-bold 
    bg-gradient-to-r from-indigo-600 to-purple-600 border-none relative z-10`;

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
  const [showTeamPopup, setShowTeamPopup] = useState(false);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const teamRef = useRef(null);

  // ✅ Detect visible section for nav highlight
  useEffect(() => {
    const sections = [
      { id: "about", ref: aboutRef },
      { id: "services", ref: servicesRef },
      { id: "team", ref: teamRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => {
      if (s.ref.current) observer.observe(s.ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // ✅ Make nav disappear a bit earlier
  useEffect(() => {
    const bodySection = document.querySelector(".body-content");
    if (!bodySection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide nav when only ~30% of the body is still visible
        setShowBody(entry.intersectionRatio > 0.3);
      },
      {
        threshold: Array.from({ length: 11 }, (_, i) => i * 0.1), // more granular tracking
      }
    );

    observer.observe(bodySection);

    return () => observer.disconnect();
  }, []);

  // ✅ Nav item animation
  const navItem = (id, label) => {
    const isActive = activeSection === id;

    return (
      <motion.p
        onClick={() =>
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        className="body-nav relative  cursor-pointer pl-2 pr-[12px] h-[42px] text-[28px] flex items-center transition-all duration-300"
        animate={{
          color: isActive ? "#b19cd9" : "#d1d5db",
          x: isActive ? 4 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <motion.span
          className=" absolute left-0 top-1/2 -translate-y-1/2 bg-[#b19cd9] rounded-full"
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
      <AnimatePresence>
        {showTeamPopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-[8px] flex justify-center items-center z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="relative w-[1120px] min-h-[500px] p-10 flex flex-col gap-10 rounded-[40px] border border-white/20 bg-white/10 backdrop-blur-[20px] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-6 text-white text-[28px] hover:text-[#b19cd9] transition-all"
                onClick={() => setShowTeamPopup(false)}
              >
                ✕
              </button>

              {/* Title */}
              <p className="popup-teamCard-title text-white text-[39px] text-center font-semibold">
                Meet Our Team
              </p>

              {/* Team Cards */}
              <div className="flex flex-wrap justify-center gap-10">
                {[1, 2, 3, 4].map((_, i) => (
                  <div
                    key={i}
                    className="relative my-4 flex w-[489px] h-[205px] rounded-t-[66px] rounded-br-[66px] bg-[#9C90BD]/90 overflow-visible border border-white/20 shadow-[0_8px_25px_rgba(156,144,189,0.4)] backdrop-blur-[6px] hover:shadow-[0_12px_30px_rgba(156,144,189,0.7)] transition-all duration-500 "
                  >
                    <img
                      src={profileImg}
                      alt="Profile"
                      className="absolute bottom-0 left-0 h-[259px] object-cover"
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[212px] h-[144px] flex flex-col justify-center items-start pl-3">
                      <p className="text-white font-bold text-[22px] leading-tight">
                        Akjdfhjhj
                      </p>
                      <p className="text-white font-bold text-[22px] leading-tight">
                        Klkjjjjk
                      </p>
                      <p className="text-[#E4E3E3] text-[14px] mt-1">
                        CEO & Founder
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`body-content  relative pr-[116px] pl-[132px] pt-[80px] pb-[40px] min-h-screen gap-[20px] flex transition-all duration-700 ease-out w-full`}
        style={{ transform: "none" }}
      >
        {/* ✅ Animated Sidebar Nav */}
        <AnimatePresence>
          {showBody && (
            <motion.nav
              className="text-white   w-[272px] flex flex-col gap-[10px]"
              style={{
                position: "fixed",
                left: "132px",
                top: "180px",
                zIndex: 50,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
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
                <button
                  className="begin-card-button border-2 border-[#B1A2DF] h-[52px] mt-[25px] w-[149px] text-white py-2 rounded-[8px]"
                  onClick={() => setShowTeamPopup(true)}
                >
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
