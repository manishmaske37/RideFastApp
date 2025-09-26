import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Decode JWT expiry
  const getTokenExpiry = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp ? payload.exp * 1000 : null; // exp in ms
    } catch {
      return null;
    }
  };

  // 🔹 Schedule auto logout
  const scheduleAutoLogout = (token) => {
    const expiry = getTokenExpiry(token);
    if (!expiry) return;

    const timeout = expiry - Date.now();
    if (timeout > 0) {
      setTimeout(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("fullName");
        localStorage.removeItem("email");

        toast.info("Session expired. Please log in again.");
        navigate("/login");
      }, timeout);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://api.zenevo.in/support-service/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      // const response = await fetch("/support-service/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });

      const data = await response.json();

      // let data = {};
      // const text = await response.text();
      // if (text) {
      //   try {
      //     data = JSON.parse(text);
      //   } catch (err) {
      //     console.error("Invalid JSON:", text);
      //   }
      // }

      if (response.ok && data.token) {
        // ✅ Save token in storage
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("fullName", data.agent.fullName);
        localStorage.setItem("email", data.agent.email);

        // ✅ Pass token to parent
        onLogin(data.token);

        // ✅ Schedule auto-logout
        scheduleAutoLogout(data.token);

        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Invalid email or password!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  // Check token on every route change
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      scheduleAutoLogout(token); // ✅ reschedule if refreshing
    }
  }, [location]);

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-teal-500 flex flex-col justify-center items-center text-white">
        <div className="flex flex-col items-center justify-center min-h-screen transform scale-125">
          <i className="bi bi-headset text-6xl mb-3"></i>
          <h1 className="text-4xl font-bold">RideFast</h1>
          <p className="text-lg">Support Portal</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-teal-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-11/12 max-w-sm">
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-gray-500 mb-6">Please sign in to continue.</p>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <i className="bi bi-envelope text-gray-400 mr-2"></i>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <i className="bi bi-lock text-gray-400 mr-2"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none"
                  required
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="/" className="text-sm text-teal-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
