import React from "react";
import { registryStats, folders, recentActivity } from "../data/mockData";

export default function Dashboard({ onNavigate }) {
  const externalCheckouts = folders.filter((f) => f.checkedOutTo !== null);

  return (
    <div className="min-h-screen bg-[#F2EEE3] font-sans">
      {/* =========================================
          HEADER: Global Search & Scan 
          ========================================= */}
      <header className="bg-[#1E2B3C] text-[#F2EEE3]">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 shrink-0 bg-[#FFDB58] flex items-center justify-center text-sm font-bold tracking-wide text-[#1E2B3C]">
              MICT
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                Chain of Custody Registry
              </h1>
              <p className="text-sm text-[#B9C2CC] mt-0.5">
                Ministry of ICT · Central Records Division
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <input
                type="text"
                placeholder="Scan or enter tracking ID"
                className="w-64 bg-[#26374C] text-sm text-[#F2EEE3] placeholder:text-[#8B94A0] px-3 py-2.5 border border-[#3A4C63] focus:outline-none focus:border-[#FFDB58] transition"
              />
            </div>
            <button className="bg-[#008000] text-white text-sm font-semibold px-5 py-2.5 hover:bg-[#006b00] transition shadow-sm cursor-pointer">
              Log new check-out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* =========================================
            1. REGISTRY HEALTH
            ========================================= */}
        <div className="bg-white border border-[#DDD5BE] mb-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E4DECC] shadow-sm">
          <Stat label="Files tracked" value={registryStats.totalFolders} />
          <Stat
            label="Available in Storage"
            value={registryStats.availableInRegistry}
            tint="#166534"
          />
          <Stat
            label="Currently checked out"
            value={registryStats.currentlyCheckedOut}
            tint="#8A6D00"
          />
          <Stat
            label="Total Overdue"
            value={registryStats.overdue}
            tint={registryStats.overdue > 0 ? "#dc2626" : undefined}
            flag={registryStats.overdue > 0}
          />
        </div>

        {/* =========================================
            2. ATTENTION REQUIRED (The Daily Workflow)
            ========================================= */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            count={4}
            label="Overdue files"
            action="Review files"
            theme="danger"
            onClick={() => onNavigate && onNavigate("Overdue")}
          />
          <ActionCard
            count={7}
            label="Due today"
            action="Process returns"
            theme="warning"
            onClick={() => onNavigate && onNavigate("Checked Out")}
          />
          <ActionCard
            count={3}
            label="Missing / disputed"
            action="Resolve status"
            theme="neutral"
            onClick={() => onNavigate && onNavigate("Lost")}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* =========================================
              3. CURRENT CUSTODY
              ========================================= */}
          <div className="lg:col-span-2 bg-white border border-[#DDD5BE] shadow-sm flex flex-col">
            <div className="flex items-baseline justify-between px-6 pt-5 pb-4 border-b border-[#DDD5BE] bg-[#FAF8F1]">
              <h2 className="text-lg font-bold text-[#1E2B3C]">
                Current Custody
              </h2>
              <button
                onClick={() => onNavigate && onNavigate("All")}
                className="text-sm font-semibold text-[#008000] hover:underline cursor-pointer"
              >
                View full register
              </button>
            </div>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-sm font-semibold text-[#5B5240] border-b border-[#DDD5BE]">
                    <th className="font-semibold px-6 py-3">Tracking ID</th>
                    <th className="font-semibold py-3">In possession of</th>
                    <th className="font-semibold py-3">Status</th>
                    <th className="font-semibold py-3 pr-6 text-right">
                      Due back
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {externalCheckouts.map((folder, i) => (
                    <tr
                      key={folder.id}
                      className={`hover:bg-[#F7F4EA] transition ${
                        i !== externalCheckouts.length - 1
                          ? "border-b border-[#EDE7D6]"
                          : ""
                      }`}
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
                        <StatusBadge status={folder.status} />
                      </td>
                      <td className="py-4 pr-6 text-right">
                        <p
                          className={`text-sm font-bold ${
                            folder.status === "Overdue"
                              ? "text-[#dc2626]"
                              : "text-[#1E2B3C]"
                          }`}
                        >
                          {new Date(
                            folder.checkedOutTo.expectedReturn,
                          ).toLocaleDateString()}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* =========================================
              4. RECENT ACTIVITY
              ========================================= */}
          <div className="bg-white border border-[#DDD5BE] shadow-sm flex flex-col">
            <div className="px-6 pt-5 pb-4 border-b border-[#DDD5BE] bg-[#FAF8F1]">
              <h2 className="text-lg font-bold text-[#1E2B3C]">
                Recent Activity
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

        {/* =========================================
            5. REGISTRY INSIGHTS
            ========================================= */}
        <div className="bg-[#1E2B3C] border border-[#1E2B3C] text-white p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-bold text-[#FFDB58] tracking-wider uppercase mb-1">
              Weekly Insight
            </h3>
            <p className="text-sm font-medium text-[#B9C2CC]">
              Checkout volume is up <strong className="text-white">14%</strong>{" "}
              this week. The majority of requests originated from the{" "}
              <strong className="text-white">Ministry of Health</strong>.
            </p>
          </div>
          <button className="shrink-0 bg-[#26374C] border border-[#3A4C63] px-4 py-2 text-sm font-bold hover:bg-[#3A4C63] transition cursor-pointer">
            Generate Departmental Report
          </button>
        </div>
      </main>
    </div>
  );
}

// -------------------------------------------------------------
// HELPER COMPONENTS
// -------------------------------------------------------------

function Stat({ label, value, tint, flag }) {
  return (
    <div className="px-6 py-5">
      <p className="text-sm font-semibold text-[#5B5240] mb-1.5">{label}</p>
      <div className="flex items-center gap-2">
        <p
          className="text-3xl font-bold"
          style={{ color: tint ?? "#0e0e0de7" }}
        >
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        {flag && <StatusDot status="Overdue" />}
      </div>
    </div>
  );
}

function ActionCard({ count, label, action, theme, onClick }) {
  const styles = {
    danger: {
      card: "border-[#dc2626] border-l-4 bg-red-50/80 text-[#dc2626]",
      dot: "#dc2626",
      count: "text-[#dc2626]",
      button: "text-[#dc2626] hover:text-red-800",
    },
    warning: {
      card: "border-[#8A6D00] border-l-4 bg-yellow-50/80 text-[#8A6D00]",
      dot: "#8A6D00",
      count: "text-[#8A6D00]",
      button: "text-[#8A6D00] hover:text-yellow-900",
    },
    neutral: {
      card: "border-[#1E2B3C] border-l-4 bg-white text-[#1E2B3C]",
      dot: "#e46815",
      count: "text-[#1E2B3C]",
      button: "text-[#1E2B3C] hover:text-[#008000]",
    },
  }[theme];

  return (
    <div
      onClick={onClick}
      className={`border px-5 py-4 shadow-sm transition hover:shadow-md cursor-pointer flex flex-col justify-between gap-3 ${styles.card}`}
    >
      {/* Top Row: Dot + Single Clean Label */}
      <div className="flex items-center gap-2">
        <StatusDot color={styles.dot} />
        <span className="text-sm font-bold tracking-wide uppercase">
          {label}
        </span>
      </div>

      {/* Bottom Row: Large Count on Left, Non-Wrapping Action Link on Right */}
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
    Available: "#008000",
    "Checked Out": "#008000",
    Overdue: "#dc2626",
    "Checked out": "#008000",
    Returned: "#008000",
    "Audit flag": "#dc2626",
    "Due today": "#8A6D00",
    "Missing / disputed": "#f1ab12",
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
  if (action === "CHECK-OUT") return "Checked out";
  if (action === "CHECK-IN") return "Returned";
  return "Audit flag";
}

function formatActivityText(action, target) {
  if (action === "CHECK-OUT") {
    return `Checked out to ${target}`;
  }
  if (action === "CHECK-IN") {
    const cleaned = target.replace(/^returned by\s+/i, "");
    return `Returned by ${cleaned}`;
  }
  return `Flagged: ${target}`;
}
