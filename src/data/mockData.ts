
import { Claim, ClaimDocument, ClaimEvent } from "@/types/claim";

// Mock claims data
export const mockClaims: Claim[] = [
  {
    claimId: "CLM-2023-001",
    title: "Auto Accident - Front End Collision",
    description: "Client was involved in a front-end collision on Highway 20. Vehicle sustained significant damage to the front bumper, hood, and radiator.",
    status: "pending",
    clientName: "Robert Johnson",
    assignedEmployee: "Sarah Chen",
    dateFiled: "2023-05-10T14:23:00",
    lastUpdated: "2023-05-15T09:48:00",
    policyId: "POL-AUT-42531",
    reportNo: "RPT-2023-125",
    insurer: "SafeDrive Insurance Co.",
    insured: "Robert Johnson"
  },
  {
    claimId: "CLM-2023-002",
    title: "Home Damage - Storm",
    description: "Storm damage to roof and water damage to ceiling and walls in living room and kitchen.",
    status: "inReview",
    clientName: "Emily Williams",
    assignedEmployee: "David Martinez",
    dateFiled: "2023-05-05T10:15:00",
    lastUpdated: "2023-05-16T11:30:00",
    policyId: "POL-HOM-78942",
    reportNo: "RPT-2023-126",
    insurer: "HomeShield Insurance",
    insured: "Emily Williams"
  },
  {
    claimId: "CLM-2023-003",
    title: "Medical Claim - Surgery",
    description: "Scheduled surgery for knee replacement. Pre-approval requested.",
    status: "approved",
    clientName: "Thomas Brown",
    assignedEmployee: "Jennifer Lee",
    dateFiled: "2023-04-28T09:20:00",
    lastUpdated: "2023-05-10T14:45:00",
    policyId: "POL-MED-65823",
    reportNo: "RPT-2023-118",
    insurer: "HealthFirst Insurance",
    insured: "Thomas Brown"
  },
  {
    claimId: "CLM-2023-004",
    title: "Business Interruption Claim",
    description: "Business operations halted due to flooding in commercial property. Claiming lost revenue and cleanup costs.",
    status: "rejected",
    clientName: "Global Retail Inc.",
    assignedEmployee: "Michael Wong",
    dateFiled: "2023-04-20T15:10:00",
    lastUpdated: "2023-05-12T16:30:00",
    policyId: "POL-BUS-12789",
    reportNo: "RPT-2023-112",
    insurer: "BusinessGuard Insurance",
    insured: "Global Retail Inc.",
    surveyor: "Alan Peterson"
  },
  {
    claimId: "CLM-2023-005",
    title: "Travel Insurance - Canceled Trip",
    description: "Trip canceled due to illness. Seeking reimbursement for non-refundable bookings.",
    status: "approved",
    clientName: "Laura Davis",
    assignedEmployee: "Robert Taylor",
    dateFiled: "2023-04-15T11:05:00",
    lastUpdated: "2023-05-01T09:20:00",
    policyId: "POL-TRV-35761",
    reportNo: "RPT-2023-107",
    insurer: "TravelSafe Insurance",
    insured: "Laura Davis"
  },
  {
    claimId: "CLM-2023-006",
    title: "Auto Theft - Complete Vehicle",
    description: "Vehicle stolen from shopping mall parking lot. Police report filed.",
    status: "inReview",
    clientName: "James Wilson",
    assignedEmployee: "Sarah Chen",
    dateFiled: "2023-05-08T16:40:00",
    lastUpdated: "2023-05-14T10:15:00",
    policyId: "POL-AUT-52387",
    reportNo: "RPT-2023-124",
    insurer: "SafeDrive Insurance Co.",
    insured: "James Wilson",
    surveyor: "Carlos Rodriguez"
  },
  {
    claimId: "CLM-2023-007",
    title: "Property Damage - Fallen Tree",
    description: "Large oak tree fell during storm, damaging garage and fence.",
    status: "pending",
    clientName: "Patricia Moore",
    assignedEmployee: "David Martinez",
    dateFiled: "2023-05-12T08:30:00",
    lastUpdated: "2023-05-12T14:20:00",
    policyId: "POL-HOM-63412",
    reportNo: "RPT-2023-127",
    insurer: "HomeShield Insurance",
    insured: "Patricia Moore"
  },
  {
    claimId: "CLM-2023-008",
    title: "Workers Comp - Back Injury",
    description: "Employee injured back while lifting heavy equipment at warehouse.",
    status: "pending",
    clientName: "Harris Manufacturing Ltd.",
    assignedEmployee: "Jennifer Lee",
    dateFiled: "2023-05-11T13:45:00",
    lastUpdated: "2023-05-11T15:50:00",
    policyId: "POL-WRK-28945",
    reportNo: "RPT-2023-126",
    insurer: "WorkerProtect Insurance",
    insured: "Harris Manufacturing Ltd."
  }
];

