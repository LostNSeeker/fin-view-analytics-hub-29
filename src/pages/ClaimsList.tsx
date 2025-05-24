import { useEffect, useState } from "react";
import ClaimsFilter from "@/components/claims/ClaimsFilter";
import ClaimsTable from "@/components/claims/ClaimsTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Grid2X2, List, Plus, SlidersHorizontal } from "lucide-react";
import ClaimCard from "@/components/claims/ClaimCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Claim, ClaimStatus, ClaimPriority } from "@/types/claim";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {PolicyTypeModal} from '@/components/claims/ClaimDetail/PolicySelection';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { useUser } from "@/context/UserContext";



// Interface matching your API response
interface ApiClaim {
  id: number;
  details: string;
  customer_id: number;
  employee_id: number;
  docs: {
    photoEvidence?: boolean;
    estimateProvided?: boolean;
    policeReport?: boolean;
    contractorReport?: boolean;
  };
  policy_id: number;
  metadata: {
    status: string;
    priority: string;
    claimAmount: number;
    incidentDate: string;
  };
  createdAt: string;
  updatedAt: string;
  customer: {
    id: number;
    name: string;
    city: string;
    number: string;
    email: string;
  };
  employee: {
    id: number;
    name: string;
    position: string;
    data: {
      hireDate: string;
      department: string;
      yearsExperience: number;
    };
  };
  policyType: {
    id: number;
    data: {
      name: string;
      basePremium: number;
      description: string;
    };
    metadata: {
      active: boolean;
      createdBy: string;
    };
  };
}

