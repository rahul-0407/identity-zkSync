import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className={cn(
              "relative w-[459px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 px-[35px] py-[30px] md:w-[450px]",
              // Light mode: Grid + linear gradient
              "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px),linear-gradient(180deg,#fafafa,#f5f5f5)]",
              "[background-size:40px_40px,40px_40px,auto]",
              // ✅ Dark mode: Radial gradient on top of grid
              "dark:[background-image:radial-gradient(91%_57%_at_14.9%_0%,rgb(28,27,83,0.9)_0%,rgba(15,11,0,0.85)_100%),linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
              "dark:[background-size:auto,40px_40px,40px_40px]",
              "dark:border-zinc-700"
            )}
            key={item.name}
          >
            <blockquote className="flex flex-col flex-nowrap items-center gap-6">
              <div
                aria-hidden="true"
                className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>

              <div className="flex flex-row flex-nowrap items-center gap-4 overflow-visible p-0 relative w-full h-min flex-none">

                <img src={item.image} height={100}width={100} alt="" className="relative !m-0 h-12 w-12 rounded-full  object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"/>

              <div className="relative z-20 flex flex-row items-center">
                <span className="flex flex-col ">
                  <span className="text-sm leading-[1.6] font-bold text-neutral-500 dark:text-white">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                    {item.title}
                  </span>
                </span>
              </div>

              </div>

              
              <span className="relative z-20 text-sm leading-[1.6] font-normal text-neutral-800 dark:text-gray-300">
                {item.quote}
              </span>
              
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
