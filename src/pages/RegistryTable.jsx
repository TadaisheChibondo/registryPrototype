import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MapPin,
  User,
  Clock,
  X,
  FileText,
  Download,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { folders } from "../data/mockData";

export default function RegistryTable({ initialFilter = "All" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState(initialFilter);
  const [selectedFolder, setSelectedFolder] = useState(null);

  // Sync status filter if initialFilter prop changes from Dashboard navigation
  useEffect(() => {
    setSelectedStatus(initialFilter);
  }, [initialFilter]);

  // Extract unique categories for the filter dropdown
  const categories = ["All", ...new Set(folders.map((f) => f.category))];
  const statuses = ["All", "Available", "Checked Out", "Overdue", "Lost"];

  // Filter logic combining search, category, and status
  const filteredFolders = folders.filter((folder) => {
    const matchesSearch =
      folder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      folder.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || folder.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All" || folder.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F2EEE3] font-sans">
      {/* Header matching Dashboard */}
      <header className="bg-[#1E2B3C] text-[#F2EEE3]">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 shrink-0 bg-[#FFDB58] flex items-center justify-center text-sm font-bold tracking-wide text-[#1E2B3C]">
              MICT
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                Master Registry Directory
              </h1>
              <p className="text-sm text-[#B9C2CC] mt-0.5">
                Search, filter, and audit physical ministry records
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Search & Filter Controls */}
        <div className="bg-white p-4 border border-[#DDD5BE] shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7F63] h-5 w-5" />
            <input
              type="text"
              placeholder="Search by ID, Title, or Keyword..."
              className="w-full pl-10 pr-4 py-2.5 border border-[#DDD5BE] text-sm text-[#1E2B3C] focus:outline-none focus:border-[#008000] transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="text-[#5B5240] h-4 w-4" />
              <span className="text-sm font-semibold text-[#5B5240]">
                Status:
              </span>
              <select
                className="py-2 px-3 border border-[#DDD5BE] text-sm font-semibold text-[#1E2B3C] bg-[#FAF8F1] focus:outline-none focus:border-[#008000]"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All Statuses" : status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#5B5240]">
                Category:
              </span>
              <select
                className="py-2 px-3 border border-[#DDD5BE] text-sm font-semibold text-[#1E2B3C] bg-[#FAF8F1] focus:outline-none focus:border-[#008000]"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "All" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {(selectedStatus !== "All" ||
              selectedCategory !== "All" ||
              searchTerm !== "") && (
              <button
                onClick={() => {
                  setSelectedStatus("All");
                  setSelectedCategory("All");
                  setSearchTerm("");
                }}
                className="text-xs font-bold text-[#dc2626] hover:underline px-2 py-1"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-[#DDD5BE] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#FAF8F1]">
                <tr className="border-b border-[#DDD5BE] text-sm font-semibold text-[#5B5240]">
                  <th className="p-4">Tracking ID</th>
                  <th className="p-4">Document Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Current Location</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredFolders.map((folder) => (
                  <tr
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder)}
                    className="border-b border-[#EDE7D6] last:border-0 hover:bg-[#F7F4EA] cursor-pointer transition group"
                  >
                    <td className="p-4">
                      <span className="text-sm font-bold text-[#1E2B3C] group-hover:text-[#008000] group-hover:underline">
                        {folder.id}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-sm text-[#1E2B3C]">
                      {folder.title}
                    </td>
                    <td className="p-4">
                      <span className="bg-[#FAF8F1] border border-[#E4DECC] text-[#5B5240] px-2.5 py-1 text-xs font-bold">
                        {folder.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-[#374151]">
                        <MapPin className="h-4 w-4 text-[#8B7F63]" />
                        {folder.currentLocation}
                      </div>
                    </td>
                    <td className="p-4">
                      <DirectoryStatusBadge status={folder.status} />
                    </td>
                  </tr>
                ))}

                {filteredFolders.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-8 text-center text-[#6B7280] text-sm font-medium"
                    >
                      No records found matching your current filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Chain of Custody Modal */}
      {selectedFolder && (
        <div className="fixed inset-0 bg-[#1E2B3C]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#DDD5BE] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#1E2B3C] p-6 flex justify-between items-start text-[#F2EEE3] border-b-4 border-[#FFDB58]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-5 w-5 text-[#FFDB58]" />
                  <span className="text-sm font-bold text-[#FFDB58]">
                    {selectedFolder.id}
                  </span>
                </div>
                <h2 className="text-xl font-bold">{selectedFolder.title}</h2>
              </div>
              <button
                onClick={() => setSelectedFolder(null)}
                className="text-[#B9C2CC] hover:text-white transition bg-[#26374C] p-1.5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body - Chain of Custody */}
            <div className="p-6 overflow-y-auto bg-[#FAF8F1]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#1E2B3C] flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#008000]" />
                  Chain of Custody Audit Trail
                </h3>
                <button className="flex items-center gap-2 text-sm bg-[#008000] text-white font-semibold hover:bg-[#006b00] px-3 py-1.5 transition">
                  <Download className="h-4 w-4" />
                  Export Audit PDF
                </button>
              </div>

              {/* Timeline */}
              <div className="relative border-l-2 border-[#DDD5BE] ml-4 space-y-8 pb-4">
                {/* Current State */}
                <div className="relative pl-6">
                  <div
                    className={`absolute -left-[9px] top-1 h-4 w-4 border-2 border-white ${
                      selectedFolder.status === "Available"
                        ? "bg-[#008000]"
                        : selectedFolder.status === "Overdue"
                          ? "bg-[#dc2626]"
                          : "bg-[#FFDB58]"
                    }`}
                  />
                  <p className="text-xs font-bold text-[#5B5240] mb-1 uppercase tracking-wider">
                    Current Status
                  </p>
                  <p className="text-[#1E2B3C] font-bold">
                    {selectedFolder.status} — {selectedFolder.currentLocation}
                  </p>
                  {selectedFolder.checkedOutTo && (
                    <p className="text-sm font-semibold text-[#8A6D00] mt-1">
                      Held by: {selectedFolder.checkedOutTo.entity} (
                      {selectedFolder.checkedOutTo.name})
                    </p>
                  )}
                  <div className="flex gap-4 mt-2 text-sm text-[#6B7280] font-medium">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />{" "}
                      {selectedFolder.lastHandledBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />{" "}
                      {new Date(selectedFolder.lastUpdate).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Previous Action */}
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 h-4 w-4 border-2 border-white bg-[#8B7F63]" />
                  <p className="text-xs font-bold text-[#5B5240] mb-1 uppercase tracking-wider">
                    Previous Action
                  </p>
                  <p className="text-[#1E2B3C] font-bold">
                    Checked In to Vault
                  </p>
                  <p className="text-sm text-[#374151] mt-1">
                    Returned from External Audit Committee
                  </p>
                  <div className="flex gap-4 mt-2 text-sm text-[#6B7280]">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" /> M. Sibanda
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> Sept 18, 2026, 14:30
                    </span>
                  </div>
                </div>

                {/* Origin */}
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 h-4 w-4 border-2 border-white bg-[#8B7F63]" />
                  <p className="text-xs font-bold text-[#5B5240] mb-1 uppercase tracking-wider">
                    Origin
                  </p>
                  <p className="text-[#1E2B3C] font-bold">Record Created</p>
                  <p className="text-sm text-[#374151] mt-1">
                    Initial physical file logged into system
                  </p>
                  <div className="flex gap-4 mt-2 text-sm text-[#6B7280]">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" /> System Admin
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> Jan 12, 2026, 09:00
                    </span>
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

function DirectoryStatusBadge({ status }) {
  if (status === "Overdue" || status === "Lost") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-[#dc2626]">
        <AlertTriangle className="h-3.5 w-3.5" />
        {status}
      </span>
    );
  }
  if (status === "Checked Out") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-[#1E2B3C] bg-[#FFDB58] border border-[#8A6D00]">
        <ExternalLink className="h-3.5 w-3.5" />
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-[#008000]">
      <CheckCircle2 className="h-3.5 w-3.5" />
      {status}
    </span>
  );
}
