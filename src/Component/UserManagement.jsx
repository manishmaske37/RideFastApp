import React, { useEffect, useState } from "react";
import { useOnline } from "../context/OnlineContext";
import userService from "../services/user_service";

const UserManagement = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const { status } = useOnline();

  // Fetch all users once when page loads
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter for search box
  const filterUsers = users.filter(
    (u) => 
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.phone?.includes(search)
  );

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
      <h1 className="text-4xl font-Semibold mb-6">User Management</h1>

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

      {/* Loader */}

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm">
          <div className="divide-y divide-gray-100">
            {filterUsers.length > 0 ? (
              filterUsers.map((user, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div lassName="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-400 text-white flex items-center justify-center uppercase">
                      {user.name?.[0] || "U"}
                    </div>
                    <div>
                      <p className="font-medium">{user.name || "Unknown"}</p>
                      <p className="text-sm text-gray-500">
                        {user.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      user.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-5">No users found</p>
            )}
          </div>

          <div className="px-4 py-3 border-t border-gray-200 text-sm text-gray-600">
            Total Users: {filterUsers.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
