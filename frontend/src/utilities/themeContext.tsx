import { ReactNode, createContext, useEffect, useState } from "react";
import { ThemeContextType } from "../@types/context";
import { getOSDefault } from "./helpers";

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string | null>(null);

  const initState = () => {
    setTheme(localStorage.getItem("theme") || getOSDefault());
  };

  const applyTheme = () => {
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  };

  useEffect(() => {
    initState();
  }, []);

  useEffect(() => {
    applyTheme();
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
