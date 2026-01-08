import React, { useState, useRef, useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";

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

  // ✅ SINGLE SOURCE OF TRUTH
  const templateOptions = [
    { label: "Classic", value: "Classic" },
    { label: "Simple", value: "simple" },
    { label: "Modern", value: "Modern" },
    { label: "Minimal", value: "Minimal" },
  ];

  return (
    <div className="relative inline-block">
      {/* Button */}
      <button
        ref={btnRef}
        onClick={() => setOpen((prev) => !prev)}
        className="
    flex items-center gap-1.5
    px-3 py-1.5
    text-xs sm:text-sm
    bg-blue-100 text-blue-600
    rounded-lg
    hover:bg-blue-200
    transition
    border border-transparent hover:border-blue-400
  "
      >
        <FaFileAlt className="text-sm" />
        Template
      </button>

      {/* Popover */}
      {open && (
        <div
          ref={popRef}
          className="absolute top-full mt-2 left-0 w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-3 z-50"
        >
          {templateOptions.map((tpl) => {
            const isSelected = selectedTemplate === tpl.value;

            return (
              <div
                key={tpl.value}
                className={`flex items-center gap-3 p-2 cursor-pointer rounded
                  ${
                    isSelected
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                onClick={() => {
                  onSelect(tpl.value); // 🔥 IMPORTANT
                  setOpen(false);
                }}
              >
                <FaFileAlt />
                <span className="flex-1">{tpl.label}</span>
                {isSelected && <FiCheck className="text-green-600" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TemplatePopover;
