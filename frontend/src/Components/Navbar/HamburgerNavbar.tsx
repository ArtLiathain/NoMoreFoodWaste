import { NavLink } from "react-router-dom";
import { useState } from "react";

function HamburgerNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between min-w-full bg-dark p-2 text-content">
      <div>TabeMono</div>
      <nav className="no-underline md:flex justify-center gap-5 p-1  items-center text-2xl">
        <div onClick={toggleMenu} className="md:hidden cursor-pointer">
          <div
            className={`h-1 w-6 bg-white my-1 ${
              isOpen && "transform rotate-45 translate-y-2"
            }`}
          ></div>
          <div
            className={`h-1 w-6 bg-white my-1 ${isOpen && "opacity-0"}`}
          ></div>
          <div
            className={`h-1 w-6 bg-white my-1 ${
              isOpen && "transform -rotate-45 -translate-y-2"
            }`}
          ></div>
        </div>
        <div
          className={`flex flex-col md:flex-row gap-5 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
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
        </div>
      </nav>
    </div>
  );
}

export default HamburgerNavbar;
