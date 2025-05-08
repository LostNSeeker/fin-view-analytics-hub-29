
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { File, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ClaimFormProps {
  documentType: string;
  documentId: string;
}

export const ClaimForm: React.FC<ClaimFormProps> = ({ documentType, documentId }) => {
  const [formData, setFormData] = useState({
    reportNo: documentId === 'New' ? '' : `REP-${documentId.split('-')[2] || '001'}`,
    claimId: documentId === 'New' ? '' : `CLM-${documentId.split('-')[2] || '001'}`,
    customerName: '',
    customerId: '',
    email: '',
    phone: '',
    address: '',
    claimType: documentType,
    insurer: '',
    insured: '',
    surveyer: '',
    dateOfDeputation: '',
    amount: '',
    description: '',
    incidentDate: '',
    status: 'Pending',
  });
  
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would submit the form data to your backend
    console.log('Form submitted:', formData);
    
    toast({
      title: "Claim Submitted",
      description: `Claim ${formData.claimId || documentId} has been successfully submitted.`,
      duration: 5000,
    });
  };
  
  return (
    <form className="space-y-4 py-4" onSubmit={handleSubmit}>
      <Tabs defaultValue="claim">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="claim">Claim Details</TabsTrigger>
          <TabsTrigger value="customer">Customer Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="claim" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportNo">Report No</Label>
              <Input 
                id="reportNo" 
                value={formData.reportNo} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="claimId">Claim ID</Label>
              <Input 
                id="claimId" 
                value={formData.claimId} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="claimType">Claim Type</Label>
              <Select 
                value={formData.claimType} 
                onValueChange={(value) => handleSelectChange('claimType', value)}
              >
                <SelectTrigger id="claimType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Policy">Policy</SelectItem>
                  <SelectItem value="Claim">Claim</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Application">Application</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insurer">Insurer</Label>
              <Select 
                value={formData.insurer} 
                onValueChange={(value) => handleSelectChange('insurer', value)}
              >
                <SelectTrigger id="insurer">
                  <SelectValue placeholder="Select insurer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Global Insurance Ltd">Global Insurance Ltd</SelectItem>
                  <SelectItem value="SafeGuard Insurers">SafeGuard Insurers</SelectItem>
                  <SelectItem value="Premium Insurance Co">Premium Insurance Co</SelectItem>
                  <SelectItem value="MediCare Insurance">MediCare Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="insured">Insured</Label>
              <Input 
                id="insured" 
                value={formData.insured} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Claim Amount</Label>
              <Input 
                id="amount" 
                type="number" 
                value={formData.amount} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="surveyer">Surveyer</Label>
              <Select 
                value={formData.surveyer} 
                onValueChange={(value) => handleSelectChange('surveyer', value)}
              >
                <SelectTrigger id="surveyer">
                  <SelectValue placeholder="Select surveyer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Robert Johnson">Robert Johnson</SelectItem>
                  <SelectItem value="Michael Brown">Michael Brown</SelectItem>
                  <SelectItem value="David Wilson">David Wilson</SelectItem>
                  <SelectItem value="Jennifer Davis">Jennifer Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfDeputation">Date of Deputation</Label>
              <Input 
                id="dateOfDeputation" 
                type="date" 
                value={formData.dateOfDeputation} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="incidentDate">Incident Date</Label>
              <Input 
                id="incidentDate" 
                type="date" 
                value={formData.incidentDate} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
              className="min-h-[100px]"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="customer" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input 
                id="customerName" 
                value={formData.customerName} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerId">Customer ID</Label>
              <Input 
                id="customerId" 
                value={formData.customerId} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea 
              id="address" 
              value={formData.address} 
              onChange={handleChange} 
              required 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Claim Photos/Documents</Label>
              <div className="grid grid-cols-1 gap-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <File className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Drag files here or click to upload</p>
                  <Input id="file" type="file" className="hidden" />
                  <Button type="button" variant="outline" size="sm" className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit" className="bg-fin-blue hover:bg-fin-dark-blue">Submit Claim</Button>
      </div>
    </form>
  );
};
