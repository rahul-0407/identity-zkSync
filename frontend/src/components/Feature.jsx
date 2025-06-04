import React from "react";
import styles from "../styles/bubble.module.css";
import FeatureCard from "./ui/FeatureCard"
import {
    FiUserCheck,
    FiShield,
    FiLock,
    FiEye,
    FiKey,
    FiLayers,
    FiCloudLightning,
    FiZap,
  } from "react-icons/fi";


const Feature = () => {
    const features = [
        {
          title: "Self-Owned Identity",
          description: "No central authority. You own and control your identity completely.",
          icon: <FiUserCheck size={32} />,
        },
        {
          title: "Verifier Access Control",
          description: "Only trusted verifiers can verify your documents — with your permission.",
          icon: <FiShield size={32} />,
        },
        {
          title: "Privacy by Design",
          description: "No raw documents on-chain. Only cryptographic proofs are stored.",
          icon: <FiLock size={32} />,
        },
        {
          title: "Instant Document Verification",
          description: "Verify document authenticity in seconds using smart contracts.",
          icon: <FiEye size={32} />,
        },
        {
          title: "On-Chain Ownership",
          description: "Claim document ownership immutably and transparently on the blockchain.",
          icon: <FiKey size={32} />,
        },
        {
          title: "Modular Smart Contract",
          description: "Extensible design — plug in ZK proofs, Reown, or storage layers easily.",
          icon: <FiLayers size={32} />,
        },
        {
          title: "Decentralized & Always Available",
          description: "Powered by Ethereum. No downtime, ever. Period.",
          icon: <FiCloudLightning size={32} />,
        },
        {
          title: "Built for Integration",
          description: "Easily integrate with any dApp, verifier system, or third-party wallet.",
          icon: <FiZap size={32} />,
        },
      ];

  return (
    <div className="w-full h-full bg-neutral-950 py-18">

        {/* Main body */}
      <div className="flex flex-col gap-27">

        {/* Heading */}
        <h1 className="text-center text-8xl font-thin text-indigo-300">
          {"We're good. Here's why.".split("").map((child, idx) => (
            <span className={styles.hoverText} key={idx}>
              {child}
            </span>
          ))}
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10  max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Feature;
