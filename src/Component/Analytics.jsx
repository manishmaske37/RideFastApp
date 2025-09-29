import React, { useState } from "react";
import { CalendarDays } from "lucide-react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useOnline } from "../context/OnlineContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// KPI Card
function KpiCard({ title, value, icon, color }) {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 p-2">
      <div className="h-full bg-white shadow-md rounded-xl border-2 border-teal-700 p-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
            color === "primary"
              ? "bg-blue-100 text-blue-600"
              : color === "warning"
              ? "bg-yellow-100 text-yellow-600"
              : color === "success"
              ? "bg-green-100 text-green-600"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <h4 className="font-bold text-xl">{value}</h4>
        <p className="text-gray-500 text-sm">{title}</p>
      </div>
    </div>
  );
}

// Legend Component
function Legend({ color, text }) {
  return (
    <div className="flex items-center mb-2">
      <div
        className={`w-3 h-3 rounded-full ${
          color === "primary"
            ? "bg-blue-600"
            : color === "warning"
            ? "bg-yellow-600"
            : color === "success"
            ? "bg-green-600"
            : "bg-gray-600"
        }`}
      ></div>
      <span className="ml-2 text-sm text-gray-700">{text}</span>
    </div>
  );
}

// Main Component
export default function Analytics() {
  const { status } = useOnline();

  // Calendar state
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });

  return (
    <div
      className={`min-h-screen py-6 pl-24 pr-6 ${
        status === "Online"
          ? "bg-teal-100"
          : status === "Busy"
          ? "bg-yellow-100"
          : ""
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Support Analytics</h1>
        <button
          onClick={() => setShowCalendar(true)}
          className="flex items-center gap-2 border rounded-md bg-white px-3 py-2 shadow-sm hover:bg-gray-100"
        >
          <CalendarDays size={16} />
          <span className="font-medium text-sm">
            {dateRange.startDate && dateRange.endDate
              ? `${format(dateRange.startDate, "dd/MM")} - ${format(
                  dateRange.endDate,
                  "dd/MM"
                )}`
              : "Date Range"}
          </span>
        </button>
      </div>

      {/* FULLSCREEN CALENDAR POPUP */}
      {showCalendar && (
        <div className="fixed inset-0 bg-teal-100 z-50 flex flex-col">
          {/* TOP BAR */}
          <div className="flex justify-between items-center p-4">
            <button
              className="text-gray-700 text-xl font-bold"
              onClick={() => setShowCalendar(false)}
            >
              ✕
            </button>
            <button
              className="text-gray-700 font-medium hover:underline"
              onClick={() => setShowCalendar(false)}
            >
              Save
            </button>
          </div>

          {/* LABEL + SELECTED RANGE */}
          <div className="pl-20 mb-5 text-2xl">
            <p className="text-gray-600 text-sm">Select range</p>
            <p className="text-gray-800 font-medium">
              {dateRange.startDate && dateRange.endDate
                ? `${format(dateRange.startDate, "MMM d")} - ${format(
                    dateRange.endDate,
                    "MMM d"
                  )}`
                : "No range selected"}
            </p>
          </div>

          {/* CALENDAR */}
          <div className="flex-1 flex justify-center items-center overflow-auto">
            <div
              className="
                transform 
                scale-95      /* small mobile */
                sm:scale-110  /* bigger mobile */
                md:scale-125  /* tablet */
                lg:scale-140  /* desktop */
              "
            >
              <DateRange
                ranges={[dateRange]}
                onChange={(ranges) => setDateRange(ranges.selection)}
                moveRangeOnFirstSelection={false}
                rangeColors={["#0d9488"]}
                showDateDisplay={false}
                className="!bg-teal-100 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* KPI GRID */}
      <div className="flex flex-wrap -m-2 mb-6">
        <KpiCard
          title="Total Tickets (30d)"
          value="1,428"
          icon="🎫"
          color="primary"
        />
        <KpiCard
          title="Avg. Resolution Time"
          value="3.2 hours"
          icon="⏱️"
          color="warning"
        />
        <KpiCard
          title="First Response Time"
          value="15 min"
          icon="📩"
          color="success"
        />
        <KpiCard
          title="Satisfaction (CSAT)"
          value="92.5%"
          icon="😊"
          color="secondary"
        />
      </div>

      {/* MAIN CHARTS */}
      <div className="flex flex-wrap -m-2">
        {/* Ticket Trends */}
        <div className="w-full lg:w-2/3 p-2">
          <div className="h-full bg-white shadow-md rounded-xl border-2 border-teal-700 p-4">
            <h5 className="font-semibold mb-4">Ticket Volume vs. Resolution</h5>
            <div className="flex items-center justify-center bg-gray-100 rounded-md p-6 text-gray-400 text-sm h-64">
              Chart Placeholder
            </div>
          </div>
        </div>

        {/* Ticket Category */}
        <div className="w-full lg:w-1/3 p-2">
          <div className="h-full bg-white shadow-md rounded-xl border-2 border-teal-700 p-4">
            <h5 className="font-semibold mb-4">Tickets by Category</h5>
            <div className="w-44 h-44 mx-auto my-3 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              Donut Placeholder
            </div>
            <div className="mt-4">
              <Legend color="primary" text="Payment & Fare (45%)" />
              <Legend color="warning" text="Driver Issues (25%)" />
              <Legend color="success" text="App Glitches (18%)" />
              <Legend color="secondary" text="Other (12%)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
