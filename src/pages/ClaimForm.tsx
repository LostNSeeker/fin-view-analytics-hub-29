
import { useNavigate, useParams } from "react-router-dom";
import ClaimFormComponent from "@/components/claims/ClaimForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { mockClaims } from "@/data/mockData";

const ClaimFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isEditing = id !== undefined;
  const claim = isEditing ? mockClaims.find(c => c.claimId === id) : undefined;
  
  const handleSubmit = (data: any) => {
    if (isEditing) {
      toast({
        title: "Claim updated",
        description: `Claim ${id} has been updated successfully.`,
      });
      navigate(`/claims/${id}`);
    } else {
      toast({
        title: "Claim created",
        description: "New claim has been created successfully.",
      });
      navigate("/claims");
    }
  };
  
  const handleCancel = () => {
    if (isEditing) {
      navigate(`/claims/${id}`);
    } else {
      navigate("/claims");
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isEditing ? "Edit Claim" : "New Claim"}
          </h1>
        </div>
        
        <ClaimFormComponent 
          claim={claim}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
};

export default ClaimFormPage;
