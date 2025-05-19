
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ClaimStatus = "pending" | "approved" | "rejected" | "inReview";

interface StatusBadgeProps {
  status: ClaimStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusText = (status: ClaimStatus) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "inReview":
        return "In Review";
      default:
        return status;
    }
  };

  const statusClasses = cn(
    "px-2.5 py-1 text-xs font-medium rounded-md",
    `status-badge-${status}`
  );

  return (
    <span className={statusClasses}>
      {getStatusText(status)}
    </span>
  );
};

export default StatusBadge;
