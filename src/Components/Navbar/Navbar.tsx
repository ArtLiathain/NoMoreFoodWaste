import logo from "../../Images/logo.png";

function Navbar() {
  return (
    <div className="flex justify-between min-w-full bg-highlight p-2 text-content">
      <img src={logo} alt="logo" className="w-10 h-10" />

      <nav className="no-underline md:flex justify-center gap-5 p-1  items-center text-2xl">
        <a href="/home/">Home</a>
        <a href="/food/">Food</a>
        <a href="/dashboard/">Dashboard</a>
        <a href="/ls/">List</a>
        <a href="/about/">About</a>
        <a href="/login/">Login</a>
      </nav>
    </div>
  );
}

export default Navbar;
