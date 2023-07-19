import { NavLink } from "react-router-dom";
import ThemeButton from "./ThemeButton";

export default function NavBar() {
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
      <ThemeButton />
    </nav>
  );
}
