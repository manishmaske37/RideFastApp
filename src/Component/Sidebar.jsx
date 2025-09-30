import React, { useState } from "react";
import {
  LayoutGrid,
  Users,
  Car,
  BarChart2,
  PieChart,
  HelpCircle,
  NotepadText
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({onAvatarClick}) => {
  const [active, setActive] = useState("dashboard"); // default active

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
      id: "cars",
      label: "Rides",
      icon: Car,
      link: "/ride",
    },
    {
      id: "bar",
      label: "Reports",
      icon: BarChart2,
      link: "/reports",
    },
    {
      id: "pie",
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
      id: "Verification",
      label: "Verification",
      icon: NotepadText,
      link: "#",
    },
  ];

  return (
    <div className="!fixed !top-0 !bottom-0 !left-0 flex flex-col justify-between items-center h-screen w-20 bg-white shadow-lg border-r">
      {/* Top Section */}
      <div className="flex flex-col items-center gap-8 mt-6">
        {/* Menu Items */}
        <div className="flex flex-col gap-6 text-gray-500 items-center">
          {menuItems.map(({ id, icon: Icon, label, link }) => (
            <div key={id} className="flex flex-col items-center">
              {/* Icon button */}
              <Link
                to={link}
                onClick={() => setActive(id)}
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
      <div className="mb-6">
  <div 
    onClick={onAvatarClick}
    className="w-12 h-12 bg-teal-500 text-white flex items-center justify-center rounded-full font-bold text-lg cursor-pointer"
  >
    {(() => {
      const fullName = localStorage.getItem("fullName") || "User";
      const parts = fullName.trim().split(" ");
      const initials = parts[0][0] + (parts[1] ? parts[1][0] : "");
      return initials.toUpperCase();
    })()}
  </div>
</div>

      
    </div>
  );
};

export default Sidebar;
