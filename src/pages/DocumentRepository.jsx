import React, { useState } from "react";
import {
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  ChevronDown,
  Search,
  Plus,
  MoreVertical,
  Download,
  Filter,
  X,
  UploadCloud,
} from "lucide-react";

// Simulated dynamic folder structure based on Ministry preferences
const initialTree = {
  Administration: {
    "Internal Memos": [
      {
        id: "DOC-8821",
        title: "Updated Leave Policy 2026",
        date: "Oct 1, 2026",
        size: "1.2 MB",
        type: "PDF",
      },
      {
        id: "DOC-8810",
        title: "Staff Directory Q4",
        date: "Sep 28, 2026",
        size: "450 KB",
        type: "XLSX",
      },
    ],
    "HR Records": [
      {
        id: "DOC-7732",
        title: "Performance Review Guidelines",
        date: "Sep 15, 2026",
        size: "2.1 MB",
        type: "PDF",
      },
    ],
  },
  "Finance & Procurement": {
    "2026 Budgets": [
      {
        id: "DOC-9943",
        title: "Q1 Approved ICT Budget",
        date: "Aug 10, 2026",
        size: "3.4 MB",
        type: "PDF",
      },
      {
        id: "DOC-9944",
        title: "Hardware Allocation Funds",
        date: "Aug 12, 2026",
        size: "1.1 MB",
        type: "PDF",
      },
    ],
    "Tender Documents": [],
  },
  "Technical Projects": {
    "Broadband Expansion": [
      {
        id: "DOC-5521",
        title: "Fiber Optic Layout Maps",
        date: "Sep 30, 2026",
        size: "14.5 MB",
        type: "PDF",
      },
    ],
    Cybersecurity: [],
  },
};

