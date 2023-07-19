import { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import ThemeButton from "./ThemeButton";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-center items-center gap-5 relative">
      <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={"/"}>
        All Entries
      </NavLink>
      <NavLink
        className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white"
        to={"/create"}
      >
        New Entry
      </NavLink>
      <ThemeButton onClick={toggleModal} />
      {isOpen ? <Modal setIsOpen={setIsOpen} /> : null}
    </nav>
  );
}
