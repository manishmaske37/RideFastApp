import React, { useState } from "react";
import { FaCar, FaUser } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { useEffect } from "react";

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
import AdminAlert from "./Alerts/AdminAlert";
import IncomingToast from "./Alerts/IncomingToast";
import IncomingCallModal from "./Alerts/IncomingCallModal";
import ChatPanel from "./ChatPanel";
import SkeletonBox from "./SkeletonBox";

const Dashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate API fetch
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay
  }, []);

  const simulateCall = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setShowModal(true);
    }, 1500); // 1.5 sec delay before popup
  };

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

          {/* Visitor Alert Component */}
          <AdminAlert show={showAlert} onClose={() => setShowAlert(false)} />

          <button
            onClick={simulateCall}
            className="bg-indigo-500 text-white px-4 py-2 !rounded-lg shadow hover:bg-indigo-600"
          >
            📞 Simulate Incoming Call
          </button>

          {/* Components */}
          <IncomingToast show={showToast} />
          <IncomingCallModal
            show={showModal}
            onClose={() => setShowModal(false)}
          />

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
        {loading
          ? [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-4 shadow flex items-center gap-3 border-2 border-green-300"
              >
                <SkeletonBox className="w-8 h-8" />
                <div className="flex-1">
                  <SkeletonBox className="w-16 h-4 mb-2" />
                  <SkeletonBox className="w-24 h-3" />
                </div>
              </div>
            ))
          : dashboardData.stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-white rounded-lg p-4 shadow flex items-center gap-3 border-2 border-green-300"
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
            <hr className="my-2 text-gray-300"/>
            <p className="mt-2 font-medium">
              {dashboardData.workload.current.name}
            </p>
            <p className="text-gray-600 text-sm">
              {dashboardData.workload.current.issue}
            </p>

            <div className="mt-2">
            <span className="text-blue-600 text-sm font-semibold bg-blue-200 p-1 px-2 rounded-4xl">
              {dashboardData.workload.current.status}
            </span>
            </div>
          </div>

          {/* Next */}
          <div className="bg-white !rounded-lg p-4 shadow border-2 border-green-300">
            <h3 className="text-gray-700 font-bold">Next in Queue</h3>
            <hr className="my-2 text-gray-300"/>
            <p className="mt-2 font-medium">
              {dashboardData.workload.next.name}
            </p>
            <p className="text-gray-600 text-sm">
              {dashboardData.workload.next.issue}
            </p>
            <div className="mt-2">
            <span className="text-orange-500 text-sm font-semibold bg-orange-200 p-1 px-2 rounded-4xl">
              {dashboardData.workload.next.status}
            </span>
            </div>
          </div>
        </div>
        <ChatPanel />
      </div>
    </div>
  );
};

export default Dashboard;
