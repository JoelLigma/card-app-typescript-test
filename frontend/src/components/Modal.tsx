import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ThemeContext } from "../utilities/themeContext";

type Props = {
  setIsOpen: (isOpen: boolean) => void;
};

const Modal = ({ setIsOpen }: Props) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const modalClassNames =
    "absolute top-11 right-20 bg-white flex flex-col gap-1 rounded m-3 p-1.5 shadow-md font-medium";
  const labelClassNames = `cursor-pointer px-3 py-0.5 rounded ${
    theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-600"
  }`;

  const clickHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    const selected = (event.target as HTMLInputElement).value;
    setTheme(selected);

    // save choice for our app in local storage
    localStorage.setItem("theme", selected);
    setIsOpen(false);
  };

  return (
    <article className={`${modalClassNames} modal--${theme}`}>
      <label className={`${labelClassNames} ${theme === "light" ? `bg-gray-50` : ""}`}>
        <input type="radio" value="light" name="theme" onClick={clickHandler} className="hidden" />
        <FontAwesomeIcon icon={faSun} color="#FEBE10" fontSize="15px" /> Light
      </label>
      <label className={`${labelClassNames} ${theme === "dark" ? `bg-gray-700` : ""}`}>
        <input type="radio" value="dark" name="theme" onClick={clickHandler} className="hidden" />
        <FontAwesomeIcon icon={faMoon} color="#FEBE10" fontSize="15px" /> Dark
      </label>
    </article>
  );
};

export default Modal;
