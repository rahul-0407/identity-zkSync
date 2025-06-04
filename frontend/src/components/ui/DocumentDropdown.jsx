import React, { useState, useRef, useEffect } from "react";
import { QrCode, Trash2, MoreVertical } from "lucide-react";

const DocumentDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              setIsOpen(false);
              // handleGenerateQR()
            }}
            className="relative flex w-full cursor-default select-none items-center rounded-sm px-4 py-2 text-sm text-white outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 hover:bg-gray-700"
          >
            <QrCode className="w-4 h-4 mr-2" />
            Generate QR Code
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              // handleDeleteDocument()
            }}
            className="relative flex w-full cursor-default select-none items-center rounded-sm px-4 py-2 text-sm text-red-400 outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 hover:bg-gray-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Remove Document
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentDropdown;
