import React from "react";
import { Megaphone } from "lucide-react";

export default function AdminAlert({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-full rounded-lg shadow-lg overflow-hidden mx-3">
        {/* Header */}
        <div className="bg-teal-500 text-white flex justify-center items-center py-4">
          <Megaphone className="w-6 h-6 mr-2" />
        </div>

        {/* Body */}
        <div className="p-6 text-center">
          <h2 className="font-bold text-lg">System Update</h2>
          <p>
            A new fare policy for peak hours will be effective from Monday.
            Please review document <strong>#POL-005</strong> in the knowledge base.
          </p>
        </div>

        {/* Footer / Button */}
        <div className="p-4">
          <button
            onClick={onClose}
            className="bg-teal-500 text-white font-semibold w-full py-2 rounded-md hover:bg-teal-600 cursor-pointer"
          >
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
}
