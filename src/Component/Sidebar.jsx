import React, { useState, useEffect } from "react";
import {
  LayoutGrid,
  Users,
  Car,
  BarChart2,
  PieChart,
  HelpCircle,
  NotepadText, 
  Menu, //Hamburger icon
  X, //close icon
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ onAvatarClick }) => {
  const [active, setActive] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false); //sidebar open state
  const location = useLocation();

  // Update active state based on the current URL path
  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    setActive(currentPath || "dashboard");
  }, [location]);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutGrid,
      link: "/dashboard",
    },
    {
      id: "users",
      label: "User",
      icon: Users,
      link: "/users",
    },
    {
      id: "ride", // Changed from 'cars' to match the link
      label: "Rides",
      icon: Car,
      link: "/ride",
    },
    {
      id: "reports", // Changed from 'bar' to match the link
      label: "Reports",
      icon: BarChart2,
      link: "/reports",
    },
    {
      id: "analytics", // Changed from 'pie' to match the link
      label: "Analytics",
      icon: PieChart,
      link: "/analytics",
    },
    {
      id: "help",
      label: "Help",
      icon: HelpCircle,
      link: "/help",
    },
    {
      id: "verification", // Added new menu item
      label: "Verification",
      icon: NotepadText,
      link: "/verification",
    },
  ];

  return (
    
    <>
      {/* Hamburger Button (Visible on mobile & tablet only) */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-teal-500 text-white shadow-md"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* sidebar */}
      <div className={`fixed top-0 bottom-0 left-0 flex flex-col justify-between items-center h-screen w-20 bg-white shadow-lg border-r z-40 
        transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:w-20 lg:flex lg:flex-col lg:justify-between lg:items-center`}   // always visible on large screens
      >

      {/* Top Section */}
      <div className="flex flex-col items-center gap-8 mt-10">
        {/* Menu Items */}
        <div className="flex flex-col gap-6 text-gray-500 items-center">
          {menuItems.map(({ id, icon: Icon, label, link }) => (
            <div key={id} className="flex flex-col items-center">
              {/* Icon button */}
              <Link
                to={link}
                onClick={() => {
                  setActive(id);
                  setIsOpen(false); // close sidebar on menu item click (mobile)
                }}
                className={`p-2 rounded-lg transition cursor-pointer ${
                  active === id
                    ? "bg-teal-100 text-teal-600"
                    : "hover:text-teal-600"
                }`}
              >
                <Icon size={28} />
              </Link>

              {/* Label outside of icon */}
              {label && active === id && (
                <p className="text-xs mt-1 text-teal-600 text-center">
                  {label}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Avatar */}
      <div className="mb-6 flex justify-center">
        <div
          onClick={onAvatarClick}
          className="w-12 h-12 bg-teal-500 text-white flex items-center justify-center rounded-full font-bold text-lg cursor-pointer"
        >
          {(() => {
            const fullName = localStorage.getItem("fullName") || "User";
            const parts = fullName.trim().split(" ");
            if (parts.length > 1 && parts[1]) {
              return (parts[0][0] + parts[1][0]).toUpperCase();
            }
            return parts[0].substring(0, 2).toUpperCase();
          })()}
        </div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;