import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { EntryProvider } from "./utilities/globalContext";
import { getOSDefault } from "./utilities/helpers";
import { ThemeContext } from "./utilities/themeContext";

export default function App() {
  const [theme, setTheme] = useState(getOSDefault());

  useEffect(() => {
    const selectedPreference = localStorage.getItem("theme");
    const newState = selectedPreference || getOSDefault();

    setTheme(newState);

    newState === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    <section className="h-screen dark:bg-darkModeBg dark:text-white dark:text-opacity-80">
      <Router>
        <EntryProvider>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <NavBar></NavBar>
            <Routes>
              <Route path="/" element={<AllEntries />}></Route>
              <Route path="create" element={<NewEntry />}></Route>
              <Route path="edit/:id" element={<EditEntry />}></Route>
            </Routes>
          </ThemeContext.Provider>
        </EntryProvider>
      </Router>
    </section>
  );
}
