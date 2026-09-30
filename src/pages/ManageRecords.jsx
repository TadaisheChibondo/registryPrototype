import React, { useState } from "react";
import {
  FilePlus,
  Trash2,
  AlertTriangle,
  Search,
  FileText,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { folders as initialFolders } from "../data/mockData";

export default function ManageRecords() {
  const [folderList, setFolderList] = useState(initialFolders);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Form State
  const [newRecord, setNewRecord] = useState({
    id: `MICT-REG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    title: "",
    category: "Policy",
    department: "Internal",
    currentLocation: "Registry Vault A, Shelf 1",
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
    setSuccessMessage(`Record ${folder.id} successfully added to the vault.`);

    // Reset form with a new random ID for the next entry
    setNewRecord({
      id: `MICT-REG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: "",
      category: "Policy",
      department: "Internal",
      currentLocation: "Registry Vault A, Shelf 1",
    });

    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleDeleteRecord = (id) => {
    if (
      window.confirm(
        `Are you sure you want to permanently discard record ${id}?`,
      )
    ) {
      setFolderList(folderList.filter((f) => f.id !== id));
    }
  };

  const filteredFolders = folderList.filter(
    (f) =>
      f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F2EEE3] font-sans pb-12">
      {/* Header */}
      <header className="bg-[#1E2B3C] text-[#F2EEE3]">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 shrink-0 bg-[#FFDB58] flex items-center justify-center text-sm font-bold tracking-wide text-[#1E2B3C]">
              MICT
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                Record Management Console
              </h1>
              <p className="text-sm text-[#B9C2CC] mt-0.5">
                Register new physical folders or discard decommissioned files
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* =========================================
            LEFT COLUMN: Add New Record Form
            ========================================= */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[#DDD5BE] shadow-sm flex flex-col sticky top-8">
            <div className="bg-[#FAF8F1] border-b border-[#DDD5BE] px-6 py-4 flex items-center gap-2">
              <FilePlus className="h-5 w-5 text-[#008000]" />
              <h2 className="text-lg font-bold text-[#1E2B3C]">
                Register New File
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
                  System Tracking ID *
                </label>
                <input
                  type="text"
                  required
                  value={newRecord.id}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, id: e.target.value })
                  }
                  className="w-full p-2.5 border border-[#DDD5BE] bg-[#FAF8F1] text-sm font-bold text-[#1E2B3C] focus:outline-none focus:border-[#008000] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Q4 ICT Budget Proposal"
                  value={newRecord.title}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, title: e.target.value })
                  }
                  className="w-full p-2.5 border border-[#DDD5BE] text-sm font-semibold text-[#1E2B3C] focus:outline-none focus:border-[#008000]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1">
                    Category
                  </label>
                  <select
                    value={newRecord.category}
                    onChange={(e) =>
                      setNewRecord({ ...newRecord, category: e.target.value })
                    }
                    className="w-full p-2.5 border border-[#DDD5BE] bg-white text-sm font-semibold text-[#1E2B3C] focus:outline-none focus:border-[#008000]"
                  >
                    <option value="Policy">Policy</option>
                    <option value="Audit">Audit</option>
                    <option value="Procurement">Procurement</option>
                    <option value="Technical">Technical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1">
                    Department
                  </label>
                  <select
                    value={newRecord.department}
                    onChange={(e) =>
                      setNewRecord({ ...newRecord, department: e.target.value })
                    }
                    className="w-full p-2.5 border border-[#DDD5BE] bg-white text-sm font-semibold text-[#1E2B3C] focus:outline-none focus:border-[#008000]"
                  >
                    <option value="Internal">Internal</option>
                    <option value="External Transfer">External Transfer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1">
                  Initial Vault Location *
                </label>
                <input
                  type="text"
                  required
                  value={newRecord.currentLocation}
                  onChange={(e) =>
                    setNewRecord({
                      ...newRecord,
                      currentLocation: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-[#DDD5BE] text-sm font-semibold text-[#1E2B3C] focus:outline-none focus:border-[#008000]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#008000] hover:bg-[#006b00] text-white py-3 px-4 font-bold text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <FilePlus className="h-4 w-4" />
                Commit to Registry
              </button>
            </form>
          </div>
        </div>

        {/* =========================================
            RIGHT COLUMN: Discard/Delete Ledger
            ========================================= */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[#DDD5BE] shadow-sm flex flex-col">
            <div className="bg-[#FAF8F1] border-b border-[#DDD5BE] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-[#dc2626]" />
                <h2 className="text-lg font-bold text-[#1E2B3C]">
                  Discard Decommissioned Files
                </h2>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8B7F63] h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search to discard..."
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
                    <th className="py-3">Status</th>
                    <th className="py-3 pr-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFolders.map((folder) => {
                    // Logic: You cannot delete a file that is checked out or lost.
                    const canDelete = folder.status === "Available";

                    return (
                      <tr
                        key={folder.id}
                        className="border-b border-[#EDE7D6] hover:bg-[#FAF8F1] transition"
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-[#1E2B3C] flex items-center gap-2">
                            <FileText className="h-4 w-4 text-[#8B7F63]" />
                            {folder.id}
                          </p>
                          <p className="text-sm text-[#6B7280] truncate max-w-[300px] mt-0.5">
                            {folder.title}
                          </p>
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-2.5 py-1 text-xs font-bold border ${
                              canDelete
                                ? "bg-green-50 text-[#008000] border-[#008000]/20"
                                : "bg-yellow-50 text-[#8A6D00] border-[#8A6D00]/20"
                            }`}
                          >
                            {folder.status}
                          </span>
                        </td>
                        <td className="py-4 pr-6 text-right">
                          {canDelete ? (
                            <button
                              onClick={() => handleDeleteRecord(folder.id)}
                              className="text-xs font-bold text-[#dc2626] border border-[#dc2626] px-3 py-1.5 hover:bg-[#dc2626] hover:text-white transition cursor-pointer"
                            >
                              Discard
                            </button>
                          ) : (
                            <div
                              className="flex items-center justify-end gap-1.5 text-xs font-bold text-[#8B7F63]"
                              title="Cannot discard while file is checked out or missing"
                            >
                              <ShieldAlert className="h-4 w-4" /> Locked
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredFolders.length === 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-8 text-center text-sm font-bold text-[#8B7F63]"
                      >
                        No records found matching "{searchQuery}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
