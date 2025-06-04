import React from "react";
import { FiLayers } from "react-icons/fi";
import containerBg from "../../assets/325337.jpg";

const Selfbox = ({direction,title,body,icon,poster}) => {
  return (
    <div className={`h-full items-stretch max-w-6xl text-white flex ${direction} justify-between items-center py-10 mx-auto gap-23 px-10`} >
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-white text-black w-13 h-13 grid rounded-lg place-items-center">
        {icon && React.createElement(icon, { className: "h-[50%] w-[50%]" })}

        </div>
        <h2 className="text-5xl font-medium">{title}</h2>
        <p className="text-gray-300">
          {body}
        </p>
        <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-gray-800 md:w-35 dark:bg-[rgba(79,82,255,0.92)] dark:hover:bg-[rgba(68,51,255)] dark:text-white  box dark">
        Read More
       </button>     
      </div>

      <div className="flex-1 rounded-xl grid place-items-center" style={{
        background: 'linear-gradient(145deg, rgb(125, 125, 125) 0%, rgb(66, 66, 66) 34%, rgb(20, 22, 64) 74%)',
        boxShadow: "0px 10px 50px 0px rgb(28, 27, 83)",
      }} >
        <img src={poster} className="border-0 rounded-md" style={{ width: 'calc(100% - 18px)', height:'calc(100% - 18px)' }}/>
      </div>

    </div>
  );
};

export default Selfbox;
