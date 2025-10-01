import React, { useState } from "react";
import { useOnline } from "../context/OnlineContext";
import { format } from "date-fns";

import { API_BASE_URL } from "../config/api";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("Customers");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [executedSearch, setExecutedSearch] = useState("");

  const { status } = useOnline();

  // 🔹 Fetch users with pagination
  const handleSearch = async (page = 1) => {
    if (!search.trim()) {
      setUsers([]);
      setPagination({ currentPage: 1, totalPages: 1, totalItems: 0 });
      setExecutedSearch("");
      return;
    }

    setExecutedSearch(search);

    try {
      setLoading(true);
      setError(null);

      const type = activeTab === "Customers" ? "customer" : "driver";
      const token = localStorage.getItem("accessToken");

      const res = await fetch(
        `${API_BASE_URL}/support-service/search?type=${type}&q=${encodeURIComponent(
          search
        )}&page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch ${type}s`);
      }

      const data = await res.json();

      if (type === "customer") {
        setUsers(data.customers || []);
      } else {
        setUsers(data.drivers || []);
      }

      setPagination({
        currentPage: data.pagination?.currentPage || page,
        totalPages: data.pagination?.totalPages || 1,
        totalItems: data.pagination?.totalItems || 0,
      });
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      <h1 className="text-4xl font-semibold mb-6">User Management</h1>

      {/* Tabs */}
      <div className="flex justify-evenly mb-4 border-b border-gray-300">
        {["Customers", "Drivers"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSearch("");
              setUsers([]);
              setPagination({ currentPage: 1, totalPages: 1, totalItems: 0 });
            }}
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

      {/* Search Box */}
      <div className="mb-5 flex">
        <input
          type="text"
          placeholder={`Search ${activeTab.toLowerCase()} by name or mobile number...`}
          className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 bg-white shadow-sm"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);

            if (!value.trim()) {
              setUsers([]);
              setPagination({ currentPage: 1, totalPages: 1, totalItems: 0 });
              setError(null);
            }
          }}
        />
        <button
          onClick={() => handleSearch(1)} // always start at page 1 when searching
          className="px-4 py-2 bg-teal-500 text-white rounded-r-md hover:bg-teal-600"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl shadow-sm flex flex-col min-h-[300px]">
        {/* Results List Area */}
        <div className="flex-1 flex flex-col">
          {loading ? (
            <div className="flex flex-1 items-center justify-center text-gray-500">
              Loading...
            </div>
          ) : error ? (
            <div className="flex flex-1 items-center justify-center text-red-500">
              {error}
            </div>
          ) : !executedSearch.trim() ? (
            <div className="flex flex-1 items-center justify-center text-gray-400 italic">
              🔍 Enter a name or number and press Search
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-gray-500">
              ❌ No {activeTab.toLowerCase()} found
            </div>
          ) : (
            <div className="divide-y divide-gray-100 overflow-y-auto">
              {users.map((user, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-400 text-white flex items-center justify-center uppercase">
                      {(user.full_name || "U")[0]}
                    </div>
                    <div>
                      <p className="font-medium">
                        {user.full_name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.phone_number || user.city || "N/A"}
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                    Since{" "}
                    {user.registration_date
                      ? format(new Date(user.registration_date), "dd MMM yyyy")
                      : "N/A"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Footer always at bottom */}
        <div className="px-4 py-3 border-t border-gray-200 text-sm text-gray-600 flex justify-between items-center">
          <span>
            Page {pagination.currentPage} of {pagination.totalPages} (
            {pagination.totalItems} total)
          </span>

          {/* Pagination Controls */}
          <div className="flex gap-2">
            <button
              disabled={pagination.currentPage === 1}
              onClick={() => handleSearch(pagination.currentPage - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => handleSearch(pagination.currentPage + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
