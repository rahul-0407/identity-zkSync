import React, { useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { BackgroundBeams } from "./ui/BackgroundBeams";
import { HeroHighlight, Highlight } from "./ui/HeroHighlight";
import { SparklesCore } from "./ui/Sparkles";
import { ThreeDMarqueeDemo } from "./marque";
import { AnimatedTooltipPreview } from "./Tooltip";
// import { SiMetamask } from "react-icons/si";
import MetamaskIcon from "../assets/MetaMask-icon-fox.svg?react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { TestContext } from "../context/TestContext";

function Hero() {
  const {walletAddress, setWalletAddress,connect} = useContext(TestContext);


  return (
    <>
      <div className="h-[100vh] w-full  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        {/* <Navbar connect={connect} walletAddress={walletAddress} /> */}

        <div className="px-4 py-10 md:py-20">
          <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold  md:text-4xl lg:text-7xl dark:text-slate-200">
            {"Secure Your Digital Self, Verify Anywhere, Anytime"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block "
                >
                  {word}
                </motion.span>
              ))}
          </h1>
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.8,
            }}
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
          >
            With self-sovereign identity, you control your data—securely verify,
            share, and prove who you are, anytime, anywhere, on-chain and on
            demand.
          </motion.p>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1,
            }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={connect}
              className="w-65 transform rounded-lg flex justify-evenly items-center bg-black px-6 py-2 font-medium text-black dark:text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-[rgba(79,82,255,0.92)] dark:hover:bg-[rgba(68,51,255)] box dark"
            >
              <MetamaskIcon style={{ width: 32, height: 32 }} />
              {walletAddress
                ? `Connected: ${walletAddress}`
                : "Connect Metamask"}
            </button>
            <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
              Contact Support
            </button>
          </motion.div>
        </div>
        <BackgroundBeams />
        <AnimatedTooltipPreview />
        <div className="w-full h-50 absolute rotate-180 bottom-1">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-3/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-2/4" />

          {/* Radial Gradient to prevent sharp edges */}
        </div>
      </div>

      {/* <ThreeDMarqueeDemo/> */}

      {/* <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          With insomnia, nothing&apos;s real. Everything is far away. Everything
          is a{" "}
          <Highlight className="text-black dark:text-white">
            copy, of a copy, of a copy.
          </Highlight>
        </motion.h1>
      </HeroHighlight> */}
    </>
  );
}

export default Hero;

const Navbar = ({ connect, walletAddress }) => {
  return (
    <nav className=" fixed top-0 left-0 z-500 flex w-full bg-[rgba(0,0,0,0)] items-center justify-between  border-b border-neutral-200 px-4 py-4 dark:border-neutral-800 backblur">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl text-white">
          Identity 3
        </h1>
      </div>
      <div className="flex gap-4 py-[15px] px-[28px] text-white text-sm backdrop1 bg-[rgba(20,20,20,0.55)] rounded-4xl border-solid border-1 border-[rgba(135,135,135,0.16)] items-center">
        <NavLink to="/document">
          <p>Document</p>
        </NavLink>
        <NavLink to="/about">
          <p>About</p>
        </NavLink>
        <NavLink to="/contact">
          <p>Contact</p>
        </NavLink>
        <NavLink to="/privacy-policy">
          <p>Privacy Policy</p>
        </NavLink>
        <NavLink to="/terms-of-use">
          <p>Terms of Use</p>
        </NavLink>
      </div>
      <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-[rgba(79,82,255,0.92)] dark:hover:bg-[rgba(68,51,255)] dark:text-white  box dark">
        {walletAddress ? walletAddress : "Connect"}
      </button>
    </nav>
  );
};
