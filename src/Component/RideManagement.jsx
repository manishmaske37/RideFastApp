import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { isWithinInterval, parse } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useOnline } from "../context/OnlineContext";
import { format } from "date-fns";

const statusOption = ["completed", "cancelled", "ongoing", "pending"];

const dummyRides = [
  {
    id: 1,
    status: "completed",
    pickupAddress: "123 Main St",
    destinationAddress: "456 Oak St",
    fare: "$25",
    date: "19/09/2025",
    customerName: "Alice",
    driverName: "Bob",
  },
  {
    id: 2,
    status: "ongoing",
    pickupAddress: "789 Pine St",
    destinationAddress: "321 Elm St",
    fare: "$18",
    date: "17/09/2025",
    customerName: "Charlie",
    driverName: "David",
  },
  {
    id: 3,
    status: "cancelled",
    pickupAddress: "555 Maple St",
    destinationAddress: "999 Birch St",
    fare: "$30",
    date: "12/09/2025",
    customerName: "Eve",
    driverName: "Frank",
  },
  {
    id: 4,
    status: "pending",
    pickupAddress: "111 Cedar St",
    destinationAddress: "222 Spruce St",
    fare: "$20",
    date: "20/09/2025",
    customerName: "Grace",
    driverName: "Hank",
  },
];

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    case "ongoing":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-orange-100 text-orange-700";
  }
};

const RideManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });

  const calendarRef = useRef(null);

  // Close calendar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setDateRange({
      startDate: null,
      endDate: null,
      key: "selection",
    });
  };

  // Filter rides based on search and status
  const filteredRides = dummyRides.filter((ride) => {
    const matchesSearch =
      searchQuery === "" ||
      ride.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.destinationAddress.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "" || ride.status === statusFilter;

    const rideDate = parse(ride.date, "dd/MM/yyyy", new Date());
    const matchesDate =
      !dateRange.startDate ||
      !dateRange.endDate ||
      isWithinInterval(rideDate, {
        start: dateRange.startDate,
        end: dateRange.endDate,
      });

    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = filteredRides.length > 0 ? 1 : 0;

  const { status } = useOnline();

  return (
    <div
      className={`min-h-screen p-6 ${
        status === "Online"
          ? "bg-teal-100"
          : status === "Busy"
          ? "bg-yellow-100"
          : ""
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Ride Management</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-4 items-center border rounded p-3 bg-white">
        {/* Search */}
        <input
          type="text"
          placeholder="Search rides..."
          className="border rounded px-3 py-2 flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Status Filter */}
        <select
          className="border rounded px-3 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          {statusOption.map((status) => (
            <option key={status} value={status}>
              {status.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Date Range Button */}
        <div className="relative inline-block" ref={calendarRef}>
          <button
            onClick={() => setShowCalendar((prev) => !prev)}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            {dateRange.startDate && dateRange.endDate
              ? `${format(dateRange.startDate, "dd/MM")} - ${format(
                  dateRange.endDate,
                  "dd/MM"
                )}`
              : "Date Range"}
          </button>

          {showCalendar && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
              <div className="bg-teal-100 rounded-lg shadow-lg p-6 w-150 h-150">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="text-gray-600 text-xl font-bold"
                  >
                    ✕
                  </button>
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="text-gray-800 px-4 py-2 rounded hover:bg-gray-200 cursor-pointer "
                  >
                    Save
                  </button>
                </div>

                {/* Label and Selected Range */}
                <div className="mb-5">
                  <p className="text-gray-600 text-sm">Select range</p>
                  <p className="text-gray-800 font-medium text-lg">
                    {dateRange.startDate && dateRange.endDate
                      ? `${format(dateRange.startDate, "MMM d")} - ${format(
                          dateRange.endDate,
                          "MMM d"
                        )}`
                      : "No range selected"}
                  </p>
                </div>

                {/* Date Range Picker */}
                <div className="
                flex justify-center pt-12 
                transform 
                sm:scale-70 /* 📱 bigger mobile */ 
                md:scale-85 /* 📱 tablet */ 
                lg:scale-150 /* 💻 desktop */">
                  <DateRange
                    ranges={[dateRange]}
                    onChange={(ranges) => setDateRange(ranges.selection)}
                    moveRangeOnFirstSelection={false}
                    rangeColors={["#0d9488"]}
                    showDateDisplay={false}
                    className="!bg-teal-100 rounded-lg "
                  />
                  <style> {` .rdrNextPrevButton { background-color: #CCFBF1; } `} </style>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="bg-blue-300 text-gray-700 px-4 py-2 rounded hover:bg-blue-400"
        >
          Clear
        </button>
      </div>

      {/* Ride List */}
      <div className="border rounded p-4 bg-white divide-y divide-gray-200">
        {filteredRides.map((ride) => (
          <div key={ride.id} className="py-3">
            <div className="flex justify-between items-center">
              <strong>Ride #{ride.id}</strong>
              <span
                className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(
                  ride.status
                )}`}
              >
                {ride.status.toUpperCase()}
              </span>
            </div>

            <div className="flex justify-between mt-2">
              <div>
                <p>
                  <span className="font-semibold">From:</span>{" "}
                  {ride.pickupAddress}
                </p>
                <p>
                  <span className="font-semibold">To:</span>{" "}
                  {ride.destinationAddress}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>
                  {ride.date}
                </p>
              </div>
            </div>

            <p className="text-gray-600 mt-1">
              Customer: {ride.customerName} | Driver: {ride.driverName}
            </p>
          </div>
        ))}

        {/* Page */}
        <div className=" mt-3 pt-3 text-gray-700">
          Page 1 of {totalPages} ({filteredRides.length} total)
        </div>
      </div>
    </div>
  );
};

export default RideManagement;