interface ApiResponse {
  data: ApiClaim[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

interface FilterParams {
  policyNumber?: string;
  customerName?: string;
  employeeName?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

const ClaimsList = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState<FilterParams>({});
  const { BackendUrl } = useUser();

  const itemsPerPage = 6; // This should match the 'limit' parameter sent to API

  // Function to transform API data to your frontend Claim type
  const transformApiDataToClaim = (apiClaim: ApiClaim): Claim => {
    // Safely handle status and priority values
    const normalizeStatus = (status: string): ClaimStatus => {
      const statusMap: Record<string, ClaimStatus> = {
        'COMPLETED': 'Completed',
        'APPROVED': 'Approved',
        'IN PROGRESS': 'In Progress',
        'PENDING': 'pending',
        'REJECTED': 'rejected',
        'IN REVIEW': 'inReview'
      };
      return statusMap[status] || status as ClaimStatus;
    };

    const normalizePriority = (priority: string): ClaimPriority => {
      const priorityMap: Record<string, ClaimPriority> = {
        'LOW': 'Low',
        'MEDIUM': 'Medium',
        'HIGH': 'High'
      };
      return priorityMap[priority] || priority as ClaimPriority;
    };

    return {
      claimId: apiClaim.id.toString(),
      policyId: apiClaim.policy_id.toString(),
      clientName: apiClaim.customer.name,
      assignedEmployee: apiClaim.employee.name,
      status: normalizeStatus(apiClaim.metadata.status),
      priority: normalizePriority(apiClaim.metadata.priority),
      claimAmount: apiClaim.metadata.claimAmount,
      incidentDate: apiClaim.metadata.incidentDate,
      details: apiClaim.details,
      createdAt: apiClaim.createdAt,
      updatedAt: apiClaim.updatedAt,
      customer: {
        id: apiClaim.customer.id,
        name: apiClaim.customer.name,
        city: apiClaim.customer.city,
        phone: apiClaim.customer.number,
        email: apiClaim.customer.email,
      },
      employee: {
        id: apiClaim.employee.id,
        name: apiClaim.employee.name,
        position: apiClaim.employee.position,
        department: apiClaim.employee.data.department,
        yearsExperience: apiClaim.employee.data.yearsExperience,
        hireDate: apiClaim.employee.data.hireDate,
      },
      policyType: {
        id: apiClaim.policyType.id,
        name: apiClaim.policyType.data.name,
        basePremium: apiClaim.policyType.data.basePremium,
        description: apiClaim.policyType.data.description,
      },
      documentation: {
        photoEvidence: apiClaim.docs.photoEvidence || false,
        estimateProvided: apiClaim.docs.estimateProvided || false,
        policeReport: apiClaim.docs.policeReport || false,
        contractorReport: apiClaim.docs.contractorReport || false,
      }
    };
  };

  const fetchClaims = async (filters: FilterParams = {}) => {
    try {
      setLoading(true);

      // Determine which endpoint to use based on whether filters are applied
      let url = `${BackendUrl}/claims`;
      let hasFilters = false;

      // Build query string from filters
      const queryParams = new URLSearchParams();

      // Add pagination parameters
      queryParams.append('page', (filters.page || currentPage).toString());
      queryParams.append('limit', itemsPerPage.toString());

      // Check if any filter parameters exist
      if (filters.policyNumber || filters.customerName || filters.employeeName ||
        filters.status || filters.dateFrom || filters.dateTo) {

        // Switch to the filter endpoint
        url = `${BackendUrl}/claims/search_claims`;
        hasFilters = true;

        // Add filter parameters if they exist
        if (filters.policyNumber) queryParams.append('policyNumber', filters.policyNumber);
        if (filters.customerName) queryParams.append('customerName', filters.customerName);
        if (filters.employeeName) queryParams.append('employeeName', filters.employeeName);
        if (filters.status) queryParams.append('status', filters.status);
        if (filters.dateFrom) queryParams.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) queryParams.append('dateTo', filters.dateTo);
      }

      // Append query parameters to URL
      const finalUrl = `${url}?${queryParams.toString()}`;
      console.log("Fetching from:", finalUrl);

      const token = localStorage.getItem("token");
      const res = await fetch(finalUrl, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch claims");

      const response: ApiResponse = await res.json();
      console.log("API Response:", response);

      const apiClaims = response.data;

      if (!Array.isArray(apiClaims)) {
        throw new Error("Invalid data format: expected an array");
      }

      // Transform API data to match your frontend Claim type
      const transformedClaims = apiClaims.map(transformApiDataToClaim);

      setClaims(transformedClaims);
      setTotalItems(response.pagination.total);
      setTotalPages(response.pagination.pages);

    } catch (err: any) {
      console.error("Error fetching claims:", err);
      setError(err.message || "Something went wrong");
      toast({
        title: "Error",
        description: "Failed to load claims. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [currentPage]); // Fetch claims when page changes

  const handleFilterChange = (filters: any) => {
    // Update current filters state
    const newFilters: FilterParams = {
      policyNumber: filters.policyNumber || undefined,
      customerName: filters.customerName || undefined,
      employeeName: filters.employee || undefined, // Map employee to employeeName for API
      status: filters.status ? filters.status.toUpperCase() : undefined, // Convert status to uppercase for API
      dateFrom: filters.dateFrom || undefined,
      dateTo: filters.dateTo || undefined,
      page: 1 // Reset to first page when applying new filters
    };

    setCurrentFilters(newFilters);
    setCurrentPage(1);
    fetchClaims(newFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchClaims({ ...currentFilters, page });
  };

  const handleDeleteClaim = async (claimId: string) => {
    try {
      const res = await fetch(`${BackendUrl}/claims/${claimId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete claim');

      toast({
        title: "Claim deleted",
        description: `Claim ${claimId} has been deleted successfully.`,
      });

      // Refresh the claims list after deletion
      fetchClaims(currentFilters);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete claim. Please try again.",
        variant: "destructive",
      });
    }
  };

const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewClaim = () => {
    setIsModalOpen(true);
  };

  const handlePolicySelect = (policyType: string, subType?: string, displayName?: string) => {
    console.log('Selected:', { policyType, subType, displayName });
    
    // Close modal
    setIsModalOpen(false);
    
    // Navigate to form with pre-filled policy type
    // Example: navigate(`/claims/new?policyType=${policyType}&subType=${subType}&displayName=${displayName}`);
    // or use state management to pass the selected policy type
    
  };

  if (loading && claims.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight">Claims</h1>
          <Button asChild>
            <Link to="/claims/new">
              <Plus className="mr-2 h-4 w-4" />
              New Claim
            </Link>
          </Button>
        </div>
        <div className="flex items-center justify-center h-48">
          <p className="text-muted-foreground">Loading claims...</p>
        </div>
      </div>
    );
  }

  if (error && claims.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight">Claims</h1>
          <Button asChild>
            <Link to="/claims/new">
              <Plus className="mr-2 h-4 w-4" />
              New Claim
            </Link>
          </Button>
        </div>
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <p className="text-red-500 mb-2">{error}</p>
            <Button onClick={() => fetchClaims()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Claims</h1>
        <div className="flex-row space-x-2">
          <Button asChild onClick={() => setIsFiltersVisible((prev) => !prev)}>
          <div>
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          </Button>
          <Button asChild onClick={handleNewClaim}>
            <div>
              <Plus className="mr-2 h-4 w-4" />
              New Claim
            </div>
          </Button>
        </div>      
      </div>

      {isFiltersVisible && <ClaimsFilter onFilterChange={handleFilterChange} />}

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{claims.length}</span> of{" "}
          <span className="font-medium">{totalItems}</span> claims
        </p>

        <Tabs defaultValue="table" onValueChange={(value) => setViewMode(value as "grid" | "table")}>
          <TabsList>
            <TabsTrigger value="table">
              <List className="h-4 w-4 mr-1" />
              List
            </TabsTrigger>
            <TabsTrigger value="grid">
              <Grid2X2 className="h-4 w-4 mr-1" />
              Grid
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      )}

      {!loading && claims.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No claims found matching your filters.</p>
        </div>
      ) : (
        <>
          {viewMode === "table" ? (
            <div className="border rounded-lg bg-white overflow-hidden">
              <ClaimsTable claims={claims} onDeleteClaim={handleDeleteClaim} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {claims.map((claim) => (
                <ClaimCard key={claim.claimId} claim={claim} />
              ))}
            </div>
          )}

          {totalPages > 0 && (
            <Pagination className="justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handlePageChange(index + 1)}
                      isActive={currentPage === index + 1}
                      className="cursor-pointer"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
      <PolicyTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handlePolicySelect}
      />
    </div>
  );
};

export default ClaimsList;