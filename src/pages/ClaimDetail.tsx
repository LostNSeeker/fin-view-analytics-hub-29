import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeftIcon, Edit, Trash2 } from "lucide-react";
import DocumentPreviewModal from "@/components/claims/DocumentPreviewModal";
import { ClaimDocument } from "@/types/claim";
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

// Create these components based on the API response structure
const ClaimInfo = ({ claim }) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Claim Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Claim ID</h3>
            <p className="text-base">{claim.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Details</h3>
            <p className="text-base">{claim.details}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                claim.metadata.status === "Completed" 
                  ? "bg-green-100 text-green-800" 
                  : claim.metadata.status === "In Progress" 
                  ? "bg-blue-100 text-blue-800" 
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {claim.metadata.status}
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              claim.metadata.priority === "High" 
                ? "bg-red-100 text-red-800" 
                : claim.metadata.priority === "Medium" 
                ? "bg-orange-100 text-orange-800" 
                : "bg-gray-100 text-gray-800"
            }`}>
              {claim.metadata.priority}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Customer</h3>
            <p className="text-base">{claim.customer.name}</p>
            <p className="text-sm text-muted-foreground">{claim.customer.email}</p>
            <p className="text-sm text-muted-foreground">{claim.customer.number}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Assigned Agent</h3>
            <p className="text-base">{claim.employee.name}</p>
            <p className="text-sm text-muted-foreground">{claim.employee.position}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Claim Amount</h3>
            <p className="text-base">${claim.metadata.claimAmount.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Incident Date</h3>
            <p className="text-base">{new Date(claim.metadata.incidentDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

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
          No documents uploaded for this claim
        </div>
      ) : (
        <div className="divide-y">
          {documents.map((doc) => (
            <div key={doc.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-gray-100 rounded p-2 mr-4">
                  {doc.type.includes("image") ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
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
          Upload New Document
        </Button>
      </div>
    </div>
  );
};

const ClaimTimeline = ({ claim }) => {
  // Create a timeline from the claim data
  const events = [
    {
      id: "1",
      title: "Claim Created",
      description: "Claim was submitted to the system",
      timestamp: claim.createdAt,
      type: "created"
    },
    {
      id: "2",
      title: "Agent Assigned",
      description: `${claim.employee.name} was assigned to the claim`,
      timestamp: claim.createdAt,
      type: "assigned"
    }
  ];
  
  // Add status-based events
  if (claim.metadata.status === "Completed") {
    events.push({
      id: "3",
      title: "Claim Completed",
      description: `Claim was resolved with $${claim.metadata.claimAmount} payout`,
      timestamp: claim.updatedAt,
      type: "completed"
    });
  }
  
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Timeline</h2>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={event.id} className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                event.type === "created" ? "border-blue-500 text-blue-500" :
                event.type === "assigned" ? "border-purple-500 text-purple-500" :
                "border-green-500 text-green-500"
              }`}>
                {index + 1}
              </div>
              {index < events.length - 1 && (
                <div className="w-0.5 bg-gray-200 h-full mt-2"></div>
              )}
            </div>
            <div className="pt-1">
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

const ClaimDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [claim, setClaim] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchClaim = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/claims/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch claim: ${response.status}`);
        }
        
        const data = await response.json();
        setClaim(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching claim:", err);
        setError(err.message);
        toast({
          title: "Error fetching claim",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchClaim();
  }, [id, toast]);
  
  const handleDeleteClaim = async () => {
    try {
      // Replace with actual API call
      // const response = await fetch(`http://localhost:3000/api/claims/${id}`, {
      //   method: 'DELETE',
      // });
      
      // if (!response.ok) {
      //   throw new Error(`Failed to delete claim: ${response.status}`);
      // }
      
      toast({
        title: "Claim deleted",
        description: `Claim ${id} has been deleted successfully.`,
      });
      navigate("/claims");
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
        <Button onClick={() => navigate("/claims")} className="mt-4">
          Return to Claims List
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => navigate("/claims")}>
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold tracking-tight">Claim Details</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="text-destructive hover:text-destructive" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button onClick={() => navigate(`/claims/edit/${id}`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>

        <ClaimInfo claim={claim} />
        
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
        
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Policy Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Policy Type</h3>
              <p className="text-base">{claim.policyType.data.name}</p>
              <p className="text-sm text-muted-foreground mt-1">{claim.policyType.data.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Base Premium</h3>
              <p className="text-base">${claim.policyType.data.basePremium.toLocaleString()}/year</p>
            </div>
          </div>
        </div>
      </div>

      <DocumentPreviewModal
        isOpen={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
        document={selectedDocument}
      />

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

export default ClaimDetail;