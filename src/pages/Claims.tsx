
import React, { useState } from 'react';
import { Search, Filter, Upload, Download, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const Claims = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');
  const [selectedInsurer, setSelectedInsurer] = useState('all');
  const [selectedSurveyer, setSelectedSurveyer] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const filteredDocuments = documentsData.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.claimId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.reportNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = selectedClient === 'all' || doc.client.includes(selectedClient);
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    const matchesInsurer = selectedInsurer === 'all' || doc.insurer.includes(selectedInsurer);
    const matchesSurveyer = selectedSurveyer === 'all' || doc.surveyer.includes(selectedSurveyer);
    
    return matchesSearch && matchesClient && matchesType && matchesStatus && matchesInsurer && matchesSurveyer;
  });

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
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-1">
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              <SelectItem value="Acme">Acme Insurance Corp</SelectItem>
              <SelectItem value="Global">Global Protect Inc</SelectItem>
              <SelectItem value="SafeGuard">SafeGuard Ltd</SelectItem>
              <SelectItem value="Secure">Secure Insurance Group</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-1">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Policy">Policy</SelectItem>
              <SelectItem value="Claim">Claim</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Application">Application</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-1">
          <Select value={selectedInsurer} onValueChange={setSelectedInsurer}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Insurers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Insurers</SelectItem>
              <SelectItem value="Global">Global Insurance Ltd</SelectItem>
              <SelectItem value="SafeGuard">SafeGuard Insurers</SelectItem>
              <SelectItem value="Premium">Premium Insurance Co</SelectItem>
              <SelectItem value="MediCare">MediCare Insurance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-1">
          <Select value={selectedSurveyer} onValueChange={setSelectedSurveyer}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Surveyers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Surveyers</SelectItem>
              <SelectItem value="Robert">Robert Johnson</SelectItem>
              <SelectItem value="Michael">Michael Brown</SelectItem>
              <SelectItem value="David">David Wilson</SelectItem>
              <SelectItem value="Jennifer">Jennifer Davis</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-1">
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-1">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            setSearchTerm('');
            setSelectedClient('all');
            setSelectedType('all');
            setSelectedStatus('all');
            setSelectedTime('all');
            setSelectedInsurer('all');
            setSelectedSurveyer('all');
          }}>
            Reset Filters
          </Button>
          <Button variant="default" size="sm" className="bg-fin-blue hover:bg-fin-dark-blue">
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
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
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <Dialog key={document.id}>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <DocumentCard document={document} viewMode="grid" />
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
                <TableHead>Report No</TableHead>
                <TableHead>Claim ID</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Insurer</TableHead>
                <TableHead>Insured</TableHead>
                <TableHead>Surveyer</TableHead>
                <TableHead>Deputation Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((document) => (
                <TableRow key={document.id} className="hover:bg-muted/50">
                  <TableCell>{document.reportNo}</TableCell>
                  <TableCell>{document.claimId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium">{document.type.substring(0, 1)}</span>
                      </div>
                      <div>
                        <p className="font-medium truncate max-w-[180px]">{document.title}</p>
                        <p className="text-sm text-muted-foreground">{document.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{document.type}</TableCell>
                  <TableCell>{document.insurer}</TableCell>
                  <TableCell>{document.insured}</TableCell>
                  <TableCell>{document.surveyer}</TableCell>
                  <TableCell>{document.dateOfDeputation}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${document.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      document.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                      {document.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
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
