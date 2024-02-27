import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-end min-w-full bg-dark p-2 text-content">
      <nav className="no-underline md:flex justify-center gap-5 p-1  items-center text-2xl">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/food"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Why Us?
        </NavLink>
        <NavLink
          to="/ls"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          List
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Login
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
