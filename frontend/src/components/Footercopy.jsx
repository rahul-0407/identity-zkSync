import React from "react";
import { motion } from "framer-motion";
import blackNoise from "../assets/black-noise.png";
import noise from "../assets/black-noise.png";
import GridBackgroundDemo from "./ui/GridBg"

export const Footercopy = () => {
  return (
    // NOTE: An overflow of hidden will be required on a wrapping
    // element to see expected results
    <div className="relative overflow-hidden w-[60%]  mx-auto ">
      {/* <ExampleContent /> */}
      
      <GridBackgroundDemo/>
      <FuzzyOverlay />
    </div>
  );
};

export const FuzzyOverlay = () => {
  return (
    <motion.div
      initial={{ transform: "translateX(-10%) translateY(-10%)" }}
      animate={{
        transform: "translateX(10%) translateY(10%)",
      }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: "linear",
        repeatType: "mirror",
      }}
      style={{
        // backgroundImage: `url(${blackNoise})`,
        backgroundImage: `url(${noise})`,
      }}
      className="pointer-events-none absolute -inset-[100%] opacity-[5%]"
    />
  );
};

