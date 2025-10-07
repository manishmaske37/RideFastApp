import React, { useState, useEffect } from "react";
import {
  FaUserCheck,
  FaUser,
  FaTicketAlt,
  FaCar,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import AdminAlert from "./Alerts/AdminAlert";
import IncomingToast from "./Alerts/IncomingToast";
import IncomingCallModal from "./Alerts/IncomingCallModal";
import ChatPanel from "./ChatPanel";
import SkeletonBox from "./SkeletonBox";
import { useOnline } from "../context/OnlineContext";
import Swal from "sweetalert2";

import { API_BASE_URL } from "../config/api";

const Dashboard = () => {
  const { status, setStatus } = useOnline();
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [dashboardData, setDashboardData] = useState({ stats: [] });
  const [workload, setWorkload] = useState(null); // workload data from API

  const statuses = ["Online", "Busy", "Offline"];

  const handleNextStatus = async () => {
    const currentIndex = statuses.indexOf(status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    const newStatus = statuses[nextIndex];

    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `${API_BASE_URL}/support-service/agent/status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus.toLowerCase() }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // ✅ API success → update context state
        setStatus(
          data.data.agentStatus.status.charAt(0).toUpperCase() +
            data.data.agentStatus.status.slice(1)
        );
      } else if (response.status === 400) {
        // ❌ Validation error → show message, do not change state
        Swal.fire({
          title: "Error",
          text: data.error?.message || "Cannot update status",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        // ❌ Other errors
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error("Error updating status:", err);
      Swal.fire({
        title: "Network Error",
        text: "Please check your internet connection and try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const statusColors = {
    Online: "text-green-600",
    Busy: "text-yellow-600",
    Offline: "text-gray-600",
  };

  const toggleTranslate = {
    Online: "translate-x-1",
    Busy: "translate-x-7",
    Offline: "translate-x-13", // keep this but consider fixing with flex/percentages
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(
          `${API_BASE_URL}/support-service/dashboard/overview`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 🔹 If token is expired → force logout
        if (response.status === 401) {
          const data = await response.json().catch(() => ({}));
          if (data?.message?.includes("expired")) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("fullName");
            localStorage.removeItem("email");

            // redirect to login
            window.location.href = "/";
            return;
          }
        }

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const result = await response.json();
        const { role, metrics } = result?.data || {};

        let stats = [];

        if (role === "support") {
          stats = [
            {
              id: 1,
              title: "Total Resolved Tickets",
              value: metrics.myTotalResolvedTickets ?? 0,
              icon: <FaUserCheck className="text-blue-500 text-2xl" />,
            },
            {
              id: 2,
              title: "Pending Verifications",
              value: metrics.pendingDriverVerifications ?? 0,
              icon: <FaUsers className="text-green-500 text-2xl" />,
            },
            {
              id: 3,
              title: "Open Tickets",
              value: metrics.openTicketsInCity ?? 0,
              icon: (
                <MdOutlineSupportAgent className="text-orange-500 text-2xl" />
              ),
            },
            {
              id: 4,
              title: "Unassigned Tickets",
              value: metrics.unassignedTicketsInCity ?? 0,
              icon: <FaTicketAlt className="text-purple-600 text-2xl" />,
            },
          ];
        } else if (role === "city_admin") {
          stats = [
            {
              id: 1,
              title: "Active Drivers",
              value: metrics.activeDrivers ?? 0,
              icon: <FaCar className="text-blue-500 text-2xl" />,
            },
            {
              id: 2,
              title: "Pending Drivers",
              value: metrics.pendingDrivers ?? 0,
              icon: <FaUsers className="text-green-500 text-2xl" />,
            },
            {
              id: 3,
              title: "Today Completed Rides",
              value: metrics.todayCompletedRides ?? 0,
              icon: <FaUserCheck className="text-orange-500 text-2xl" />,
            },
            {
              id: 4,
              title: "Unassigned Tickets",
              value: metrics.unassignedTickets ?? 0,
              icon: <FaTicketAlt className="text-purple-600 text-2xl" />,
            },
            {
              id: 5,
              title: "Today Resolved Tickets",
              value: metrics.todayResolvedTickets ?? 0,
              icon: (
                <MdOutlineSupportAgent className="text-teal-500 text-2xl" />
              ),
            },
            {
              id: 6,
              title: "Today New Tickets",
              value: metrics.todayNewTickets ?? 0,
              icon: <FaUser className="text-pink-500 text-2xl" />,
            },
          ];
        }

        setDashboardData({ stats });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();

    const interval = setInterval(fetchDashboardData, 10000);

    // Cleanup when component unmounts
    return () => clearInterval(interval);
  }, []);

  // Fetch agent workload
  useEffect(() => {
    const fetchWorkload = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          `${API_BASE_URL}/support-service/agent/workload`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status == 401) {
          const data = await response.json().catch(() => ({}));
          if (data?.message?.includes("expired")) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("fullName");
            localStorage.removeItem("email");
            window.location.href = "/";
            return;
          }
        }

        if (!response.ok) throw new Error("Failed to fetch workload");

        const result = await response.json();
        setWorkload(result.data);
      } catch (error) {
        console.error("Error fetching workload:", error);
      }
    };

    fetchWorkload();
    const interval = setInterval(fetchWorkload, 10000);
    return () => clearInterval(interval);
  }, []);

  const simulateCall = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setShowModal(true);
    }, 1500);
  };

  return (
    <div
      className={`sm:p-6 min-h-screen ${
        status === "Online"
          ? "bg-teal-100"
          : status === "Busy"
          ? "bg-yellow-100"
          : ""
      }`}
    >
      {/* Header */}
      <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">RideFast Support</h1>

        {/* Toggle for mobile/tablet */}
        <div className="sm:hidden absolute top-0 right-0 mt-2 mr-2">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleNextStatus}
          >
            <span className={`font-medium text-sm ${statusColors[status]}`}>
              {status === "Online"
                ? "You are Online"
                : status === "Busy"
                ? "You are Busy"
                : "You are Offline"}
            </span>

            <div
              className={`relative inline-flex items-center h-6 w-24 rounded-full ${
                status === "Online"
                  ? "bg-green-400"
                  : status === "Busy"
                  ? "bg-yellow-400"
                  : "bg-gray-400"
              }`}
            >
              <span className="sr-only">Toggle Online/Busy/Offline</span>
              <span
                className={`absolute left-0 inline-block w-6 h-6 transform bg-white rounded-full shadow-md transition-transform duration-300 ${toggleTranslate[status]}`}
              ></span>
            </div>
          </div>
        </div>

        {/* Buttons + Toggle for laptop */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            className="bg-orange-400 text-white px-3 py-2 rounded-lg shadow hover:bg-orange-500 text-sm sm:text-base"
            onClick={() => setShowAlert(true)}
          >
            📢 Simulate Admin Alert
          </button>

          <AdminAlert show={showAlert} onClose={() => setShowAlert(false)} />

          <button
            onClick={simulateCall}
            className="bg-indigo-500 text-white px-3 py-2 rounded-lg shadow hover:bg-indigo-600 text-sm sm:text-base"
          >
            📞 Simulate Incoming Call
          </button>

          <IncomingToast show={showToast} />
          <IncomingCallModal
            show={showModal}
            onClose={() => setShowModal(false)}
          />

          {/* Toggle for laptop */}
          <div
            className="hidden sm:flex items-center gap-2 cursor-pointer"
            onClick={handleNextStatus}
          >
            <span
              className={`font-medium text-sm sm:text-base ${statusColors[status]}`}
            >
              {status === "Online"
                ? "You are Online"
                : status === "Busy"
                ? "You are Busy"
                : "You are Offline"}
            </span>

            <div
              className={`relative inline-flex items-center rounded-full 
                    h-5 w-20        /* mobile default */
                    sm:h-6 sm:w-24   /* tablet/small desktop */
                    md:h-7 md:w-20   /* large desktop */
                    ${
                      status === "Online"
                        ? "bg-green-400"
                        : status === "Busy"
                        ? "bg-yellow-400"
                        : "bg-gray-400"
                    }`}
            >
              <span className="sr-only">Toggle Online/Busy/Offline</span>
              <span
                className={`absolute left-0 inline-block 
        h-5 w-5        /* mobile circle */
        sm:h-6 sm:w-6   /* tablet/small desktop */
        md:h-6 md:w-6   /* large desktop */
        transform bg-white rounded-full shadow-md transition-transform duration-300 
        ${toggleTranslate[status]}`}
              ></span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          dashboardData.stats.length === 6 ? "lg:grid-cols-3" : "lg:grid-cols-4"
        } gap-4 mb-6`}
      >
        {loading
          ? [...Array(dashboardData.stats.length || 4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-4 shadow flex items-center gap-3 border border-gray-200"
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
                  <p className="font-bold text-lg sm:text-xl">{stat.value}</p>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {stat.title}
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* Workload + Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workload */}
        <div className="col-span-1">
          <h2 className="text-base sm:text-lg font-semibold mb-3">
            Your Workload
          </h2>

          {status === "Busy" && (
            <div className="bg-blue-500 p-2 rounded-lg mb-4 text-white text-sm sm:text-base">
              <p>
                You are Busy. Please resolve your remaining tickets to end your
                session
              </p>
            </div>
          )}

          {!workload ? (
            <p className="text-gray-500 text-sm">Loading workload...</p>
          ) : (
            <>
              {/* Agent Summary */}
              <div className="bg-white rounded-lg p-4 shadow mb-4 border-2 border-green-300">
                <h3 className="text-teal-600 font-bold text-sm sm:text-base mb-2">
                  Agent Status
                </h3>
                <p className="text-gray-700 text-sm">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      workload.agentStatus?.status === "busy"
                        ? "bg-yellow-100 text-yellow-700"
                        : workload.agentStatus?.status === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {workload.agentStatus?.status || "N/A"}
                  </span>
                </p>
                <p className="text-gray-600 text-sm">
                  Active Tickets:{" "}
                  {workload.agentStatus?.activeTicketsCount ?? 0}
                </p>
              </div>

              {/* Recent Tickets List */}
              <div className="bg-white rounded-lg p-4 shadow border-2 border-green-300">
                <h3 className="text-gray-700 font-bold text-sm sm:text-base mb-2">
                  Recent Tickets
                </h3>
                <hr className="mb-3 text-gray-300" />
                {workload.workload?.recentTickets?.length > 0 ? (
                  <ul className="space-y-3">
                    {workload.workload.recentTickets.map((ticket) => (
                      <li
                        key={ticket.id}
                        className="p-3 border rounded-lg bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">
                            {ticket.customerName}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {ticket.subject}
                          </p>
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-medium px-3 py-1 rounded-full ${
                            ticket.status === "in_progress"
                              ? "bg-yellow-100 text-yellow-700"
                              : ticket.status === "resolved"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No recent tickets available.
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Chat Panel */}
        <ChatPanel />
      </div>
    </div>
  );
};

export default Dashboard;
