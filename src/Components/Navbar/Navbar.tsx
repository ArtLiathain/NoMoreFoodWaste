import { NavLink } from "react-router-dom";
import logo from "../../Images/logo.png";

function Navbar() {
  return (
    <div className="flex justify-between min-w-full bg-highlight p-2 text-content">
      <img src={logo} alt="logo" className="w-10 h-10" />

      <nav className="no-underline md:flex justify-center gap-5 p-1  items-center text-2xl">
        <NavLink to="/home" className={({ isActive }) => isActive ? 'text-white' : ''}>Home</NavLink>
        <NavLink to="/food" className={({ isActive }) => isActive ? 'active-link' : ''}>Food</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
        <NavLink to="/ls" className={({ isActive }) => isActive ? 'active-link' : ''}>List</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active-link' : ''}>About</NavLink>
        <NavLink to="/login" className={({ isActive }) => isActive ? 'active-link' : ''}>Login</NavLink>
        </nav>
    </div>
  );
}

export default Navbar;
