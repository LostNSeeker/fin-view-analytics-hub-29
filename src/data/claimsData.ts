
import { DocumentType, FilterOption } from "../types/document";

// Document data
export const documentsData: DocumentType[] = [
  {
    id: 'DOC-2025-001',
    reportNo: 'REP-001',
    claimId: 'CLM-2025-001',
    title: 'Auto Insurance Policy',
    type: 'Policy',
    thumbnail: '/lovable-uploads/30159273-4f03-406e-aa58-c934d8e402c4.png',
    client: 'Acme Insurance Corp',
    insurer: 'Global Insurance Ltd',
    insured: 'John Smith',
    surveyer: 'Robert Johnson',
    dateOfDeputation: '2025-03-15',
    status: 'Active',
    fileSize: '2.4 MB',
    dateModified: '2025-04-18',
  },
  {
    id: 'DOC-2025-002',
    reportNo: 'REP-002',
    claimId: 'CLM-2025-002',
    title: 'Property Damage Claim',
    type: 'Claim',
    thumbnail: '/lovable-uploads/30159273-4f03-406e-aa58-c934d8e402c4.png',
    client: 'Global Protect Inc',
    insurer: 'SafeGuard Insurers',
    insured: 'Emily Williams',
    surveyer: 'Michael Brown',
    dateOfDeputation: '2025-03-18',
    status: 'Pending',
    fileSize: '5.8 MB',
    dateModified: '2025-04-15',
  },
  {
    id: 'DOC-2025-003',
    reportNo: 'REP-003',
    claimId: 'CLM-2025-003',
    title: 'Business Liability Contract',
    type: 'Contract',
    thumbnail: '/lovable-uploads/30159273-4f03-406e-aa58-c934d8e402c4.png',
    client: 'SafeGuard Ltd',
    insurer: 'Premium Insurance Co',
    insured: 'Tech Solutions Inc',
    surveyer: 'David Wilson',
    dateOfDeputation: '2025-03-20',
    status: 'Active',
    fileSize: '3.2 MB',
    dateModified: '2025-04-12',
  },
  {
    id: 'DOC-2025-004',
    reportNo: 'REP-004',
    claimId: 'CLM-2025-004',
    title: 'Health Insurance Application',
    type: 'Application',
    thumbnail: '/lovable-uploads/30159273-4f03-406e-aa58-c934d8e402c4.png',
    client: 'Secure Insurance Group',
    insurer: 'MediCare Insurance',
    insured: 'Sarah Thompson',
    surveyer: 'Jennifer Davis',
    dateOfDeputation: '2025-03-25',
    status: 'Draft',
    fileSize: '1.7 MB',
    dateModified: '2025-04-20',
  }
];

// Filter options lists
export const clientOptions: FilterOption[] = [
  { value: 'Acme Insurance Corp', label: 'Acme Insurance Corp' },
  { value: 'Global Protect Inc', label: 'Global Protect Inc' },
  { value: 'SafeGuard Ltd', label: 'SafeGuard Ltd' },
  { value: 'Secure Insurance Group', label: 'Secure Insurance Group' },
];

export const typeOptions: FilterOption[] = [
  { value: 'Policy', label: 'Policy' },
  { value: 'Claim', label: 'Claim' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Application', label: 'Application' },
];

export const insurerOptions: FilterOption[] = [
  { value: 'Global Insurance Ltd', label: 'Global Insurance Ltd' },
  { value: 'SafeGuard Insurers', label: 'SafeGuard Insurers' },
  { value: 'Premium Insurance Co', label: 'Premium Insurance Co' },
  { value: 'MediCare Insurance', label: 'MediCare Insurance' },
];

export const surveyerOptions: FilterOption[] = [
  { value: 'Robert Johnson', label: 'Robert Johnson' },
  { value: 'Michael Brown', label: 'Michael Brown' },
  { value: 'David Wilson', label: 'David Wilson' },
  { value: 'Jennifer Davis', label: 'Jennifer Davis' },
];

export const statusOptions: FilterOption[] = [
  { value: 'Active', label: 'Active' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Draft', label: 'Draft' },
];

export const timeOptions: FilterOption[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
];
