import { useEffect, useState } from "react";
import ClaimsFilter from "@/components/claims/ClaimsFilter";
import ClaimsTable from "@/components/claims/ClaimsTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Grid2X2, List, Plus } from "lucide-react";
import ClaimCard from "@/components/claims/ClaimCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Claim, ClaimStatus, ClaimPriority } from "@/types/claim";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

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

const ClaimsList = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [claims, setClaims] = useState<Claim[]>([]);
  const [filteredClaims, setFilteredClaims] = useState<Claim[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);

  const paginatedClaims = filteredClaims.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to transform API data to your frontend Claim type
  const transformApiDataToClaim = (apiClaim: ApiClaim): Claim => {
    // Safely handle status and priority values
    const normalizeStatus = (status: string): ClaimStatus => {
      const statusMap: Record<string, ClaimStatus> = {
        'Completed': 'Completed',
        'Approved': 'Approved',
        'In Progress': 'In Progress',
        'pending': 'pending',
        'approved': 'approved',
        'rejected': 'rejected',
        'inReview': 'inReview'
      };
      return statusMap[status] || status as ClaimStatus;
    };

    const normalizePriority = (priority: string): ClaimPriority => {
      const priorityMap: Record<string, ClaimPriority> = {
        'Low': 'Low',
        'Medium': 'Medium', 
        'High': 'High'
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

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/claims");
        if (!res.ok) throw new Error("Failed to fetch claims");
        const response: ApiResponse = await res.json();

        const apiClaims = response.data; 
        console.log("API Response:", response);
        console.log("Claims data:", apiClaims);

        if (!Array.isArray(apiClaims)) {
          throw new Error("Invalid data format: expected an array");
        }

        // Transform API data to match your frontend Claim type
        const transformedClaims = apiClaims.map(transformApiDataToClaim);
        
        setClaims(transformedClaims);
        setFilteredClaims(transformedClaims);
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

    fetchClaims();
  }, [toast]);

  const handleFilterChange = (filters: any) => {
    let results = [...claims];

    if (filters.policyNumber) {
      results = results.filter(claim =>
        claim.policyId.toLowerCase().includes(filters.policyNumber.toLowerCase())
      );
    }

    if (filters.customerName) {
      results = results.filter(claim =>
        claim.clientName.toLowerCase().includes(filters.customerName.toLowerCase())
      );
    }

    if (filters.employee) {
      results = results.filter(claim =>
        claim.assignedEmployee.toLowerCase().includes(filters.employee.toLowerCase())
      );
    }

    if (filters.status) {
      results = results.filter(claim => claim.status === filters.status);
    }

    if (filters.priority) {
      results = results.filter(claim => claim.priority === filters.priority);
    }

    // Add date range filtering if needed
    if (filters.dateFrom) {
      results = results.filter(claim => 
        new Date(claim.incidentDate) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      results = results.filter(claim => 
        new Date(claim.incidentDate) <= new Date(filters.dateTo)
      );
    }

    setFilteredClaims(results);
    setCurrentPage(1);
  };

  const handleDeleteClaim = async (claimId: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/claims/${claimId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete claim');

      toast({
        title: "Claim deleted",
        description: `Claim ${claimId} has been deleted successfully.`,
      });

      setFilteredClaims(prev => prev.filter(claim => claim.claimId !== claimId));
      setClaims(prev => prev.filter(claim => claim.claimId !== claimId));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete claim. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
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

  if (error) {
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
            <Button onClick={() => window.location.reload()}>
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
        <Button asChild>
          <Link to="/claims/new">
            <Plus className="mr-2 h-4 w-4" />
            New Claim
          </Link>
        </Button>
      </div>

      <ClaimsFilter onFilterChange={handleFilterChange} />

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{paginatedClaims.length}</span> of{" "}
          <span className="font-medium">{filteredClaims.length}</span> claims
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

      {filteredClaims.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No claims found matching your filters.</p>
        </div>
      ) : (
        <>
          {viewMode === "table" ? (
            <div className="border rounded-lg bg-white overflow-hidden">
              <ClaimsTable claims={paginatedClaims} onDeleteClaim={handleDeleteClaim} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedClaims.map((claim) => (
                <ClaimCard key={claim.claimId} claim={claim}/>
              ))}
            </div>
          )}

          {totalPages > 0 && (
            <Pagination className="justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => setCurrentPage(index + 1)}
                      isActive={currentPage === index + 1}
                      className="cursor-pointer"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default ClaimsList;