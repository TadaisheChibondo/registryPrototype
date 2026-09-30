import React, { useState } from "react";
import {
  Search,
  MapPin,
  User,
  Clock,
  AlertTriangle,
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  LogOut,
  LogIn,
  Building2,
  ShieldCheck,
  Barcode,
  RotateCcw,
} from "lucide-react";
import { folders as initialFolders } from "../data/mockData";

export default function ClerkPortal() {
  // Local state copy of folders so check-ins and check-outs persist during the live demo
  const [folderList, setFolderList] = useState(initialFolders);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRecord, setActiveRecord] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // Workflow step: 'IDENTIFIED' | 'CHECKOUT_FORM' | 'CHECKIN_FORM' | 'RECEIPT'
  const [workflowStep, setWorkflowStep] = useState("IDENTIFIED");
  const [lastTransaction, setLastTransaction] = useState(null);

  // Check-Out Form State
  const [checkoutData, setCheckoutData] = useState({
    entity: "",
    name: "",
    contact: "",
    expectedReturn: "",
    notes: "Physical folder intact, all folios verified.",
  });

  // Check-In Form State
  const [checkinData, setCheckinData] = useState({
    returnedBy: "",
    returnLocation: "Registry Vault B, Shelf 4",
    condition: "Verified Intact",
    notes: "",
  });

  const locateFile = (queryString) => {
    const q = queryString.trim().toLowerCase();
    if (!q) return;

    const found = folderList.find(
      (f) => f.id.toLowerCase() === q || f.title.toLowerCase().includes(q),
    );

    if (found) {
      setActiveRecord(found);
      setNotFound(false);
      setWorkflowStep("IDENTIFIED");
      // Pre-fill returner name if file is checked out
      if (found.checkedOutTo) {
        setCheckinData((prev) => ({
          ...prev,
          returnedBy: `${found.checkedOutTo.name} (${found.checkedOutTo.entity})`,
        }));
      }
    } else {
      setActiveRecord(null);
      setNotFound(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    locateFile(searchQuery);
  };

  const handleQuickScan = (id) => {
    setSearchQuery(id);
    locateFile(id);
  };

  const handleConfirmCheckout = (e) => {
    e.preventDefault();
    const updatedRecord = {
      ...activeRecord,
      status: "Checked Out",
      currentLocation: "External",
      lastUpdate: new Date().toISOString(),
      checkedOutTo: {
        entity: checkoutData.entity,
        name: checkoutData.name,
        contact: checkoutData.contact || "N/A",
        expectedReturn: checkoutData.expectedReturn,
      },
    };

    setFolderList((prev) =>
      prev.map((f) => (f.id === activeRecord.id ? updatedRecord : f)),
    );
    setActiveRecord(updatedRecord);
    setLastTransaction({
      type: "CHECK-OUT",
      ref: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      folderId: updatedRecord.id,
      title: updatedRecord.title,
      party: `${checkoutData.name} · ${checkoutData.entity}`,
      detail: `Due back: ${new Date(checkoutData.expectedReturn).toLocaleDateString()}`,
    });
    setWorkflowStep("RECEIPT");
  };

  const handleConfirmCheckin = (e) => {
    e.preventDefault();
    const updatedRecord = {
      ...activeRecord,
      status: "Available",
      currentLocation: checkinData.returnLocation,
      lastUpdate: new Date().toISOString(),
      checkedOutTo: null,
    };

    setFolderList((prev) =>
      prev.map((f) => (f.id === activeRecord.id ? updatedRecord : f)),
    );
    setActiveRecord(updatedRecord);
    setLastTransaction({
      type: "CHECK-IN",
      ref: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      folderId: updatedRecord.id,
      title: updatedRecord.title,
      party: `Returned by ${checkinData.returnedBy}`,
      detail: `Shelved at: ${checkinData.returnLocation} (${checkinData.condition})`,
    });
    setWorkflowStep("RECEIPT");
  };

  const resetWorkspace = () => {
    setSearchQuery("");
    setActiveRecord(null);
    setNotFound(false);
    setWorkflowStep("IDENTIFIED");
    setCheckoutData({
      entity: "",
      name: "",
      contact: "",
      expectedReturn: "",
      notes: "Physical folder intact, all folios verified.",
    });
  };

  return (
    <div className="min-h-screen bg-[#F2EEE3] font-sans pb-16">
      {/* Top Banner */}
      <header className="bg-[#1E2B3C] text-[#F2EEE3] border-b-4 border-[#FFDB58]">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 shrink-0 bg-[#FFDB58] flex items-center justify-center text-sm font-bold tracking-wide text-[#1E2B3C]">
              MICT
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FFDB58]">
                Registry Transaction Workspace
              </p>
              <h1 className="text-2xl font-bold leading-tight">
                Physical File Check-Out & Return
              </h1>
            </div>
          </div>
          {activeRecord && (
            <button
              onClick={resetWorkspace}
              className="flex items-center gap-1.5 text-xs font-bold bg-[#26374C] hover:bg-[#3A4C63] text-[#F2EEE3] px-3 py-2 border border-[#3A4C63] transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Clear Desk
            </button>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-8">
        {/* ====================================================
            STEP 0: SCAN / SEARCH BAR
            ==================================================== */}
        <div className="bg-white border border-[#DDD5BE] p-6 shadow-sm mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-2">
            Scan a file barcode or enter its tracking ID
          </label>
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7F63] h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., ICT-REG-2026-8901"
                className="w-full pl-11 pr-4 py-3 text-base font-bold text-[#1E2B3C] bg-[#FAF8F1] border-2 border-[#DDD5BE] focus:outline-none focus:border-[#1E2B3C] focus:bg-white transition"
              />
            </div>
            <button
              type="submit"
              className="bg-[#1E2B3C] text-[#FFDB58] px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-[#26374C] transition cursor-pointer shrink-0"
            >
              Identify File
            </button>
          </form>

          {/* Quick-Scan Demo Helper Bar */}
          <div className="mt-4 pt-3 border-t border-[#EDE7D6] flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#8B7F63] flex items-center gap-1 mr-1">
              <Barcode className="h-3.5 w-3.5" /> Simulate Barcode Scan:
            </span>
            {folderList.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => handleQuickScan(f.id)}
                className={`text-xs font-bold px-2.5 py-1 border transition cursor-pointer ${
                  activeRecord?.id === f.id
                    ? "bg-[#1E2B3C] text-[#FFDB58] border-[#1E2B3C]"
                    : "bg-[#FAF8F1] text-[#1E2B3C] border-[#DDD5BE] hover:bg-[#E7E1D0]"
                }`}
              >
                {f.id} ({f.status})
              </button>
            ))}
          </div>
        </div>

        {/* Not Found Alert */}
        {notFound && (
          <div className="bg-red-50 border-2 border-[#dc2626] p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-[#dc2626] mx-auto mb-2" />
            <h2 className="text-lg font-bold text-[#1E2B3C]">
              No Physical Record Found
            </h2>
            <p className="text-sm text-[#5B5240] mt-1">
              No file matches tracking ID or title "{searchQuery}". Verify the
              folder label or contact a Registry Administrator.
            </p>
          </div>
        )}

        {/* ====================================================
            STEP 1: FILE IDENTIFIED CARD
            ==================================================== */}
        {activeRecord && workflowStep === "IDENTIFIED" && (
          <div className="bg-white border-2 border-[#1E2B3C] shadow-md overflow-hidden">
            {/* Status Header Bar */}
            <div className="bg-[#FAF8F1] border-b border-[#DDD5BE] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-[#1E2B3C]" />
                <span className="text-lg font-black tracking-tight text-[#1E2B3C]">
                  {activeRecord.id}
                </span>
              </div>
              <WorkspaceStatusBadge status={activeRecord.status} />
            </div>

            {/* Record Specifications */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#1E2B3C] mb-4">
                {activeRecord.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FAF8F1] border border-[#E4DECC] p-4 mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#8B7F63]">
                    Department / Category
                  </p>
                  <p className="text-base font-bold text-[#1E2B3C] mt-0.5">
                    {activeRecord.category} ({activeRecord.department})
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#8B7F63]">
                    {activeRecord.status === "Available"
                      ? "Vault Location"
                      : "Current Custody Holder"}
                  </p>
                  {activeRecord.status === "Available" ? (
                    <p className="text-base font-bold text-[#166534] mt-0.5 flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />{" "}
                      {activeRecord.currentLocation}
                    </p>
                  ) : (
                    <p className="text-base font-bold text-[#1E2B3C] mt-0.5 flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-[#8A6D00]" />
                      {activeRecord.checkedOutTo?.entity} ·{" "}
                      {activeRecord.checkedOutTo?.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Extra Custody Context if Checked Out / Overdue */}
              {activeRecord.status !== "Available" &&
                activeRecord.checkedOutTo && (
                  <div
                    className={`p-4 mb-6 border flex items-center justify-between ${
                      activeRecord.status === "Overdue"
                        ? "bg-red-50 border-[#dc2626] text-[#dc2626]"
                        : "bg-yellow-50 border-[#8A6D00] text-[#1E2B3C]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 shrink-0" />
                      <div>
                        <p className="text-sm font-bold">
                          Expected Return Date:{" "}
                          {new Date(
                            activeRecord.checkedOutTo.expectedReturn,
                          ).toLocaleDateString()}
                        </p>
                        <p className="text-xs font-semibold opacity-80">
                          Last processed by {activeRecord.lastHandledBy}
                        </p>
                      </div>
                    </div>
                    {activeRecord.status === "Overdue" && (
                      <span className="text-xs font-black uppercase px-2 py-1 bg-[#dc2626] text-white">
                        Action Required
                      </span>
                    )}
                  </div>
                )}

              {/* Primary Transaction Action Trigger */}
              {activeRecord.status === "Available" ? (
                <button
                  onClick={() => setWorkflowStep("CHECKOUT_FORM")}
                  className="w-full bg-[#008000] hover:bg-[#006b00] text-white py-4 px-6 font-bold text-base uppercase tracking-wider transition flex items-center justify-center gap-3 shadow-sm cursor-pointer"
                >
                  <LogOut className="h-5 w-5" />
                  Check Out — Record Custody Transfer
                  <ArrowRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={() => setWorkflowStep("CHECKIN_FORM")}
                  className="w-full bg-[#1E2B3C] hover:bg-[#26374C] text-[#FFDB58] py-4 px-6 font-bold text-base uppercase tracking-wider transition flex items-center justify-center gap-3 shadow-sm cursor-pointer"
                >
                  <LogIn className="h-5 w-5" />
                  Check In — Verify Physical Return
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ====================================================
            STEP 2A: CHECK-OUT WORKFLOW (RECORD CUSTODY)
            ==================================================== */}
        {activeRecord && workflowStep === "CHECKOUT_FORM" && (
          <div className="bg-white border-2 border-[#1E2B3C] shadow-md overflow-hidden">
            <div className="bg-[#1E2B3C] text-[#F2EEE3] px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFDB58]">
                  Transaction in Progress · Check-Out
                </span>
                <h2 className="text-lg font-bold">
                  {activeRecord.id} — {activeRecord.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setWorkflowStep("IDENTIFIED")}
                className="text-xs font-bold text-[#B9C2CC] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            </div>

            <form onSubmit={handleConfirmCheckout} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1.5">
                    Requesting Ministry / Entity *
                  </label>
                  <input
                    type="text"
                    required
                    value={checkoutData.entity}
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        entity: e.target.value,
                      })
                    }
                    placeholder="e.g., Ministry of Health"
                    className="w-full p-3 border border-[#DDD5BE] bg-[#FAF8F1] text-sm font-semibold text-[#1E2B3C] focus:outline-none focus:border-[#008000] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1.5">
                    Receiving Officer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={checkoutData.name}
                    onChange={(e) =>
                      setCheckoutData({ ...checkoutData, name: e.target.value })
                    }
                    placeholder="e.g., Dr. A. Ndlovu"
                    className="w-full p-3 border border-[#DDD5BE] bg-[#FAF8F1] text-sm font-semibold text-[#1E2B3C] focus:outline-none focus:border-[#008000] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1.5">
                    Official Email / ID Number
                  </label>
                  <input
                    type="text"
                    value={checkoutData.contact}
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        contact: e.target.value,
                      })
                    }
                    placeholder="e.g., andlovu@health.gov.zw"
                    className="w-full p-3 border border-[#DDD5BE] bg-[#FAF8F1] text-sm font-semibold text-[#1E2B3C] focus:outline-none focus:border-[#008000] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1.5">
                    Expected Return Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={checkoutData.expectedReturn}
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        expectedReturn: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-[#DDD5BE] bg-[#FAF8F1] text-sm font-semibold text-[#1E2B3C] focus:outline-none focus:border-[#008000] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1.5">
                  Condition & Handover Notes
                </label>
                <input
                  type="text"
                  value={checkoutData.notes}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, notes: e.target.value })
                  }
                  className="w-full p-3 border border-[#DDD5BE] bg-[#FAF8F1] text-sm text-[#1E2B3C] focus:outline-none focus:border-[#008000] focus:bg-white"
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-[#EDE7D6]">
                <button
                  type="button"
                  onClick={() => setWorkflowStep("IDENTIFIED")}
                  className="px-6 py-3.5 border border-[#DDD5BE] text-sm font-bold text-[#5B5240] hover:bg-[#FAF8F1] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#008000] hover:bg-[#006b00] text-white py-3.5 px-6 font-bold text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ShieldCheck className="h-5 w-5" />
                  Authorize & Log Check-Out
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ====================================================
            STEP 2B: CHECK-IN WORKFLOW (VERIFY RETURN)
            ==================================================== */}
        {activeRecord && workflowStep === "CHECKIN_FORM" && (
          <div className="bg-white border-2 border-[#1E2B3C] shadow-md overflow-hidden">
            <div className="bg-[#1E2B3C] text-[#F2EEE3] px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFDB58]">
                  Transaction in Progress · Check-In Return
                </span>
                <h2 className="text-lg font-bold">
                  {activeRecord.id} — {activeRecord.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setWorkflowStep("IDENTIFIED")}
                className="text-xs font-bold text-[#B9C2CC] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            </div>

            <form onSubmit={handleConfirmCheckin} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1.5">
                    Returned By (Officer / Courier) *
                  </label>
                  <input
                    type="text"
                    required
                    value={checkinData.returnedBy}
                    onChange={(e) =>
                      setCheckinData({
                        ...checkinData,
                        returnedBy: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-[#DDD5BE] bg-[#FAF8F1] text-sm font-semibold text-[#1E2B3C] focus:outline-none focus:border-[#008000] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1.5">
                    Assigned Vault & Shelf Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={checkinData.returnLocation}
                    onChange={(e) =>
                      setCheckinData({
                        ...checkinData,
                        returnLocation: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-[#DDD5BE] bg-[#FAF8F1] text-sm font-semibold text-[#1E2B3C] focus:outline-none focus:border-[#008000] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1.5">
                  Physical Folder Verification *
                </label>
                <select
                  value={checkinData.condition}
                  onChange={(e) =>
                    setCheckinData({
                      ...checkinData,
                      condition: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-[#DDD5BE] bg-[#FAF8F1] text-sm font-semibold text-[#1E2B3C] focus:outline-none focus:border-[#008000] focus:bg-white"
                >
                  <option value="Verified Intact">
                    Verified Intact — All folios present & seals unbroken
                  </option>
                  <option value="Minor Wear">
                    Minor Wear — Folder jacket requires replacement
                  </option>
                  <option value="Flagged for Audit">
                    Discrepancy Detected — Missing folios (Flag for Audit)
                  </option>
                </select>
              </div>

              <div className="flex gap-3 pt-3 border-t border-[#EDE7D6]">
                <button
                  type="button"
                  onClick={() => setWorkflowStep("IDENTIFIED")}
                  className="px-6 py-3.5 border border-[#DDD5BE] text-sm font-bold text-[#5B5240] hover:bg-[#FAF8F1] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#008000] hover:bg-[#006b00] text-white py-3.5 px-6 font-bold text-sm uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  Verify Return & Restore to Vault
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ====================================================
            STEP 3: TRANSACTION RECEIPT / CONFIRMATION
            ==================================================== */}
        {workflowStep === "RECEIPT" && lastTransaction && (
          <div className="bg-white border-2 border-[#008000] shadow-md p-6">
            <div className="flex items-center justify-between border-b border-[#DDD5BE] pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#008000] text-white flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#008000]">
                    Chain of Custody Logged · {lastTransaction.ref}
                  </p>
                  <h2 className="text-xl font-bold text-[#1E2B3C]">
                    {lastTransaction.type === "CHECK-OUT"
                      ? "File Custody Transferred"
                      : "File Return Verified"}
                  </h2>
                </div>
              </div>
              <span className="text-sm font-bold text-[#5B5240]">
                {lastTransaction.timestamp}
              </span>
            </div>

            <div className="bg-[#FAF8F1] border border-[#E4DECC] p-4 space-y-2 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-[#5B5240]">Record:</span>
                <span className="font-bold text-[#1E2B3C]">
                  {lastTransaction.folderId} ({lastTransaction.title})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#5B5240]">
                  Custody Party:
                </span>
                <span className="font-bold text-[#1E2B3C]">
                  {lastTransaction.party}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#5B5240]">
                  Status Detail:
                </span>
                <span className="font-bold text-[#008000]">
                  {lastTransaction.detail}
                </span>
              </div>
            </div>

            <button
              onClick={resetWorkspace}
              className="w-full bg-[#1E2B3C] hover:bg-[#26374C] text-[#FFDB58] py-3.5 font-bold text-sm uppercase tracking-wider transition cursor-pointer"
            >
              Scan Next File
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function WorkspaceStatusBadge({ status }) {
  if (status === "Available") {
    return (
      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider bg-[#008000] text-white">
        <span className="h-2 w-2 rounded-full bg-white" />
        Available
      </span>
    );
  }
  if (status === "Overdue") {
    return (
      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider bg-[#dc2626] text-white">
        <AlertTriangle className="h-3.5 w-3.5" />
        Overdue
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider bg-[#FFDB58] text-[#1E2B3C] border border-[#8A6D00]">
      <span className="h-2 w-2 rounded-full bg-[#1E2B3C]" />
      Checked Out
    </span>
  );
}
