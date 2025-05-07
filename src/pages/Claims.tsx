
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, File, Plus } from 'lucide-react';

// Sample claims data
const claimsData = Array.from({ length: 15 }, (_, i) => ({
  id: `CL-${10001 + i}`,
  customer: `Customer ${String.fromCharCode(65 + (i % 26))}`,
  type: i % 3 === 0 ? 'Medical' : i % 3 === 1 ? 'Auto' : 'Property',
  amount: Math.floor(Math.random() * 10000) + 500,
  status: i % 4 === 0 ? 'Approved' : i % 4 === 1 ? 'Pending' : i % 4 === 2 ? 'Under Review' : 'Rejected',
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
}));

const ClaimForm = () => {
  return (
    <form className="space-y-4 py-4">
      <Tabs defaultValue="customer">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customer">Customer Details</TabsTrigger>
          <TabsTrigger value="claim">Claim Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="customer" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input id="customer-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-id">Customer ID</Label>
              <Input id="customer-id" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" />
          </div>
        </TabsContent>
        <TabsContent value="claim" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="claim-type">Claim Type</Label>
              <Select>
                <SelectTrigger id="claim-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="property">Property</SelectItem>
                  <SelectItem value="life">Life</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Claim Amount</Label>
              <Input id="amount" type="number" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="incident-date">Incident Date</Label>
            <Input id="incident-date" type="date" />
          </div>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Claim Photos/Documents</Label>
              <div className="grid grid-cols-1 gap-4">
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <File className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Drag files here or click to upload</p>
                  <Input id="file" type="file" className="hidden" />
                  <Button variant="outline" size="sm" className="mt-2">Browse Files</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Submit Claim</Button>
      </div>
    </form>
  );
};

const Claims = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const filteredClaims = claimsData.filter((claim) => {
    const matchesSearch =
      claim.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    const matchesType = typeFilter === 'all' || claim.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Claims Management</h1>
        <p className="text-gray-500">View and manage all insurance claims</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <Input
            placeholder="Search claims..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80"
          />
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter" className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger id="type-filter" className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Medical">Medical</SelectItem>
                <SelectItem value="Auto">Auto</SelectItem>
                <SelectItem value="Property">Property</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-fin-blue hover:bg-fin-dark-blue">
              <Plus className="h-4 w-4 mr-2" />
              Add Claim
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Claim</DialogTitle>
            </DialogHeader>
            <ClaimForm />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Claim ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClaims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell className="font-medium">{claim.id}</TableCell>
                <TableCell>{claim.customer}</TableCell>
                <TableCell>{claim.type}</TableCell>
                <TableCell className="text-right">${claim.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    claim.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {claim.status}
                  </span>
                </TableCell>
                <TableCell>{claim.date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Claims;
