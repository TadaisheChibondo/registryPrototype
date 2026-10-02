import React, { useState } from "react";
import {
  UploadCloud,
  FileText,
  Send,
  FolderOpen,
  CheckCircle2,
  Clock,
  RotateCcw,
  Building2,
  AlertCircle,
} from "lucide-react";

export default function IntakeWorkspace() {
  const [workflowStep, setWorkflowStep] = useState("UPLOAD"); // UPLOAD, ROUTE, RECEIPT
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dispatchReceipt, setDispatchReceipt] = useState(null);

  // Form State
  const [documentData, setDocumentData] = useState({
    title: "",
    category: "Administrative",
    folder: "General Correspondence",
    destination: "",
    urgency: "Standard",
  });

  // Simulated File Upload
  const handleSimulatedUpload = (e) => {
    e.preventDefault();
    // In a real app, this would handle the actual File object
    setUploadedFile({
      name: "scanned_document_001.pdf",
      size: "2.4 MB",
      type: "PDF Document",
    });
    setWorkflowStep("ROUTE");
  };

  const handleDispatch = (e) => {
    e.preventDefault();
    const now = new Date();

    setDispatchReceipt({
      id: `MICT-EDMS-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: now.toLocaleString(),
      title: documentData.title,
      destination: documentData.destination,
      status: "Dispatched & Pending Read Receipt",
    });
    setWorkflowStep("RECEIPT");
  };

  const resetWorkspace = () => {
    setUploadedFile(null);
    setDispatchReceipt(null);
    setDocumentData({
      title: "",
      category: "Administrative",
      folder: "General Correspondence",
      destination: "",
      urgency: "Standard",
    });
    setWorkflowStep("UPLOAD");
  };

  return (
    <div className="min-h-screen bg-[#F2EEE3] font-sans pb-16">
      {/* Top Banner */}
      <header className="bg-[#1E2B3C] text-[#F2EEE3] border-b-4 border-[#FFDB58]">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 shrink-0 bg-[#FFDB58] flex items-center justify-center text-sm font-bold tracking-wide text-[#1E2B3C]">
              MICT
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FFDB58]">
                Registry Digital Intake
              </p>
              <h1 className="text-2xl font-bold leading-tight">
                Document Scanning & Routing
              </h1>
            </div>
          </div>
          {workflowStep !== "UPLOAD" && (
            <button
              onClick={resetWorkspace}
              className="flex items-center gap-1.5 text-xs font-bold bg-[#26374C] hover:bg-[#3A4C63] text-[#F2EEE3] px-3 py-2 border border-[#3A4C63] transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Start New Intake
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-8">
        {/* ====================================================
            STEP 1: UPLOAD & DIGITIZE
            ==================================================== */}
        {workflowStep === "UPLOAD" && (
          <div className="bg-white border border-[#DDD5BE] shadow-sm p-8 text-center">
            <h2 className="text-xl font-bold text-[#1E2B3C] mb-2">
              Digitize Physical File
            </h2>
            <p className="text-sm text-[#5B5240] mb-8">
              Connect scanner or drag and drop a soft-copy file to begin the
              routing lifecycle.
            </p>

            <div
              className="border-2 border-dashed border-[#DDD5BE] bg-[#FAF8F1] rounded-lg p-12 flex flex-col items-center justify-center hover:bg-gray-50 transition cursor-pointer"
              onClick={handleSimulatedUpload}
            >
              <UploadCloud className="h-16 w-16 text-[#8B7F63] mb-4" />
              <p className="text-lg font-bold text-[#1E2B3C]">
                Click to Upload or Scan Document
              </p>
              <p className="text-sm text-[#8B7F63] mt-2">
                Supports PDF, DOCX, JPG (Max 50MB)
              </p>
              <button className="mt-6 bg-[#1E2B3C] text-[#FFDB58] px-6 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-[#26374C] transition">
                Simulate File Upload
              </button>
            </div>
          </div>
        )}

        {/* ====================================================
            STEP 2: CLASSIFY & ROUTE
            ==================================================== */}
        {workflowStep === "ROUTE" && uploadedFile && (
          <div className="bg-white border border-[#DDD5BE] shadow-sm">
            <div className="bg-[#FAF8F1] border-b border-[#DDD5BE] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-[#008000]" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#008000]">
                    Document Digitized Successfully
                  </p>
                  <p className="text-sm font-bold text-[#1E2B3C]">
                    {uploadedFile.name} ({uploadedFile.size})
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleDispatch} className="p-6 space-y-6">
              {/* Classification Section */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1E2B3C] mb-4 flex items-center gap-2 border-b border-[#DDD5BE] pb-2">
                  <FolderOpen className="h-4 w-4" /> 1. Record Classification
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1.5">
                      Document Title / Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Memo from President's Office regarding ICT Infrastructure"
                      value={documentData.title}
                      onChange={(e) =>
                        setDocumentData({
                          ...documentData,
                          title: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-[#DDD5BE] bg-white text-sm font-bold text-[#1E2B3C] focus:outline-none focus:border-[#008000]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1.5">
                      Category
                    </label>
                    <select
                      value={documentData.category}
                      onChange={(e) =>
                        setDocumentData({
                          ...documentData,
                          category: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-[#DDD5BE] bg-[#FAF8F1] text-sm font-semibold text-[#1E2B3C] focus:outline-none focus:border-[#008000]"
                    >
                      <option value="Administrative">Administrative</option>
                      <option value="Executive Directive">
                        Executive Directive
                      </option>
                      <option value="Procurement">Procurement</option>
                      <option value="Technical Specs">Technical Specs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1.5">
                      Target Folder / Directory
                    </label>
                    <select
                      value={documentData.folder}
                      onChange={(e) =>
                        setDocumentData({
                          ...documentData,
                          folder: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-[#DDD5BE] bg-[#FAF8F1] text-sm font-semibold text-[#1E2B3C] focus:outline-none focus:border-[#008000]"
                    >
                      <option value="General Correspondence">
                        General Correspondence
                      </option>
                      <option value="2026 Budget Approvals">
                        2026 Budget Approvals
                      </option>
                      <option value="Presidential Mandates">
                        Presidential Mandates
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Routing Section */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1E2B3C] mb-4 flex items-center gap-2 border-b border-[#DDD5BE] pb-2 mt-4">
                  <Send className="h-4 w-4" /> 2. Digital Routing & Dispatch
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-1.5">
                      Destination Department / Officer *
                    </label>
                    <select
                      required
                      value={documentData.destination}
                      onChange={(e) =>
                        setDocumentData({
                          ...documentData,
                          destination: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-[#DDD5BE] bg-white text-sm font-bold text-[#1E2B3C] focus:outline-none focus:border-[#008000]"
                    >
                      <option value="" disabled>
                        Select target destination...
                      </option>
                      <option value="Central Computing Services (Director)">
                        Central Computing Services (Director)
                      </option>
                      <option value="Cybersecurity Division">
                        Cybersecurity Division
                      </option>
                      <option value="Permanent Secretary Office">
                        Permanent Secretary Office
                      </option>
                    </select>
                  </div>
                </div>

                {/* Alert info block demonstrating the Read Receipt logic */}
                <div className="mt-4 bg-[#FAF8F1] border border-[#DDD5BE] p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-[#8A6D00] shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-[#1E2B3C]">
                      Automated Lifecycle Tracking Active
                    </p>
                    <p className="text-sm text-[#5B5240] mt-1">
                      Upon dispatch, this document will appear in the target
                      department's digital inbox. A read-receipt timestamp will
                      automatically trigger the moment they open the file.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DDD5BE]">
                <button
                  type="submit"
                  disabled={!documentData.destination || !documentData.title}
                  className="w-full bg-[#008000] hover:bg-[#006b00] disabled:opacity-50 text-white py-4 px-6 font-bold text-base uppercase tracking-wider transition flex items-center justify-center gap-3 shadow-sm cursor-pointer"
                >
                  <Send className="h-5 w-5" />
                  Dispatch Document Electronically
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ====================================================
            STEP 3: DISPATCH RECEIPT
            ==================================================== */}
        {workflowStep === "RECEIPT" && dispatchReceipt && (
          <div className="bg-white border-2 border-[#008000] shadow-md p-8">
            <div className="flex flex-col items-center justify-center text-center border-b border-[#DDD5BE] pb-6 mb-6">
              <div className="h-16 w-16 bg-[#008000] text-white flex items-center justify-center rounded-full mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#008000] mb-1">
                Routing Successful
              </p>
              <h2 className="text-2xl font-bold text-[#1E2B3C]">
                Document Dispatched
              </h2>
            </div>

            <div className="bg-[#FAF8F1] border border-[#E4DECC] p-6 space-y-4 mb-8">
              <div className="flex justify-between items-center border-b border-[#E4DECC] pb-3">
                <span className="text-sm font-bold uppercase text-[#8B7F63]">
                  Tracking ID
                </span>
                <span className="text-base font-black text-[#1E2B3C]">
                  {dispatchReceipt.id}
                </span>
              </div>
              <div className="flex justify-between items-start border-b border-[#E4DECC] pb-3">
                <span className="text-sm font-bold uppercase text-[#8B7F63]">
                  Subject
                </span>
                <span className="text-sm font-bold text-[#1E2B3C] text-right max-w-xs">
                  {dispatchReceipt.title}
                </span>
              </div>
              <div className="flex justify-between items-start border-b border-[#E4DECC] pb-3">
                <span className="text-sm font-bold uppercase text-[#8B7F63]">
                  Routed To
                </span>
                <span className="text-sm font-bold text-[#1E2B3C] flex items-center gap-1">
                  <Building2 className="h-4 w-4 text-[#8A6D00]" />{" "}
                  {dispatchReceipt.destination}
                </span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-sm font-bold uppercase text-[#8B7F63]">
                  Dispatch Time
                </span>
                <span className="text-sm font-bold text-[#1E2B3C] flex items-center gap-1">
                  <Clock className="h-4 w-4 text-[#008000]" />{" "}
                  {dispatchReceipt.timestamp}
                </span>
              </div>
            </div>

            <button
              onClick={resetWorkspace}
              className="w-full bg-[#1E2B3C] hover:bg-[#26374C] text-[#FFDB58] py-4 font-bold text-sm uppercase tracking-wider transition cursor-pointer"
            >
              Intake Next Document
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
