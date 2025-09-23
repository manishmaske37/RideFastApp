import React, { useState } from "react";
import {
  Search,
  Plus,
  Send,
  MessageCircle,
  FileText,
  User,
  Lock,
  Shield,
  BookOpen,
  Layout,
  ChevronRight,
} from "lucide-react";
import { useOnline } from "../context/OnlineContext";

const TicketStatus = {
  OPEN: "Open",
  PENDING: "Pending Admin",
  RESOLVED: "Resolved",
};

const Topics = [
  { icon: <FileText />, title: "Payment & Fare" },
  { icon: <Layout />, title: "Ride & Booking" },
  { icon: <User />, title: "Account & Profile" },
  { icon: <Shield />, title: "Safety & Security" },
  { icon: <Lock />, title: "Policies" },
  { icon: <BookOpen />, title: "App Features" },
];

export default function HelpSupport() {
  const [activeTab, setActiveTab] = useState("knowledge");
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [reply, setReply] = useState("");

  const createTicket = () => {
    if (!subject || !category || !description) return;

    const newTicket = {
      id: "TKT-" + Math.floor(10000 + Math.random() * 90000),
      subject,
      category,
      status: TicketStatus.OPEN,
      lastUpdate: new Date(),
      conversation: [
        {
          text: description,
          sender: "agent",
          timestamp: new Date(),
        },
      ],
    };
    setTickets([newTicket, ...tickets]);
    setShowNewTicket(false);
    setSubject("");
    setCategory("");
    setDescription("");
  };

  const sendReply = () => {
    if (!reply.trim()) return;
    const updated = tickets.map((t) =>
      t.id === selectedTicket.id
        ? {
            ...t,
            conversation: [
              ...t.conversation,
              {
                text: reply,
                sender: "agent",
                timestamp: new Date(),
              },
            ],
          }
        : t
    );
    setTickets(updated);
    setReply("");
  };
  const { status } = useOnline();
  return (
    <div className={`p-6 space-y-6 min-h-screen ${
        status === "Online"
          ? "bg-teal-100"
          : status === "Busy"
          ? "bg-yellow-100"
          : ""
      }`}>
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Help & Support Center</h1>
        <div className="flex gap-8 border-b border-gray-200 justify-evenly">
          <button
            onClick={() => {
              setSelectedTicket(null);
              setActiveTab("knowledge");
            }}
            className={`pb-3 transition ${
              activeTab === "knowledge"
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Knowledge Base
          </button>
          <button
            onClick={() => {
              setSelectedTicket(null);
              setActiveTab("tickets");
            }}
            className={`pb-3 transition ${
              activeTab === "tickets"
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            My Submitted Tickets
          </button>
        </div>
      </div>

      {/* KNOWLEDGE BASE */}
      {activeTab === "knowledge" && (
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Common Topics */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Common Topics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-100">
              {Topics.map((t) => (
                <div
                  key={t.title}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md cursor-pointer transition border border-teal-600"
                >
                  <div className="text-blue-600">{t.icon}</div>
                  <div className="font-medium">{t.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MY TICKETS LIST */}
      {activeTab === "tickets" && !selectedTicket && (
        <div>
          {tickets.length === 0 ? (
            <div className="flex flex-col items-center text-center mt-20 text-gray-500">
              <MessageCircle className="w-16 h-16 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-gray-700">
                No Tickets Found
              </h2>
              <p className="mb-6">
                Click the button below to create a new ticket.
              </p>
              <button
                onClick={() => setShowNewTicket(true)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow"
              >
                + Create New Ticket
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicket(t)}
                  className="flex justify-between items-center p-4 bg-white rounded-xl shadow hover:shadow-md cursor-pointer"
                >
                  <div>
                    <h3 className="font-bold">{t.subject}</h3>
                    <p className="text-sm text-gray-500">
                      {t.id} • {t.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        t.status === TicketStatus.OPEN
                          ? "bg-blue-500"
                          : t.status === TicketStatus.PENDING
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                    >
                      {t.status}
                    </span>
                    <ChevronRight className="text-gray-400" />
                  </div>
                </div>
              ))}
              <button
                onClick={() => setShowNewTicket(true)}
                className="fixed bottom-6 right-6 px-4 py-3 rounded-full bg-blue-600 text-white shadow-lg"
              >
                + New Ticket
              </button>
            </div>
          )}
        </div>
      )}

      {/* TICKET DETAIL */}
      {activeTab === "tickets" && selectedTicket && (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedTicket(null)}
            className="text-sm text-blue-600 underline"
          >
            ← Back to tickets
          </button>
          <h2 className="text-2xl font-bold">
            Ticket: {selectedTicket.id} — {selectedTicket.subject}
          </h2>
          <div className="space-y-4 bg-gray-50 p-4 rounded-xl max-h-[400px] overflow-y-auto">
            {selectedTicket.conversation.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  m.sender === "agent" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                    m.sender === "agent"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {m.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(m.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-xl border"
            />
            <button
              onClick={sendReply}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* CREATE NEW TICKET MODAL */}
      {showNewTicket && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">Create New Ticket</h2>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-xl border"
            >
              <option value="">Select Category</option>
              <option>Account Issues</option>
              <option>Payment & Fare</option>
              <option>Driver Issues</option>
              <option>Ride Problem</option>
              <option>Policy</option>
              <option>Technical Glitch</option>
              <option>Other</option>
            </select>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full p-3 rounded-xl border"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-3 rounded-xl border h-32"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewTicket(false)}
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>
              <button
                onClick={createTicket}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
