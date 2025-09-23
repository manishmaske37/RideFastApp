// src/context/OnlineContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create context
export const OnlineContext = createContext();

// Custom hook to use context
export const useOnline = () => useContext(OnlineContext);

// Provider component
export const OnlineProvider = ({ children }) => {
  // Possible values: "Online", "Busy", "Offline"
    const [status, setStatus] = useState("Online"); 

  return (
    <OnlineContext.Provider value={{ status, setStatus  }}>
      {children}
    </OnlineContext.Provider>
  );
};
