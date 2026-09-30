// src/data/mockData.js

export const registryStats = {
  totalFolders: 18452,
  availableInRegistry: 18210,
  currentlyCheckedOut: 242,
  overdue: 14,
};

export const folders = [
  {
    id: "ICT-REG-2026-8901",
    title: "National Broadband Expansion Tender",
    category: "Procurement",
    status: "Available",
    currentLocation: "Registry Vault B, Shelf 4",
    lastHandledBy: "T. Moyo (Registry Clerk)",
    lastUpdate: "2026-09-22T08:15:00Z",
    checkedOutTo: null,
    department: "Internal",
  },
  {
    id: "ICT-REG-2026-8902",
    title: "Q3 Telecom Licensing Audits",
    category: "Audit",
    status: "Checked Out",
    currentLocation: "External",
    lastHandledBy: "M. Sibanda (Registry Admin)",
    lastUpdate: "2026-09-20T14:30:00Z",
    checkedOutTo: {
      name: "Dr. A. Ndlovu",
      entity: "Ministry of Health",
      contact: "andlovu@health.gov.zw",
      expectedReturn: "2026-09-27",
    },
    department: "External Transfer",
  },
  {
    id: "ICT-REG-2026-8903",
    title: "Cybersecurity Policy Framework v2",
    category: "Policy",
    status: "Overdue",
    currentLocation: "External",
    lastHandledBy: "T. Moyo (Registry Clerk)",
    lastUpdate: "2026-09-01T09:00:00Z",
    checkedOutTo: {
      name: "Dir. S. Chigumba",
      entity: "Ministry of Finance",
      contact: "schigumba@finance.gov.zw",
      expectedReturn: "2026-09-15",
    },
    department: "External Transfer",
  },
  {
    id: "ICT-REG-2026-8904",
    title: "Server Maintenance Logs 2025",
    category: "Technical",
    status: "Available",
    currentLocation: "Registry Vault A, Shelf 1",
    lastHandledBy: "K. Mutasa (Archivist)",
    lastUpdate: "2026-09-21T16:45:00Z",
    checkedOutTo: null,
    department: "Internal",
  },
];

export const recentActivity = [
  {
    id: 1,
    action: "CHECK-OUT",
    folderId: "ICT-REG-2026-8902",
    target: "Ministry of Health",
    time: "2 days ago",
    clerk: "M. Sibanda",
  },
  {
    id: 2,
    action: "CHECK-IN",
    folderId: "ICT-REG-2026-8850",
    target: "Returned by Ministry of Education",
    time: "4 hours ago",
    clerk: "T. Moyo",
  },
  {
    id: 3,
    action: "AUDIT FLAG",
    folderId: "ICT-REG-2026-8903",
    target: "Overdue by 8 days",
    time: "1 hour ago",
    clerk: "System Auto",
  },
];
