import React from "react";
import crossCircle from "../assets/cross-circle.png";
import { useState } from "react";

// JSON data
const dashboardData = {
  ticket: {
    title: "Customer No-Show Dispute",
    ticketId: "T-48329",
    tabs: ["Conversation", "Ride Details", "User Info"],
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

const ChatPanel = () => {
  const [activeTab, setActiveTab] = useState("Conversation");

  return (
    <div className="col-span-2 borde rounded-lg h-full">
      {/* Chat Panel */}
      <div className="col-span-2 border-2 border-green-300 !rounded-lg">
        <div className="bg-white !rounded-lg shadow flex flex-col h-full">
          {/* Ticket Header */}
          <div className="flex justify-between items-center border-b border-gray-300 p-4">
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
          <div className="flex border-b border-gray-300">
            {dashboardData.ticket.tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)} // ✅ set active tab on click
                className={`flex-1 p-2 ${
                  activeTab === tab
                    ? "text-teal-600 border-b-2 border-teal-500 font-medium"
                    : "text-gray-600"
                } hover:bg-gray-200 transition cursor-pointer`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Conditional Content */}
          <div className="h-full">
            {activeTab === "Conversation" && (
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
                    className="flex-1 border !rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 h-20"
                  />
                  <button className="bg-teal-500 text-white px-4 py-2 !rounded-lg shadow hover:bg-teal-600 h-20 text-2xl">
                    ➤
                  </button>
                </div>
              </div>
            )}

            {activeTab === "Ride Details" && (
              <div className="p-6 text-gray-700">
                {/* Ride Map Placeholder */}
                <div className="bg-gray-100 rounded-lg flex items-center justify-center h-40 mb-6">
                  <span className="text-xl font-semibold text-gray-500">
                    Ride Map Goes Here
                  </span>
                </div>

                {/* Ride Details */}
                <div className="space-y-3 text-gray-700">
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

            {activeTab === "User Info" && (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                {/* Customer Details */}
                <div className="border border-teal-400 rounded-xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
                    Customer Details
                  </h3>

                  {/* Name & Rating */}
                  <div className="mb-2">
                    <p className="font-semibold">{userInfo.customer.name}</p>
                    <p className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />{" "}
                      {userInfo.customer.rating}
                    </p>
                  </div>

                  {/* Trips & Member Since */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-gray-500" />{" "}
                        Total Trips:
                      </span>
                      <span className="font-medium">
                        {userInfo.customer.totalTrips}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" /> Member
                        Since:
                      </span>
                      <span className="font-medium">
                        {userInfo.customer.memberSince}
                      </span>
                    </div>
                  </div>

                  {/* Action Icons */}
                  <div className="flex justify-evenly gap-4 mt-6">
                    <div className="hover:bg-green-100 rounded-full p-2 cursor-pointer relative group">
                      <Phone className="w-5 h-5 text-green-500" />
                      <span
                        className="absolute top-full mb-1 left-1/2 -translate-x-1/2 
                     px-2 py-1 text-xs text-white bg-gray-500 !rounded 
                     whitespace-nowrap
                     opacity-0 group-hover:opacity-100 transition"
                      >
                        Start Call with Customer
                      </span>
                    </div>
                    <div className="hover:bg-blue-100 rounded-full p-2 cursor-pointer relative group">
                      <User className="w-5 h-5 text-blue-500 cursor-pointer" />
                      <span
                        className="absolute top-full mb-1 left-1/2 -translate-x-1/2 
                     px-2 py-1 text-xs text-white bg-gray-500 !rounded 
                     whitespace-nowrap
                     opacity-0 group-hover:opacity-100 transition"
                      >
                        View Full Profile
                      </span>
                    </div>
                  </div>
                </div>

                {/* Driver Details */}
                <div className="border border-teal-400 rounded-xl p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
                    Driver Details
                  </h3>

                  {/* Name & Rating */}
                  <div className="mb-2">
                    <p className="font-semibold">{userInfo.driver.name}</p>
                    <p className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />{" "}
                      {userInfo.driver.rating}
                    </p>
                  </div>

                  {/* Trips & Member Since */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-gray-500" />{" "}
                        Total Trips:
                      </span>
                      <span className="font-medium">
                        {userInfo.driver.totalTrips}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" /> Member
                        Since:
                      </span>
                      <span className="font-medium">
                        {userInfo.driver.memberSince}
                      </span>
                    </div>
                  </div>

                  {/* Action Icons */}
                  <div className="flex justify-evenly gap-4 mt-6">
                    <div className="hover:bg-green-100 rounded-full p-2 cursor-pointer relative group">
                      <Phone className="w-5 h-5 text-green-500" />
                      <span
                        className="absolute top-full mb-1 left-1/2 -translate-x-1/2 
                     px-2 py-1 text-xs text-white bg-gray-500 !rounded 
                     whitespace-nowrap
                     opacity-0 group-hover:opacity-100 transition"
                      >
                        Start Call with Driver
                      </span>
                    </div>
                    <div className="hover:bg-blue-100 rounded-full p-2 cursor-pointer relative group">
                      <User className="w-5 h-5 text-blue-500 cursor-pointer" />
                      <span
                        className="absolute top-full mb-1 left-1/2 -translate-x-1/2 
                     px-2 py-1 text-xs text-white bg-gray-500 !rounded 
                     whitespace-nowrap
                     opacity-0 group-hover:opacity-100 transition"
                      >
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
