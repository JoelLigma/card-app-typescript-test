import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { EntryProvider } from "./utilities/globalContext";
import { ThemeProvider } from "./utilities/themeContext";

export default function App() {
  return (
    <section className="h-screen dark:bg-darkModeBg dark:text-white dark:text-opacity-80">
      <Router>
        <EntryProvider>
          <ThemeProvider>
            <NavBar></NavBar>
            <Routes>
              <Route path="/" element={<AllEntries />}></Route>
              <Route path="create" element={<NewEntry />}></Route>
              <Route path="edit/:id" element={<EditEntry />}></Route>
            </Routes>
          </ThemeProvider>
        </EntryProvider>
      </Router>
    </section>
  );
}
