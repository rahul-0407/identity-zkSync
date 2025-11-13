import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { TestContext } from "../context/TestContext";

const Navbar = () => {
  const { walletAddress, setWalletAddress,connect,disconnect } = useContext(TestContext);

  function shortAddress(addr) {
    return addr ? `${addr.slice(0, 5)}...${addr.slice(-3)}` : "";
  }

  return (
    <nav className="fixed top-0 left-0 z-500 flex w-full bg-[rgba(0,0,0,0)] items-center justify-between  border-b  px-4 py-4 border-neutral-800 backblur">
      <Link to={"/"} className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl text-white">
          Identity 3
        </h1>
      </Link>
      <div className="flex gap-4 py-[15px] px-[28px] text-white text-sm backdrop1 bg-[rgba(20,20,20,0.55)] rounded-4xl border-solid border-1 border-[rgba(135,135,135,0.16)] items-center">
        <NavLink to="/document">
          <p>Document</p>
        </NavLink>
        <NavLink to="/verifier">
          <p>Verifier</p>
        </NavLink>
        <NavLink to="/owner">
          <p>Owner</p>
        </NavLink>
        <NavLink to="/privacy-policy">
          <p>Privacy Policy</p>
        </NavLink>
        <NavLink to="/terms-of-use">
          <p>Terms of Use</p>
        </NavLink>
      </div>

      {walletAddress ? (
        <div>
          {" "}
          <button className="w-24 transform rounded-lg  px-6 py-2 font-medium  transition-all duration-300  md:w-32 bg-[rgba(79,82,255,0.92)] hover:bg-[rgba(68,51,255)] text-white  box dark text-center">
            {walletAddress ? shortAddress(walletAddress) : "Connect"}
          </button>{" "}
          <button onClick={disconnect} className="w-24 transform rounded-lg  px-6 py-2 font-medium  transition-all duration-300 md:w-32 bg-[rgba(79,82,255,0.92)] hover:bg-[rgba(68,51,255)] text-white  box dark">
            Disconnect
          </button>{" "}
        </div>
      ) : (
        <button onClick={connect} className="w-24 transform rounded-lg px-6 py-2 font-medium  transition-all duration-300 md:w-32 bg-[rgba(79,82,255,0.92)] hover:bg-[rgba(68,51,255)] text-white  box dark">
          {walletAddress ? shortAddress(walletAddress) : "Connect"}
        </button>
      )}
    </nav>
  );
};

export default Navbar;
