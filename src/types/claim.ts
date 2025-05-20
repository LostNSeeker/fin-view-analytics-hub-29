export type ClaimStatus = "pending" | "approved" | "rejected" | "inReview" | "Completed" | "Approved" | "In Progress" |"completed" |"Pending" |'"Completed"';

export type ClaimPriority = "Low" | "Medium" | "High";

export interface Customer {
  id: number;
  name: string;
  city: string;
  phone: string;
  email: string;
}

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  yearsExperience: number;
  hireDate: string;
}

export interface PolicyType {
  id: number;
  name: string;
  basePremium: number;
  description: string;
}

export interface Documentation {
  photoEvidence: boolean;
  estimateProvided: boolean;
  policeReport: boolean;
  contractorReport: boolean;
}

export interface Claim {
  claimId: string;
  policyId: string;
  clientName: string;
  assignedEmployee: string;
  status: ClaimStatus;
  priority: ClaimPriority;
  claimAmount: number;
  incidentDate: string;
  details: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  employee: Employee;
  policyType: PolicyType;
  documentation: Documentation;
  
  // Legacy fields for backward compatibility (optional)
  title?: string;
  description?: string;
  dateFiled?: string | Date;
  lastUpdated?: string | Date;
  reportNo?: string;
  insurer?: string;
  insured?: string;
  surveyor?: string;
}

export interface ClaimDocument {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  dateModified: string | Date;
  url: string;
  uploadedBy?: string;
}

export interface ClaimEvent {
  date: string | Date;
  title: string;
  description: string;
  user?: string;
}

// Additional types for filtering
export interface ClaimFilters {
  policyNumber?: string;
  customerName?: string;
  employee?: string;
  status?: ClaimStatus;
  priority?: ClaimPriority;
  dateFrom?: string;
  dateTo?: string;
}

// Type for the API response
export interface ClaimApiResponse {
  data: Claim[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}