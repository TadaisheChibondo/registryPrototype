import React, { useState } from "react";
import {
  Mail,
  MailOpen,
  Clock,
  FileText,
  CheckCheck,
  Download,
  AlertCircle,
  Building2,
  Search,
  Lock,
  Reply,
} from "lucide-react";

const initialInbox = [
  {
    id: `MICT-EDMS-${Math.floor(100000 + Math.random() * 900000)}`,
    title: "Urgent: Cybersecurity Risk Assessment Q4",
    category: "Technical Specs",
    dispatchedBy: "Central Registry",
    dispatchTime: new Date(Date.now() - 1000 * 60 * 5).toLocaleString(),
    status: "UNREAD",
    readTime: null,
    urgency: "Urgent",
    securityLevel: "Confidential",
  },
  {
    id: "MICT-EDMS-883921",
    title: "Q3 Departmental Hardware Audit Requirements",
    category: "Administrative",
    dispatchedBy: "Central Registry",
    dispatchTime: new Date(Date.now() - 1000 * 60 * 60 * 48).toLocaleString(),
    status: "READ",
    readTime: new Date(Date.now() - 1000 * 60 * 60 * 47).toLocaleString(),
    urgency: "Standard",
    securityLevel: "Internal",
  },
];

export default function DepartmentInbox() {
  const [inboxItems, setInboxItems] = useState(initialInbox);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [receiptNotification, setReceiptNotification] = useState(null);
  const [pinModalDoc, setPinModalDoc] = useState(null);
  const [pinInput, setPinInput] = useState("");

  const handleSelectDocument = (doc) => {
    if (doc.securityLevel === "Confidential" && doc.status === "UNREAD") {
      setPinModalDoc(doc);
    } else {
      openDocument(doc);
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    openDocument(pinModalDoc);
    setPinModalDoc(null);
    setPinInput("");
  };

  const openDocument = (doc) => {
    const now = new Date().toLocaleString();
    if (doc.status === "UNREAD") {
      const updatedDoc = { ...doc, status: "READ", readTime: now };
      setInboxItems((prev) =>
        prev.map((item) => (item.id === doc.id ? updatedDoc : item)),
      );
      setSelectedDoc(updatedDoc);
      setReceiptNotification(
        `Read receipt logged and transmitted to sender at ${now}`,
      );
      setTimeout(() => setReceiptNotification(null), 6000);
    } else {
      setSelectedDoc(doc);
    }
  };

  const unreadCount = inboxItems.filter((i) => i.status === "UNREAD").length;

  return (
    <div className="min-h-screen bg-[#F2EEE3] font-sans pb-16 relative">
      <header className="bg-[#1E2B3C] text-[#F2EEE3] border-b-4 border-[#FFDB58]">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 shrink-0 bg-[#FFDB58] flex items-center justify-center text-sm font-bold tracking-wide text-[#1E2B3C]">
              MICT
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FFDB58]">
                Central Computing Services
              </p>
              <h1 className="text-2xl font-bold leading-tight flex items-center gap-3">
                Departmental Secure Inbox
                {unreadCount > 0 && (
                  <span className="bg-[#dc2626] text-white text-xs px-2 py-1 rounded-full font-black">
                    {unreadCount} New
                  </span>
                )}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Inbox List */}
        <div className="lg:col-span-1 bg-white border border-[#DDD5BE] shadow-sm flex flex-col h-[80vh]">
          <div className="bg-[#FAF8F1] border-b border-[#DDD5BE] p-4 flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7F63] h-4 w-4" />
              <input
                type="text"
                placeholder="Search inbox..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-[#DDD5BE] focus:outline-none focus:border-[#008000]"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {inboxItems.map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleSelectDocument(doc)}
                className={`p-4 border-b border-[#EDE7D6] cursor-pointer transition ${selectedDoc?.id === doc.id ? "bg-[#1E2B3C] text-white" : doc.status === "UNREAD" ? "bg-white hover:bg-[#FAF8F1]" : "bg-[#FAF8F1] opacity-75 hover:opacity-100"}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 shrink-0">
                    {doc.securityLevel === "Confidential" ? (
                      <Lock
                        className={`h-5 w-5 ${selectedDoc?.id === doc.id ? "text-[#FFDB58]" : "text-[#dc2626]"}`}
                      />
                    ) : doc.status === "UNREAD" ? (
                      <Mail className="h-5 w-5 text-[#008000]" />
                    ) : (
                      <MailOpen className="h-5 w-5 text-[#8B7F63]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <p
                        className={`text-xs font-bold uppercase tracking-wider ${selectedDoc?.id === doc.id ? "text-[#B9C2CC]" : "text-[#8B7F63]"}`}
                      >
                        {doc.id}
                      </p>
                      {doc.urgency === "Urgent" && doc.status === "UNREAD" && (
                        <span className="text-[10px] font-black uppercase bg-[#dc2626] text-white px-1.5 rounded animate-pulse">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm font-bold truncate ${selectedDoc?.id === doc.id ? "text-white" : "text-[#1E2B3C]"}`}
                    >
                      {doc.title}
                    </p>
                    <p
                      className={`text-xs mt-1 flex items-center gap-1 ${selectedDoc?.id === doc.id ? "text-[#B9C2CC]" : "text-[#5B5240]"}`}
                    >
                      <Clock className="h-3 w-3" />{" "}
                      {doc.dispatchTime.split(",")[0]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Document Viewer */}
        <div className="lg:col-span-2">
          {receiptNotification && (
            <div className="mb-4 bg-[#008000] text-white p-4 flex items-start gap-3 shadow-md animate-in slide-in-from-top-2">
              <CheckCheck className="h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#FFDB58] mb-0.5">
                  Audit Trail Logged
                </p>
                <p className="text-sm font-medium">{receiptNotification}</p>
              </div>
            </div>
          )}

          {selectedDoc ? (
            <div className="bg-white border border-[#DDD5BE] shadow-sm h-[80vh] flex flex-col">
              {selectedDoc.urgency === "Urgent" && (
                <div className="bg-[#dc2626] text-white px-6 py-2 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider">
                  <AlertCircle className="h-4 w-4" /> Priority Action Required
                </div>
              )}
              <div className="bg-[#FAF8F1] border-b border-[#DDD5BE] p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-[#1E2B3C] leading-tight">
                    {selectedDoc.title}
                  </h2>
                  <div className="flex gap-2 shrink-0">
                    <button className="bg-white text-[#1E2B3C] border border-[#DDD5BE] px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-[#FAF8F1] transition cursor-pointer">
                      <Reply className="h-4 w-4" /> Reply & Attach
                    </button>
                    <button className="bg-[#1E2B3C] text-[#FFDB58] px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-[#26374C] transition cursor-pointer">
                      <Download className="h-4 w-4" /> Download
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8B7F63]">
                      Routed By
                    </p>
                    <p className="font-semibold text-[#1E2B3C]">
                      {selectedDoc.dispatchedBy}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8B7F63]">
                      Security / Category
                    </p>
                    <p className="font-semibold flex items-center gap-1 text-[#1E2B3C]">
                      {selectedDoc.securityLevel === "Confidential" && (
                        <Lock className="h-3 w-3 text-[#dc2626]" />
                      )}
                      {selectedDoc.securityLevel} · {selectedDoc.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-gray-200 p-8 flex items-center justify-center border-t border-[#DDD5BE] overflow-hidden">
                <div className="bg-white w-full max-w-lg h-full shadow-lg border border-gray-300 p-8 flex flex-col">
                  <div className="border-b-2 border-gray-800 pb-4 mb-6 flex justify-between items-end">
                    <div>
                      <h1 className="text-2xl font-serif font-bold">
                        MEMORANDUM
                      </h1>
                      <p className="text-sm font-serif mt-1">
                        Government of Zimbabwe
                      </p>
                    </div>
                    {selectedDoc.securityLevel === "Confidential" && (
                      <div className="border-2 border-red-600 text-red-600 px-2 py-1 text-xs font-black uppercase">
                        Confidential
                      </div>
                    )}
                  </div>
                  <div className="space-y-4 font-serif text-sm">
                    <p>
                      <strong>TO:</strong> Central Computing Services
                    </p>
                    <p>
                      <strong>SUBJECT:</strong> {selectedDoc.title}
                    </p>
                    <hr />
                    <p className="text-justify leading-relaxed mt-4">
                      Please review the attached parameters and append your
                      departmental approval to the routing chain.
                    </p>
                    <div className="h-4 w-3/4 bg-gray-200 mt-2 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 mt-2 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#DDD5BE] shadow-sm h-[80vh] flex flex-col items-center justify-center text-center p-8">
              <FileText className="h-16 w-16 text-[#DDD5BE] mb-4" />
              <h2 className="text-xl font-bold text-[#1E2B3C]">
                No Document Selected
              </h2>
              <p className="text-sm text-[#5B5240] mt-2 max-w-sm">
                Select a document from your inbox to view its contents. Unread
                documents trigger a read receipt.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* PIN Verification Modal */}
      {pinModalDoc && (
        <div className="fixed inset-0 bg-[#1E2B3C]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border-t-4 border-[#dc2626] shadow-2xl w-full max-w-sm overflow-hidden flex flex-col p-6 text-center animate-in zoom-in-95">
            <Lock className="h-10 w-10 text-[#dc2626] mx-auto mb-3" />
            <h2 className="text-lg font-bold text-[#1E2B3C]">
              Confidential Document
            </h2>
            <p className="text-sm text-[#5B5240] mt-1 mb-6">
              Enter your Department PIN to decrypt and access this payload.
            </p>
            <form onSubmit={handlePinSubmit}>
              <input
                type="password"
                required
                autoFocus
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (e.g., 1234)"
                className="w-full text-center tracking-[0.5em] p-3 text-lg font-bold border border-[#DDD5BE] bg-[#FAF8F1] focus:outline-none focus:border-[#dc2626] mb-4"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPinModalDoc(null)}
                  className="flex-1 py-3 text-sm font-bold text-[#5B5240] hover:bg-[#FAF8F1] border border-[#DDD5BE] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-sm font-bold text-white bg-[#dc2626] hover:bg-red-700 cursor-pointer"
                >
                  Decrypt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
