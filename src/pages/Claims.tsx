
import React, { useState } from 'react';
import { Search, Filter, Upload, Download, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClaimForm } from '@/components/claims/ClaimForm';
import { DocumentCard } from '@/components/claims/DocumentCard';

// Sample document data
const documentsData = [
  {
    id: 'DOC-2025-001',
    title: 'Auto Insurance Policy',
    type: 'Policy',
    thumbnail: '/lovable-uploads/30159273-4f03-406e-aa58-c934d8e402c4.png',
    client: 'Acme Insurance Corp',
    status: 'Active',
    fileSize: '2.4 MB',
    dateModified: '2025-04-18',
  },
  {
    id: 'DOC-2025-002',
    title: 'Property Damage Claim',
    type: 'Claim',
    thumbnail: '/lovable-uploads/30159273-4f03-406e-aa58-c934d8e402c4.png',
    client: 'Global Protect Inc',
    status: 'Pending',
    fileSize: '5.8 MB',
    dateModified: '2025-04-15',
  },
  {
    id: 'DOC-2025-003',
    title: 'Business Liability Contract',
    type: 'Contract',
    thumbnail: '/lovable-uploads/30159273-4f03-406e-aa58-c934d8e402c4.png',
    client: 'SafeGuard Ltd',
    status: 'Active',
    fileSize: '3.2 MB',
    dateModified: '2025-04-12',
  },
  {
    id: 'DOC-2025-004',
    title: 'Health Insurance Application',
    type: 'Application',
    thumbnail: '/lovable-uploads/30159273-4f03-406e-aa58-c934d8e402c4.png',
    client: 'Secure Insurance Group',
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
  const [viewMode, setViewMode] = useState('grid');
  
  const filteredDocuments = documentsData.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = selectedClient === 'all' || doc.client.includes(selectedClient);
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    return matchesSearch && matchesClient && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Document Management</h1>
          <p className="text-gray-500">Showing {filteredDocuments.length} documents</p>
        </div>
        
        <Button className="bg-fin-blue hover:bg-fin-dark-blue">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <Button variant="outline" size="sm" onClick={() => setSearchTerm('')}>
            Reset Filters
          </Button>
          <Button variant="default" size="sm" className="bg-fin-blue hover:bg-fin-dark-blue">
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
      
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredDocuments.map((document) => (
          <Dialog key={document.id}>
            <DialogTrigger asChild>
              <div className="cursor-pointer">
                <DocumentCard document={document} viewMode={viewMode} />
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
    </div>
  );
};

export default Claims;
