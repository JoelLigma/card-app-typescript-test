import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ThemeContext } from "../utilities/themeContext";
import Dropdown from "./Dropdown";

const ThemeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const buttonClassNames = `flex items-center gap-1 absolute right-1 md:right-3 top-3 sm:top-2 font-medium rounded px-2 border border-transparent hover:border-gray-300 dark:hover:border-current`;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button type="button" className={buttonClassNames} onClick={toggleDropdown}>
        {theme === "light" ? (
          <FontAwesomeIcon icon={faSun} color="#FEBE10" className="text-2xl sm:text-base" />
        ) : (
          <FontAwesomeIcon icon={faMoon} color="#FEBE10" className="text-2xl sm:text-base" />
        )}
        <span className="hidden sm:block">Theme</span>
      </button>
      {isOpen ? <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
    </>
  );
};

export default ThemeButton;
