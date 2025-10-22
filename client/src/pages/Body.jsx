// pages/Body.jsx
import React, { useEffect, useState, useRef } from "react";
import "../CSS/Body.css";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScrollNodes from "./InfiniteScrollNodes";
import profileImg from "../assets/profileImg.png";

const Body = () => {
  const [showBody, setShowBody] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [navOpacity, setNavOpacity] = useState(1);
  const [showTeamPopup, setShowTeamPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentWord, setCurrentWord] = useState("streamline operations");

  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const teamRef = useRef(null);

  // ✅ Smooth visibility hook (scroll range + buffer)
  const useSmoothVisibility = (min = 100, max = 500, buffer = 60) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const scrollTimeout = useRef(null);
    const ticking = useRef(false);

    useEffect(() => {
      const handleScroll = () => {
        if (!ref.current) return;
        if (ticking.current) return;

        ticking.current = true;
        requestAnimationFrame(() => {
          const top = ref.current.getBoundingClientRect().top;

          // Add a small buffer to prevent flicker
          if (top >= min - buffer && top <= max + buffer) {
            if (!visible) setVisible(true);
          } else {
            if (visible) setVisible(false);
          }

          ticking.current = false;
        });
      };

      // Debounce listener for performance
      const handleDebouncedScroll = () => {
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(handleScroll, 5);
      };

      window.addEventListener("scroll", handleDebouncedScroll);
      handleScroll(); // initial call
      return () => window.removeEventListener("scroll", handleDebouncedScroll);
    }, [min, max, buffer, visible]);

    return [ref, visible];
  };

  // Attach hooks for each section title
  const [aimTitleRef, aimVisible] = useSmoothVisibility(120, 600);
  const [servicesTitleRef, servicesVisible] = useSmoothVisibility(120, 600);
  const [teamTitleRef, teamVisible] = useSmoothVisibility(120, 600);

  // ✅ Nav highlight detection
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

    sections.forEach((s) => s.ref.current && observer.observe(s.ref.current));
    return () => observer.disconnect();
  }, []);

  // ✅ Show sidebar nav after section enters viewport
  useEffect(() => {
    const bodySection = document.querySelector(".body-content");
    if (!bodySection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowBody(entry.intersectionRatio > 0.3),
      { threshold: Array.from({ length: 11 }, (_, i) => i * 0.1) }
    );

    observer.observe(bodySection);
    return () => observer.disconnect();
  }, []);

  // ✅ Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Sidebar positioning
  const [navPosition, setNavPosition] = useState({
    left: window.innerWidth >= 1024 ? "10vw" : "32px",
    top: window.innerWidth >= 1024 ? "180px" : "280px",
  });

  useEffect(() => {
    const handleResize = () => {
      setNavPosition({
        left: window.innerWidth >= 1024 ? "10vw" : "32px",
        top: window.innerWidth >= 1024 ? "180px" : "280px",
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
        className="body-nav relative cursor-pointer pl-3 lg:pl-2 md:text-[18px] lg:text-[28px] flex items-center transition-all duration-300"
        animate={{
          color: isActive ? "#b19cd9" : "#d1d5db",
          x: isActive ? 4 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
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

  useEffect(() => {
    const words = [
      "streamline operations",
      "drive sustainable growth",
      "boost accessibility",
    ];

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % words.length;
      setCurrentWord(words[index]);
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const teamSection = teamRef.current;
      if (!teamSection) return;

      const rect = teamSection.getBoundingClientRect();

      // 👇 Keep nav fully visible until Team section's top < 100px
      if (rect.top > 100) {
        setNavOpacity(1); // fully visible
      } else if (rect.top > 0) {
        // start fading gradually between 100px → 0px
        const progress = rect.top / 100; // normalize 1 → 0
        setNavOpacity(Math.max(0, Math.min(1, progress)));
      } else {
        setNavOpacity(0); // completely hidden after top passes 0
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ✅ Team Popup */}
      <AnimatePresence>
        {showTeamPopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-[8px] flex justify-center items-center z-[200] px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="relative w-full max-w-[95vw] md:w-[700px] lg:w-[80vw] lg:h-[85vh]
                   flex flex-col gap-6 sm:gap-8 md:gap-10
                   rounded-[30px] sm:rounded-[40px]
                   border border-white/20 bg-white/10 backdrop-blur-[20px]
                   shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
                    p-4 sm:p-6 md:p-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <button
                className="absolute top-4 right-6 text-white text-[24px] hover:text-[#b19cd9] transition-all"
                onClick={() => setShowTeamPopup(false)}
              >
                ✕
              </button>

              <p className="popup-teamCard-title text-white text-center md:text-left text-[2rem] lg:text-[39px] pb-14 font-semibold">
                Meet Our Team
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-14 sm:gap-8 lg:gap-24 px-2 sm:px-4 pb-10">
                {[
                  { name: "Sunil MB", role: "Co-Founder - MD / CEO" },
                  { name: "Nithin MB", role: "Co-Founder - MD" },
                  { name: "Nisarga M", role: "Head of Operations" },
                  { name: "Abhishek", role: "HR" },
                ].map((member, i) => (
                  <div
                    key={i}
                    className="relative flex justify-start w-full sm:w-[45%] md:w-[46%] lg:w-[32vw]
                h-[100px] sm:h-[130px] md:h-[150px] lg:h-[20vh]
                rounded-t-[50px] rounded-br-[50px]
                bg-[#9C90BD]/90 border border-white/20 
                shadow-[0_8px_25px_rgba(156,144,189,0.4)]
                backdrop-blur-[6px]
                hover:shadow-[0_12px_30px_rgba(156,144,189,0.7)]
                transition-all duration-500"
                  >
                    <img
                      src={profileImg}
                      alt="Profile"
                      className="absolute bottom-0 left-0 object-cover h-[150px] md:h-[200px] -translate-y-[10px]"
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] flex flex-col justify-center items-start pl-3">
                      <p className="text-white font-bold text-[1rem] lg:text-[22px]">
                        {member.name}
                      </p>
                      <p className="text-[#E4E3E3] text-[0.85rem] lg:text-[14px]">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Main Body */}
      <div className="body-content px-[2%] relative min-h-screen flex transition-all duration-700 ease-out w-full pt-[6vw]">
        {/* Sidebar Nav */}
        <AnimatePresence>
          {!isMobile && showBody && (
            <motion.nav
              className="text-white flex flex-col gap-[10px]"
              style={{
                position: "fixed",
                left: navPosition.left,
                top: navPosition.top,
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

        {/* ✅ Content */}
        <div className="flex px-[2vw]  flex-col gap-[10rem] w-full md:pl-[30vw] lg:pl-[30vw]">
          {/* --- Our Aim --- */}
          <section
            id="about"
            ref={aboutRef}
            className="flex flex-col gap-[12px] mt-[7vw]"
          >
            {isMobile && (
              <motion.p
                ref={aimTitleRef}
                animate={{
                  opacity: aimVisible ? 1 : 0,
                  y: aimVisible ? 0 : 25,
                  scale: aimVisible ? 1 : 0.97,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative my-[30px] text-center text-[clamp(1.3rem,4vw,2rem)] font-semibold
                  bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185]
                  bg-clip-text text-transparent inline-block"
              >
                Our Aim
                <motion.span
                  className="absolute left-1/2 -translate-x-1/2 bottom-[-5px] h-[2px] w-[25%]
                 bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185] rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  viewport={{ once: false, amount: 0.4 }}
                />
              </motion.p>
            )}
            <p className="text-white text-[20px]  md:text-[28px] lg:text-[3rem] leading-[1.3]">
              We bridge innovation and execution with user-centric, future-ready
              systems that <br />
              <span
                id="tag"
                className=" relative  inline-block align-baseline text-[#b19cd9]  overflow-hidden"
                style={{
                  display: "inline-flex",
                  verticalAlign: "baseline",
                  height: "1.3em",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "-0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeIn" }}
                    className="inline-block"
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {currentWord}
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>
            <p className="about-card-desc text-[#C8C1C1] text-[12px] md:text-[16px]  lg:text-[1.5rem]">
              We offer future-ready solutions to streamline your business, drive
              <br />
              growth, and put your processes in place. Explore our range of
              <br />
              solutions below.
            </p>
            <div className="relative inline-block">
              <button className="rotating-btn relative text-[#b19cd9] font-garota text-[0.7rem] md:text-[1.5rem] rounded-md px-3 py-2 md:px-6 md:py-3 overflow-hidden">
                Know More
              </button>
            </div>
          </section>

          {/* --- Our Services --- */}
          <section
            id="services"
            ref={servicesRef}
            className="flex flex-col gap-[12px] mt-[7vw]"
          >
            {isMobile && (
              <motion.p
                ref={servicesTitleRef}
                animate={{
                  opacity: servicesVisible ? 1 : 0,
                  y: servicesVisible ? 0 : 25,
                  scale: servicesVisible ? 1 : 0.97,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className=" relative my-[30px] text-center text-[clamp(1.3rem,4vw,2rem)] font-semibold
                  bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185]
                  bg-clip-text text-transparent inline-block"
              >
                Our Services
                <motion.span
                  className="absolute left-1/2 -translate-x-1/2 bottom-[-5px] h-[2px] w-[25%]
                 bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185] rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  viewport={{ once: false, amount: 0.4 }}
                />
              </motion.p>
            )}
            <div className="flex flex-col  lg:gap-4">
              <InfiniteScrollNodes direction="left" baseSpeed={65} />
              <InfiniteScrollNodes direction="right" baseSpeed={65} />
              <InfiniteScrollNodes direction="left" baseSpeed={65} />
              <InfiniteScrollNodes direction="right" baseSpeed={65} />
              <InfiniteScrollNodes direction="left" baseSpeed={65} />
            </div>
          </section>

          {/* --- Our Team --- */}
          <section
            id="team"
            ref={teamRef}
            className="flex  flex-col gap-[12px] mt-[7vw]"
          >
            {isMobile && (
              <motion.p
                ref={teamTitleRef}
                animate={{
                  opacity: teamVisible ? 1 : 0,
                  y: teamVisible ? 0 : 25,
                  scale: teamVisible ? 1 : 0.97,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative my-[30px] text-center text-[clamp(1.3rem,4vw,2rem)] font-semibold
                  bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185]
                  bg-clip-text text-transparent inline-block"
              >
                Our Team
                <motion.span
                  className="absolute left-1/2 -translate-x-1/2 bottom-[-5px] h-[2px] w-[25%]
                 bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185] rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  viewport={{ once: false, amount: 0.4 }}
                />
              </motion.p>
            )}

            <div className="relative mb-[30px]  md:w-[50vw]  mx-auto">
              <p className="begin-title text-[9vw] md:text-[clamp(1.8rem,4vw,4rem)] font-extrabold bg-gradient-to-b from-[#C7B9F6] to-[#6A6185] bg-clip-text text-transparent leading-[1] absolute top-0 left-0 z-20">
                Hello!
              </p>
              <div
                className="relative border border-white p-[clamp(1.5rem,3vw,2.3rem)] mt-[clamp(20px,3vw,30px)] rounded-tr-[60px] rounded-b-[60px] sm:rounded-tr-[70px] sm:rounded-b-[70px] md:rounded-tr-[80px] md:rounded-b-[80px] shadow-xl transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(139.47deg, rgba(47, 54, 64, 0.8) -45.69%, rgba(16, 24, 32, 0.8) 54.7%)",
                  backdropFilter: "blur(12px) saturate(180%)",
                  WebkitBackdropFilter: "blur(12px) saturate(180%)",
                  border: "2px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                }}
              >
                <div className="flex flex-col justify-center items-start h-full space-y-3">
                  <p className="begin-card-title text-[clamp(1.3rem,2.5vw,3rem)] text-white font-semibold leading-tight">
                    we are experienced innovators building scalable digital
                    platforms
                  </p>

                  <p className="begin-card-desc text-[#C8C1C1] text-[clamp(0.9rem,1.8vw,1.5rem)]">
                    Driving enterprise & consumer innovation
                  </p>

                  <button
                    className="begin-card-button border-2 border-[#B1A2DF] text-white text-[12px] md:text-[16px] py-2 rounded-[8px] mt-[clamp(15px,2vw,25px)] w-[25vw] md:h-[clamp(50px,6vh,55px)] md:w-[clamp(110px,10vw,160px)] transition-all duration-300 hover:scale-105 hover:bg-[#B1A2DF]/20"
                    onClick={() => setShowTeamPopup(true)}
                  >
                    Our Team
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Body;
