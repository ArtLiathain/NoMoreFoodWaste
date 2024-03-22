import { NavLink } from "react-router-dom";
import logo from "../../Images/logo.png";

function Navbar() {
  return (
    <div className="flex justify-between min-w-full bg-dark p-2 text-content">
      <img src={logo} alt="Logo" className="h-12" />
      <nav className="no-underline md:flex justify-center gap-5 p-1  items-center text-2xl">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "active-link" : "hover:text-highlight"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "active-link" : "hover:text-highlight"
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            isActive ? "active-link" : "hover:text-highlight"
          }
        >
          Sign Up
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
