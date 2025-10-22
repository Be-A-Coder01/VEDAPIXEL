// src/pages/Services.jsx
import React from "react";
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

// Main Card Component (handles its own scroll animation)
const AnimatedCard = ({ service }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // play only once
    threshold: 0.3, // triggers when 30% of the card is visible
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  // Animation variants for each card
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateY: 8,
      scale: 0.97,
      filter: "blur(3px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="w-full sm:w-[80%] md:w-[90%] lg:w-[23vw] h-auto border border-[#F2F2F2] flex flex-col gap-3 rounded-xl p-6 bg-[#0b0b0b] hover:bg-[#141414] transition-all duration-300 shadow-md"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      style={{ willChange: "transform, opacity, filter" }}
    >
      <motion.img
        src={service.img}
        alt={service.title}
        className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] object-contain"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      />

      <motion.p
        className="service-title text-xl md:text-[1.75rem] text-white font-semibold"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {service.title}
      </motion.p>

      <motion.p
        className="service-desc text-sm md:text-[1rem] text-[#C8C1C1] leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {service.desc}
      </motion.p>
    </motion.div>
  );
};

// Main Services Section
const Services = () => {
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
    <div className="flex flex-col gap-[20px] mt-20">
      <p className="service-title text-[2.5rem] md:text-[3rem] text-white pl-[1rem] md:pl-[12.5rem]">
        Our Services
      </p>

      <div className="services-box w-[85vw] md:w-[73vw] pt-[20px] flex flex-wrap justify-center mx-auto gap-[30px]">
        {services.map((service, index) => (
          <AnimatedCard key={index} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
