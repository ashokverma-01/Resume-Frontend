import React, { createContext, useContext, useState } from "react";

const AccentColorContext = createContext();

export const useAccentColor = () => useContext(AccentColorContext);

export const AccentColorProvider = ({ children }) => {
  const [accentColor, setAccentColor] = useState("#6366f1"); // default color

  return (
    <AccentColorContext.Provider value={{ accentColor, setAccentColor }}>
      {children}
    </AccentColorContext.Provider>
  );
};
