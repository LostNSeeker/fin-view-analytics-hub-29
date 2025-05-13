
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IndianRupee, Plus, CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const customers = [
  { 
    id: 1, 
    name: 'Rahul Sharma', 
    email: 'rahul.sharma@example.com', 
    phone: '9876543210', 
    city: 'New Delhi', 
    totalClaims: 3, 
    totalAmount: 45000, 
    joinDate: new Date('2023-03-15') 
  },
  { 
    id: 2, 
    name: 'Priya Patel', 
    email: 'priya.patel@example.com', 
    phone: '8765432109', 
    city: 'Mumbai', 
    totalClaims: 1, 
    totalAmount: 25000, 
    joinDate: new Date('2023-04-22') 
  },
  { 
    id: 3, 
    name: 'Amit Kumar', 
    email: 'amit.kumar@example.com', 
    phone: '7654321098', 
    city: 'Bangalore', 
    totalClaims: 2, 
    totalAmount: 35000, 
    joinDate: new Date('2023-02-10') 
  },
  { 
    id: 4, 
    name: 'Neha Gupta', 
    email: 'neha.gupta@example.com', 
    phone: '6543210987', 
    city: 'Kolkata', 
    totalClaims: 4, 
    totalAmount: 75000, 
    joinDate: new Date('2023-01-05') 
  },
  { 
    id: 5, 
    name: 'Sanjay Verma', 
    email: 'sanjay.verma@example.com', 
    phone: '9876543211', 
    city: 'Chennai', 
    totalClaims: 1, 
    totalAmount: 15000, 
    joinDate: new Date('2023-05-30') 
  },
  { 
    id: 6, 
    name: 'Anuradha Singh', 
    email: 'anuradha.singh@example.com', 
    phone: '8765432100', 
    city: 'Hyderabad', 
    totalClaims: 2, 
    totalAmount: 30000, 
    joinDate: new Date('2023-06-12') 
  },
];

const customerFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number should be at least 10 digits" }),
  city: z.string().min(2, { message: "City is required" }),
});

const CustomerList = () => {
  const [isNewCustomerOpen, setIsNewCustomerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  
  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
    },
  });

  // Filter customers based on search term and date range
  const filteredCustomers = customers.filter(customer => {
    // Search filter
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    
    // Date range filter
    let matchesDateRange = true;
    if (dateRange.from || dateRange.to) {
      const customerDate = customer.joinDate;
      
      if (dateRange.from && dateRange.to) {
        matchesDateRange = customerDate >= dateRange.from && customerDate <= dateRange.to;
      } else if (dateRange.from) {
        matchesDateRange = customerDate >= dateRange.from;
      } else if (dateRange.to) {
        matchesDateRange = customerDate <= dateRange.to;
      }
    }
    
    return matchesSearch && matchesDateRange;
  });

  const onSubmit = (data: z.infer<typeof customerFormSchema>) => {
    // Here you would typically save the new customer data
    console.log("New customer data:", data);
    setIsNewCustomerOpen(false);
    form.reset();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateRange({ from: undefined, to: undefined });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customer List</h1>
          <p className="text-gray-500">Total {filteredCustomers.length} customers</p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setIsNewCustomerOpen(true)}>
          <Plus className="h-4 w-4" />
          New Customer
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left",
                dateRange.from && "text-primary"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "MMM d, yyyy")
                )
              ) : (
                <span>Filter by date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className={cn("p-3 pointer-events-auto")}
            />
            <div className="p-3 border-t border-border flex justify-between">
              <Button variant="ghost" size="sm" onClick={clearFilters}>Clear</Button>
              <Button size="sm" onClick={() => document.body.click()}>Apply</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 py-4">
          <CardTitle className="text-lg">Customer Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Total Claims</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.city}</TableCell>
                    <TableCell>{format(customer.joinDate, "MMM d, yyyy")}</TableCell>
                    <TableCell>{customer.totalClaims}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <IndianRupee className="h-3.5 w-3.5" />
                      {customer.totalAmount.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isNewCustomerOpen} onOpenChange={setIsNewCustomerOpen}>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="customer@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="10-digit mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Customer's city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <Button type="submit">Add Customer</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerList;
