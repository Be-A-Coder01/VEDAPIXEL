import React from "react";
// import pic1 from "../assets/appDevelopment.png";
import { motion } from "framer-motion";
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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15, // staggered animation
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

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
    <>
      <div className=" flex flex-col gap-10 mt-20 px-6 sm:px-10 md:px-16 lg:px-28">
        <p className="service-title text-4xl md:text-[4rem] font-semibold text-white text-center md:text-left">
          Our Services
        </p>

        <div className="services-box w-[73vw] pt-[20px] md:mt-0 flex flex-wrap mx-auto gap-[30px]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="w-full sm:w-[80%] md:w-[90%] lg:w-[23vw] h-auto border border-[#F2F2F2] flex flex-col gap-3 rounded-xl px-3 py-6 hover:bg-[#141414] transition-all duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
            >
              <motion.img
                src={service.img}
                alt={service.title}
                className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] object-contain"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              />
              <p className="service-title text-xl md:text-[1.75rem] text-white font-semibold">
                {service.title}
              </p>
              <p className="service-desc text-sm md:text-[1rem] text-[#C8C1C1] leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;
