
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ClaimInfo from "@/components/claims/ClaimDetail/ClaimInfo";
import ClaimDocuments from "@/components/claims/ClaimDetail/ClaimDocuments";
import ClaimTimeline from "@/components/claims/ClaimDetail/ClaimTimeline";
import DocumentPreviewModal from "@/components/claims/DocumentPreviewModal";
import { Button } from "@/components/ui/button";
import { ClaimDocument } from "@/types/claim";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeftIcon, Edit, Trash2 } from "lucide-react";
import { mockClaims, mockDocuments, mockEvents } from "@/data/mockData";
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

const ClaimDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<ClaimDocument | null>(null);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  
  const claim = mockClaims.find(c => c.claimId === id);
  const documents = mockDocuments[id || ""] || [];
  const events = mockEvents[id || ""] || [];
  
  if (!claim) {
    return (
      <>
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold">Claim not found</h2>
          <p className="text-muted-foreground mt-2">
            The claim you are looking for does not exist or has been removed.
          </p>
          <Button onClick={() => navigate("/claims")} className="mt-4">
            Return to Claims List
          </Button>
        </div>
      </>
    );
  }
  
  const handleDeleteClaim = () => {
    toast({
      title: "Claim deleted",
      description: `Claim ${id} has been deleted successfully.`,
    });
    navigate("/claims");
  };
  
  const handleViewDocument = (document: ClaimDocument) => {
    setSelectedDocument(document);
    setIsDocumentModalOpen(true);
  };
  
  const handleDocumentDelete = (documentId: string) => {
    toast({
      title: "Document deleted",
      description: "The document has been removed from this claim.",
    });
  };

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
              documents={documents} 
              onViewDocument={handleViewDocument}
              onDeleteDocument={handleDocumentDelete}
            />
          </div>
          <div>
            <ClaimTimeline events={events} />
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
