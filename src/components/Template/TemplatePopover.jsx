import React, { useState, useRef, useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";
import {
  FiCheck,
  FiLayers,
  FiFileText,
  FiLayout,
  FiZap,
  FiChevronDown,
} from "react-icons/fi";

const TemplatePopover = ({ selectedTemplate, onSelect }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const popRef = useRef(null);

  // Close on outside click
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

  const templateOptions = [
    {
      label: "Classic",
      value: "Classic",
      icon: <FiLayers className="text-blue-500" />,
    },
    {
      label: "Simple",
      value: "simple",
      icon: <FiFileText className="text-green-500" />,
    },
    {
      label: "Modern",
      value: "Modern",
      icon: <FiLayout className="text-purple-500" />,
    },
    {
      label: "Minimal",
      value: "Minimal",
      icon: <FiZap className="text-orange-500" />,
    },
  ];

  return (
    <div className="relative inline-block">
      {/* 🔹 Desktop/Mobile Optimized Button */}
      <button
        ref={btnRef}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg text-xs sm:text-sm hover:bg-blue-200 transition border border-transparent hover:border-blue-400 font-medium"
      >
        <FaFileAlt className="text-sm" />
        <span>Designs</span>
      </button>

      {/* 🔹 Responsive Popover Fix */}
      {open && (
        <div
          ref={popRef}
          className={`
            absolute top-full mt-2 z-[999]
            /* Mobile: Left se start hoga */
            left-0 
            /* Laptop/Desktop: Button ke theek niche left-edge se align hoga */
            sm:left-0 
            /* Agar screen choti hai toh right edge fix */
            max-sm:min-w-[280px] 
            /* Laptop Width */
            w-[300px] sm:w-[350px] 
            bg-white border border-gray-100 shadow-2xl rounded-2xl p-3
            animate-in fade-in zoom-in slide-in-from-top-2 duration-200
          `}
        >
          <div className="flex items-center justify-between px-2 mb-3">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black">
              Layout Options
            </p>
            <span className="text-[10px] bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full font-bold">
              4 Designs
            </span>
          </div>

          {/* Grid View for Laptop (2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {templateOptions.map((tpl) => {
              const isSelected = selectedTemplate === tpl.value;

              return (
                <div
                  key={tpl.value}
                  className={`
                    flex items-center gap-3 p-3 cursor-pointer rounded-xl transition-all border-2
                    ${
                      isSelected
                        ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm"
                        : "bg-white border-transparent hover:border-gray-100 hover:bg-gray-50 text-gray-600"
                    }
                  `}
                  onClick={() => {
                    onSelect(tpl.value);
                    setOpen(false);
                  }}
                >
                  <div className="text-lg">{tpl.icon}</div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold truncate">
                      {tpl.label}
                    </span>
                  </div>
                  {isSelected && (
                    <FiCheck className="ml-auto text-blue-600 stroke-[3px]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatePopover;