// Mock claim documents
export const mockDocuments: Record<string, ClaimDocument[]> = {
  "CLM-2023-001": [
    {
      id: "DOC-001-1",
      fileName: "Police Report.pdf",
      fileSize: 1245000,
      fileType: "application/pdf",
      dateModified: "2023-05-10T15:30:00",
      url: "/placeholder.svg"
    },
    {
      id: "DOC-001-2",
      fileName: "Damage Photo 1.jpg",
      fileSize: 2800000,
      fileType: "image/jpeg",
      dateModified: "2023-05-10T14:35:00",
      url: "/placeholder.svg"
    },
    {
      id: "DOC-001-3",
      fileName: "Repair Estimate.docx",
      fileSize: 458000,
      fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      dateModified: "2023-05-15T09:45:00",
      url: "/placeholder.svg",
      uploadedBy: "Sarah Chen"
    }
  ],
  "CLM-2023-002": [
    {
      id: "DOC-002-1",
      fileName: "Roof Damage Photo.jpg",
      fileSize: 3200000,
      fileType: "image/jpeg",
      dateModified: "2023-05-05T10:25:00",
      url: "/placeholder.svg"
    },
    {
      id: "DOC-002-2",
      fileName: "Water Damage Report.pdf",
      fileSize: 1850000,
      fileType: "application/pdf",
      dateModified: "2023-05-16T11:25:00",
      url: "/placeholder.svg",
      uploadedBy: "David Martinez"
    }
  ]
};

// Mock claim timeline events
export const mockEvents: Record<string, ClaimEvent[]> = {
  "CLM-2023-001": [
    {
      date: "2023-05-10T14:23:00",
      title: "Claim Created",
      description: "Claim was filed by Robert Johnson",
      user: "Robert Johnson"
    },
    {
      date: "2023-05-10T16:45:00",
      title: "Documents Uploaded",
      description: "Police report and damage photos were uploaded",
      user: "Robert Johnson"
    },
    {
      date: "2023-05-11T09:10:00",
      title: "Claim Assigned",
      description: "Claim assigned to Sarah Chen",
      user: "System"
    },
    {
      date: "2023-05-15T09:48:00",
      title: "Status Updated",
      description: "Status changed from 'New' to 'Pending'",
      user: "Sarah Chen"
    }
  ],
  "CLM-2023-002": [
    {
      date: "2023-05-05T10:15:00",
      title: "Claim Created",
      description: "Claim was filed by Emily Williams",
      user: "Emily Williams"
    },
    {
      date: "2023-05-06T11:20:00",
      title: "Claim Assigned",
      description: "Claim assigned to David Martinez",
      user: "System"
    },
    {
      date: "2023-05-10T14:30:00",
      title: "Surveyor Assigned",
      description: "Surveyor John Davies assigned to inspect property",
      user: "David Martinez"
    },
    {
      date: "2023-05-16T11:30:00",
      title: "Status Updated",
      description: "Status changed from 'Pending' to 'In Review' after surveyor report received",
      user: "David Martinez"
    }
  ]
};

// Dashboard stats
export const dashboardStats = {
  totalClaims: 128,
  pendingClaims: 42,
  approvedClaims: 64,
  rejectedClaims: 15,
  inReviewClaims: 7,
  averageProcessingDays: 5.2,
  claimsTrend: 12.5, // Percentage increase from last month
};

// Status chart data
export const statusChartData = {
  weekly: [
    { name: "Pending", value: 12, color: "#F59E0B" },
    { name: "Approved", value: 18, color: "#10B981" },
    { name: "Rejected", value: 4, color: "#EF4444" },
    { name: "In Review", value: 2, color: "#6366F1" }
  ],
  monthly: [
    { name: "Pending", value: 42, color: "#F59E0B" },
    { name: "Approved", value: 64, color: "#10B981" },
    { name: "Rejected", value: 15, color: "#EF4444" },
    { name: "In Review", value: 7, color: "#6366F1" }
  ],
  yearly: [
    { name: "Pending", value: 156, color: "#F59E0B" },
    { name: "Approved", value: 342, color: "#10B981" },
    { name: "Rejected", value: 87, color: "#EF4444" },
    { name: "In Review", value: 24, color: "#6366F1" }
  ]
};
