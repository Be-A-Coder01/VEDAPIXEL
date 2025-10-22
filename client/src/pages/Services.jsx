import React from "react";
// import pic1 from "../assets/appDevelopment.png";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import pic1 from "../assets/appDevelopment.png";
import pic2 from "../assets/website.png";
import pic3 from "../assets/gaming.png";
import pic4 from "../assets/arvr.png";
import pic5 from "../assets/erp.png";
import pic6 from "../assets/chatbot.png";
import pic7 from "../assets/alml.png";
import pic8 from "../assets/crm.png";
import pic9 from "../assets/cloud.png";
import pic10 from "../assets/maintenance.png";
import pic11 from "../assets/blockchain.png";
// import pic12 from "../assets/appDevelopment.png";

const Services = () => {
  const controls = useAnimation();
  // const [ref, inView] = useInView({
  //   triggerOnce: true, // animate only once when seen
  //   threshold: 0.35, // triggers when 35% visible
  // });

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // smooth stagger
        when: "beforeChildren",
      },
    },
  };

  const img = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
        delay: i * 0.06,
      },
    }),
  };

  // Child variant uses a soft spring for natural motion
  const card = {
    hidden: { opacity: 0, y: 20, scale: 0.995 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 90, // softer than snappy
        damping: 16, // smooth settling
        mass: 0.9,
      },
    },
  };

  // React.useEffect(() => {
  //   if (inView) {
  //     controls.start("visible");
  //   }
  // }, [inView, controls]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: 10,
      scale: 0.97,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier
      },
    },
  };
  const services = [
    {
      title: "Mobile Applications",
      desc: "Crafting seamless iOS and Android apps that engage users.",
      img: pic1,
    },
    {
      title: "Web Development",
      desc: "Building dynamic, responsive websites for every need.",
      img: pic2,
    },
    {
      title: "Gaming App Development",
      desc: "Creating immersive, high-quality games across all platforms.",
      img: pic3,
    },
    {
      title: "AR/VR",
      desc: "Delivering lifelike AR and VR experiences for learning and innovation.",
      img: pic4,
    },
    {
      title: "ERP",
      desc: " Streamlining operations with intelligent, all-in-one ERP systems.",
      img: pic5,
    },
    {
      title: "Chatbot Development",
      desc: "Designing AI chatbots that simplify support and engagement.",
      img: pic6,
    },
    {
      title: "AL/ML",
      desc: "Empowering automation and insights through advanced AI and ML.",
      img: pic7,
    },
    {
      title: "CRM",
      desc: "Enhancing relationships through efficient, customized CRM solutions.",
      img: pic8,
    },
    {
      title: "Cloud & DevOps Services",
      desc: "Driving efficiency with seamless cloud and DevOps tools.",
      img: pic9,
    },
    {
      title: "Maintenance & Support",
      desc: "Ensuring software stays secure, reliable, and up to date.",
      img: pic10,
    },
    {
      title: "Blockchain",
      desc: "Developing secure, transparent blockchain apps and smart contracts.",
      img: pic11,
    },
  ];
  return (
    <>
      <div className=" flex flex-col gap-10 mt-20 px-6 sm:px-10 md:px-16 lg:px-28">
        <p className="service-title text-4xl md:text-[4rem] font-semibold text-white pl-[30px]  md:pl-24">
          Our Services
        </p>

        <motion.div
          className="services-box w-[73vw] pt-[20px] md:mt-0 flex flex-wrap mx-auto gap-[30px]"
          variants={container}
          initial="hidden"
          animate="visible"
          style={{ willChange: "transform, opacity" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="w-full sm:w-[80%] md:w-[90%] lg:w-[23vw] h-auto border border-[#F2F2F2] flex flex-col gap-3 rounded-xl p-6 hover:bg-[#141414] transition-all duration-300"
              variants={card}
              custom={index}
              // use transform for subpixel/GPU rendering
              style={{
                transform: "translateZ(0)",
              }}
              whileHover={{
                scale: 1.03,
                background:
                  "linear-gradient(139.47deg, rgba(50, 58, 68, 0.8) -45.69%, rgba(16, 24, 32, 0.9) 54.7%)",
                border: "2px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                backdropFilter: "blur(10px) saturate(180%)",
                WebkitBackdropFilter: "blur(10px) saturate(180%)",
                transition: { duration: 0.5, ease: "easeOut" },
              }}
            >
              <motion.img
                src={service.img}
                alt={service.title}
                className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] object-contain"
                variants={img}
                custom={index}
                // small accessibility improvement: avoid layout shifts
                loading="lazy"
              />

              <p className="service-title text-xl md:text-[1.75rem] text-white font-semibold">
                {service.title}
              </p>

              <p className="service-desc text-sm md:text-[1rem] text-[#C8C1C1] leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Services;
