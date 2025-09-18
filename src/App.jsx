import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Component/Login";
import Sidebar from "./Component/Sidebar";
import Dashboard from "./Component/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex">
      {isLoggedIn && <Sidebar />} {/* Sidebar only when logged in */}

      <div className="flex-1 p-4">
        <Routes>
          {/* Default route → login */}
          <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />

          {/* Protect dashboard route */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
