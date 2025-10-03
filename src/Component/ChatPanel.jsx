import React, { useState } from "react";
import {
  Ticket,
  MapPin,
  MapPinned,
  IndianRupee,
  Car,
  Phone,
  User,
  Calendar,
  ClipboardList,
  Star,
} from "lucide-react";
import { FaArrowUp } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

// JSON data
const dashboardData = {
  ticket: {
    title: "Customer No-Show Dispute",
    ticketId: "T-48329",
    tabs: ["Conversation", "Ride Details", "User Info"],
  },
};

const colorMap = {
  green: {
    bg: "bg-green-100 hover:bg-green-200",
    text: "text-green-700",
  },
  blue: {
    bg: "bg-blue-100 hover:bg-blue-200",
    text: "text-blue-700",
  },
  yellow: {
    bg: "bg-yellow-100 hover:bg-yellow-200",
    text: "text-yellow-700",
  },
  purple: {
    bg: "bg-purple-100 hover:bg-purple-200",
    text: "text-purple-700",
  },
  red: {
    bg: "bg-red-100 hover:bg-red-200",
    text: "text-red-700",
  },
};

const rideValues = {
  rideId: "RID-LIVE-007",
  from: "Wadki, Maharashtra",
  to: "Swargate",
  finalFare: "₹185.50",
  vehicle: "Auto (12.2 km)",
};

const userInfo = {
  customer: {
    name: "Aman Gupta",
    rating: 4.8,
    totalTrips: 150,
    memberSince: 2022,
  },
  driver: {
    name: "Rajesh Kumar",
    rating: 4.9,
    totalTrips: 543,
    memberSince: 2021,
  },
};

