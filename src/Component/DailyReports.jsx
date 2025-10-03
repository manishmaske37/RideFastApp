import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import {
  CarFront,
  CheckCircle,
  XCircle,
  IndianRupee,
  BarChart2,
  Users,
  UserPlus,
} from "lucide-react";
import { useOnline } from "../context/OnlineContext";

const ReportCard = ({ Icon, label, value, color }) => (
  <div className="w-full">
    <div
      className="flex items-center justify-between px-4 py-3 bg-white border rounded-lg shadow-sm"
      style={{ borderColor: "#008080" }}
    >
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" style={{ color }} />
        <span className="text-gray-700 font-medium">{label}</span>
      </div>
      <span className="font-bold" style={{ color }}>
        {value}
      </span>
    </div>
  </div>
);

const HeaderCard = ({ date }) => (
  <div className="w-full mb-6">
    <div className="bg-white border-2 border-teal-700 rounded-xl shadow-sm px-8 py-5">
      <h2 className="text-xl font-semibold">Pune</h2>
      <p className="text-sm text-gray-500">
        Daily Operations Report
        <br />
        {date.toLocaleDateString()}
      </p>
    </div>
  </div>
);

export default function DailyReports() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef();

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { status } = useOnline();
  return (
    <div
      className={`min-h-screen px-6 md:px-24 py-8 ${
        status === "Online"
          ? "bg-teal-100"
          : status === "Busy"
          ? "bg-yellow-100"
          : ""
      }`}
    >
      {/* Top bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Daily Reports</h1>

        {/* Calendar input */}
        <div className="relative inline-block" ref={calendarRef}>
          <button
            onClick={() => setShowCalendar((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3M16 7V3M3 11h18M5 19h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-700 font-medium text-sm">
              {format(selectedDate, "dd/MM/yyyy")}
            </span>
          </button>

          {/* Popup Calendar */}
           {showCalendar && (
            <div
              className="absolute z-50 top-full mt-3 right-0 bg-teal-50 border-2 border-green-300 rounded-2xl shadow-2xl p-4 w-auto"
              ref={calendarRef}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  📅 Select Date
                </h3>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="text-gray-500 text-xl font-bold hover:text-red-500"
                >
                  ✕
                </button>
              </div>

              {/* Calendar */}
              <Calendar
                onChange={(date) => setSelectedDate(date)}
                value={selectedDate}
                className="!bg-teal-50 rounded-lg shadow-inner"
              />

              {/* Footer */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowCalendar(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <HeaderCard date={selectedDate} />

      {/* Ride Statistics */}
      <h2 className="text-xl font-bold mb-6">Ride Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        <ReportCard
          Icon={CarFront}
          label="Total Rides"
          value="0"
          color="blue"
        />
        <ReportCard
          Icon={CheckCircle}
          label="Completed"
          value="0"
          color="green"
        />
        <ReportCard Icon={XCircle} label="Cancelled" value="0" color="red" />
        <ReportCard
          Icon={IndianRupee}
          label="Total Revenue"
          value="₹0"
          color="purple"
        />
        <ReportCard
          Icon={BarChart2}
          label="Average Fare"
          value="₹0"
          color="orange"
        />
      </div>

      {/* Drivers & Registrations */}
      <div className="flex flex-col md:flex-row justify-between mb-4 items-start md:items-center gap-4">
        <h2 className="text-xl font-bold">Drivers & Registrations</h2>
        <label
          className="flex items-center gap-2 text-lg font-bold"
          style={{ marginRight: "55%" }}
        >
          Peak Hours
          <input type="checkbox" className="w-4 h-4 accent-teal-600" />
        </label>
      </div>

      <div className="flex flex-col gap-6">
        <div className="self-start w-full max-w-sm">
          <ReportCard
            Icon={CarFront}
            label="Active Drivers"
            value="0"
            color="blue"
          />
        </div>
        <div className="self-start w-full max-w-sm">
          <ReportCard
            Icon={UserPlus}
            label="New Customers"
            value="3"
            color="green"
          />
        </div>
        <div className="self-start w-full max-w-sm">
          <ReportCard
            Icon={Users}
            label="New Drivers"
            value="1"
            color="orange"
          />
        </div>
      </div>
    </div>
  );
}
