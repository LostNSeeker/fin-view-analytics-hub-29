import { useState } from "react";
import { ClaimStatus } from "@/types/claim";

interface StatusBadgeProps {
  status: ClaimStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  // Normalize the status to handle case variations
  const normalizedStatus = status.toLowerCase();
  
  // Get the appropriate color scheme based on the status
  const getColorClass = () => {
    switch (normalizedStatus) {
      case "approved":
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
      case "in progress":
      case "inreview":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format the display text (capitalize first letter)
  const formatStatusText = (text: string) => {
    // Handle special cases like "In Progress" or "inReview"
    if (text.toLowerCase() === "inreview") return "In Review";
    if (text.toLowerCase() === "in progress") return "In Progress";
    
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getColorClass()}`}>
      {formatStatusText(status)}
    </span>
  );
};

export default StatusBadge;