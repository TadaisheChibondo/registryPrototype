import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import DocumentRepository from "./pages/DocumentRepository";
import IntakeWorkspace from "./pages/IntakeWorkspace";
import ManageRecords from "./pages/ManageRecords";
import DepartmentInbox from "./pages/DepartmentInbox";
import Login from "./pages/Login";
import {
  LayoutDashboard,
  LogOut,
  User,
  FolderCog,
  Inbox,
  FolderTree,
  UploadCloud,
} from "lucide-react";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleNavigate = (page) => {
    setActiveTab(page);
  };

  if (!currentUser) {
    return <Login onLogin={(user) => setCurrentUser(user)} />;
  }

  return (
    <div className="min-h-screen bg-[#F2EEE3] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-[#DDD5BE] px-8 py-3 flex justify-between items-center z-10 shadow-xs relative">
        <div className="flex gap-2">
          {/* 
            The Admin and Registry Clerk roles are now merged. 
            The Admin sees the Dashboard, Intake, Repository, and Manage tabs.
          */}
          {currentUser.role === "admin" && (
            <>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-[#1E2B3C] text-[#FFDB58]"
                    : "text-[#1E2B3C] hover:bg-[#FAF8F1]"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </button>
              <button
                onClick={() => setActiveTab("intake")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition cursor-pointer ${
                  activeTab === "intake"
                    ? "bg-[#1E2B3C] text-[#FFDB58]"
                    : "text-[#1E2B3C] hover:bg-[#FAF8F1]"
                }`}
              >
                <UploadCloud className="h-4 w-4" /> Intake & Routing
              </button>
              <button
                onClick={() => setActiveTab("repository")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition cursor-pointer ${
                  activeTab === "repository"
                    ? "bg-[#1E2B3C] text-[#FFDB58]"
                    : "text-[#1E2B3C] hover:bg-[#FAF8F1]"
                }`}
              >
                <FolderTree className="h-4 w-4" /> Repository
              </button>
              <button
                onClick={() => setActiveTab("manage")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition cursor-pointer ${
                  activeTab === "manage"
                    ? "bg-[#1E2B3C] text-[#FFDB58]"
                    : "text-[#1E2B3C] hover:bg-[#FAF8F1]"
                }`}
              >
                <FolderCog className="h-4 w-4" /> Manage
              </button>
            </>
          )}

          {/* Department Role sees only the Inbox */}
          {currentUser.role === "department" && (
            <div className="flex items-center gap-2 px-4 py-2 text-[#1E2B3C] font-bold">
              <Inbox className="h-5 w-5 text-[#008000]" /> Digital Inbox View
            </div>
          )}
        </div>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-4 border-l border-[#DDD5BE] pl-4">
          <div className="text-right">
            <p className="text-sm font-bold text-[#1E2B3C]">
              {currentUser.name}
            </p>
            <p className="text-xs text-[#5B5240] font-medium">
              {currentUser.department}
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentUser(null);
              setActiveTab("dashboard");
            }}
            className="text-[#5B5240] hover:text-[#dc2626] transition ml-1 p-2 hover:bg-red-50 cursor-pointer"
            title="Log Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Render active page based on role and tab */}
      <div className="flex-1">
        {currentUser.role === "department" ? (
          <DepartmentInbox />
        ) : activeTab === "dashboard" ? (
          <Dashboard onNavigate={handleNavigate} />
        ) : activeTab === "intake" ? (
          <IntakeWorkspace />
        ) : activeTab === "repository" ? (
          <DocumentRepository />
        ) : activeTab === "manage" ? (
          <ManageRecords />
        ) : null}
      </div>
    </div>
  );
}

export default App;
