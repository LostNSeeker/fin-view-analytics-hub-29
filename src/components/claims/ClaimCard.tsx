import { CalendarIcon, UserIcon, ClockIcon, DollarSignIcon, AlertTriangle, FileText } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { formatDate } from "@/lib/date-utils";
import { Claim, ClaimPriority, ClaimStatus } from "@/types/claim";

interface ClaimCardProps {
  claim: Claim;
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
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Badge variant="outline" className={`${getColorClass()}`}>
      {priority === "High" && <AlertTriangle className="w-3 h-3 mr-1" />}
      {priority}
    </Badge>
  );
};

const ClaimCard = ({ claim }: ClaimCardProps) => {
  return (
    <Card className="h-full hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-mono">#{claim.claimId}</p>
          <StatusBadge status={claim.status as ClaimStatus} />
        </div>
        <div className="flex items-center justify-between">
          <Link to={`/claims/${claim.claimId}`}>
            <h3 className="font-semibold hover:text-primary transition-colors text-lg truncate max-w-48" title={claim.details}>
              {claim.details || `Claim #${claim.claimId}`}
            </h3>
          </Link>
          {/* <PriorityBadge priority={claim.priority} /> */}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 pb-3">
        <div className="flex items-center space-x-2 text-sm">
          <UserIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground truncate">{claim.clientName}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <DollarSignIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground font-medium">{formatCurrency(claim.claimAmount)}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <CalendarIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground">Incident: {formatDate(claim.incidentDate)}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground truncate">
            {claim.policyType && claim.policyType.name ? claim.policyType.name : "N/A"}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4">
        <div className="flex items-center justify-between w-full text-xs">
          <p className="text-muted-foreground truncate max-w-32">
            <span>Assigned: {claim.assignedEmployee}</span>
          </p>
          <div className="flex items-center space-x-1">
            <ClockIcon className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">
              {formatDate(claim.updatedAt)}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClaimCard;