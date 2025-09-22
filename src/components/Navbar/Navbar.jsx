// Navbar.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

// Navigation Links
const NavLinks = [
  {
    id: "1",
    name: "Home",
    link: "/home",
  },
  {
    id: "2",
    name: "Cars",
    link: "/cars",
  },
  {
    id: "3",
    name: "About",
    link: "/about",
  },
  {
    id: "4",
    name: "Booking",
    link: "/booking",
  },
];

const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  // Load email from localStorage on mount
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    navigate("/"); // Redirect to login
  };

  return (
    <nav
      className={`shadow-md ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="container mx-auto px-4 py-4 md:py-0">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <h1 className="text-xl font-bold">Car Rental</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {NavLinks.map((data) => (
                <li key={data.id} className="py-4">
                  <Link
                    to={data.link}
                    className="py-2 hover:border-b-2 hover:text-blue-500 hover:border-blue-500 transition-colors duration-300 text-lg font-medium"
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section: Theme + Profile/Logout */}
          <div className="flex items-center gap-6">
            {/* Theme Toggle */}
            <div onClick={toggleTheme} className="cursor-pointer">
              {theme === "dark" ? (
                <BiSolidSun className="text-2xl" />
              ) : (
                <BiSolidMoon className="text-2xl" />
              )}
            </div>

            {/* If user logged in → Show profile + logout */}
            {userEmail ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaUserCircle className="text-2xl" />
                  <span className="font-medium">{userEmail}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              // If not logged in → Show Login button
              <Link
                to="/"
                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Log Out
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
