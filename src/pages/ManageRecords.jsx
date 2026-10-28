import React, { useState } from "react";
import {
  FilePlus,
  Search,
  FileText,
  CheckCircle2,
  Lock,
  Clock,
  X,
  Activity,
  User,
  MapPin,
  Send,
  Eye,
} from "lucide-react";
import { folders as initialFolders } from "../data/mockData";

export default function ManageRecords() {
  const [folderList, setFolderList] = useState(initialFolders);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // New state to manage the Lifeline Modal
  const [selectedDoc, setSelectedDoc] = useState(null);

  const [newRecord, setNewRecord] = useState({
    id: `MICT-EDMS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    title: "",
    category: "Policy",
    department: "Internal",
    currentLocation: "Registry Vault A",
  });

  const handleAddRecord = (e) => {
    e.preventDefault();
    const folder = {
      ...newRecord,
      status: "Available",
      lastHandledBy: "System Admin",
      lastUpdate: new Date().toISOString(),
      checkedOutTo: null,
    };
    setFolderList([folder, ...folderList]);
    setSuccessMessage(`Record ${folder.id} successfully registered.`);
    setNewRecord({
      ...newRecord,
      id: `MICT-EDMS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: "",
    });
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleArchiveRecord = (e, id) => {
    e.stopPropagation(); // Prevents the modal from opening when clicking the action button
    setFolderList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "Archived" } : f)),
    );
  };

  const handleRequestDeletion = (e, id) => {
    e.stopPropagation();
    setFolderList((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "Pending Deletion Approval" } : f,
      ),
    );
  };

  const filteredFolders = folderList.filter(
    (f) =>
      f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F2EEE3] font-sans pb-12">
      {/* Official Branded Header */}
      <header className="bg-[#008000] text-white border-b-4 border-[#FFDB58]">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center gap-6">
          <div className="h-14 w-14 shrink-0 bg-white rounded-full border-2 border-[#FFDB58] flex items-center justify-center text-[10px] font-black text-[#008000] text-center leading-tight">
            ZIM
            <br />
            COAT
          </div>
          <div className="flex items-center gap-4 border-l border-white/30 pl-6">
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                Record Management Console
              </h1>
              <p className="text-sm text-green-100 mt-0.5">
                Ministry of Information Communication Technology Postal and
                Courier Services
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Add New Record Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[#DDD5BE] shadow-sm flex flex-col sticky top-8">
            <div className="bg-[#FAF8F1] border-b border-[#DDD5BE] px-6 py-4 flex items-center gap-2">
              <FilePlus className="h-5 w-5 text-[#008000]" />
              <h2 className="text-lg font-bold text-[#1E2B3C]">
                Register File
              </h2>
            </div>

            <form onSubmit={handleAddRecord} className="p-6 space-y-4">
              {successMessage && (
                <div className="bg-green-50 border border-[#008000] p-3 flex items-start gap-2 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-[#008000] shrink-0" />
                  <p className="text-sm font-bold text-[#008000]">
                    {successMessage}
                  </p>
                </div>
              )}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={newRecord.title}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, title: e.target.value })
                  }
                  className="w-full p-2.5 border border-[#DDD5BE] text-sm font-semibold text-[#1E2B3C] focus:outline-none focus:border-[#008000]"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-2 bg-[#008000] hover:bg-[#006b00] text-white py-3 px-4 font-bold text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <FilePlus className="h-4 w-4" /> Commit to Registry
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Immutable Ledger */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[#DDD5BE] shadow-sm flex flex-col">
            <div className="bg-[#FAF8F1] border-b border-[#DDD5BE] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-[#8A6D00]" />
                <h2 className="text-lg font-bold text-[#1E2B3C]">
                  Immutable Storage Ledger
                </h2>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8B7F63] h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-8 pr-3 py-1.5 border border-[#DDD5BE] text-sm focus:outline-none focus:border-[#008000]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-bold text-[#5B5240] border-b border-[#DDD5BE] uppercase tracking-wider bg-white">
                    <th className="px-6 py-3">Tracking ID / Title</th>
                    <th className="py-3">System Status</th>
                    <th className="py-3 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFolders.map((folder) => {
                    const isAvailable =
                      folder.status === "Available" ||
                      folder.status === "Overdue";
                    return (
                      <tr
                        key={folder.id}
                        onClick={() => setSelectedDoc(folder)}
                        className="border-b border-[#EDE7D6] hover:bg-[#F7F4EA] transition cursor-pointer group"
                        title="Click to view full lifeline"
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-[#1E2B3C] flex items-center gap-2 group-hover:text-[#008000] transition">
                            <Activity className="h-4 w-4 text-[#8B7F63] group-hover:text-[#008000]" />{" "}
                            {folder.id}
                          </p>
                          <p className="text-sm text-[#6B7280] truncate max-w-[250px] mt-0.5">
                            {folder.title}
                          </p>
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-2.5 py-1 text-xs font-bold border ${
                              folder.status === "Archived"
                                ? "bg-gray-100 text-gray-600 border-gray-300"
                                : folder.status === "Pending Deletion Approval"
                                  ? "bg-yellow-50 text-[#8A6D00] border-[#8A6D00]/30 flex items-center gap-1 w-max"
                                  : "bg-green-50 text-[#008000] border-[#008000]/20"
                            }`}
                          >
                            {folder.status === "Pending Deletion Approval" && (
                              <Clock className="h-3 w-3" />
                            )}
                            {folder.status}
                          </span>
                        </td>
                        <td className="py-4 pr-6 text-right space-x-2">
                          {isAvailable && (
                            <>
                              <button
                                onClick={(e) =>
                                  handleArchiveRecord(e, folder.id)
                                }
                                className="text-xs font-bold text-[#1E2B3C] border border-[#1E2B3C] px-3 py-1.5 hover:bg-[#1E2B3C] hover:text-white transition cursor-pointer"
                              >
                                Archive
                              </button>
                              <button
                                onClick={(e) =>
                                  handleRequestDeletion(e, folder.id)
                                }
                                className="text-xs font-bold text-[#dc2626] border border-[#dc2626] px-3 py-1.5 hover:bg-[#dc2626] hover:text-white transition cursor-pointer"
                                title="Requires Director Approval"
                              >
                                Request Deletion
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* =========================================
          DOCUMENT LIFELINE MODAL (AUDIT TRAIL)
          ========================================= */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-[#1E2B3C]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#DDD5BE] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#1E2B3C] p-6 flex justify-between items-start text-[#F2EEE3] border-b-4 border-[#FFDB58]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-5 w-5 text-[#FFDB58]" />
                  <span className="text-sm font-bold text-[#FFDB58] uppercase tracking-wider">
                    Document Lifeline Log
                  </span>
                </div>
                <h2 className="text-xl font-bold">{selectedDoc.id}</h2>
                <p className="text-sm text-[#B9C2CC] mt-1 max-w-md truncate">
                  {selectedDoc.title}
                </p>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-[#B9C2CC] hover:text-white transition bg-[#26374C] p-1.5 cursor-pointer border border-[#3A4C63]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body - Lifeline Timeline */}
            <div className="p-8 overflow-y-auto bg-[#FAF8F1]">
              <div className="relative border-l-2 border-[#DDD5BE] ml-4 space-y-8 pb-4">
                {/* Event 3: Read Receipt (Simulated latest action) */}
                <div className="relative pl-8">
                  <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-[#FAF8F1] bg-[#008000]" />
                  <p className="text-xs font-bold text-[#008000] mb-1 uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="h-4 w-4" /> Accessed & Viewed
                  </p>
                  <p className="text-[#1E2B3C] font-bold text-lg">
                    Document Read Receipt Logged
                  </p>
                  <div className="bg-white border border-[#DDD5BE] p-4 mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase text-[#8B7F63] tracking-widest mb-0.5">
                        Opened By
                      </p>
                      <p className="text-sm font-bold text-[#1E2B3C] flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" /> Dir. S. Chigumba
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-[#8B7F63] tracking-widest mb-0.5">
                        Location / IP
                      </p>
                      <p className="text-sm font-bold text-[#1E2B3C] flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> 10.0.0.42 (Internal)
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] font-black uppercase text-[#8B7F63] tracking-widest mb-0.5">
                        Timestamp
                      </p>
                      <p className="text-sm font-bold text-[#1E2B3C] flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />{" "}
                        {new Date(Date.now() - 1000 * 60 * 30).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Event 2: Routed / Dispatched */}
                <div className="relative pl-8">
                  <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-[#FAF8F1] bg-[#8A6D00]" />
                  <p className="text-xs font-bold text-[#8A6D00] mb-1 uppercase tracking-wider flex items-center gap-1.5">
                    <Send className="h-4 w-4" /> Routed
                  </p>
                  <p className="text-[#1E2B3C] font-bold text-lg">
                    Dispatched to Destination
                  </p>
                  <div className="bg-white border border-[#DDD5BE] p-4 mt-3 grid grid-cols-2 gap-4 opacity-90">
                    <div>
                      <p className="text-[10px] font-black uppercase text-[#8B7F63] tracking-widest mb-0.5">
                        Sent By
                      </p>
                      <p className="text-sm font-bold text-[#1E2B3C] flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" /> M. Sibanda (Registry)
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-[#8B7F63] tracking-widest mb-0.5">
                        Routed To
                      </p>
                      <p className="text-sm font-bold text-[#1E2B3C] flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />{" "}
                        {selectedDoc.checkedOutTo?.entity ||
                          "Ministry of Finance"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] font-black uppercase text-[#8B7F63] tracking-widest mb-0.5">
                        Timestamp
                      </p>
                      <p className="text-sm font-bold text-[#1E2B3C] flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />{" "}
                        {new Date(
                          Date.now() - 1000 * 60 * 60 * 24,
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Event 1: Creation */}
                <div className="relative pl-8">
                  <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-[#FAF8F1] bg-[#1E2B3C]" />
                  <p className="text-xs font-bold text-[#1E2B3C] mb-1 uppercase tracking-wider flex items-center gap-1.5">
                    <FilePlus className="h-4 w-4" /> Digitized
                  </p>
                  <p className="text-[#1E2B3C] font-bold text-lg">
                    Record Created in System
                  </p>
                  <div className="bg-white border border-[#DDD5BE] p-4 mt-3 grid grid-cols-2 gap-4 opacity-80">
                    <div>
                      <p className="text-[10px] font-black uppercase text-[#8B7F63] tracking-widest mb-0.5">
                        Created By
                      </p>
                      <p className="text-sm font-bold text-[#1E2B3C] flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" /> System Admin
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-[#8B7F63] tracking-widest mb-0.5">
                        IP Address
                      </p>
                      <p className="text-sm font-bold text-[#1E2B3C] flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> 192.168.1.45
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] font-black uppercase text-[#8B7F63] tracking-widest mb-0.5">
                        Timestamp
                      </p>
                      <p className="text-sm font-bold text-[#1E2B3C] flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />{" "}
                        {new Date(
                          Date.now() - 1000 * 60 * 60 * 72,
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
