import React, { useState } from "react";
import { FaCar, FaUser } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import crossCircle from "../assets/cross-circle.png";

// JSON data
const dashboardData = {
  stats: [
    {
      id: 1,
      title: "Active Drivers",
      value: 0,
      icon: <FaCar className="text-blue-500 text-2xl" />,
    },
    {
      id: 2,
      title: "Today Rides",
      value: 0,
      icon: <FaUser className="text-green-500 text-2xl" />,
    },
    {
      id: 3,
      title: "Open Tickets",
      value: 0,
      icon: <MdOutlineSupportAgent className="text-orange-500 text-2xl" />,
    },
    {
      id: 4,
      title: "Revenue",
      value: "₹0.00",
      icon: <RiMoneyRupeeCircleLine className="text-purple-600 text-2xl" />,
    },
  ],
  workload: {
    current: {
      name: "Aman Gupta",
      issue: "Customer No-Show Dispute",
      status: "Open",
    },
    next: {
      name: "Vikram Singh",
      issue: "Lost item in cab",
      status: "Pending",
    },
  },
  ticket: {
    title: "Customer No-Show Dispute",
    ticketId: "T-48329",
    tabs: ["Conversation", "Ride Details", "User Info"],
  },
};

import { Megaphone } from "lucide-react";

const Dashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className={`p-6 min-h-screen ${isOnline ? "bg-teal-100" : ""}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">RideFast Support</h1>
        <div className="flex items-center gap-3">
          <button
            className="bg-orange-400 text-white px-4 py-2 !rounded-lg shadow hover:bg-orange-500"
            onClick={() => setShowAlert(true)}
          >
            📢 Simulate Admin Alert
          </button>

          {showAlert && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
              <div className="bg-white w-full !rounded-lg shadow-lg overflow-hidden mx-3">
                {/* Header */}
                <div className="bg-teal-500 text-white flex justify-center items-center py-4">
                  <Megaphone className="w-6 h-6 mr-2" />
                </div>

                {/* Body */}
                <div className="p-6 text-center">
                  <h2 className="font-bold text-lg">System Update</h2>
                  <p>
                    A new fare policy for peak hours will be effective from
                    Monday. Please review document <strong>#POL-005</strong> in
                    the knowledge base.
                  </p>
                </div>

                {/* Footer / Button */}
                <div className="p-4">
                  <button
                    onClick={() => setShowAlert(false)}
                    className="bg-teal-500 text-white font-semibold w-full py-2 !rounded-md hover:bg-teal-600 cursor-pointer"
                  >
                    GOT IT
                  </button>
                </div>
              </div>
            </div>
          )}

          <button className="bg-indigo-500 text-white px-4 py-2 !rounded-lg shadow hover:bg-indigo-600">
            📞 Simulate Incoming Call
          </button>

          {/* ✅ Toggle Online/Offline */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsOnline(!isOnline)}
          >
            {/* Text first */}
            <span
              className={`font-medium ${
                isOnline ? "text-green-600" : "text-gray-600"
              }`}
            >
              {isOnline ? "You are Online" : "You are Offline"}
            </span>

            {/* Toggle button */}
            <button
              className={`relative inline-flex items-center h-6 w-12 !rounded-full transition-colors duration-300 focus:outline-none ${
                isOnline ? "bg-green-400" : "bg-gray-400"
              }`}
            >
              <span className="sr-only">Toggle Online/Offline</span>
              <span
                className={`inline-block w-5 h-5 transform bg-white !rounded-full shadow-md transition-transform duration-300 ${
                  isOnline ? "translate-x-6" : "translate-x-1"
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {dashboardData.stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white !rounded-lg p-4 shadow flex items-center gap-3 border-2 border-green-300"
          >
            {stat.icon}
            <div>
              <p className="font-bold text-xl">{stat.value}</p>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Workload */}
        <div className="col-span-1">
          <h2 className="text-lg font-semibold mb-3">Your Workload</h2>

          {/* offline */}
          {!isOnline && (
            <div className="bg-yellow-200 p-2 !rounded-lg mb-4 border-2 border-green-300">
              <p>
                You are offline. Please resolve your remaining tickets to end
                your session
              </p>
            </div>
          )}

          {/* Current */}
          <div className="bg-white !rounded-lg p-4 shadow mb-4 border-2 border-green-300">
            <h3 className="text-teal-600 font-bold">Currently Resolving</h3>
            <p className="mt-2 font-medium">
              {dashboardData.workload.current.name}
            </p>
            <p className="text-gray-600 text-sm">
              {dashboardData.workload.current.issue}
            </p>
            <span className="text-blue-600 text-sm font-semibold">
              {dashboardData.workload.current.status}
            </span>
          </div>

          {/* Next */}
          <div className="bg-white !rounded-lg p-4 shadow border-2 border-green-300">
            <h3 className="text-gray-700 font-bold">Next in Queue</h3>
            <p className="mt-2 font-medium">
              {dashboardData.workload.next.name}
            </p>
            <p className="text-gray-600 text-sm">
              {dashboardData.workload.next.issue}
            </p>
            <span className="text-orange-500 text-sm font-semibold">
              {dashboardData.workload.next.status}
            </span>
          </div>
        </div>

        {/* Chat Panel */}
        <div className="col-span-2 border-2 border-green-300 !rounded-lg">
          <div className="bg-white !rounded-lg shadow flex flex-col h-full">
            {/* Ticket Header */}
            <div className="flex justify-between items-center border-b p-4">
              <div>
                <h3 className="font-bold">{dashboardData.ticket.title}</h3>
                <p className="text-gray-600 text-sm">
                  Ticket #{dashboardData.ticket.ticketId}
                </p>
              </div>
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <div className="relative group">
                    <button className="p-2 bg-green-100 !rounded-full cursor-pointer">
                      📞
                    </button>
                    <span
                      className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 
                     px-2 py-1 text-xs text-white bg-gray-500 !rounded 
                     whitespace-nowrap
                     opacity-0 group-hover:opacity-100 transition"
                    >
                      Start Call (WebRTC)
                    </span>
                  </div>

                  <div className="relative group">
                    <button className="p-2 bg-blue-100 !rounded-full cursor-pointer">
                      👤
                    </button>
                    <span
                      className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 
                     px-2 py-1 text-xs text-white bg-gray-500 !rounded 
                     whitespace-nowrap
                     opacity-0 group-hover:opacity-100 transition"
                    >
                      Assign Agent
                    </span>
                  </div>

                  <div className="relative group">
                    <button className="p-2 bg-yellow-100 !rounded-full cursor-pointer">
                      ⬆️
                    </button>
                    <span
                      className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 
                     px-2 py-1 text-xs text-white bg-gray-500 !rounded 
                     whitespace-nowrap
                     opacity-0 group-hover:opacity-100 transition"
                    >
                      Escalate Ticket
                    </span>
                  </div>

                  <div className="relative group">
                    <button className="p-2 bg-purple-100 !rounded-full cursor-pointer">
                      ↔️
                    </button>
                    <span
                      className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 
                     px-2 py-1 text-xs text-white bg-gray-500 !rounded 
                     whitespace-nowrap
                     opacity-0 group-hover:opacity-100 transition"
                    >
                      Re-allot Driver
                    </span>
                  </div>

                  <div className="relative group">
                    <button className="p-2 bg-purple-100 !rounded-full cursor-pointer">
                      <img src={crossCircle} alt="Cancel" className="w-7 h-7" />
                    </button>
                    <span
                      className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 
                     px-2 py-1 text-xs text-white bg-gray-500 !rounded 
                     whitespace-nowrap
                     opacity-0 group-hover:opacity-100 transition"
                    >
                      Cancel Ride
                    </span>
                  </div>

                  <div className="relative group">
                    <button className="p-2 bg-red-100 !rounded-full cursor-pointer">
                      ❌
                    </button>
                    <span
                      className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 
                     px-2 py-1 text-xs text-white bg-gray-500 !rounded 
                     whitespace-nowrap
                     opacity-0 group-hover:opacity-100 transition"
                    >
                      Close Ticket
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
              {dashboardData.ticket.tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`flex-1 p-2 ${
                    tab === "Conversation"
                      ? "text-teal-600 border-b-2 border-teal-500 font-medium"
                      : "text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="h-full">
              {/* Chat Content */}
              <div className="p-6 text-gray-500 text-center h-40">
                Conversation history goes here.
              </div>

              {/* Input */}
              <div className="border-t p-4 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your reply here..."
                  className="flex-1 border !rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <button className="bg-teal-500 text-white px-4 py-2 !rounded-lg shadow hover:bg-teal-600">
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
