
import React, { useState } from 'react';
import { Search, Filter, Upload, Download, Eye, MoreHorizontal, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClaimForm } from '@/components/claims/ClaimForm';
import { DocumentCard } from '@/components/claims/DocumentCard';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

// Extended document data with additional fields
const documentsData = [
  {
    id: 'DOC-2025-001',
    reportNo: 'REP-001',
    claimId: 'CLM-2025-001',
    title: 'Auto Insurance Policy',
    type: 'Policy',
    thumbnail: '/lovable-uploads/30159273-4f03-406e-aa58-c934d8e402c4.png',
    client: 'Acme Insurance Corp',
    insurer: 'Global Insurance Ltd',
    insured: 'John Smith',
    surveyer: 'Robert Johnson',
    dateOfDeputation: '2025-03-15',
    status: 'Active',
    fileSize: '2.4 MB',
    dateModified: '2025-04-18',
  },
  {
    id: 'DOC-2025-002',
    reportNo: 'REP-002',
    claimId: 'CLM-2025-002',
    title: 'Property Damage Claim',
    type: 'Claim',
    thumbnail: '/lovable-uploads/30159273-4f03-406e-aa58-c934d8e402c4.png',
    client: 'Global Protect Inc',
    insurer: 'SafeGuard Insurers',
    insured: 'Emily Williams',
    surveyer: 'Michael Brown',
    dateOfDeputation: '2025-03-18',
    status: 'Pending',
    fileSize: '5.8 MB',
    dateModified: '2025-04-15',
  },
  {
    id: 'DOC-2025-003',
    reportNo: 'REP-003',
    claimId: 'CLM-2025-003',
    title: 'Business Liability Contract',
    type: 'Contract',
    thumbnail: '/lovable-uploads/30159273-4f03-406e-aa58-c934d8e402c4.png',
    client: 'SafeGuard Ltd',
    insurer: 'Premium Insurance Co',
    insured: 'Tech Solutions Inc',
    surveyer: 'David Wilson',
    dateOfDeputation: '2025-03-20',
    status: 'Active',
    fileSize: '3.2 MB',
    dateModified: '2025-04-12',
  },
  {
    id: 'DOC-2025-004',
    reportNo: 'REP-004',
    claimId: 'CLM-2025-004',
    title: 'Health Insurance Application',
    type: 'Application',
    thumbnail: '/lovable-uploads/30159273-4f03-406e-aa58-c934d8e402c4.png',
    client: 'Secure Insurance Group',
    insurer: 'MediCare Insurance',
    insured: 'Sarah Thompson',
    surveyer: 'Jennifer Davis',
    dateOfDeputation: '2025-03-25',
    status: 'Draft',
    fileSize: '1.7 MB',
    dateModified: '2025-04-20',
  }
];

// Filter options lists
const clientOptions = [
  { value: 'Acme Insurance Corp', label: 'Acme Insurance Corp' },
  { value: 'Global Protect Inc', label: 'Global Protect Inc' },
  { value: 'SafeGuard Ltd', label: 'SafeGuard Ltd' },
  { value: 'Secure Insurance Group', label: 'Secure Insurance Group' },
];

const typeOptions = [
  { value: 'Policy', label: 'Policy' },
  { value: 'Claim', label: 'Claim' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Application', label: 'Application' },
];

const insurerOptions = [
  { value: 'Global Insurance Ltd', label: 'Global Insurance Ltd' },
  { value: 'SafeGuard Insurers', label: 'SafeGuard Insurers' },
  { value: 'Premium Insurance Co', label: 'Premium Insurance Co' },
  { value: 'MediCare Insurance', label: 'MediCare Insurance' },
];

const surveyerOptions = [
  { value: 'Robert Johnson', label: 'Robert Johnson' },
  { value: 'Michael Brown', label: 'Michael Brown' },
  { value: 'David Wilson', label: 'David Wilson' },
  { value: 'Jennifer Davis', label: 'Jennifer Davis' },
];

const statusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Draft', label: 'Draft' },
];

