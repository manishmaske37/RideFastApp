import React from "react";
import {
  Mic,
  MicOff,
  Pause,
  PhoneOff,
  Repeat,
  XCircle,
  Phone,
  Users,
  ClipboardList,
  MapPin,
  MapPinned,
  Wallet,
  Car,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const LiveSupport = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);

  const handleMute = () => setIsMuted(!isMuted);
  const handleHold = () => setIsOnHold(!isOnHold);
  const handleEndCall = () => alert("Call ended!");
  const [activeTab, setActiveTab] = useState("call"); // default active

  const location = useLocation();
  const tripId = location.state?.tripId || "Unknown Trip";

  const tabs = [
    { id: "call", label: "Call & Ticket", icon: Phone },
    { id: "participants", label: "Participants", icon: Users },
    { id: "trip", label: "Trip Details", icon: ClipboardList },
  ];

  const userData = {
    customer: {
      name: "Aman Gupta",
      rating: 4.8,
    },
    driver: {
      name: "Rajesh Kumar",
      rating: 4.9,
    },
  };

  const tripDetails = {
    from: "Wadki, Maharashtra",
    to: "Swargate",
    fare: 185.5,
    vehicle: "Auto (12.2 km)",
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <Link to="/dashboard">
        <div className="flex items-center gap-3 p-4 text-lg sm:text-xl md:text-2xl">
          <button className="text-gray-600 hover:text-black">←</button>
          <h2 className="font-medium text-gray-800">
            Live Support - Trip {tripId}
          </h2>
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row flex-2">
        {/* Left: Live Map View */}
        <div className="h-[60%] lg:h-auto flex-1 flex items-center justify-center bg-gray-100 rounded-lg m-2 lg:m-4 shadow-md">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-500">
            Live Map View
          </h1>
          {/* TODO: Integrate google_maps_flutter here */}
        </div>

        {/* Right: Sidebar */}
        <div className="h-[40%] lg:h-[calc(100vh-5rem)] w-full lg:w-120 bg-white border rounded-lg p-4 flex flex-col m-2 lg:m-4 overflow-y-auto">
          {/* Tabs */}
          <div className="flex border-b mb-4 text-sm md:text-base">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 cursor-pointer
                ${
                  isActive
                    ? "text-teal-600 border-b-2 border-teal-600 font-medium"
                    : "text-gray-500"
                }
              `}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  <div>{tab.label}</div>
                </button>
              );
            })}
          </div>

          {/* Content inside tabs (unchanged) */}
          {activeTab === "call" && (
            <div className="text-sm md:text-base">
              {/* Call Controls */}
              <h3 className="font-medium text-gray-700 mb-2">Call Controls</h3>
              <div className="flex justify-around mb-4">
                {/* Mute/Unmute */}
                <button
                  onClick={handleMute}
                  className="flex flex-col items-center cursor-pointer mt-2"
                >
                  {isMuted ? (
                    <MicOff className="w-6 h-6 md:w-7 md:h-7 mb-1 text-red-600" />
                  ) : (
                    <Mic className="w-6 h-6 md:w-7 md:h-7 mb-1 text-gray-600" />
                  )}
                  <div className="w-10 flex flex-col items-center">
                    <span className="text-sm">
                      {isMuted ? "Unmute" : "Mute"}
                    </span>
                  </div>
                </button>

                {/* Hold */}
                <button
                  onClick={handleHold}
                  className={`flex flex-col items-center cursor-pointer w-14 md:w-16 py-2 rounded ${
                    isOnHold ? "bg-blue-200" : ""
                  }`}
                >
                  <Pause className="w-6 h-6 md:w-7 md:h-7 mb-1 text-blue-600" />
                  <span className="text-xs md:text-sm">Hold</span>
                </button>

                {/* End Call */}
                <button
                  onClick={handleEndCall}
                  className="flex flex-col items-center text-red-600 hover:text-red-800 cursor-pointer"
                >
                  <PhoneOff className="w-6 h-6 md:w-7 md:h-7 mb-1" />
                  <span className="text-xs md:text-sm">End Call</span>
                </button>
              </div>

              {/* Critical Actions */}
              <h3 className="font-medium text-gray-700 mb-2">
                Critical Actions
              </h3>
              <div className="flex flex-col gap-3 mb-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm md:text-base">
                  <Repeat className="w-4 h-4" />
                  Re-allot New Driver
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm md:text-base">
                  <XCircle className="w-4 h-4" />
                  Cancel Trip
                </button>
              </div>

              {/* Ticket Notes */}
              <h3 className="font-medium text-gray-700 mb-2">Ticket Notes</h3>
              <textarea
                placeholder="Start typing notes here..."
                className="w-full border rounded-lg p-2 h-32 md:h-50 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm resize-none"
              ></textarea>
            </div>
          )}

          {/* Participants & Trip Tabs remain same but wrapped with text-sm/md:text-base for scaling */}
          {activeTab === "participants" && (
            <div className="p-2 md:p-4 space-y-4 text-sm md:text-base">
              {/* Cards */}
              <div className="bg-white rounded-xl shadow-lg p-3 md:p-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                  Customer Details
                </h3>
                <p className="text-gray-700 font-medium">
                  {userData.customer.name}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  ⭐ {userData.customer.rating}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-3 md:p-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                  Driver Details
                </h3>
                <p className="text-gray-700 font-medium">
                  {userData.driver.name}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  ⭐ {userData.driver.rating}
                </p>
              </div>
            </div>
          )}

          {activeTab === "trip" && (
            <div className="p-2 md:p-4 bg-white rounded-xl shadow-md space-y-3 md:space-y-4 text-sm md:text-base">
              {/* Trip details */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                  <p className="text-gray-600 font-medium">From:</p>
                </div>
                <p className="text-gray-800 font-semibold">
                  {tripDetails.from}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPinned className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                  <p className="text-gray-600 font-medium">To:</p>
                </div>
                <p className="text-gray-800 font-semibold">{tripDetails.to}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                  <p className="text-gray-600 font-medium">Quoted Fare:</p>
                </div>
                <p className="text-green-600 font-bold">
                  ₹{tripDetails.fare.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                  <p className="text-gray-600 font-medium">Vehicle:</p>
                </div>
                <p className="text-gray-800 font-semibold">
                  {tripDetails.vehicle}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveSupport;
