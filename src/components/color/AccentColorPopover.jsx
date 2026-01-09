import React, { useState, useRef, useEffect } from "react";
import { FaPalette } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";

const AccentColorPopover = ({ options, selectedColor, onSelect }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const popRef = useRef(null);

  // Click outside → close popover
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popRef.current &&
        !popRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      {/* Button */}
      <button
        ref={btnRef}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-600 rounded-lg text-xs sm:text-sm hover:bg-purple-200 transition border border-transparent hover:border-purple-400 font-medium"
      >
        <FaPalette className="text-sm" />
        <span>Color</span>
      </button>

      {/* Popover - Responsive Fix */}
      {open && (
        <div
          ref={popRef}
          className="absolute top-full mt-2 left-0 xs:left-auto xs:-right-10 sm:right-0 w-[180px] sm:w-[220px] bg-white border border-gray-200 shadow-xl rounded-xl p-3 z-50 animate-in fade-in zoom-in duration-150"
        >
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold px-1 mb-2">
            Accent Color
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {options.map((item, i) => {
              const isSelected = selectedColor === item.color;

              return (
                <div
                  key={i}
                  className="flex flex-col items-center group cursor-pointer"
                  onClick={() => {
                    onSelect(item.color);
                    setOpen(false);
                  }}
                >
                  {/* Color circle */}
                  <div
                    className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-100 flex items-center justify-center transition-transform active:scale-90 group-hover:scale-105 shadow-sm ${
                      isSelected ? "ring-2 ring-purple-400 ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: item.color }}
                  >
                    {isSelected && (
                      <FiCheck className="text-white text-lg drop-shadow-md" />
                    )}
                  </div>

                  <span
                    className={`text-[10px] mt-1.5 truncate w-full text-center ${
                      isSelected ? "text-purple-600 font-bold" : "text-gray-500"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccentColorPopover;
