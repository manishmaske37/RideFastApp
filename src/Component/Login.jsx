import React from "react";

const Login = () => {
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
                className="w-full outline-none"
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
                className="w-full outline-none"
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
          <button className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition cursor-pointer">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