export default function DocumentRepository() {
  // Main state holding the dynamic repository tree
  const [repoTree, setRepoTree] = useState(initialTree);

  // UI States
  const [expandedCategories, setExpandedCategories] = useState({
    Administration: true,
    "Finance & Procurement": false,
    "Technical Projects": false,
  });
  const [activeCategory, setActiveCategory] = useState("Administration");
  const [activeFolder, setActiveFolder] = useState("Internal Memos");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Form Inputs
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [targetCategoryForFolder, setTargetCategoryForFolder] = useState("");
  const [uploadDocTitle, setUploadDocTitle] = useState("");

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSelectFolder = (category, folder) => {
    setActiveCategory(category);
    setActiveFolder(folder);
  };

  // --- Handlers for Modals ---
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setRepoTree((prev) => ({
      ...prev,
      [newCategoryName]: {},
    }));
    setExpandedCategories((prev) => ({
      ...prev,
      [newCategoryName]: true,
    }));

    setNewCategoryName("");
    setShowCategoryModal(false);
  };

  const handleAddFolder = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    setRepoTree((prev) => ({
      ...prev,
      [targetCategoryForFolder]: {
        ...prev[targetCategoryForFolder],
        [newFolderName]: [],
      },
    }));

    // Automatically navigate to the newly created folder
    setActiveCategory(targetCategoryForFolder);
    setActiveFolder(newFolderName);

    setNewFolderName("");
    setShowFolderModal(false);
  };

  const handleUploadDocument = (e) => {
    e.preventDefault();
    if (!uploadDocTitle.trim() || !activeFolder) return;

    const newFile = {
      id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: uploadDocTitle,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      type: "PDF",
    };

    setRepoTree((prev) => {
      const updatedTree = { ...prev };
      const folderContents = updatedTree[activeCategory][activeFolder] || [];
      updatedTree[activeCategory][activeFolder] = [newFile, ...folderContents];
      return updatedTree;
    });

    setUploadDocTitle("");
    setShowUploadModal(false);
  };

  // Safely get active files (handles newly created empty categories)
  const activeFiles = repoTree[activeCategory]?.[activeFolder] || [];

  const filteredFiles = activeFiles.filter(
    (file) =>
      file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F2EEE3] font-sans pb-12 flex flex-col relative">
      {/* Header */}
      <header className="bg-[#1E2B3C] text-[#F2EEE3] border-b-4 border-[#FFDB58]">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 shrink-0 bg-[#FFDB58] flex items-center justify-center text-sm font-bold tracking-wide text-[#1E2B3C]">
              MICT
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FFDB58]">
                Centralized Storage
              </p>
              <h1 className="text-2xl font-bold leading-tight">
                Master Document Repository
              </h1>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCategoryModal(true)}
              className="bg-[#26374C] hover:bg-[#3A4C63] text-white px-4 py-2 text-sm font-bold transition flex items-center gap-2 border border-[#3A4C63] cursor-pointer"
            >
              <Plus className="h-4 w-4" /> New Category
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              disabled={!activeFolder}
              className="bg-[#008000] hover:bg-[#006b00] disabled:opacity-50 text-white px-4 py-2 text-sm font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Upload Document
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 pt-8 flex gap-6">
        {/* =========================================
            LEFT SIDEBAR: The Organization Tree
            ========================================= */}
        <aside className="w-80 shrink-0 flex flex-col gap-4">
          <div className="bg-white border border-[#DDD5BE] shadow-sm overflow-hidden flex-1">
            <div className="bg-[#FAF8F1] border-b border-[#DDD5BE] px-4 py-3 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1E2B3C]">
                Organization Tree
              </h2>
              <Filter className="h-4 w-4 text-[#8B7F63]" />
            </div>

            <div className="p-2 overflow-y-auto max-h-[70vh]">
              {Object.keys(repoTree).map((category) => (
                <div key={category} className="mb-1">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between p-2 hover:bg-[#FAF8F1] transition rounded group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-[#1E2B3C] font-bold text-sm truncate">
                      {expandedCategories[category] ? (
                        <ChevronDown className="h-4 w-4 text-[#8B7F63] shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-[#8B7F63] shrink-0" />
                      )}
                      <span className="truncate">{category}</span>
                    </div>
                  </button>

                  {/* Folders inside Category */}
                  {expandedCategories[category] && (
                    <div className="ml-6 mt-1 flex flex-col gap-1 border-l border-[#E4DECC] pl-2">
                      {Object.keys(repoTree[category]).map((folder) => {
                        const isActive =
                          activeCategory === category &&
                          activeFolder === folder;
                        return (
                          <button
                            key={folder}
                            onClick={() => handleSelectFolder(category, folder)}
                            className={`flex items-center gap-2 w-full text-left p-2 text-sm font-medium transition rounded cursor-pointer ${
                              isActive
                                ? "bg-[#1E2B3C] text-[#FFDB58]"
                                : "text-[#5B5240] hover:bg-[#FAF8F1] hover:text-[#1E2B3C]"
                            }`}
                          >
                            {isActive ? (
                              <FolderOpen
                                className={`h-4 w-4 shrink-0 ${isActive ? "text-[#FFDB58]" : "text-[#8B7F63]"}`}
                              />
                            ) : (
                              <Folder
                                className={`h-4 w-4 shrink-0 ${isActive ? "text-[#FFDB58]" : "text-[#8B7F63]"}`}
                              />
                            )}
                            <span className="truncate">{folder}</span>
                          </button>
                        );
                      })}
                      <button
                        onClick={() => {
                          setTargetCategoryForFolder(category);
                          setShowFolderModal(true);
                        }}
                        className="flex items-center gap-2 w-full text-left p-2 text-xs font-bold text-[#008000] hover:underline mt-1 cursor-pointer"
                      >
                        <Plus className="h-3 w-3" /> Add Folder
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* =========================================
            RIGHT AREA: File Explorer
            ========================================= */}
        <section className="flex-1 flex flex-col gap-4">
          {/* Breadcrumbs & Search */}
          <div className="bg-white border border-[#DDD5BE] shadow-sm p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1E2B3C]">
              <span className="text-[#8B7F63] hover:underline cursor-pointer">
                {activeCategory}
              </span>
              {activeFolder && (
                <>
                  <ChevronRight className="h-4 w-4 text-[#8B7F63]" />
                  <span>{activeFolder}</span>
                </>
              )}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7F63] h-4 w-4" />
              <input
                type="text"
                placeholder={
                  activeFolder
                    ? `Search in ${activeFolder}...`
                    : "Select a folder..."
                }
                value={searchQuery}
                disabled={!activeFolder}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-72 pl-9 pr-3 py-2 text-sm border border-[#DDD5BE] bg-[#FAF8F1] focus:outline-none focus:border-[#008000] focus:bg-white transition disabled:opacity-50"
              />
            </div>
          </div>

          {/* Document Table */}
          <div className="bg-white border border-[#DDD5BE] shadow-sm flex-1 overflow-hidden flex flex-col">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAF8F1]">
                  <tr className="border-b border-[#DDD5BE] text-xs font-bold uppercase tracking-wider text-[#5B5240]">
                    <th className="px-6 py-4">Document Name</th>
                    <th className="px-6 py-4">Upload Date</th>
                    <th className="px-6 py-4">Size</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((file) => (
                    <tr
                      key={file.id}
                      className="border-b border-[#EDE7D6] hover:bg-[#F7F4EA] transition group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-[#dc2626] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-[#1E2B3C] group-hover:text-[#008000] transition cursor-pointer">
                              {file.title}
                            </p>
                            <p className="text-xs text-[#8B7F63] mt-0.5 font-mono">
                              {file.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#1E2B3C]">
                        {file.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#5B5240]">
                        {file.size}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                          <button
                            className="p-1.5 hover:bg-[#E4DECC] text-[#1E2B3C] rounded transition cursor-pointer"
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1.5 hover:bg-[#E4DECC] text-[#1E2B3C] rounded transition cursor-pointer"
                            title="More Options"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredFiles.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <FolderOpen className="h-12 w-12 text-[#DDD5BE] mb-3" />
                          <p className="text-sm font-bold text-[#5B5240]">
                            {activeFolder
                              ? "This folder is currently empty."
                              : "No folder selected."}
                          </p>
                          <p className="text-xs text-[#8B7F63] mt-1">
                            {activeFolder
                              ? "Upload documents or drag them here to organize."
                              : "Select a folder from the sidebar to view documents."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================
          MODALS
          ========================================= */}

      {/* New Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-[#1E2B3C]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#DDD5BE] shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="bg-[#1E2B3C] p-4 flex justify-between items-center text-[#F2EEE3]">
              <h2 className="text-lg font-bold">Create New Category</h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-[#B9C2CC] hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="p-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-2">
                Category Name
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="e.g., Legal Department"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full p-3 border border-[#DDD5BE] bg-[#FAF8F1] text-sm font-bold text-[#1E2B3C] focus:outline-none focus:border-[#008000]"
              />
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="flex-1 px-4 py-2 border border-[#DDD5BE] text-sm font-bold text-[#5B5240] hover:bg-[#FAF8F1] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#008000] text-white px-4 py-2 text-sm font-bold hover:bg-[#006b00] cursor-pointer"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Folder Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 bg-[#1E2B3C]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#DDD5BE] shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="bg-[#1E2B3C] p-4 flex justify-between items-center text-[#F2EEE3]">
              <h2 className="text-lg font-bold">
                Add Folder to {targetCategoryForFolder}
              </h2>
              <button
                onClick={() => setShowFolderModal(false)}
                className="text-[#B9C2CC] hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddFolder} className="p-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-2">
                Folder Name
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="e.g., 2026 Audit Reports"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full p-3 border border-[#DDD5BE] bg-[#FAF8F1] text-sm font-bold text-[#1E2B3C] focus:outline-none focus:border-[#008000]"
              />
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowFolderModal(false)}
                  className="flex-1 px-4 py-2 border border-[#DDD5BE] text-sm font-bold text-[#5B5240] hover:bg-[#FAF8F1] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#008000] text-white px-4 py-2 text-sm font-bold hover:bg-[#006b00] cursor-pointer"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-[#1E2B3C]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#DDD5BE] shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="bg-[#1E2B3C] p-4 flex justify-between items-center text-[#F2EEE3]">
              <h2 className="text-lg font-bold">Upload to {activeFolder}</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-[#B9C2CC] hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleUploadDocument} className="p-6">
              <div className="border-2 border-dashed border-[#DDD5BE] bg-[#FAF8F1] rounded-lg p-6 flex flex-col items-center justify-center mb-4">
                <UploadCloud className="h-10 w-10 text-[#8B7F63] mb-2" />
                <p className="text-sm font-bold text-[#1E2B3C]">
                  Select file to upload
                </p>
                <p className="text-xs text-[#8B7F63] mt-1">
                  PDF, DOCX, XLSX (Max 10MB)
                </p>
              </div>

              <label className="block text-xs font-bold uppercase tracking-wider text-[#5B5240] mb-2">
                Document Title
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="e.g., Q1 Risk Assessment"
                value={uploadDocTitle}
                onChange={(e) => setUploadDocTitle(e.target.value)}
                className="w-full p-3 border border-[#DDD5BE] bg-[#FAF8F1] text-sm font-bold text-[#1E2B3C] focus:outline-none focus:border-[#008000]"
              />
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-[#DDD5BE] text-sm font-bold text-[#5B5240] hover:bg-[#FAF8F1] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#008000] text-white px-4 py-2 text-sm font-bold hover:bg-[#006b00] cursor-pointer"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
