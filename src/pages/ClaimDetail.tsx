import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Edit, Trash2, FileText, Image, Upload } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data for demonstration
const mockClaim = {
  id: "12345",
  details: "Customer reported water damage to vessel hull during storm. Initial assessment shows moderate damage to starboard side.",
  customer: {
    name: "John Smith",
    email: "john.smith@email.com",
    number: "+1 (555) 123-4567"
  },
  employee: {
    name: "Sarah Johnson",
    position: "Senior Claims Adjuster"
  },
  metadata: {
    status: "In Progress",
    priority: "High",
    claimAmount: 15000,
    incidentDate: "2024-01-15"
  },
  docs: {
    photoEvidence: true,
    estimateProvided: true
  },
  policyType: {
    data: {
      name: "Marine Insurance",
      description: "Comprehensive marine vessel coverage",
      basePremium: 2400
    }
  },
  createdAt: "2024-01-16T10:30:00Z",
  updatedAt: "2024-01-20T14:45:00Z"
};

// Document Preview Modal Component
const DocumentPreviewModal = ({ isOpen, onClose, document }) => {
  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{document.name}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
          {document.type.includes("image") ? (
            <div className="text-center">
              <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Image preview would appear here</p>
              <p className="text-sm text-gray-400 mt-2">
                In a real implementation, you would display the actual image
              </p>
            </div>
          ) : (
            <div className="text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Document preview would appear here</p>
              <p className="text-sm text-gray-400 mt-2">
                In a real implementation, you would display the PDF or document content
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Claim Information Component
const ClaimInfo = ({ claim }) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Claim Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Claim ID</h3>
            <p className="text-base">#{claim.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Details</h3>
            <p className="text-base">{claim.details || "No details provided"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                claim.metadata?.status === "Completed" 
                  ? "bg-green-100 text-green-800" 
                  : claim.metadata?.status === "In Progress" 
                  ? "bg-blue-100 text-blue-800" 
                  : claim.metadata?.status === "Approved"
                  ? "bg-emerald-100 text-emerald-800"
                  : claim.metadata?.status === "Rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {claim.metadata?.status || "Pending"}
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              claim.metadata?.priority === "High" 
                ? "bg-red-100 text-red-800" 
                : claim.metadata?.priority === "Medium" 
                ? "bg-orange-100 text-orange-800" 
                : "bg-gray-100 text-gray-800"
            }`}>
              {claim.metadata?.priority || "Medium"}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Customer</h3>
            <p className="text-base">{claim.customer?.name || "Unknown Customer"}</p>
            <p className="text-sm text-muted-foreground">{claim.customer?.email || ""}</p>
            <p className="text-sm text-muted-foreground">{claim.customer?.number || ""}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Assigned Agent</h3>
            <p className="text-base">{claim.employee?.name || "Unassigned"}</p>
            <p className="text-sm text-muted-foreground">{claim.employee?.position || ""}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Claim Amount</h3>
            <p className="text-base">${(claim.metadata?.claimAmount || 0).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Incident Date</h3>
            <p className="text-base">
              {claim.metadata?.incidentDate 
                ? new Date(claim.metadata.incidentDate).toLocaleDateString()
                : "Not specified"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Claim Documents Component
const ClaimDocuments = ({ claim, onViewDocument, onDeleteDocument }) => {
  const documents = [];
  
  // Convert the docs object to an array of documents
  if (claim.docs) {
    if (claim.docs.photoEvidence) {
      documents.push({
        id: "photo-evidence",
        name: "Photo Evidence",
        type: "image/jpeg",
        uploadedAt: claim.updatedAt,
        size: "2.4 MB"
      });
    }
    
    if (claim.docs.estimateProvided) {
      documents.push({
        id: "estimate",
        name: "Repair Estimate",
        type: "application/pdf",
        uploadedAt: claim.updatedAt,
        size: "1.1 MB"
      });
    }
  }
  
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Documents</h2>
      
      {documents.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>No documents uploaded for this claim</p>
        </div>
      ) : (
        <div className="divide-y">
          {documents.map((doc) => (
            <div key={doc.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gray-100 rounded p-2 mr-4">
                  {doc.type.includes("image") ? (
                    <Image className="h-6 w-6 text-gray-600" />
                  ) : (
                    <FileText className="h-6 w-6 text-gray-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {doc.size} • {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onViewDocument(doc)}>
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-destructive hover:text-destructive" 
                  onClick={() => onDeleteDocument(doc.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4">
        <Button variant="outline" className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Upload New Document
        </Button>
      </div>
    </div>
  );
};

// Claim Timeline Component
const ClaimTimeline = ({ claim }) => {
  // Create a timeline from the claim data
  const events = [
    {
      id: "1",
      title: "Claim Created",
      description: "Claim was submitted to the system",
      timestamp: claim.createdAt,
      type: "created"
    }
  ];

  if (claim.employee?.name) {
    events.push({
      id: "2",
      title: "Agent Assigned",
      description: `${claim.employee.name} was assigned to the claim`,
      timestamp: claim.createdAt,
      type: "assigned"
    });
  }
  
  // Add status-based events
  if (claim.metadata?.status === "Completed") {
    events.push({
      id: "3",
      title: "Claim Completed",
      description: `Claim was resolved with $${(claim.metadata?.claimAmount || 0).toLocaleString()} payout`,
      timestamp: claim.updatedAt,
      type: "completed"
    });
  } else if (claim.metadata?.status === "Approved") {
    events.push({
      id: "3",
      title: "Claim Approved",
      description: "Claim has been approved for processing",
      timestamp: claim.updatedAt,
      type: "approved"
    });
  }
  
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Timeline</h2>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={event.id} className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className={`rounded-full h-8 w-8 flex items-center justify-center text-sm font-medium border-2 ${
                event.type === "created" ? "border-blue-500 bg-blue-50 text-blue-600" :
                event.type === "assigned" ? "border-purple-500 bg-purple-50 text-purple-600" :
                event.type === "approved" ? "border-emerald-500 bg-emerald-50 text-emerald-600" :
                "border-green-500 bg-green-50 text-green-600"
              }`}>
                {index + 1}
              </div>
              {index < events.length - 1 && (
                <div className="w-0.5 bg-gray-200 h-8 mt-2"></div>
              )}
            </div>
            <div className="pt-1 flex-1">
              <h3 className="font-medium">{event.title}</h3>
              <p className="text-sm text-muted-foreground">{event.description}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(event.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Claim Detail Component
const ViewClaimPage = ({ claimId = "12345" }) => {
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [claim, setClaim] = useState(mockClaim);
  const [error, setError] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  
  // Simulate loading for demo
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleDeleteClaim = async () => {
    try {
      // In real implementation, this would make an API call
      console.log(`Deleting claim ${claimId}`);
      
      toast({
        title: "Claim deleted",
        description: `Claim ${claimId} has been deleted successfully.`,
      });
      
      // In real app: navigate("/claims");
      console.log("Would navigate to /claims");
      setIsDeleteDialogOpen(false);
    } catch (err) {
      toast({
        title: "Error deleting claim",
        description: err.message,
        variant: "destructive",
      });
    }
  };
  
  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setIsDocumentModalOpen(true);
  };
  
  const handleDocumentDelete = (documentId) => {
    toast({
      title: "Document deleted",
      description: "The document has been removed from this claim.",
    });
  };

  const handleNavigation = (path) => {
    console.log(`Would navigate to: ${path}`);
    toast({
      title: "Navigation",
      description: `Would navigate to ${path}`,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error || !claim) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold">Claim not found</h2>
        <p className="text-muted-foreground mt-2">
          {error || "The claim you are looking for does not exist or has been removed."}
        </p>
        <Button onClick={() => handleNavigation("/claims")} className="mt-4">
          Return to Claims List
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => handleNavigation("/claims")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold tracking-tight">
              Claim #{claim.id} Details
            </h1>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="text-destructive hover:text-destructive" 
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button onClick={() => handleNavigation(`/claims/${claim.id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>

        {/* Claim Information */}
        <ClaimInfo claim={claim} />
        
        {/* Documents and Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ClaimDocuments 
              claim={claim} 
              onViewDocument={handleViewDocument}
              onDeleteDocument={handleDocumentDelete}
            />
          </div>
          <div>
            <ClaimTimeline claim={claim} />
          </div>
        </div>
        
        {/* Policy Information */}
        {claim.policyType && (
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Policy Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Policy Type</h3>
                <p className="text-base">{claim.policyType.data?.name || claim.policyType.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {claim.policyType.data?.description || claim.policyType.description}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Base Premium</h3>
                <p className="text-base">
                  ${(claim.policyType.data?.basePremium || claim.policyType.basePremium || 0).toLocaleString()}/year
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
        document={selectedDocument}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the claim and all associated documents.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteClaim}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ViewClaimPage;