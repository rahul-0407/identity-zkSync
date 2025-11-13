import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export default function Client() {
  return (
    <div className="min-h-screen p-12 bg-neutral-150 flex flex-col justify-center bg-neutral-950">
      <div className="mx-auto flex flex-col items-center max-w-[600px]">
        <div className="bg-slate-800 no-underline group  relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
            <span>Testimonials</span>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </div>
        <h1 className="bg-gradient-to-tl from-indigo-400 via-pink-100 to-gray-100 text-transparent bg-clip-text   text-6xl font-medium">
          Our Clients
        </h1>
        <p className="text-center text-gray-400">
          Protect your assets and transactions with our advanced encryption
          technology and decentralized infrastructure.
        </p>
      </div>

      <div className="h-[40rem] rounded-md flex flex-col antialiased  bg-neutral-950 bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials1}
          direction="right"
          speed="slow"
        />
        <InfiniteMovingCards
          items={testimonials2}
          direction="left"
          speed="slow"
        />
      </div>
    </div>
  );
}

const testimonials1 = [
  {
    quote:
      "Inno's services have completely transformed the way we handle our financial operations. Their innovative solutions have made a significant impact on our efficiency.",
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
    name: "Software Developer",
    title: "Moby-Dick",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
];

const testimonials2 = [
  {
    quote:
      "Inno's services have completely transformed the way we handle our financial operations. Their innovative solutions have made a significant impact on our efficiency.",
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
