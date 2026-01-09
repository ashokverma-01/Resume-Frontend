import React from "react";
import { FiCalendar } from "react-icons/fi";

const DateInput = ({ value, onChange, className = "" }) => {
  return (
    <div className={`relative w-full group ${className}`}>
      {/* 📅 Icon Section */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none z-10">
        <FiCalendar size={18} />
      </div>

      {/* 🔘 Input Field */}
      <input
        type="month"
        value={value}
        onChange={onChange}
        className="
          w-full
          h-12                 /* Standard height for touch targets */
          sm:h-11              /* Slightly smaller for laptop */
          pl-12                /* Space for left icon */
          pr-4 
          bg-white 
          border border-gray-200 
          rounded-2xl          /* Matches your premium theme */
          text-sm 
          font-semibold
          text-gray-700
          outline-none 
          transition-all
          cursor-pointer
          
          /* Browser specific resets */
          appearance-none
          
          /* Focus & Hover Effects */
          focus:ring-4 
          focus:ring-blue-50 
          focus:border-blue-400 
          hover:border-gray-300

          /* Responsive sizing for fonts */
          sm:text-base
        "
      />

      {/* Custom Styling for the native browser calendar icon */}
      <style jsx>{`
        input[type="month"]::-webkit-calendar-picker-indicator {
          background: transparent;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
        }
      `}</style>
    </div>
  );
};

export default DateInput;
