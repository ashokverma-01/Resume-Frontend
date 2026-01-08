import React from "react";
import { FiLoader } from "react-icons/fi"; // optional icon
import "./Loader.css";

const Loader = ({ size = 50, color = "#6366f1", text = "Loading..." }) => {
  return (
    <div className="loader-wrapper">
      <div
        className="loader"
        style={{
          width: size,
          height: size,
          borderColor: `${color} transparent ${color} transparent`,
        }}
      ></div>
      <div className="loader-text">
        <FiLoader className="loader-icon" />
        {text}
      </div>
    </div>
  );
};

export default Loader;
