import React, { useEffect, useState } from "react";
import callData from "../../data/incomingCall.json";
import { Link } from "react-router-dom";

export default function IncomingCallModal({ show, onClose }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // simulate fetching from API
    setTimeout(() => {
      setData(callData);
    }, 300); // small delay to mimic network request
  }, []);

  if (!show || !data) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-[95%] sm:w-[90%] md:w-[700px] lg:w-[800px] max-h-[90vh] overflow-y-auto animate-slide-up">
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
            Caller:{" "}
            <strong>
              {data.caller.name} ({data.caller.role})
            </strong>
            <br />
            Associated Trip ID:{" "}
            <span className="text-gray-600">{data.trip.id}</span>
          </p>

          <hr className="border-gray-300" />

          {/* Participants */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-6 md:gap-0 mt-4">
            {Object.entries(data.participants).map(([role, person]) => (
              <div className="text-center flex-1" key={role}>
                <div className="bg-teal-100 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-lg md:text-xl font-bold mx-auto">
                  {person.initial}
                </div>
                <p className="mt-2 text-sm md:text-base">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                  <br />
                  <strong>{person.name}</strong>
                </p>
              </div>
            ))}
          </div>

          <hr className="border-gray-300" />

          {/* Timeline */}
          <h4 className="font-semibold text-gray-700 mb-3 text-sm md:text-base mt-3">
            Live Trip Timeline
          </h4>
          <ul className="space-y-2 text-sm md:text-base">
            {data.timeline.map((event, idx) => (
              <li
                key={idx}
                className={
                  event.highlight
                    ? "text-teal-600 font-semibold"
                    : event.completed
                    ? "text-gray-800"
                    : "text-gray-500"
                }
              >
                {event.completed ? "✅ " : "🕒 "}
                {event.status}
                {event.time && (
                  <span className="text-gray-500 ml-2">{event.time}</span>
                )}
              </li>
            ))}
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
          <Link
            to="/live-support"
            state={{ tripId: data.trip.id }} // ✅ descriptive key
          >
            <button
              onClick={() => onClose()}
              className="bg-teal-600 text-white px-4 md:px-5 py-2 rounded-lg shadow hover:bg-teal-700 text-sm md:text-base"
            >
              Answer & Open Ticket
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
