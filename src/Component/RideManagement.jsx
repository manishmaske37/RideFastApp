
import React, { useState } from "react";
import {format} from "date-fns";

const statusOption = ["completed", "cancelled", "ongoing", "pending"];

const dummyRides = [
  {
    id: 1,
    status: "completed",
    pickupAddress: "123 Main St",
    destinationAddress: "456 Oak St",
    fare: "$25",
    createdAt: new Date(),
    customerName: "Alice",
    driverName: "Bob",
  },
  {
    id: 2,
    status: "ongoing",
    pickupAddress: "789 Pine St",
    destinationAddress: "321 Elm St",
    fare: "$18",
    createdAt: new Date(),
    customerName: "Charlie",
    driverName: "David",
  },
  {
    id: 3,
    status: "cancelled",
    pickupAddress: "555 Maple St",
    destinationAddress: "999 Birch St",
    fare: "$30",
    createdAt: new Date(),
    customerName: "Eve",
    driverName: "Frank",
  },
  {
    id: 4,
    status: "pending",
    pickupAddress: "111 Cedar St",
    destinationAddress: "222 Spruce St",
    fare: "$20",
    createdAt: new Date(),
    customerName: "Grace",
    driverName: "Hank",
  },
];

const getStatusColor = (status) => {
    switch (status.toLowerCase()){
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
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");


    const clearFilters = () => {
        setSearchQuery("");
        setStatusFilter("");
        setDateFrom("");
        setDateTo("");
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

        const matchesDateFrom = dateFrom === "" || new Date(ride.createdAt) >= new Date(dateFrom);

        const matchesDateTo = dateTo === "" || new Date(ride.createdAt) <= new Date(dateTo);

        return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
    });

    const totalPages = filteredRides.length > 0 ? 1 : 0;

  return (
    <div className="bg-[#d9fcfb] min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Ride Management</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 border rounded p-3 bg-white">
        <input
          type="text"
          placeholder="Search rides..."
          className="border rounded px-3 py-2 flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
         className="border rounded px-3 py-2"
         value={statusFilter}
         onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            {statusOption.map((status) => (
                <option key={status} value={status}>
                    {status.toUpperCase()}
                </option>
            ))}
         </select>

        <input
            type="date"
            className="border rounded px-3 py-2"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
        />
        <input
        type="date"
            className="border rounded px-3 py-2"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)} 
        />

        <button 
            onClick={clearFilters}
            className="bg-blue-300 text-gray-700 px-4 py-2 rounded hover:bg-blue-400">
            Clear
        </button>
      </div>

      {/* Ride List */}
      <div className="border rounded p-4 bg-white divide-y divide-gray-200">
        {filteredRides.map((ride) => (
            <div 
            key={ride.id}
            className="py-3"
            >
                <div className="flex justify-between items-center">
                    <strong>Ride #{ride.id}</strong>
                    <span className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(ride.status)}`}>
                        {ride.status.toUpperCase()}
                    </span>
                </div>

                <div className="flex justify-between mt-2">
                    <div>
                        <p>
                            <span className="font-semibold">From:</span> {ride.pickupAddress}
                        </p>
                        <p>
                            <span className="font-semibold">To:</span> {ride.destinationAddress}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-blue-600">{ride.fare}</p>
                        <p className="text-gray-500">
                            {format(new Date(ride.createdAt), "dd/MM/yyyy")}
                        </p>
                    </div>
                </div>

                <p className="text-gray-600 mt-1">
                    Customer: {ride.customerName} | Driver: {ride.driverName}
                </p>
            </div>
        ))}

        {/* Page */}
        <div className="mt-4 pt-4 text-gray-700">
          Page 1 of {totalPages} ({filteredRides.length} total)
        </div>
      </div>
    </div>
  );
};

export default RideManagement;
