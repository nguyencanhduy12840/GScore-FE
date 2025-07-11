import React from "react";
import { FaTachometerAlt, FaSearch, FaChartBar, FaCog } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <FaTachometerAlt />, path: "/" },
  { text: "Search", icon: <FaSearch />, path: "/search" },
  { text: "Reports", icon: <FaChartBar />, path: "/reports" },
  { text: "Settings", icon: <FaCog />, path: "/settings" },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#00afb9] border-r border-gray-200 shadow-sm transition-all duration-300 w-16 sm:w-60 pt-16 z-50`}
    >
      <div className="h-full flex flex-col justify-between">
        <ul className="space-y-2 px-2 py-[60px]">
          {menuItems.map(({ text, icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={text}>
                <Link
                  to={path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-md transition-colors
                    ${
                      isActive
                        ? "bg-gray-100 text-blue-600"
                        : "text-gray-700 hover:bg-blue-500 hover:text-white"
                    }
                    ${"justify-center sm:justify-start"}
                  `}
                >
                  <span className="text-lg">{icon}</span>
                  <span className="text-sm font-medium hidden sm:inline">
                    {text}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
