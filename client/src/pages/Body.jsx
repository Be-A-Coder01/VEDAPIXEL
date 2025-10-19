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
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const teamRef = useRef(null);

  // 🧩 Detect screen width
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Detect visible section
  useEffect(() => {
    const sections = [
      { id: "about", ref: aboutRef },
      { id: "services", ref: servicesRef },
      { id: "team", ref: teamRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => {
      if (s.ref.current) observer.observe(s.ref.current);
    });
    return () => observer.disconnect();
  }, []);

  // ✅ Show body nav when visible
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

  // Responsive positioning for sidebar nav
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

  // ✅ Nav item animation (for large screens)
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

  // ✨ Mobile Section Title Animation
  const MobileTitle = ({ id, label }) => (
    <AnimatePresence mode="wait">
      {activeSection === id && (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex flex-col items-center mb-[12px]"
        >
          <p className="text-center font-semibold text-[clamp(16px,5vw,22px)] bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185] bg-clip-text text-transparent">
            {label}
          </p>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "60%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-[3px] rounded-full bg-gradient-to-r from-[#C7B9F6] via-[#A699D9] to-[#6A6185] mt-1"
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* ✅ Team Popup */}
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
              className="relative md:w-[700px] md:h-fit lg:w-[80vw] lg:h-[85vh] flex flex-col gap-10 rounded-[40px] border border-white/20 bg-white/10 backdrop-blur-[20px] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <button
                className="absolute top-4 right-6 text-white md:text-[18px] lg:text-[28px] hover:text-[#b19cd9]"
                onClick={() => setShowTeamPopup(false)}
              >
                ✕
              </button>

              <p className="popup-teamCard-title text-white md:text-[2.4rem] lg:text-[39px] pl-10 py-4 font-semibold">
                Meet Our Team
              </p>

              <div className="flex flex-wrap justify-center gap-10 lg:gap-10">
                {[
                  { name: "Sunil MB", role: "Co-Founder - MD / CEO" },
                  { name: "Nithin MB", role: "Co-Founder - MD" },
                  { name: "Nisarga M", role: "Head of Operations" },
                  { name: "Abhishek", role: "HR" },
                ].map((member, i) => (
                  <div
                    key={i}
                    className="relative mb-10 lg:my-5 flex md:w-[300px] md:h-[100px] lg:w-[35vw] lg:h-[24vh] rounded-t-[50px] lg:rounded-t-[66px] rounded-br-[50px] lg:rounded-br-[66px] bg-[#9C90BD]/90 overflow-visible border border-white/20 shadow-[0_8px_25px_rgba(156,144,189,0.4)] backdrop-blur-[6px] hover:shadow-[0_12px_30px_rgba(156,144,189,0.7)] transition-all duration-500"
                  >
                    <img
                      src={profileImg}
                      alt="Profile"
                      className="absolute bottom-0 left-0 md:h-[140px] lg:h-[35vh] object-cover"
                    />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[17vw] h-[20vh] flex flex-col justify-center items-start md:pl-5 lg:pl-3">
                      <p className="text-white font-bold md:text-[16px] lg:text-[22px] leading-tight">
                        {member.name}
                      </p>
                      <p className="text-[#E4E3E3] md:text-[12px] lg:text-[14px] mt-1">
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
      <div className="body-content relative min-h-screen flex transition-all duration-700 ease-out w-full pt-[6vw]">
        {/* Sidebar Nav (Tablet + Laptop + Desktop) */}
        <AnimatePresence>
          {!isMobile && showBody && (
            <motion.nav
              className="text-white flex flex-col md:gap-[6px] lg:gap-[10px]"
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

        {/* Main Content */}
        <div className="flex px-[2vw] flex-col gap-[10rem] w-full md:pl-[30vw] lg:pl-[30vw]">
          {/* --- About --- */}
          <section
            id="about"
            ref={aboutRef}
            className="flex flex-col gap-[12px] mt-[7vw]"
          >
            {isMobile && <MobileTitle id="about" label="Our Aim" />}
            <p className="about-card-title text-white text-[clamp(1.5rem,3vw,3rem)] leading-tight">
              We bridge innovation and execution with{" "}
              <span className="text-[#b19cd9] font-semibold">
                streamlined systems
              </span>
            </p>
            <p className="about-card-desc text-[#C8C1C1] text-[clamp(0.9rem,2vw,1.5rem)]">
              We offer future-ready solutions to streamline your business, drive
              growth, and put your processes in place.
            </p>
            <button className="body-nav h-[clamp(45px,8vh,60px)] w-[clamp(120px,20%,180px)] text-[clamp(14px,1.5vw,18px)] rounded-md border border-[#b19cd9] text-[#b19cd9] hover:bg-[#b19cd9] hover:text-black transition-all duration-300 mt-[2vw]">
              Know More
            </button>
          </section>

          {/* --- Services --- */}
          <section id="services" ref={servicesRef} className="mt-[8vw]">
            {isMobile && <MobileTitle id="services" label="Our Services" />}
            <div className="flex flex-col lg:gap-4">
              <InfiniteScrollNodes direction="left" baseSpeed={90} />
              <InfiniteScrollNodes direction="right" baseSpeed={90} />
              <InfiniteScrollNodes direction="left" baseSpeed={90} />
              <InfiniteScrollNodes direction="right" baseSpeed={90} />
              <InfiniteScrollNodes direction="left" baseSpeed={90} />
            </div>
          </section>

          {/* --- Team --- */}
          <section
            id="team"
            ref={teamRef}
            className="relative mb-[30px] w-[90vw] sm:w-[85vw] md:w-[75vw] lg:w-[55vw] mx-auto px-4"
          >
            {isMobile && <MobileTitle id="team" label="Ready to Begin?" />}
            <p className="begin-title absolute top-0 left-0 z-20 text-[clamp(1.8rem,4vw,4rem)] font-extrabold bg-gradient-to-b from-[#C7B9F6] via-[#A699D9] to-[#6A6185] bg-clip-text text-transparent leading-[1]">
              Hello!
            </p>

            <div
              className="relative border border-white p-[clamp(1.5rem,3vw,2.3rem)] mt-[clamp(20px,3vw,30px)] rounded-tr-[80px] rounded-b-[80px] shadow-xl"
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
                  className="begin-card-button border-2 border-[#B1A2DF] text-white py-2 rounded-[8px] mt-[clamp(15px,2vw,25px)] h-[clamp(40px,6vh,55px)] w-[clamp(110px,10vw,160px)] transition-all duration-300 hover:scale-105 hover:bg-[#B1A2DF]/20"
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
