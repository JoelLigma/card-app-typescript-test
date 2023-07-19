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
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const selectedPreference = localStorage.getItem("theme");
    setTheme(selectedPreference ? selectedPreference : getOSDefault());
  }, []);

  return (
    <section className={`${theme}`}>
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
