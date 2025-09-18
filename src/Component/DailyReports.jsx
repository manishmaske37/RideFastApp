import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ReportCard = ({ icon, label, value, color, fullWidth }) => {
  const borderColor = fullWidth ? "#004d4d" : "#008080";

  return (
    <div className={fullWidth ? "col-12 mb-3" : "col-md-4 col-sm-6 mb-3"}>
      <div
        className="card h-100"
        style={{
          border: `2px solid ${borderColor}`,
          borderRadius: "12px",
        }}
      >
        <div className="card-body d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <i className={`bi ${icon} fs-4 me-2`} style={{ color }}></i>
            <span className="fw-semibold">{label}</span>
          </div>
          <span className="fw-bold" style={{ color }}>
            {value}
          </span>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div
      className="card mb-4 shadow-sm"
      style={{ border: "2px solid #008080", borderRadius: "12px" }}
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="fw-bold">Pune</h5>
          <p className="text-muted small mb-0">
            Daily Operations Report <br /> 2025-09-17T00:00:00.000Z
          </p>
        </div>
      </div>
    </div>
  );
};

export default function DailyReports() {
  return (
    <div
      className="container-fluid py-4"
      style={{
        backgroundColor: "#d9f7f3",
        minHeight: "100vh",
        paddingLeft: "100px",   // ✅ no gap on left
        paddingRight: "20px", // ✅ 20px gap on right
      }}
    >
      <h3 className="fw-bold mt-4 mb-3">Daily Reports</h3>

      {/* Date on right */}
      <div className="d-flex justify-content-end mb-3">
        <i className="bi bi-calendar3 me-2"></i>
        <span className="fw-bold">18/9/2025</span>
      </div>

      {/* Header */}
      <Header />

      {/* Ride Statistics */}
      <h5 className="fw-bold mt-5 mb-3">Ride Statistics</h5>
      <div className="row">
        <ReportCard icon="bi-car-front" label="Total Rides" value="0" color="blue" />
        <ReportCard icon="bi-check-circle" label="Completed" value="0" color="green" />
        <ReportCard icon="bi-x-circle" label="Cancelled" value="0" color="red" />
        <ReportCard icon="bi-currency-rupee" label="Total Revenue" value="₹0" color="purple" />
        <ReportCard icon="bi-graph-up" label="Average Fare" value="₹0" color="orange" />
      </div>

      {/* Drivers & Registrations */}
      <h5 className="fw-bold mt-5 mb-3 d-flex justify-content-between">
        <span>Drivers & Registrations</span>
        <span>
          Peak Hours
          <input className="form-check-input ms-3" type="checkbox" />
        </span>
      </h5>

      <div className="row">
       <span> <ReportCard icon="bi-car-front" label="Active Drivers" value="0" color="blue" /></span>
       <span> <ReportCard icon="bi-person-plus" label="New Customers" value="3" color="green" /></span>
       <span> <ReportCard icon="bi-people" label="New Drivers" value="1" color="orange" /></span>
      </div>
    </div>
  );
}
