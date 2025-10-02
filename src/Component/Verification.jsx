import React, { useState, useEffect, useRef } from "react";
import { useOnline } from "../context/OnlineContext";
import { API_BASE_URL } from "../config/api";
import { format } from "date-fns";
import {
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  User,
  Car,
  Calendar,
  FileWarning,
  RefreshCcw,
} from "lucide-react";

// --- Sub-components for better structure ---

const DriverListSkeleton = () => (
  <div className="space-y-2">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="bg-gray-200 animate-pulse h-20 rounded-lg p-3">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

const DetailsSkeleton = () => (
  <div className="flex flex-col h-full animate-pulse">
    <div className="bg-gray-200 rounded-lg p-4 mb-4">
      <div className="h-5 bg-gray-300 rounded w-1/2 mb-3"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
    <div className="flex-1 bg-gray-200 rounded-lg flex items-center justify-center"></div>
    <div className="flex justify-around mt-4">
      <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
      <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

// --- Main Verification Component ---

export default function Verification() {
  const { status } = useOnline();
  const [pendingDrivers, setPendingDrivers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverDocuments, setDriverDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [driversError, setDriversError] = useState(null);
  const [documentsError, setDocumentsError] = useState(null);

  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [customRejectionReason, setCustomRejectionReason] = useState("");

  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [translatePos, setTranslatePos] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  const commonRejectionReasons = [
    "Image is blurry or not readable.",
    "Document is expired.",
    "Incorrect document uploaded.",
    "Information does not match profile.",
    "Document is incomplete or cut off.",
  ];

  const fetchPendingDrivers = async (page = 1) => {
    setLoadingDrivers(true);
    setDriversError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${API_BASE_URL}/verification-service/documents/drivers/pending?page=${page}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch pending drivers.");
      const data = await res.json();
      setPendingDrivers(data.drivers || []);
      setPagination(data.pagination || {});
    } catch (err) {
      setDriversError(err.message);
    } finally {
      setLoadingDrivers(false);
    }
  };

  useEffect(() => {
    fetchPendingDrivers();
  }, []);

  const resetImageView = () => {
    setZoomLevel(1);
    setTranslatePos({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (selectedDocument) {
      setIsImageLoading(true);
    }
  }, [selectedDocument]);

  useEffect(() => {
    if (!selectedDriver) return;

    const fetchDriverDocuments = async () => {
      setLoadingDocuments(true);
      setDocumentsError(null);
      setDriverDocuments([]);
      setSelectedDocument(null);
      resetImageView();

      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          `${API_BASE_URL}/verification-service/documents/drivers/${selectedDriver.driver_id}/documents`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = await res.json();

        if (!res.ok) {
          if (res.status === 404) {
            setDocumentsError(
              data.message || "No documents found for this driver."
            );
            setDriverDocuments([]);
          } else {
            throw new Error(data.message || "Failed to fetch documents.");
          }
        } else {
          setDriverDocuments(data.documents || []);
          if (data.documents && data.documents.length > 0) {
            const firstPending = data.documents.find(
              (d) => d.status === "pending"
            );
            setSelectedDocument(firstPending || data.documents[0]);
          } else {
            setDocumentsError(
              "No documents have been uploaded by this driver yet."
            );
          }
        }
      } catch (err) {
        setDocumentsError(err.message);
      } finally {
        setLoadingDocuments(false);
      }
    };
    fetchDriverDocuments();
  }, [selectedDriver]);

  const handleMouseDown = (e) => {
    if (zoomLevel <= 1) return;
    e.preventDefault();
    setIsPanning(true);
    setStartPos({
      x: e.clientX - translatePos.x,
      y: e.clientY - translatePos.y,
    });
    if (imageContainerRef.current) {
      imageContainerRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    e.preventDefault();
    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;
    setTranslatePos({ x: newX, y: newY });
  };

  const handleMouseUpOrLeave = () => {
    setIsPanning(false);
    if (imageContainerRef.current) {
      imageContainerRef.current.style.cursor =
        zoomLevel > 1 ? "grab" : "default";
    }
  };

  const handleStatusUpdate = async (docId, newStatus, reason = null) => {
    const token = localStorage.getItem("accessToken");
    const body = { status: newStatus };
    if (reason) {
      body.rejection_reason = reason;
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/verification-service/documents/${docId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) throw new Error("Failed to update status.");

      const updatedDocs = driverDocuments.map((doc) =>
        doc.document_id === docId
          ? { ...doc, status: newStatus, rejection_reason: reason }
          : doc
      );
      setDriverDocuments(updatedDocs);
      setSelectedDocument((prev) => ({
        ...prev,
        status: newStatus,
        rejection_reason: reason,
      }));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
    setShowRejectionModal(false);
    setRejectionReason("");
    setCustomRejectionReason("");
  };

  const handleRejectSubmit = () => {
    const finalReason =
      rejectionReason === "Other" ? customRejectionReason : rejectionReason;
    if (!finalReason) {
      alert("Please provide a reason for rejection.");
      return;
    }
    handleStatusUpdate(selectedDocument.document_id, "rejected", finalReason);
  };

  const getStatusIndicator = (docStatus) => {
    switch (docStatus) {
      case "approved":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        status === "Online"
          ? "bg-teal-100"
          : status === "Busy"
          ? "bg-yellow-100"
          : "bg-gray-100"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Driver Verification</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md flex flex-col border-2 border-teal-200">
          <div className="border-b border-teal-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold p-4 border-teal-100">
              Pending Verifications ({pagination.totalItems || 0})
            </h2>
            {/* Refresh Button */}
            <button
              onClick={() => fetchPendingDrivers(pagination.currentPage || 1)}
              className="flex items-center gap-1 px-3 py-1.5 bg-teal-200 hover:bg-teal-300 rounded-lg shadow-sm mr-4 cursor-pointer"
            >
              <RefreshCcw className="w-4 h-4" />
              <span className="text-sm">Refresh</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {loadingDrivers ? (
              <DriverListSkeleton />
            ) : driversError ? (
              <div className="text-red-500 p-4">{driversError}</div>
            ) : pendingDrivers.length === 0 ? (
              <div className="text-center text-gray-500 p-8">
                No pending verifications found.
              </div>
            ) : (
              pendingDrivers.map((driver) => (
                <div
                  key={driver.driver_id}
                  onClick={() => setSelectedDriver(driver)}
                  className={`p-3 rounded-lg cursor-pointer transition-all border ${
                    selectedDriver?.driver_id === driver.driver_id
                      ? "bg-teal-100 border-teal-500"
                      : "bg-gray-50 hover:bg-teal-50 border-gray-200"
                  }`}
                >
                  <p className="font-semibold text-gray-800">
                    {driver.full_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Registered:{" "}
                    {format(new Date(driver.registration_date), "dd MMM, yyyy")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-md flex flex-col border-2 border-teal-200 p-4">
          {!selectedDriver ? (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a driver from the list to view their documents.
            </div>
          ) : loadingDocuments ? (
            <DetailsSkeleton />
          ) : (
            <>
              <div className="bg-teal-50 rounded-lg p-4 mb-4 border border-teal-200">
                <h3 className="text-xl font-bold text-teal-800">
                  {selectedDriver.full_name}
                </h3>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <p className="flex items-center gap-2 text-gray-600">
                    <User size={14} /> <strong>City:</strong>{" "}
                    {selectedDriver.city}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Calendar size={14} /> <strong>Joined:</strong>{" "}
                    {format(
                      new Date(selectedDriver.registration_date),
                      "dd MMM yyyy"
                    )}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Car size={14} /> <strong>Vehicle:</strong>{" "}
                    {selectedDriver.model_name || "N/A"}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <FileText size={14} /> <strong>Reg. No:</strong>{" "}
                    {selectedDriver.registration_number || "N/A"}
                  </p>
                </div>
              </div>

              {documentsError ? (
                <div className="flex-1 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-center p-4">
                  <FileWarning size={48} className="text-yellow-500 mb-4" />
                  <h4 className="font-semibold text-lg text-gray-700">
                    Could Not Load Documents
                  </h4>
                  <p className="text-gray-500">{documentsError}</p>
                </div>
              ) : (
                <>
                  <div
                    ref={imageContainerRef}
                    className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden mb-4 p-2 border border-gray-200"
                  >
                    {isImageLoading && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse z-10"></div>
                    )}
                    {selectedDocument && (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUpOrLeave}
                        onMouseLeave={handleMouseUpOrLeave}
                        style={{ cursor: zoomLevel > 1 ? "grab" : "default" }}
                      >
                        <img
                          src={`${API_BASE_URL}/driver-service${selectedDocument.file_url}`}
                          alt={`${selectedDocument.document_type}`}
                          onLoad={() => setIsImageLoading(false)}
                          className={`max-w-none max-h-none transition-opacity duration-300 ${
                            isImageLoading ? "opacity-0" : "opacity-100"
                          }`}
                          style={{
                            transform: `scale(${zoomLevel}) translate(${translatePos.x}px, ${translatePos.y}px)`,
                            pointerEvents: "none",
                          }}
                        />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2 z-20">
                      <button
                        onClick={() => setZoomLevel((z) => z + 0.2)}
                        className="bg-white rounded-full p-2 shadow"
                      >
                        <ZoomIn size={18} />
                      </button>
                      <button
                        onClick={() =>
                          setZoomLevel((z) => Math.max(1, z - 0.2))
                        }
                        className="bg-white rounded-full p-2 shadow"
                      >
                        <ZoomOut size={18} />
                      </button>
                    </div>
                  </div>

                  {selectedDocument?.status === "rejected" &&
                    selectedDocument?.rejection_reason && (
                      <div
                        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-r-lg"
                        role="alert"
                      >
                        <p className="font-bold">Previously Rejected</p>
                        <p>{selectedDocument.rejection_reason}</p>
                      </div>
                    )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <h4 className="font-semibold mb-2">Documents:</h4>
                      <div className="flex flex-wrap gap-2">
                        {driverDocuments.map((doc) => (
                          <button
                            key={doc.document_id}
                            onClick={() => {
                              setSelectedDocument(doc);
                              resetImageView();
                            }}
                            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                              selectedDocument?.document_id === doc.document_id
                                ? "bg-teal-500 text-white border-teal-500"
                                : "bg-white hover:bg-gray-100 border-gray-300"
                            }`}
                          >
                            {getStatusIndicator(doc.status)}
                            <span className="capitalize">
                              {doc.document_type}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-1 flex items-end gap-2">
                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            selectedDocument.document_id,
                            "approved"
                          )
                        }
                        disabled={
                          !selectedDocument ||
                          selectedDocument.status === "approved"
                        }
                        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 size={16} /> Approve
                      </button>
                      <button
                        onClick={() => setShowRejectionModal(true)}
                        disabled={
                          !selectedDocument ||
                          selectedDocument.status === "rejected"
                        }
                        className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {showRejectionModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">
              Rejection Reason for{" "}
              <span className="capitalize text-teal-600">
                {selectedDocument?.document_type}
              </span>
            </h2>
            <div className="space-y-2">
              {commonRejectionReasons.map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="rejectionReason"
                    value={reason}
                    checked={rejectionReason === reason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="form-radio h-4 w-4 text-teal-600"
                  />
                  <span>{reason}</span>
                </label>
              ))}
              <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <input
                  type="radio"
                  name="rejectionReason"
                  value="Other"
                  checked={rejectionReason === "Other"}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="form-radio h-4 w-4 text-teal-600"
                />
                <span>Other</span>
              </label>
            </div>

            {rejectionReason === "Other" && (
              <textarea
                value={customRejectionReason}
                onChange={(e) => setCustomRejectionReason(e.target.value)}
                placeholder="Please specify the reason for rejection..."
                className="w-full p-3 rounded-xl border h-24"
              />
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRejectionModal(false)}
                className="px-4 py-2 rounded-xl border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
