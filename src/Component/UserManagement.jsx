
import React, { useState } from "react";

const dummyData = {
  Customers: [
    { name: "Test 2", phone: "+91 7896543210", active: true },
    { name: "Unknown User", phone: "+91 97656893011", active: true },
    { name: "Unknown User", phone: "+91 97656893000", active: true },
    { name: "Unknown User", phone: "+91 9876543211", active: true },
    { name: "Unknown User", phone: "+91 97656893300", active: true },
  ],
  Drivers: [
    { name: "Driver One", phone: "+91 9898989898", active: true },
    { name: "Driver Two", phone: "+91 9123456789", active: false },
    { name: "Driver Three", phone: "+91 9000011111", active: true },
    { name: "Driver Four", phone: "+91 9345678912", active: true },
  ],
};

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("Customers");

  const [search, setSearch] = useState("");

  const users = dummyData[activeTab] || [];
  const filterUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search)
  );

  return (
    <div className="min-h-screen bg-[#d9fcfb] p-6">
      <h1 className="text-4xl font-Semibold mb-6">User Management</h1>

      {/* Tabs */}
      <div className="flex justify-evenly mb-4 border-b border-gray-300">
        {["Customers", "Drivers"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? "border-b-2 border-teal-500 font-semibold text-teal-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search box */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name or mobile number..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        {/* UserList */}
        <div className="divide-y divide-gray-100">
          {filterUsers.map((user, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-400 text-white flex items-center justify-center uppercase">
                  {user.name[0]}
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  user.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.active ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 text-sm text-gray-600">
          Page 1 of 1 ({filterUsers.length} total)
        </div>
      </div>
    </div>
  );
}

export default UserManagement;