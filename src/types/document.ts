
export interface DocumentType {
  id: string;
  reportNo?: string;
  claimId?: string;
  title: string;
  type: string;
  thumbnail: string;
  client: string;
  insurer?: string;
  insured?: string;
  surveyer?: string;
  dateOfDeputation?: string;
  status: string;
  fileSize: string;
  dateModified: string;
}

export interface FilterOption {
  value: string;
  label: string;
}
