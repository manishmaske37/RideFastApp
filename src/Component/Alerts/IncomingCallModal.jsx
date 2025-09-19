import React from "react";

export default function IncomingCallModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div
        className="
          bg-white rounded-xl shadow-lg 
          w-[95%] sm:w-[90%] md:w-[700px] lg:w-[800px] 
          max-h-[90vh] overflow-y-auto 
          animate-slide-up
        "
      >
        {/* Header */}
        <div className="bg-teal-600 text-white px-4 py-3 md:px-6 md:py-4 rounded-t-xl flex items-center space-x-2">
          <span className="text-lg md:text-xl">📞</span>
          <h3 className="font-bold text-base md:text-lg">
            Incoming Call – Live Trip
          </h3>
        </div>

        {/* Body */}
        <div className="p-4 md:p-6">
          <p className="text-sm text-gray-600 mb-4">
            Caller: <strong>Rajesh Kumar (Driver)</strong>
            <br />
            Associated Trip ID: <span className="text-gray-600">RID-LIVE-007</span>
          </p>

          <hr className="border-gray-300" />

          {/* Customer + Driver (responsive layout) */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-6 md:gap-0 mt-4">
            <div className="text-center flex-1">
              <div className="bg-teal-100 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-lg md:text-xl font-bold mx-auto">
                A
              </div>
              <p className="mt-2 text-sm md:text-base">
                Customer
                <br />
                <strong>Aman Gupta</strong>
              </p>
            </div>
            <div className="text-center flex-1">
              <div className="bg-teal-100 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-lg md:text-xl font-bold mx-auto">
                R
              </div>
              <p className="mt-2 text-sm md:text-base">
                Driver
                <br />
                <strong>Rajesh Kumar</strong>
              </p>
            </div>
          </div>

          <hr className="border-gray-300" />

          {/* Timeline */}
          <h4 className="font-semibold text-gray-700 mb-3 text-sm md:text-base mt-3">
            Live Trip Timeline
          </h4>
          <ul className="space-y-2 text-sm md:text-base">
            <li>
              ✅ Driver Assigned{" "}
              <span className="text-gray-500">11:05 AM</span>
            </li>
            <li>
              ✅ Driver Arrived at Pickup{" "}
              <span className="text-gray-500">11:10 AM</span>
            </li>
            <li className="text-teal-600 font-semibold">
              🟢 Trip In Progress
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between px-4 md:px-6 py-3 md:py-4 gap-3">
          <button
            onClick={onClose}
            className="text-red-600 font-semibold text-sm md:text-base"
          >
            Decline
          </button>
          <button
            onClick={() => {
              alert("Opening Ticket...");
              onClose();
            }}
            className="bg-teal-600 text-white px-4 md:px-5 py-2 rounded-lg shadow hover:bg-teal-700 text-sm md:text-base"
          >
            Answer & Open Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
