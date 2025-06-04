import { cn } from "../../lib/utils";
import React from "react";

function GridBackgroundDemo() {
  return (
    <div className="relative flex h-[86vh] w-full items-center justify-center bg-white dark:bg-black flex-col border-box ">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `radial-gradient(50% 60% at 50% 32.8%, rgb(255, 255, 255) 7.34973%, rgba(68, 54, 223, 0.886) 24.2278%, rgb(154, 150, 248) 36%, rgb(72, 57, 237) 49.9878%, rgba(0, 0, 0, 0) 100%)`,
        }}
      />

      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="flex-9 w-full z-100  bg-neutral-950"></div>
      <div className="flex-9 w-full border-4  border-neutral-950 z-100">
        <div className="h-full w-full border-1 border-gray-400 rounded-xl ">
          <div className="w-[50%] h-[65%] mt-[6%] m-auto flex flex-col gap-5  items-center">
          <h1 className="text-white text-5xl text-center">Empower Your Digital Identity with Us</h1>
          <p className="text-gray-400 text-center">Join Identity 3 and experience the future of secure and efficient Web3 identity solutions.</p>
          <button className="w-26 transform rounded-lg bg-black px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-gray-800 md:w-45 dark:bg-[rgba(79,82,255,0.92)] dark:hover:bg-[rgba(68,51,255)] dark:text-white  box dark">
            Get Started Now
          </button>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full z-100 bg-neutral-950"></div>
    </div>
  );
}

export default GridBackgroundDemo;
