import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [mode, setTheme] = useState("light");
  return (
    <ThemeContext.Provider
      value={{
        mode,
        setTheme: () => setTheme(mode === "dark" ? "light" : "dark"),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
