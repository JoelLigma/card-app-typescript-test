import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../utilities/themeContext";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Dropdown = ({ isOpen, setIsOpen }: Props) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const { theme: selectedTheme, setTheme } = useContext(ThemeContext);

  const dropdownClassNames =
    "absolute top-11 right-20 bg-white dark:bg-modalDarkBg flex flex-col gap-1 rounded m-3 p-1.5 shadow-md font-medium";
  const labelClassNames = "cursor-pointer px-3 py-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-600";

  const clickHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    const selected = (event.target as HTMLInputElement).value;
    setTheme(selected);

    // save choice for our app in local storage
    localStorage.setItem("theme", selected);
    setIsOpen(false);
  };

  const closeOnOutsideClick = (e: PointerEvent) => {
    if (e.pointerType === "touch" || e.pointerType === "mouse" || e.pointerType === "pen") {
      if (dropRef.current && isOpen && !dropRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("pointerdown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, []);

  return (
    <div className={`${dropdownClassNames}`} ref={dropRef}>
      <label className={`${labelClassNames} ${selectedTheme === "light" ? `bg-gray-50` : ""}`}>
        <input type="radio" value="light" name="theme" onClick={clickHandler} className="hidden" />
        <FontAwesomeIcon icon={faSun} color="#FEBE10" fontSize="15px" /> Light
      </label>
      <label className={`${labelClassNames} ${selectedTheme === "dark" ? `bg-gray-700` : ""}`}>
        <input type="radio" value="dark" name="theme" onClick={clickHandler} className="hidden" />
        <FontAwesomeIcon icon={faMoon} color="#FEBE10" fontSize="15px" /> Dark
      </label>
    </div>
  );
};

export default Dropdown;
