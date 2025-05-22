import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ClaimFormComponent from "@/components/claims/ClaimForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Server } from "@/App";
import { useLocation } from "react-router-dom";

const ClaimFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [claim, setClaim] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preSelectedPolicy, setPreSelectedPolicy] = useState(null);
  //claim type 
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    if (location.state?.selectedOption) {
      setSelectedOption(location.state.selectedOption);
    }
  }, [location]);

  
  const isEditing = id !== undefined;
  
  // Get pre-selected policy from URL parameters
  useEffect(() => {
    const policyType = searchParams.get('policyType');
    const policyName = searchParams.get('policyName');
    
    if (policyType && policyName && !isEditing) {
      setPreSelectedPolicy({
        uniqueId: policyType,
        name: decodeURIComponent(policyName)
      });
    }
  }, [searchParams, isEditing]);
  
  // Fetch claim data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchClaim = async () => {
        setIsLoading(true);
        try {
          // Replace with your actual API endpoint
          const response = await fetch(`http://localhost:3000/api/claims/${id}`);
          
          if (!response.ok) {
            throw new Error("Failed to fetch claim");
          }
          
          const claimData = await response.json();
          setClaim(claimData);
        } catch (error) {
          console.error("Error fetching claim:", error);
          toast({
            title: "Error",
            description: "Failed to load claim data. Please try again later.",
            variant: "destructive"
          });
          // Navigate back to claims list on error
          navigate("/claims");
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchClaim();
    }
  }, [id, isEditing, navigate, toast]);

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);
      // API endpoint
      const endpoint = isEditing 
        ? `${Server}/claims/${id}`
        : `${Server}/claims`;
      
      // API method
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isEditing ? { ...data, id } : data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save claim");
      }
      
      const savedClaim = await response.json();
      
      toast({
        title: isEditing ? "Claim updated" : "Claim created",
        description: `Claim has been ${isEditing ? "updated" : "created"} successfully.`,
      });
      
      // Navigate to appropriate page after success
      navigate(isEditing ? `/claims/${id}` : "/claims");
    } catch (error) {
      console.error("Error saving claim:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      navigate(`/claims/${id}`);
    } else {
      navigate("/claims");
    }
  };
  
  // Show loading state while fetching claim data for editing
  if (isEditing && isLoading && !claim) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin text-xl">⏳</div>
        <span className="ml-2">Loading claim data...</span>
      </div>
    );
  }

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
          preSelectedPolicy={preSelectedPolicy}
          selectedClaim={selectedOption}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
};

export default ClaimFormPage;