const ChatPanel = () => {
  const [activeTab, setActiveTab] = useState("Conversation");

  return (
    <div className="col-span-2 borde rounded-lg h-full">
      {/* Chat Panel */}
      <div className="col-span-2 border-2 border-green-300 !rounded-lg">
        <div className="bg-white !rounded-lg shadow flex flex-col h-full">
          {/* Ticket Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-300 p-4 gap-4">
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {dashboardData.ticket.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Ticket #{dashboardData.ticket.ticketId}
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-6 justify-start lg:justify-between w-full lg:w-auto">
              {[
                { icon: "📞", label: "Start Call", color: "green" },
                { icon: "👤", label: "Assign Agent", color: "blue" },
                {
                  icon: <FaArrowUp />,
                  label: "Escalate Ticket",
                  color: "yellow",
                },
                { icon: "⇄", label: "Re-allot Driver", color: "purple" },
                {
                  icon: (
                    <AiOutlineCloseCircle className="text-red-600 text-xl" />
                  ),
                  label: "Cancel Ride",
                  color: "red",
                },
                { icon: "❌", label: "Close Ticket", color: "red" },
              ].map((action, i) => (
                <div key={i} className="flex flex-col items-center">
                  <button
                    className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md ${
                      colorMap[action.color].bg
                    }`}
                  >
                    <span className="text-xl flex">{action.icon}</span>
                  </button>
                  <span
                    className={`mt-2 text-xs sm:text-sm font-medium ${
                      colorMap[action.color].text
                    } text-center`}
                  >
                    {action.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row border-b border-gray-300">
            {dashboardData.ticket.tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 p-2 text-sm sm:text-base cursor-pointer ${
                  activeTab === tab
                    ? "text-teal-600 border-b-2 border-teal-500 font-medium"
                    : "text-gray-600"
                } hover:bg-gray-200 transition`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Conditional Content */}
          <div className="flex flex-col h-full">
            {/* Conversation */}
            {activeTab === "Conversation" && (
              <div className="h-full flex flex-col justify-end">
                <div className="p-4 sm:p-6 text-gray-500 text-center h-62">
                  Conversation history goes here.
                </div>
                <div className="border-t border-gray-300 p-2 sm:p-4 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your reply here..."
                    className="flex-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 h-12 sm:h-14"
                  />
                  <button className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600 h-12 sm:h-14 text-xl sm:text-2xl">
                    ➤
                  </button>
                </div>
              </div>
            )}

            {/* Ride Details */}
            {activeTab === "Ride Details" && (
              <div className="p-4 sm:p-6 text-gray-700">
                <div className="bg-gray-100 rounded-lg flex items-center justify-center h-32 sm:h-40 mb-6">
                  <span className="text-sm sm:text-xl font-semibold text-gray-500">
                    Ride Map Goes Here
                  </span>
                </div>
                <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-semibold">
                      <Ticket className="w-4 h-4 text-gray-500" /> Ride ID:
                    </span>
                    <span>{rideValues.rideId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-semibold">
                      <MapPin className="w-4 h-4 text-gray-500" /> From:
                    </span>
                    <span>{rideValues.from}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-semibold">
                      <MapPinned className="w-4 h-4 text-gray-500" /> To:
                    </span>
                    <span>{rideValues.to}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-semibold">
                      <IndianRupee className="w-4 h-4 text-gray-500" /> Final
                      Fare:
                    </span>
                    <span>{rideValues.finalFare}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-semibold">
                      <Car className="w-4 h-4 text-gray-500" /> Vehicle:
                    </span>
                    <span>{rideValues.vehicle}</span>
                  </div>
                </div>
              </div>
            )}

            {/* User Info */}
            {activeTab === "User Info" && (
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-gray-700 text-sm sm:text-base">
                {/* Customer */}
                <div className="border border-teal-400 rounded-xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
                    Customer Details
                  </h3>
                  <div className="mb-2">
                    <p className="font-semibold">{userInfo.customer.name}</p>
                    <p className="flex items-center text-xs sm:text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />{" "}
                      {userInfo.customer.rating}
                    </p>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-gray-500" />{" "}
                        Trips
                      </span>
                      <span className="font-medium">
                        {userInfo.customer.totalTrips}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" /> Since
                      </span>
                      <span className="font-medium">
                        {userInfo.customer.memberSince}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-evenly gap-4 mt-4 sm:mt-6">
                    <div className="hover:bg-green-100 rounded-full p-2 cursor-pointer relative group">
                      <Phone className="w-5 h-5 text-green-500" />
                      <span className="absolute top-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-500 !rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
                        Start Call with Driver
                      </span>
                    </div>
                    <div className="hover:bg-blue-100 rounded-full p-2 cursor-pointer relative group">
                      <User className="w-5 h-5 text-blue-500 cursor-pointer" />
                      <span className="absolute top-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-500 !rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
                        View Full Profile
                      </span>
                    </div>
                  </div>
                </div>

                {/* Driver */}
                <div className="border border-teal-400 rounded-xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
                    Driver Details
                  </h3>
                  <div className="mb-2">
                    <p className="font-semibold">{userInfo.driver.name}</p>
                    <p className="flex items-center text-xs sm:text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />{" "}
                      {userInfo.driver.rating}
                    </p>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-gray-500" />{" "}
                        Trips
                      </span>
                      <span className="font-medium">
                        {userInfo.driver.totalTrips}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" /> Since
                      </span>
                      <span className="font-medium">
                        {userInfo.driver.memberSince}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-evenly gap-4 mt-4 sm:mt-6">
                    <div className="hover:bg-green-100 rounded-full p-2 cursor-pointer relative group">
                      <Phone className="w-5 h-5 text-green-500" />
                      <span className="absolute top-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-500 !rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
                        Start Call with Driver
                      </span>
                    </div>
                    <div className="hover:bg-blue-100 rounded-full p-2 cursor-pointer relative group">
                      <User className="w-5 h-5 text-blue-500 cursor-pointer" />
                      <span className="absolute top-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-500 !rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
                        View Full Profile
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
