import React from "react";

const DateInput = ({ value, onChange, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="month"
        value={value}
        onChange={onChange}
        className="
          w-full
          h-10  /* reduced height */
          border border-gray-300
          rounded-md
          px-3
          pr-8  /* space for icon */
          text-gray-800
          placeholder-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-blue-400
          bg-white
        "
        placeholder="Select month"
      />
    </div>
  );
};

export default DateInput;
