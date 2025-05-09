import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ClaimForm } from '@/components/claims/ClaimForm';
import { ClaimTypeSelector } from '@/components/claims/ClaimTypeSelector';
import { ClaimsFilter, FiltersState } from '@/components/claims/ClaimsFilter';
import { DocumentGrid } from '@/components/claims/DocumentGrid';
import { DocumentTable } from '@/components/claims/DocumentTable';
import { 
  documentsData, 
  clientOptions, 
  typeOptions, 
  insurerOptions, 
  surveyerOptions, 
  statusOptions, 
  timeOptions 
} from '@/data/claimsData';

const Claims = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addClaimStep, setAddClaimStep] = useState<'type' | 'form'>('type');
  const [selectedClaimType, setSelectedClaimType] = useState<string>('Claim');
  
  // Multi-select filters
  const [filtersState, setFiltersState] = useState<FiltersState>({
    selectedClients: [],
    selectedTypes: [],
    selectedInsurers: [],
    selectedSurveyers: [],
    selectedStatuses: [],
    selectedTimes: [],
  });
  
  const filteredDocuments = documentsData.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.claimId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.reportNo?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const { selectedClients, selectedTypes, selectedInsurers, selectedSurveyers, selectedStatuses, selectedTimes } = filtersState;
    
    const matchesClient = selectedClients.length === 0 || selectedClients.includes(doc.client);
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(doc.type);
    const matchesInsurer = selectedInsurers.length === 0 || (doc.insurer && selectedInsurers.includes(doc.insurer));
    const matchesSurveyer = selectedSurveyers.length === 0 || (doc.surveyer && selectedSurveyers.includes(doc.surveyer));
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(doc.status);
    // Time filter would need additional logic for actual implementation
    const matchesTime = selectedTimes.length === 0;
    
    return matchesSearch && matchesClient && matchesType && matchesInsurer && matchesSurveyer && matchesStatus && matchesTime;
  });

  const handleSelectType = (type: string) => {
    setSelectedClaimType(type);
    setAddClaimStep('form');
  };

  const handleCancelTypeSelection = () => {
    setDialogOpen(false);
    setAddClaimStep('type');
  };

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      // Reset to first step when dialog is closed
      setAddClaimStep('type');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Document Management</h1>
          <p className="text-gray-500">Showing {filteredDocuments.length} documents</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-fin-blue hover:bg-fin-dark-blue">
              <Upload className="h-4 w-4 mr-2" />
              Add Claim
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>
                {addClaimStep === 'type' ? 'Select Claim Type' : 'New Claim'}
              </DialogTitle>
            </DialogHeader>
            
            {addClaimStep === 'type' ? (
              <ClaimTypeSelector 
                onSelectType={handleSelectType}
                onCancel={handleCancelTypeSelection}
              />
            ) : (
              <ClaimForm 
                documentType={selectedClaimType} 
                documentId="New" 
                skipTypeSelection={true}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
      
      <ClaimsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filtersState={filtersState}
        setFiltersState={setFiltersState}
        viewMode={viewMode}
        setViewMode={setViewMode}
        clientOptions={clientOptions}
        typeOptions={typeOptions}
        insurerOptions={insurerOptions}
        surveyerOptions={surveyerOptions}
        statusOptions={statusOptions}
        timeOptions={timeOptions}
      />
      
      {viewMode === 'grid' ? (
        <DocumentGrid documents={filteredDocuments} />
      ) : (
        <DocumentTable documents={filteredDocuments} />
      )}
    </div>
  );
};

export default Claims;
