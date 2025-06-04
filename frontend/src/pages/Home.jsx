import React from "react";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import Client from "../components/Clients";
import Self from "../components/Self";
import GridBackgroundDemo from "../components/ui/GridBg";

const Home = () => {
  return (
    <div>
      <Hero />
      <Self />
      <Feature />
      <Client />
      {/* <GridBackgroundDemo /> */}
    </div>
  );
};

export default Home;

{/* <div className="flex justify-center items-center min-h-screen bg-black px-4">
  <div className="relative w-full max-w-4xl rounded-xl p-10 text-center text-white overflow-visible">
    // Gradient background inside the box
    <div className="absolute inset-0 z-0 rounded-xl bg-[radial-gradient(60%_60%_at_50%_0%,_#fff_7.35%,_rgba(68,_54,_223,_0.886)_24.23%,_#9a96f8_36%,_#4839ed_49.99%,_rgba(0,_0,_0,_0)_100%)] opacity-100"></div>

    // Foreground content
    <div className="relative z-10 backdrop-blur-sm bg-black/30 rounded-xl p-6">
      <h1 className="text-4xl font-bold mb-4">
        Empower Your Financial Future with Inno
      </h1>
      <p className="text-lg text-neutral-300 mb-6">
        Join Inno today and experience the future of secure and efficient Web3
        financial solutions.
      </p>
      <button className="px-6 py-3 bg-indigo-500 rounded-lg font-semibold hover:bg-indigo-600 transition">
        Get This Template
      </button>
    </div>
  </div>
</div>;  */}
