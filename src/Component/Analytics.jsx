import { CalendarDays } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Analytics() {
  return (
    <div
      className="container-fluid py-4"
      style={{
        backgroundColor: "#E6F7F6",
        minHeight: "100vh",
        paddingLeft: "100px", // ✅ space on left
        paddingRight: "25px", // ✅ space on right
      }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold">Support Analytics</h1>
        <button className="btn btn-light border d-flex align-items-center gap-2">
          <CalendarDays size={16} />
          <span className="fw-semibold">Last 30 Days</span>
        </button>
      </div>

      {/* KPI GRID */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <KpiCard
            title="Total Tickets (30d)"
            value="1,428"
            icon="🎫"
            color="primary"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <KpiCard
            title="Avg. Resolution Time"
            value="3.2 hours"
            icon="⏱️"
            color="warning"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <KpiCard
            title="First Response Time"
            value="15 min"
            icon="📩"
            color="success"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <KpiCard
            title="Satisfaction (CSAT)"
            value="92.5%"
            icon="😊"
            color="secondary"
          />
        </div>
      </div>

      {/* MAIN CHARTS */}
      <div className="row g-4">
        {/* Ticket Trends */}
        <div className="col-lg-8">
          <div
            className="card shadow-sm h-100"
            style={{ border: "2px solid teal" }}
          >
            <div className="card-body">
              <h5 className="card-title">Ticket Volume vs. Resolution</h5>
              <div className="d-flex align-items-center justify-content-center bg-light rounded p-5 text-muted small" style={{height:'80%'}}>
                // TODO: Integrate a line/bar chart here (recharts)
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Category */}
        <div className="col-lg-4">
          <div
            className="card shadow-sm h-100"
            style={{ border: "2px solid teal" }}
          >
            <div className="card-body">
              <h5 className="card-title">Tickets by Category</h5>
              <div
                className="mx-auto my-3 rounded-circle bg-light d-flex align-items-center justify-content-center text-muted small"
                style={{ width: "180px", height: "180px" }}
              >
                // Donut Chart (recharts)
              </div>

              <div className="mt-3">
                <Legend color="primary" text="Payment & Fare (45%)" />
                <Legend color="warning" text="Driver Issues (25%)" />
                <Legend color="success" text="App Glitches (18%)" />
                <Legend color="secondary" text="Other (12%)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, color }) {
  return (
    <div
      className="card shadow-sm h-100"
      style={{ border: "2px solid teal" }}
    >
      <div className="card-body">
        <div
          className={`rounded-circle bg-${color}-subtle text-${color} d-flex align-items-center justify-content-center mb-3`}
          style={{ width: "48px", height: "48px" }}
        >
          <span className="fs-5">{icon}</span>
        </div>
        <h4 className="fw-bold">{value}</h4>
        <p className="text-muted small mb-0">{title}</p>
      </div>
    </div>
  );
}

function Legend({ color, text }) {
  return (
    <div className="d-flex align-items-center mb-2">
      <div
        className={`rounded-circle bg-${color}`}
        style={{ width: "12px", height: "12px" }}
      ></div>
      <span className="ms-2 small">{text}</span>
    </div>
  );
}
