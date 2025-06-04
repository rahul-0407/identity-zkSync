import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { FiLayers, FiLock, FiShield, FiEyeOff, FiMove } from "react-icons/fi";
import Selfbox from "./ui/Selfbox";
import { FuzzyOverlay } from "./Footercopy";
import decentralization from "../assets/decentralization.jpg";
import privacy from "../assets/325337.jpg";
import ownership from "../assets/ownership.jpg";
// import privacy from "../assets/decentralization.jpg";

export default function Self() {

  const boxes = [
    {
      direction: "flex-row",
      title: "Power of Decentralization",
      body: "Experience the power of decentralized finance right at your fingertips, transforming the way you manage your assets and engagewith the financial world.",
      icon: FiLayers,
      poster:decentralization,
    },
    {
      direction: "flex-row-reverse",
      title: "Strength of self-control",
      body: "Take full control of your personal data and digital content, ensuring that only you decide who accesses and uses your valuable information.",
      icon: FiLock,
      poster:privacy,
    },
    {
      direction: "flex-row",
      title: "Your data, your rules",
      body: "Protect your sensitive information with advanced privacy measures, giving you enhanced control over what data you share and with whom.",
      icon: FiEyeOff,
      poster:ownership,
    },
    // {
    //   direction: "flex-row-reverse",
    //   title: "Freedom to move your world",
    //   body: "Seamlessly move your website, data, and digital identity across platforms without losing any control or ownership, ensuring true freedom online.",
    //   icon: FiMove,
    //   poster:privacy,
    // },
  ];
  

  return (
    <div className="h-full pt-36 bg-neutral-150 flex flex-col justify-center bg-neutral-950 gap-21 pb-27">
      <div className="mx-auto flex flex-col items-center max-w-[800px]">
        <div className="bg-slate-800 no-underline group  relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
            <span>Flexibility and efficiency</span>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </div>
        <h1 className="text-center bg-gradient-to-tl from-indigo-400 via-pink-100 to-gray-100 text-transparent bg-clip-text   text-6xl font-medium">
          Simplifying Web3 Fintech for Everyone
        </h1>
        <p className="text-center text-gray-400 max-w-[600px]">
          Protect your assets and transactions with our advanced encryption
          technology and decentralized infrastructure.
        </p>
      </div>

      <div className="rounded-md flex flex-col antialiased bg-white dark:bg-neutral-950 dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <img/>
        {boxes.map((box, index) => (
          <Selfbox
            key={index}
            direction={box.direction}
            title={box.title}
            body={box.body}
            icon={box.icon}
            poster={box.poster}
          />
        ))}
      </div>
    </div>
  );
}

const testimonials2 = [
  {
    direction: "flex-row",
    name: "Charles Dickens",
    title: "Software Developer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    quote:
      "Inno's services have completely transformed the way we handle our financial operations. Their innovative solutions have made a significant impact on our efficiency.",
    name: "William Shakespeare",
    title: "Software Developer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    quote:
      "Inno's services have completely transformed the way we handle our financial operations. Their innovative solutions have made a significant impact on our efficiency.",
    name: "Edgar Allan Poe",
    title: "Software Developer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    quote:
      "Inno's services have completely transformed the way we handle our financial operations. Their innovative solutions have made a significant impact on our efficiency.",
    name: "Jane Austen",
    title: "Software Developer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    quote:
      "Inno's services have completely transformed the way we handle our financial operations. Their innovative solutions have made a significant impact on our efficiency.",
    name: "Herman Melville",
    title: "Software Developer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
];
