import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./Component/Login";
import Sidebar from "./Component/Sidebar";
import Dashboard from "./Component/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Analytics from "./Component/Analytics";
import DailyReports from "./Component/DailyReports";
import UserManagement from "./Component/UserManagement";
import RideManagement from "./Component/RideManagement";
import HelpSupport from "./Component/HelpSupport";
import LiveSupport from "./Component/LiveSupport";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Check token on every route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  // Handle login success
  const handleLogin = (token) => {
    localStorage.setItem("token", token); // ✅ save token
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    // 1. Remove token from localStorage
    localStorage.removeItem("token");

    // 2. Update login state
    setIsLoggedIn(false);

    // 3. Redirect to login page
    navigate("/", { replace: true });
  };

// Determine if sidebar should be shown
const showSidebar = isLoggedIn && location.pathname !== "/live-support";

  return (
    <div className="flex">
      {showSidebar && <Sidebar onAvatarClick={() => setShowModal(true)} />}

      <div className="flex-1 p-4">
        <Routes>
          {/* Login page → redirect to dashboard if already logged in */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login onLogin={(token) => handleLogin(token)} /> // ✅ expects token from Login
              )
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <div className="ml-20">
                  <Dashboard />
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/users"
            element={
              isLoggedIn ? (
                <div className="ml-20">
                  {" "}
                  <UserManagement />{" "}
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/ride"
            element={
              isLoggedIn ? (
                <div className="ml-20">
                  {" "}
                  <RideManagement />{" "}
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/users"
            element={
              isLoggedIn ? (
                <div className="ml-20">
                  <UserManagement />
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/ride"
            element={
              isLoggedIn ? (
                <div className="ml-20">
                  <RideManagement />
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/reports"
            element={
              isLoggedIn ? <DailyReports /> : <Navigate to="/" replace />
            }
          />

          <Route
            path="/analytics"
            element={isLoggedIn ? <Analytics /> : <Navigate to="/" replace />}
          />

          <Route
            path="/help"
            element={
              isLoggedIn ? (
                <div className="ml-20">
                  {" "}
                  <HelpSupport />{" "}
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/live-support"
            element={
              isLoggedIn ? (
                <div>
                  <LiveSupport />
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-300 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleLogout(); // removes token + redirects
                  setShowModal(false); // close modal
                }}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
