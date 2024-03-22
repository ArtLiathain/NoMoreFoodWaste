import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-dark text-light py-12 min-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <NavLink
            to="/contactus"
            className={({ isActive }) =>
              isActive ? "active-link" : "hover:text-highlight"
            }
          >
            Contact Us
          </NavLink>
          <a
            href="https://www.youtube.com/SaveScanner"
            className="text-light hover:text-gray-500"
          >
            <div className="">YouTube</div>
          </a>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="text-light hover:text-gray-500"
          >
            <span className="">Facebook</span>
          </a>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="text-light hover:text-gray-500"
          >
            <span className="">Instagram</span>
          </a>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="text-light hover:text-gray-500"
          >
            <span className="">Tiktok</span>
          </a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-lg text-gray-400">
            &copy; 2022 SaveScanner. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
