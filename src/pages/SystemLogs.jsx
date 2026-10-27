import React from "react";
import { Terminal, ShieldAlert, Activity, Wifi } from "lucide-react";

const auditLogs = [
  {
    time: "14:05:22",
    user: "T. Chibondo (Admin)",
    ip: "192.168.1.45",
    action: "AUTH_SUCCESS",
    target: "System Login",
    status: "200 OK",
  },
  {
    time: "13:42:11",
    user: "Dr. A. Ndlovu (Director)",
    ip: "10.0.0.12",
    action: "READ_RECEIPT",
    target: "DOC-8902",
    status: "200 OK",
  },
  {
    time: "13:30:05",
    user: "M. Sibanda (Registry)",
    ip: "192.168.1.18",
    action: "FILE_UPLOAD",
    target: "DOC-8902",
    status: "201 CREATED",
  },
  {
    time: "11:15:00",
    user: "Unknown",
    ip: "45.22.19.102",
    action: "AUTH_FAILED",
    target: "System Login",
    status: "401 UNAUTHORIZED",
  },
  {
    time: "09:22:41",
    user: "System Auto",
    ip: "localhost",
    action: "STATUS_UPDATE",
    target: "DOC-8903 (Overdue)",
    status: "200 OK",
  },
];

export default function SystemLogs() {
  return (
    <div className="min-h-screen bg-[#111827] font-mono text-green-400 pb-12">
      {/* Hacker/Terminal Style Header */}
      <header className="bg-[#1F2937] border-b border-gray-700 p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Terminal className="h-6 w-6 text-green-400" />
          <h1 className="text-lg font-bold tracking-widest uppercase">
            MICT Core Audit Server
          </h1>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <Activity className="h-4 w-4" /> Uptime: 99.9%
          </span>
          <span className="flex items-center gap-1 text-green-300">
            <Wifi className="h-4 w-4" /> Network: SECURE
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-6 flex items-center gap-2 text-yellow-500 bg-yellow-500/10 p-3 border border-yellow-500/20">
          <ShieldAlert className="h-5 w-5" />
          <p className="text-sm font-bold uppercase">
            Strict Confidentiality: These logs are immutable and cannot be
            deleted or altered by any user, including System Administrators.
          </p>
        </div>

        <div className="bg-[#1F2937] border border-gray-700 rounded shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#374151] text-gray-300">
                <tr>
                  <th className="px-6 py-3 font-bold">Timestamp</th>
                  <th className="px-6 py-3 font-bold">IP Address</th>
                  <th className="px-6 py-3 font-bold">User Identity</th>
                  <th className="px-6 py-3 font-bold">Action Vector</th>
                  <th className="px-6 py-3 font-bold">Target Object</th>
                  <th className="px-6 py-3 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {auditLogs.map((log, i) => (
                  <tr key={i} className="hover:bg-gray-800 transition">
                    <td className="px-6 py-4 text-gray-400">{log.time}</td>
                    <td className="px-6 py-4 text-blue-400">{log.ip}</td>
                    <td className="px-6 py-4 text-white">{log.user}</td>
                    <td className="px-6 py-4 text-purple-400">{log.action}</td>
                    <td className="px-6 py-4 text-gray-300">{log.target}</td>
                    <td
                      className={`px-6 py-4 text-right font-bold ${log.status.includes("401") ? "text-red-500" : "text-green-500"}`}
                    >
                      {log.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
