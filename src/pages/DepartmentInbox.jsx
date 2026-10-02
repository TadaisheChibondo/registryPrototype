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
  Filter,
  Search,
  X,
} from "lucide-react";

// Mock data representing documents routed to Central Computing Services
const initialInbox = [
  {
    id: `MICT-EDMS-${Math.floor(100000 + Math.random() * 900000)}`, // Simulating the one just sent
    title: "Memo from President's Office regarding ICT Infrastructure",
    category: "Executive Directive",
    dispatchedBy: "Central Registry",
    dispatchTime: new Date(Date.now() - 1000 * 60 * 15).toLocaleString(), // 15 mins ago
    status: "UNREAD",
    readTime: null,
    urgency: "High",
  },
  {
    id: "MICT-EDMS-883921",
    title: "Q3 Departmental Hardware Audit Requirements",
    category: "Administrative",
    dispatchedBy: "Central Registry",
    dispatchTime: new Date(Date.now() - 1000 * 60 * 60 * 48).toLocaleString(), // 2 days ago
    status: "READ",
    readTime: new Date(Date.now() - 1000 * 60 * 60 * 47).toLocaleString(),
    urgency: "Standard",
  },
];

export default function DepartmentInbox() {
  const [inboxItems, setInboxItems] = useState(initialInbox);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [receiptNotification, setReceiptNotification] = useState(null);

  const handleViewDocument = (doc) => {
    const now = new Date().toLocaleString();

    // If it's the first time opening it, trigger the Read Receipt
    if (doc.status === "UNREAD") {
      const updatedDoc = { ...doc, status: "READ", readTime: now };

      setInboxItems((prev) =>
        prev.map((item) => (item.id === doc.id ? updatedDoc : item)),
      );
      setSelectedDoc(updatedDoc);

      // Flash a notification to prove the system logged the read receipt
      setReceiptNotification(
        `Read receipt for ${doc.id} logged and transmitted to Central Registry at ${now}`,
      );
      setTimeout(() => setReceiptNotification(null), 6000);
    } else {
      setSelectedDoc(doc);
    }
  };

  const unreadCount = inboxItems.filter((i) => i.status === "UNREAD").length;

  return (
    <div className="min-h-screen bg-[#F2EEE3] font-sans pb-16">
      {/* Top Banner */}
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
        {/* ====================================================
            LEFT COLUMN: Inbox List
            ==================================================== */}
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
            <div className="flex gap-2">
              <button className="flex-1 bg-[#1E2B3C] text-[#FFDB58] text-xs font-bold uppercase tracking-wider py-2">
                All
              </button>
              <button className="flex-1 bg-white border border-[#DDD5BE] text-[#5B5240] text-xs font-bold uppercase tracking-wider py-2 hover:bg-[#FAF8F1]">
                Unread
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {inboxItems.map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleViewDocument(doc)}
                className={`p-4 border-b border-[#EDE7D6] cursor-pointer transition ${
                  selectedDoc?.id === doc.id
                    ? "bg-[#1E2B3C] text-white" // Active selection state
                    : doc.status === "UNREAD"
                      ? "bg-white hover:bg-[#FAF8F1]" // Unread state
                      : "bg-[#FAF8F1] opacity-75 hover:opacity-100" // Read state
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 shrink-0">
                    {doc.status === "UNREAD" ? (
                      <Mail
                        className={`h-5 w-5 ${selectedDoc?.id === doc.id ? "text-[#FFDB58]" : "text-[#008000]"}`}
                      />
                    ) : (
                      <MailOpen
                        className={`h-5 w-5 ${selectedDoc?.id === doc.id ? "text-[#B9C2CC]" : "text-[#8B7F63]"}`}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <p
                        className={`text-xs font-bold uppercase tracking-wider ${selectedDoc?.id === doc.id ? "text-[#B9C2CC]" : "text-[#8B7F63]"}`}
                      >
                        {doc.id}
                      </p>
                      {doc.urgency === "High" && doc.status === "UNREAD" && (
                        <span
                          className="h-2 w-2 rounded-full bg-[#dc2626]"
                          title="High Urgency"
                        />
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

        {/* ====================================================
            RIGHT COLUMN: Document Viewer
            ==================================================== */}
        <div className="lg:col-span-2">
          {/* Notification Toast */}
          {receiptNotification && (
            <div className="mb-4 bg-[#008000] text-white p-4 flex items-start gap-3 shadow-md animate-in slide-in-from-top-2">
              <CheckCheck className="h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#FFDB58] mb-0.5">
                  Automated Action Logged
                </p>
                <p className="text-sm font-medium">{receiptNotification}</p>
              </div>
            </div>
          )}

          {selectedDoc ? (
            <div className="bg-white border border-[#DDD5BE] shadow-sm h-[80vh] flex flex-col">
              {/* Document Header Info */}
              <div className="bg-[#FAF8F1] border-b border-[#DDD5BE] p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-[#1E2B3C] leading-tight">
                    {selectedDoc.title}
                  </h2>
                  <button className="bg-[#1E2B3C] text-[#FFDB58] px-4 py-2 text-sm font-bold flex items-center gap-2 hover:bg-[#26374C] transition shrink-0 cursor-pointer">
                    <Download className="h-4 w-4" /> Download PDF
                  </button>
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
                      Category
                    </p>
                    <p className="font-semibold text-[#1E2B3C]">
                      {selectedDoc.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8B7F63]">
                      Dispatched
                    </p>
                    <p className="font-semibold text-[#1E2B3C]">
                      {selectedDoc.dispatchTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8B7F63]">
                      Read Receipt
                    </p>
                    <p className="font-bold text-[#008000] flex items-center gap-1">
                      <CheckCheck className="h-4 w-4" /> {selectedDoc.readTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulated PDF Viewer Area */}
              <div className="flex-1 bg-gray-200 p-8 flex items-center justify-center border-t border-[#DDD5BE] overflow-hidden">
                <div className="bg-white w-full max-w-lg h-full shadow-lg border border-gray-300 p-8 flex flex-col">
                  {/* Fake Document Content */}
                  <div className="border-b-2 border-gray-800 pb-4 mb-6 flex justify-between items-end">
                    <div>
                      <h1 className="text-2xl font-serif font-bold">
                        MEMORANDUM
                      </h1>
                      <p className="text-sm font-serif mt-1">
                        Government of Zimbabwe
                      </p>
                    </div>
                    <div className="h-12 w-12 border-2 border-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">SEAL</span>
                    </div>
                  </div>
                  <div className="space-y-4 font-serif text-sm">
                    <p>
                      <strong>TO:</strong> Director, Central Computing Services
                    </p>
                    <p>
                      <strong>FROM:</strong> President's Office
                    </p>
                    <p>
                      <strong>DATE:</strong>{" "}
                      {selectedDoc.dispatchTime.split(",")[0]}
                    </p>
                    <p>
                      <strong>SUBJECT:</strong> {selectedDoc.title}
                    </p>
                    <hr />
                    <p className="text-justify leading-relaxed mt-4">
                      This memorandum serves as an official directive regarding
                      the imminent expansion of ICT infrastructure across
                      provincial registries. You are hereby requested to
                      evaluate the attached technical requirements...
                    </p>
                    <div className="h-4 w-3/4 bg-gray-200 mt-2 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 mt-2 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-200 mt-2 rounded"></div>
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
                documents will automatically trigger a read receipt to the
                sender upon viewing.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
