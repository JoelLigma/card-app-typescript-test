import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ThemeContext } from "../utilities/themeContext";

type Props = {
  onClick: () => void;
};

const ThemeButton = ({ onClick: toggleModal }: Props) => {
  const { theme } = useContext(ThemeContext);
  const buttonClassNames = `flex items-center gap-1 absolute right-24 font-medium rounded px-2 border border-transparent ${
    theme === "light" ? "hover:border-gray-300" : "hover:border-current"
  }`;

  return (
    <button type="button" className={buttonClassNames} onClick={toggleModal}>
      {theme === "light" ? (
        <FontAwesomeIcon icon={faSun} color="#FEBE10" fontSize="16px" />
      ) : (
        <FontAwesomeIcon icon={faMoon} color="#FEBE10" fontSize="16px" />
      )}
      Theme
    </button>
  );
};

export default ThemeButton;
