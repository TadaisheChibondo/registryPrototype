import React, { useState } from "react";
import { registryStats, folders, recentActivity } from "../data/mockData";

export default function Dashboard({ onNavigate }) {
  const [tableFilter, setTableFilter] = useState("All");
  const activeRoutes = folders.filter((f) => f.checkedOutTo !== null);

  const displayedRoutes = activeRoutes.filter((folder) => {
    if (tableFilter === "All") return true;
    const edmsStatus = folder.status === "Overdue" ? "Unread" : "Dispatched";
    return edmsStatus === tableFilter;
  });

  return (
    <div className="min-h-screen bg-[#F2EEE3] font-sans">
      {/* Official Branded Header */}
      <header className="bg-[#008000] text-white border-b-4 border-[#FFDB58]">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* <div className="h-14 w-14 shrink-0 bg-white rounded-full border-2 border-[#FFDB58] flex items-center justify-center text-[10px] font-black text-[#008000] text-center leading-tight">
              ZIM
              <br />
              COAT
            </div> */}
            <img
              src="/coatOfArms.png"
              alt="Zimbabwe Coat of Arms"
              className="h-14 w-14 shrink-0 bg-white rounded-full border-2 border-[#FFDB58] object-contain p-1"
            />
            <div className="flex items-center gap-4 border-l border-white/30 pl-6">
              <div>
                <h1 className="text-2xl font-bold leading-tight">
                  Electronic Document Management
                </h1>
                <p className="text-sm text-green-100 mt-0.5">
                  Ministry of Information Communication Technology Postal and
                  Courier Services
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <input
                type="text"
                placeholder="Search digitized records..."
                className="w-64 bg-white/10 text-sm text-white placeholder:text-green-100 px-4 py-2.5 border border-white/20 focus:outline-none focus:border-[#FFDB58] transition"
              />
            </div>
            <button
              onClick={() => onNavigate("intake")}
              className="bg-[#1E2B3C] text-[#FFDB58] text-sm font-bold px-5 py-2.5 hover:bg-[#26374C] transition shadow-sm cursor-pointer"
            >
              Intake New Document
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* 1. EDMS HEALTH */}
        <div className="bg-white border border-[#DDD5BE] mb-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E4DECC] shadow-sm">
          <Stat
            label="Total Digitized Records"
            value={registryStats.totalFolders}
          />
          <Stat
            label="Routed Successfully"
            value={registryStats.availableInRegistry}
            tint="#166534"
          />
          <Stat
            label="Pending Read Receipts"
            value={registryStats.currentlyCheckedOut}
            tint="#8A6D00"
          />
          <Stat
            label="Urgent Unread Alerts"
            value={registryStats.overdue}
            tint={registryStats.overdue > 0 ? "#dc2626" : undefined}
            flag={registryStats.overdue > 0}
          />
        </div>

        {/* 2. ATTENTION REQUIRED */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            count={4}
            label="Urgent Unread"
            action="Filter unread"
            theme="danger"
            onClick={() => setTableFilter("Unread")}
          />
          <ActionCard
            count={7}
            label="Pending Receipts"
            action="Filter pending"
            theme="warning"
            onClick={() => setTableFilter("Dispatched")}
          />
          <ActionCard
            count={3}
            label="Drafts / Unrouted"
            action="Complete intake"
            theme="neutral"
            onClick={() => onNavigate("intake")}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* 3. ACTIVE ROUTING TABLE */}
          <div className="lg:col-span-2 bg-white border border-[#DDD5BE] shadow-sm flex flex-col">
            <div className="flex items-baseline justify-between px-6 pt-5 pb-4 border-b border-[#DDD5BE] bg-[#FAF8F1]">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-[#1E2B3C]">
                  Active Routing Status
                </h2>
                {tableFilter !== "All" && (
                  <button
                    onClick={() => setTableFilter("All")}
                    className="text-xs font-bold text-[#dc2626] bg-red-50 border border-[#dc2626] px-2 py-0.5 cursor-pointer"
                  >
                    Clear Filter: {tableFilter} x
                  </button>
                )}
              </div>
              <button
                onClick={() => onNavigate("repository")}
                className="text-sm font-semibold text-[#008000] hover:underline cursor-pointer"
              >
                View document repository
              </button>
            </div>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-sm font-semibold text-[#5B5240] border-b border-[#DDD5BE]">
                    <th className="font-semibold px-6 py-3">Tracking ID</th>
                    <th className="font-semibold py-3">Routed To</th>
                    <th className="font-semibold py-3">Status</th>
                    <th className="font-semibold py-3 pr-6 text-right">
                      Dispatch Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedRoutes.map((folder, i) => (
                    <tr
                      key={folder.id}
                      className={`hover:bg-[#F7F4EA] transition ${i !== displayedRoutes.length - 1 ? "border-b border-[#EDE7D6]" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-[#1E2B3C]">
                          {folder.id}
                        </p>
                        <p className="text-sm text-[#6B7280] truncate max-w-[220px]">
                          {folder.title}
                        </p>
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm font-semibold text-[#1E2B3C]">
                          {folder.checkedOutTo.entity}
                        </p>
                        <p className="text-sm text-[#6B7280]">
                          {folder.checkedOutTo.name}
                        </p>
                      </td>
                      <td className="py-4">
                        <StatusBadge
                          status={
                            folder.status === "Overdue"
                              ? "Unread"
                              : "Dispatched"
                          }
                        />
                      </td>
                      <td className="py-4 pr-6 text-right">
                        <p
                          className={`text-sm font-bold ${folder.status === "Overdue" ? "text-[#dc2626]" : "text-[#1E2B3C]"}`}
                        >
                          {new Date(
                            folder.checkedOutTo.expectedReturn,
                          ).toLocaleDateString()}
                        </p>
                      </td>
                    </tr>
                  ))}
                  {displayedRoutes.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-8 text-center text-sm font-bold text-[#8B7F63]"
                      >
                        No routed documents match the current filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. RECENT ACTIVITY */}
          <div className="bg-white border border-[#DDD5BE] shadow-sm flex flex-col">
            <div className="px-6 pt-5 pb-4 border-b border-[#DDD5BE] bg-[#FAF8F1]">
              <h2 className="text-lg font-bold text-[#1E2B3C]">
                System Activity Log
              </h2>
            </div>
            <div className="px-4 py-4 space-y-3 flex-1">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="border border-[#E4DECC] bg-white px-4 py-3"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <StatusDot status={activityStatus(activity.action)} />
                    <span className="text-sm font-bold text-[#1E2B3C]">
                      {activityStatus(activity.action)}
                    </span>
                  </div>
                  <div className="mb-1">
                    <span className="text-sm font-bold text-[#1E2B3C]">
                      {activity.folderId}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#374151] mb-2">
                    {formatActivityText(activity.action, activity.target)}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
                    <span>{activity.time}</span>
                    <span>·</span>
                    <span>{activity.clerk}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 border-t border-[#DDD5BE] text-sm font-semibold text-[#374151] hover:bg-[#F7F4EA] transition cursor-pointer">
              View full audit trail
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper components remain exactly the same
function Stat({ label, value, tint, flag }) {
  return (
    <div className="px-6 py-5">
      <p className="text-sm font-semibold text-[#5B5240] mb-1.5">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-3xl font-bold" style={{ color: tint ?? "#1E2B3C" }}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        {flag && <StatusDot status="Unread" />}
      </div>
    </div>
  );
}

function ActionCard({ count, label, action, theme, onClick }) {
  // Styles updated to remove 3D/colored backgrounds and enforce a solid white card with a colored border outline.
  const styles = {
    danger: {
      card: "border border-[#dc2626] bg-white text-[#dc2626]",
      dot: "#dc2626",
      count: "text-[#dc2626]",
      button: "text-[#dc2626] hover:text-red-800",
    },
    warning: {
      card: "border border-[#8A6D00] bg-white text-[#8A6D00]",
      dot: "#8A6D00",
      count: "text-[#8A6D00]",
      button: "text-[#8A6D00] hover:text-yellow-900",
    },
    neutral: {
      card: "border border-[#1E2B3C] bg-white text-[#1E2B3C]",
      dot: "#1E2B3C",
      count: "text-[#1E2B3C]",
      button: "text-[#1E2B3C] hover:text-[#008000]",
    },
  }[theme];

  return (
    <div
      onClick={onClick}
      className={`px-5 py-4 shadow-sm transition hover:shadow-md cursor-pointer flex flex-col justify-between gap-3 ${styles.card}`}
    >
      <div className="flex items-center gap-2">
        <StatusDot color={styles.dot} />
        <span className="text-sm font-bold tracking-wide uppercase">
          {label}
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <p className={`text-3xl font-black leading-none ${styles.count}`}>
          {count}
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick && onClick();
          }}
          className={`text-sm font-bold hover:underline whitespace-nowrap cursor-pointer ${styles.button}`}
        >
          {action} →
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#1E2B3C]">
      <StatusDot status={status} />
      <span>{status}</span>
    </span>
  );
}

function StatusDot({ status, color }) {
  const statusColors = {
    "Read Receipt": "#008000",
    Dispatched: "#8A6D00",
    Unread: "#dc2626",
    "Routing error": "#f1ab12",
  };
  return (
    <span
      aria-hidden="true"
      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
      style={{ backgroundColor: color ?? statusColors[status] ?? "#6B7280" }}
    />
  );
}

function activityStatus(action) {
  if (action === "CHECK-OUT") return "Dispatched";
  if (action === "CHECK-IN") return "Read Receipt";
  return "Routing error";
}

function formatActivityText(action, target) {
  if (action === "CHECK-OUT") return `Digitally routed to ${target}`;
  if (action === "CHECK-IN")
    return `Opened and viewed by ${target.replace(/^returned by\s+/i, "")}`;
  return `Failed to route: ${target}`;
}