const timeOptions = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
];

const Claims = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Multi-select filters
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedInsurers, setSelectedInsurers] = useState<string[]>([]);
  const [selectedSurveyers, setSelectedSurveyers] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  
  const getAppliedFiltersCount = () => {
    return [
      selectedClients.length, 
      selectedTypes.length, 
      selectedInsurers.length, 
      selectedSurveyers.length, 
      selectedStatuses.length, 
      selectedTimes.length
    ].reduce((a, b) => a + b, 0);
  };
  
  const filteredDocuments = documentsData.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.claimId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.reportNo?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClient = selectedClients.length === 0 || selectedClients.includes(doc.client);
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(doc.type);
    const matchesInsurer = selectedInsurers.length === 0 || (doc.insurer && selectedInsurers.includes(doc.insurer));
    const matchesSurveyer = selectedSurveyers.length === 0 || (doc.surveyer && selectedSurveyers.includes(doc.surveyer));
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(doc.status);
    // Time filter would need additional logic for actual implementation
    const matchesTime = selectedTimes.length === 0;
    
    return matchesSearch && matchesClient && matchesType && matchesInsurer && matchesSurveyer && matchesStatus && matchesTime;
  });

  // Toggle selection of an item
  const toggleSelection = (value: string, selectedArray: string[], setFunction: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (selectedArray.includes(value)) {
      setFunction(selectedArray.filter((item) => item !== value));
    } else {
      setFunction([...selectedArray, value]);
    }
  };

  // Reset all filters
  const resetAllFilters = () => {
    setSelectedClients([]);
    setSelectedTypes([]);
    setSelectedInsurers([]);
    setSelectedSurveyers([]);
    setSelectedStatuses([]);
    setSelectedTimes([]);
    setSearchTerm('');
  };

  const renderFilterBadges = () => {
    const allBadges = [
      ...selectedClients.map(client => ({ type: 'Client', value: client })),
      ...selectedTypes.map(type => ({ type: 'Type', value: type })),
      ...selectedInsurers.map(insurer => ({ type: 'Insurer', value: insurer })),
      ...selectedSurveyers.map(surveyer => ({ type: 'Surveyer', value: surveyer })),
      ...selectedStatuses.map(status => ({ type: 'Status', value: status })),
      ...selectedTimes.map(time => ({ type: 'Time', value: time })),
    ];

    if (allBadges.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {allBadges.map((badge, index) => (
          <div 
            key={index}
            className="bg-gray-100 text-xs rounded-full px-3 py-1 flex items-center gap-1"
          >
            <span className="font-medium">{badge.type}:</span> {badge.value}
            <button 
              className="ml-1 hover:text-red-500"
              onClick={() => {
                switch(badge.type) {
                  case 'Client': 
                    setSelectedClients(selectedClients.filter(item => item !== badge.value));
                    break;
                  case 'Type': 
                    setSelectedTypes(selectedTypes.filter(item => item !== badge.value));
                    break;
                  case 'Insurer': 
                    setSelectedInsurers(selectedInsurers.filter(item => item !== badge.value));
                    break;
                  case 'Surveyer': 
                    setSelectedSurveyers(selectedSurveyers.filter(item => item !== badge.value));
                    break;
                  case 'Status': 
                    setSelectedStatuses(selectedStatuses.filter(item => item !== badge.value));
                    break;
                  case 'Time': 
                    setSelectedTimes(selectedTimes.filter(item => item !== badge.value));
                    break;
                }
              }}
            >
              ×
            </button>
          </div>
        ))}
        <button 
          className="text-xs text-blue-600 hover:underline"
          onClick={resetAllFilters}
        >
          Clear All
        </button>
      </div>
    );
  };

  const renderFilterPopoverContent = () => (
    <div className="w-[300px] p-4 space-y-6">
      <div>
        <h4 className="font-medium mb-2">Client</h4>
        <div className="space-y-2">
          {clientOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`client-${option.value}`} 
                checked={selectedClients.includes(option.value)} 
                onCheckedChange={() => toggleSelection(option.value, selectedClients, setSelectedClients)}
              />
              <label 
                htmlFor={`client-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Document Type</h4>
        <div className="space-y-2">
          {typeOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`type-${option.value}`} 
                checked={selectedTypes.includes(option.value)} 
                onCheckedChange={() => toggleSelection(option.value, selectedTypes, setSelectedTypes)}
              />
              <label 
                htmlFor={`type-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Insurer</h4>
        <div className="space-y-2">
          {insurerOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`insurer-${option.value}`} 
                checked={selectedInsurers.includes(option.value)} 
                onCheckedChange={() => toggleSelection(option.value, selectedInsurers, setSelectedInsurers)}
              />
              <label 
                htmlFor={`insurer-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Surveyer</h4>
        <div className="space-y-2">
          {surveyerOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`surveyer-${option.value}`} 
                checked={selectedSurveyers.includes(option.value)} 
                onCheckedChange={() => toggleSelection(option.value, selectedSurveyers, setSelectedSurveyers)}
              />
              <label 
                htmlFor={`surveyer-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Status</h4>
        <div className="space-y-2">
          {statusOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`status-${option.value}`} 
                checked={selectedStatuses.includes(option.value)} 
                onCheckedChange={() => toggleSelection(option.value, selectedStatuses, setSelectedStatuses)}
              />
              <label 
                htmlFor={`status-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Time Period</h4>
        <div className="space-y-2">
          {timeOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`time-${option.value}`} 
                checked={selectedTimes.includes(option.value)} 
                onCheckedChange={() => toggleSelection(option.value, selectedTimes, setSelectedTimes)}
              />
              <label 
                htmlFor={`time-${option.value}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetAllFilters}
        >
          Reset All
        </Button>
        <Button 
          size="sm" 
          className="bg-fin-blue hover:bg-fin-dark-blue"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Document Management</h1>
          <p className="text-gray-500">Showing {filteredDocuments.length} documents</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-fin-blue hover:bg-fin-dark-blue">
              <Upload className="h-4 w-4 mr-2" />
              Add Claim
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>New Claim</DialogTitle>
            </DialogHeader>
            <ClaimForm documentType="Claim" documentId="New" />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center gap-4 justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search documents..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
                {getAppliedFiltersCount() > 0 && (
                  <span className="bg-fin-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {getAppliedFiltersCount()}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0" align="end">
              {renderFilterPopoverContent()}
            </PopoverContent>
          </Popover>
          
          <div className="border rounded-md flex">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              className={viewMode === 'grid' ? 'bg-fin-blue hover:bg-fin-dark-blue rounded-r-none' : 'rounded-r-none'}
              onClick={() => setViewMode('grid')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
              </svg>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              className={viewMode === 'list' ? 'bg-fin-blue hover:bg-fin-dark-blue rounded-l-none' : 'rounded-l-none'}
              onClick={() => setViewMode('list')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      
      {renderFilterBadges()}
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document, index) => (
            <Dialog key={document.id}>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <DocumentCard document={document} viewMode="grid" serialNumber={index + 1} />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>New Claim: {document.title}</DialogTitle>
                </DialogHeader>
                <ClaimForm documentType={document.type} documentId={document.id} />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">S.No</TableHead>
                <TableHead>Report No</TableHead>
                <TableHead>Claim ID</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Insurer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((document, index) => (
                <TableRow key={document.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{document.reportNo}</TableCell>
                  <TableCell>{document.claimId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium truncate max-w-[180px]">{document.title}</p>
                        <p className="text-sm text-muted-foreground">{document.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{document.type}</TableCell>
                  <TableCell>{document.insurer}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${document.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      document.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                      {document.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>Edit Claim: {document.title}</DialogTitle>
                          </DialogHeader>
                          <ClaimForm documentType={document.type} documentId={document.id} />
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Claims;
