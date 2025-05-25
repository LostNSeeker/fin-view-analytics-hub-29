import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { ArrowUpDown, MoreHorizontal, Eye, Pencil, Trash, AlertTriangle } from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { Claim, ClaimStatus, ClaimPriority } from "@/types/claim";
import { useUser } from "@/context/UserContext";

interface ClaimsTableProps {
  claims: Claim[];
  onDeleteClaim?: (id: string) => void;
}

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Priority badge component
const PriorityBadge = ({ priority }: { priority: ClaimPriority }) => {
  const getColorClass = () => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getColorClass()}`}>
      {priority === "High" && <AlertTriangle className="w-3 h-3 mr-1" />}
      {priority}
    </span>
  );
};

const ClaimsTable = ({ claims, onDeleteClaim }: ClaimsTableProps) => {
  const [sortField, setSortField] = useState<keyof Claim>("updatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const {BackendUrl} = useUser();

  const handleSort = (field: keyof Claim) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedClaims = [...claims].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle date strings
    if (sortField === "updatedAt" || sortField === "createdAt" || sortField === "incidentDate") {
      aValue = new Date(aValue as string).getTime();
      bValue = new Date(bValue as string).getTime();
    }

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-auto">Claim ID</TableHead>
          <TableHead>
            <div className="flex items-center cursor-pointer" onClick={() => handleSort("details")}>
              Registration Number
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </TableHead>
          <TableHead>Status</TableHead>
          {/* <TableHead>Priority</TableHead> */}
          <TableHead>
            <div className="flex items-center cursor-pointer" onClick={() => handleSort("clientName")}>
              Insured
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>
            <div className="flex items-center cursor-pointer" onClick={() => handleSort("claimAmount")}>
              Amount
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center cursor-pointer" onClick={() => handleSort("incidentDate")}>
              Intimation Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center cursor-pointer" onClick={() => handleSort("updatedAt")}>
              Last Updated
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </div>
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedClaims.map((claim) => (
          <TableRow key={claim.claimId}>
            <TableCell className="font-mono text-xs">#{claim.claimId}</TableCell>
            <TableCell className="font-medium max-w-48 truncate" title={claim.details}>
              {claim.details}
            </TableCell>
            <TableCell>
              {/* Convert the status to a known valid StatusBadge status if needed */}
              <StatusBadge status={claim.status} />
            </TableCell>
            {/* <TableCell><PriorityBadge priority={claim.priority} /></TableCell> */}
            <TableCell>{claim.clientName}</TableCell>
            <TableCell>{claim.assignedEmployee}</TableCell>
            <TableCell className="font-medium">{formatCurrency(claim.claimAmount)}</TableCell>
            <TableCell>{formatDate(claim.incidentDate)}</TableCell>
            <TableCell>{formatDate(claim.updatedAt)}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link to={`/claims/${claim.claimId}`} className="flex items-center">
                      <Eye className="mr-2 h-4 w-4" />
                      <span>Generate</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/claims/edit/${claim.claimId}`} className="flex items-center">
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive"
                    onClick={() => onDeleteClaim && onDeleteClaim(claim.claimId)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClaimsTable;