import React, { useEffect, useState, useRef } from "react";
import "../CSS/Body.css";
import AnimatedGridBackground from "./AnimatedGridBackground";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScrollNodes from "./InfiniteScrollNodes";
import profileImg from "../assets/profileImg.png";

const Body = () => {
  const [showBody, setShowBody] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [showTeamPopup, setShowTeamPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // ✅ mobile detection

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
        setShowBody(entry.intersectionRatio > 0.3);
      },
      {
        threshold: Array.from({ length: 11 }, (_, i) => i * 0.1),
      }
    );

    observer.observe(bodySection);
    return () => observer.disconnect();
  }, []);

  // ✅ Detect screen resize (for mobile hiding)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Responsive positioning for sidebar nav
  const [navPosition, setNavPosition] = useState({
    left: window.innerWidth >= 1024 ? "132px" : "32px",
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

  const useScrollVisibility = (offsetTop = 100, offsetBottom = 150) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const rect = entry.boundingClientRect;
            const isVisible =
              entry.isIntersecting &&
              rect.top > offsetTop &&
              rect.top < window.innerHeight - offsetBottom;
            setVisible(isVisible);
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, [offsetTop, offsetBottom]);

    return [ref, visible];
  };

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
              {/* Close Button */}
              <button
                className="absolute top-4 right-6 text-white text-[20px] sm:text-[22px] md:text-[24px] lg:text-[28px] hover:text-[#b19cd9] transition-all"
                onClick={() => setShowTeamPopup(false)}
              >
                ✕
              </button>

              {/* Title */}
              <p className="popup-teamCard-title text-white text-center md:text-left text-[1.8rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[39px] pl-0 md:pl-10 pb-14 font-semibold">
                Meet Our Team
              </p>

              {/* Team Cards */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-14 sm:gap-8 lg:gap-24 px-2 sm:px-4 pb-10">
                {[
                  { name: "Sunil MB", role: "Co-Founder - MD / CEO" },
                  { name: "Nithin MB", role: "Co-Founder - MD" },
                  { name: "Nisarga M", role: "Head of Operations" },
                  { name: "Abhishek", role: "HR" },
                ].map((member, i) => (
                  <div
                    key={i}
                    className="
                relative flex justify-start
                w-full sm:w-[45%] md:w-[46%] lg:w-[32vw]
                h-[100px] sm:h-[130px] md:h-[150px] lg:h-[22vh]
                rounded-t-[40px] sm:rounded-t-[50px] lg:rounded-t-[66px]
                rounded-br-[40px] sm:rounded-br-[50px] lg:rounded-br-[66px]
                bg-[#9C90BD]/90 overflow-visible border border-white/20 
                shadow-[0_8px_25px_rgba(156,144,189,0.4)] 
                backdrop-blur-[6px]
                hover:shadow-[0_12px_30px_rgba(156,144,189,0.7)]
                transition-all duration-500"
                  >
                    {/* Profile Image (head pops slightly from top) */}
                    <img
                      src={profileImg}
                      alt="Profile"
                      className="absolute bottom-0 left-0 object-cover
                           h-[130px] sm:h-[140px] md:h-[160px] lg:h-[32vh]
                           -translate-y-[8px] sm:-translate-y-[10px] md:-translate-y-[14px] lg:-translate-y-[18px]"
                    />

                    {/* Info */}
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2
                            w-[60%] sm:w-[55%] md:w-[50%] lg:w-[45%]
                            flex flex-col justify-center items-start pl-3 sm:pl-4 md:pl-5"
                    >
                      <p className="text-white font-bold text-[0.95rem] sm:text-[1rem] md:text-[1.1rem] lg:text-[22px] leading-tight">
                        {member.name}
                      </p>
                      <p className="text-[#E4E3E3] text-[0.8rem] sm:text-[0.85rem] md:text-[0.9rem] lg:text-[14px] mt-1">
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
      <div
        className={`body-content px-[2%] relative min-h-screen lg:gap-[20px] md:pb-44 flex transition-all duration-700 ease-out w-full pt-[6vw]`}
      >
        {/* ✅ Sidebar Nav (hidden on mobile) */}
        <AnimatePresence>
          {!isMobile && showBody && (
            <motion.nav
              className="text-white  md:w-fit lg:w-fit flex flex-col md:gap-[6px] lg:gap-[10px]"
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

        {/* ✅ Main Content */}
        <div className="flex  px-[2vw] flex-col md:gap-[10rem] w-full md:pl-[30vw] lg:pl-[30vw]">
          <section
            id="about"
            ref={aboutRef}
            className="flex  flex-col  gap-[12px] md:gap-[12px] lg:gap-[8px] mt-[7vw]"
          >
            {isMobile && (
              <motion.p
                ref={(el) => {
                  if (!el) return;
                  const observer = new IntersectionObserver(
                    (entries) => {
                      entries.forEach((entry) => {
                        const isVisible =
                          entry.isIntersecting &&
                          entry.boundingClientRect.top > 100 && // ensure it's not too high
                          entry.boundingClientRect.top <
                            window.innerHeight - 150; // not too low
                        el.style.opacity = isVisible ? "1" : "0";
                        el.style.transform = isVisible
                          ? "translateY(0px)"
                          : "translateY(30px)";
                      });
                    },
                    { threshold: 0.3 }
                  );
                  observer.observe(el);
                  return () => observer.disconnect();
                }}
                className="relative my-[30px] text-center text-[clamp(1.3rem,4vw,2rem)] font-semibold
               bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185]
               bg-clip-text text-transparent inline-block transition-all duration-500 ease-out"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
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

            <p className="about-card-title text-white text-[24px] leading-[30px] md:text-[28px] lg:text-[3rem] md:leading-[40px] lg:leading-[52px]">
              We bridge innovation and execution with
              <br className="hidden md:block" />
              user-centric, future-ready systems that
              <br className="hidden md:block" />
              <span className="text-[#b19cd9] font-semibold">
                streamline operations
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
              <button className="rotating-btn relative text-[#b19cd9] font-garota text-[1.2rem] md:text-[1.5rem] rounded-md px-6 py-3 overflow-hidden">
                Know More
              </button>
            </div>
          </section>

          <section
            id="services"
            className="flex flex-col  gap-[12px] md:gap-[12px] lg:gap-[8px] mt-[7vw]"
            ref={servicesRef}
          >
            {isMobile && (
              <motion.p
                ref={(el) => {
                  if (!el) return;
                  const observer = new IntersectionObserver(
                    (entries) => {
                      entries.forEach((entry) => {
                        const isVisible =
                          entry.isIntersecting &&
                          entry.boundingClientRect.top > 100 && // ensure it's not too high
                          entry.boundingClientRect.top <
                            window.innerHeight - 150; // not too low
                        el.style.opacity = isVisible ? "1" : "0";
                        el.style.transform = isVisible
                          ? "translateY(0px)"
                          : "translateY(30px)";
                      });
                    },
                    { threshold: 0.3 }
                  );
                  observer.observe(el);
                  return () => observer.disconnect();
                }}
                className="relative my-[30px] text-center  text-[clamp(1.3rem,4vw,2rem)] font-semibold
               bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185]
               bg-clip-text text-transparent inline-block transition-all duration-500 ease-out"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Our Services
                <motion.span
                  className="absolute left-1/2 -translate-x-1/2 bottom-[-5px] h-[2px] w-[35%]
                 bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185] rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  viewport={{ once: false, amount: 0.4 }}
                />
              </motion.p>
            )}
            <div className="flex flex-col lg:gap-4">
              <InfiniteScrollNodes direction="left" baseSpeed={90} />
              <InfiniteScrollNodes direction="right" baseSpeed={90} />
              <InfiniteScrollNodes direction="left" baseSpeed={90} />
              <InfiniteScrollNodes direction="right" baseSpeed={90} />
              <InfiniteScrollNodes direction="left" baseSpeed={90} />
            </div>
          </section>

          <section
            id="team"
            className="flex flex-col  gap-[12px] md:gap-[12px] lg:gap-[8px] mt-[7vw]"
            ref={teamRef}
          >
            {isMobile && (
              <motion.p
                ref={(el) => {
                  if (!el) return;
                  const observer = new IntersectionObserver(
                    (entries) => {
                      entries.forEach((entry) => {
                        const isVisible =
                          entry.isIntersecting &&
                          entry.boundingClientRect.top > 100 && // ensure it's not too high
                          entry.boundingClientRect.top <
                            window.innerHeight - 150; // not too low
                        el.style.opacity = isVisible ? "1" : "0";
                        el.style.transform = isVisible
                          ? "translateY(0px)"
                          : "translateY(30px)";
                      });
                    },
                    { threshold: 0.3 }
                  );
                  observer.observe(el);
                  return () => observer.disconnect();
                }}
                className="relative my-[30px] text-center text-[clamp(1.3rem,4vw,2rem)] font-semibold
               bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185]
               bg-clip-text text-transparent inline-block transition-all duration-500 ease-out"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
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
            <div className="relative mb-[30px] w-[94vw] px-4 sm:w-[90vw] md:w-[75vw] lg:w-[55vw] mx-auto ">
              <p className="begin-title  absolute top-0 left-0 z-20 text-[9vw] md:text-[clamp(1.8rem,4vw,4rem)] font-extrabold bg-gradient-to-b from-[#C7B9F6] via-[#A699D9] to-[#6A6185] bg-clip-text text-transparent leading-[1] ">
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
