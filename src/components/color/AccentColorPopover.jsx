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
        className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition border border-transparent hover:border-purple-500"
      >
        <FaPalette /> Accent
      </button>

      {/* Popover */}
      {open && (
        <div
          ref={popRef}
          className="absolute center top-full mt-2 left-0 w-40 bg-white border border-gray-200 shadow-lg rounded-lg p-3 flex flex-wrap gap-3 z-50"
        >
          {options.map((item, i) => {
            const isSelected = selectedColor === item.color;

            return (
              <div
                key={i}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  onSelect(item.color);
                  setOpen(false);
                }}
              >
                {/* Color circle */}
                <div
                  className="relative w-8 h-8 rounded-full border flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  {isSelected && (
                    <span className="absolute flex items-center justify-center w-5 h-5 rounded-full ">
                      <FiCheck className="text-white text-lg" />
                    </span>
                  )}
                </div>

                <span className="text-xs mt-1">{item.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AccentColorPopover;
