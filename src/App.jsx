import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import RegistryTable from "./pages/RegistryTable";
import ClerkPortal from "./pages/ClerkPortal";
import ManageRecords from "./pages/ManageRecords"; // Add this import
import Login from "./pages/Login";
import { LayoutDashboard, Table, LogOut, User, FolderCog } from "lucide-react"; // Import FolderCog

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeFilter, setActiveFilter] = useState("All");

  const handleNavigateWithFilter = (filterStatus) => {
    setActiveFilter(filterStatus);
    setActiveTab("registry");
  };

  if (!currentUser) {
    return <Login onLogin={(user) => setCurrentUser(user)} />;
  }

  return (
    <div className="min-h-screen bg-[#F2EEE3] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-[#DDD5BE] px-8 py-3 flex justify-between items-center z-10 shadow-xs relative">
        <div className="flex gap-2">
          {currentUser.role === "admin" ? (
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
                onClick={() => {
                  setActiveFilter("All");
                  setActiveTab("registry");
                }}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition cursor-pointer ${
                  activeTab === "registry"
                    ? "bg-[#1E2B3C] text-[#FFDB58]"
                    : "text-[#1E2B3C] hover:bg-[#FAF8F1]"
                }`}
              >
                <Table className="h-4 w-4" /> Registry Directory
              </button>

              {/* NEW MANAGE RECORDS BUTTON */}
              <button
                onClick={() => setActiveTab("manage")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition cursor-pointer ${
                  activeTab === "manage"
                    ? "bg-[#1E2B3C] text-[#FFDB58]"
                    : "text-[#1E2B3C] hover:bg-[#FAF8F1]"
                }`}
              >
                <FolderCog className="h-4 w-4" /> Manage Records
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 text-[#1E2B3C] font-bold">
              Ministry of ICT · Front Desk Portal
            </div>
          )}
        </div>

        {/* Right side: User Profile & Logout */}
        <div className="flex items-center gap-4 border-l border-[#DDD5BE] pl-4">
          <div className="text-right">
            <p className="text-sm font-bold text-[#1E2B3C]">
              {currentUser.name}
            </p>
            <p className="text-xs text-[#5B5240] font-medium">
              {currentUser.department}
            </p>
          </div>
          <div className="h-9 w-9 bg-[#FAF8F1] flex items-center justify-center text-[#1E2B3C] border border-[#DDD5BE]">
            <User className="h-4 w-4" />
          </div>
          <button
            onClick={() => {
              setCurrentUser(null);
              setActiveTab("dashboard");
              setActiveFilter("All");
            }}
            className="text-[#5B5240] hover:text-[#dc2626] transition ml-1 p-2 hover:bg-red-50 cursor-pointer"
            title="Log Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Render active page based on role */}
      <div className="flex-1">
        {currentUser.role === "clerk" ? (
          <ClerkPortal />
        ) : activeTab === "dashboard" ? (
          <Dashboard onNavigate={handleNavigateWithFilter} />
        ) : activeTab === "manage" ? (
          <ManageRecords />
        ) : (
          <RegistryTable initialFilter={activeFilter} />
        )}
      </div>
    </div>
  );
}

export default App;
