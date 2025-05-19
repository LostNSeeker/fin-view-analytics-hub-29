
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ClaimForm } from '@/components/claims/ClaimForm';
import { ClaimTypeSelector } from '@/components/claims/ClaimTypeSelector';
import { ClaimsFilter, FiltersState } from '@/components/claims/ClaimsFilter';
import { DocumentGrid } from '@/components/claims/DocumentGrid';
import { DocumentTable } from '@/components/claims/DocumentTable';
// import { 
//   documentsData, 
//   clientOptions, 
//   typeOptions, 
//   insurerOptions, 
//   surveyerOptions, 
//   statusOptions, 
//   timeOptions 
// } from '@/data/claimsData';

import { useClaims } from '@/hooks/useClaims'; // imported useclaim hook 

const Claims = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addClaimStep, setAddClaimStep] = useState<'type' | 'form'>('type');
  const [selectedClaimType, setSelectedClaimType] = useState<string>('Claim');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const [page, setPage] = useState(1);
  const limit = 10;
  const { claims = [], totalClaims, loading } = useClaims(page, limit, searchTerm);
  
  // Multi-select filters
  const [filtersState, setFiltersState] = useState<FiltersState>({
    selectedClients: [],
    selectedTypes: [],
    selectedInsurers: [],
    selectedSurveyers: [],
    selectedStatuses: [],
    selectedTimes: [],
  });
  
  // const filteredDocuments = documentsData.filter((doc) => {
  //   const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                         doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                         doc.claimId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                         doc.reportNo?.toLowerCase().includes(searchTerm.toLowerCase());
    
  //   const { selectedClients, selectedTypes, selectedInsurers, selectedSurveyers, selectedStatuses, selectedTimes } = filtersState;
    
  //   const matchesClient = selectedClients.length === 0 || selectedClients.includes(doc.client);
  //   const matchesType = selectedTypes.length === 0 || selectedTypes.includes(doc.type);
  //   const matchesInsurer = selectedInsurers.length === 0 || (doc.insurer && selectedInsurers.includes(doc.insurer));
  //   const matchesSurveyer = selectedSurveyers.length === 0 || (doc.surveyer && selectedSurveyers.includes(doc.surveyer));
  //   const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(doc.status);
  //   const matchesTime = selectedTimes.length === 0;
    
  //   // Date range filter
  //   let matchesDateRange = true;
  //   if (dateRange.from || dateRange.to) {
  //     const docDate = doc.dateModified ? new Date(doc.dateModified) : null;
      
  //     if (docDate) {
  //       if (dateRange.from && dateRange.to) {
  //         matchesDateRange = docDate >= dateRange.from && docDate <= dateRange.to;
  //       } else if (dateRange.from) {
  //         matchesDateRange = docDate >= dateRange.from;
  //       } else if (dateRange.to) {
  //         matchesDateRange = docDate <= dateRange.to;
  //       }
  //     }
  //   }
    
  //   return matchesSearch && matchesClient && matchesType && matchesInsurer && matchesSurveyer && matchesStatus && matchesTime && matchesDateRange;
  // });

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

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Document Management</h1>
          {/* <p className="text-gray-500">Showing {filteredDocuments.length} documents</p> */}
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
      
      {/* <ClaimsFilter
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
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
      />
       */}
      {viewMode === 'grid' ? (
        <DocumentGrid documents={claims} />
      ) : (
        <DocumentTable documents={claims} />
      )}
      {/* Pagination UI */}
      <div className="flex justify-center space-x-4 pt-4">
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <span>Page {page}</span>
        <Button onClick={() => setPage((p) => p + 1)} disabled={claims.length < limit}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Claims;
