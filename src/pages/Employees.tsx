
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart } from '@/components/charts/BarChart';
import { User, UserPlus, Plus } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Sample employee data
const employeesData = [
  {
    id: 'EMP-001',
    name: 'John Smith',
    position: 'Senior Claims Adjuster',
    email: 'john.smith@finview.com',
    phone: '(555) 123-4567',
    claims: 58,
    performance: 95,
    insurance: 'Guardian Trust',
    poc: 'Sarah Johnson',
    broker: 'Anchor Protection'
  },
  {
    id: 'EMP-002',
    name: 'Emily Davis',
    position: 'Claims Specialist',
    email: 'emily.davis@finview.com',
    phone: '(555) 234-5678',
    claims: 45,
    performance: 90,
    insurance: 'Affinity Insurance',
    poc: 'Michael Brown',
    broker: 'Pinnacle Partners'
  },
  {
    id: 'EMP-003',
    name: 'Robert Wilson',
    position: 'Claims Analyst',
    email: 'robert.wilson@finview.com',
    phone: '(555) 345-6789',
    claims: 39,
    performance: 82,
    insurance: 'SafeHaven Inc',
    poc: 'Jessica White',
    broker: 'Guardian Trust'
  },
  {
    id: 'EMP-004',
    name: 'Jessica White',
    position: 'Senior Claims Analyst',
    email: 'jessica.white@finview.com',
    phone: '(555) 456-7890',
    claims: 52,
    performance: 88,
    insurance: 'Pinnacle Partners',
    poc: 'Robert Wilson',
    broker: 'SafeHaven Inc'
  },
  {
    id: 'EMP-005',
    name: 'Michael Brown',
    position: 'Claims Adjuster',
    email: 'michael.brown@finview.com',
    phone: '(555) 567-8901',
    claims: 47,
    performance: 85,
    insurance: 'Anchor Protection',
    poc: 'Emily Davis',
    broker: 'Affinity Insurance'
  },
];

const monthlyClaimsData = [
  { name: 'Jan', claims: 10 },
  { name: 'Feb', claims: 8 },
  { name: 'Mar', claims: 12 },
  { name: 'Apr', claims: 15 },
  { name: 'May', claims: 9 },
  { name: 'Jun', claims: 4 },
];

const employeeFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  position: z.string().min(2, { message: "Position is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  insurance: z.string().optional(),
  poc: z.string().optional(),
  broker: z.string().optional(),
});

const EmployeeDetails = ({ employee }: { employee: any }) => {
  return (
    <Tabs defaultValue="details">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="details">Employee Details</TabsTrigger>
        <TabsTrigger value="claims">Claims Activity</TabsTrigger>
        <TabsTrigger value="poc">POC Details</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="space-y-4 py-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            <div className="h-32 w-32 rounded-full flex items-center justify-center bg-fin-blue">
              <User className="h-16 w-16 text-white" />
            </div>
            <h3 className="mt-4 font-semibold text-xl">{employee.name}</h3>
            <p className="text-gray-500">{employee.position}</p>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="font-medium">{employee.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{employee.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{employee.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Performance Score</p>
                <p className="font-medium">{employee.performance}%</p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="claims" className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Claims Processed</CardTitle>
              <CardDescription>Total claims: {employee.claims}</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={monthlyClaimsData}
                dataKey="name"
                barKey="claims"
                barColor="#3949ab"
                height={250}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Claims Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Processed Claims</p>
                    <p className="text-2xl font-bold">{employee.claims}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Approval Rate</p>
                    <p className="text-2xl font-bold">{Math.floor(employee.performance * 0.8)}%</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Average Processing</p>
                    <p className="text-2xl font-bold">{Math.floor(Math.random() * 3) + 2} days</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Performance</p>
                    <p className="text-2xl font-bold">{employee.performance}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="poc" className="space-y-4 py-4">
        <Card>
          <CardHeader>
            <CardTitle>Point of Contact Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Insurance Company</p>
                <p className="font-medium">{employee.insurance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Point of Contact</p>
                <p className="font-medium">{employee.poc}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Broker/Agent</p>
                <p className="font-medium">{employee.broker}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  
  const filteredEmployees = employeesData.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const openEmployeeDetails = (employee: any) => {
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const form = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      name: "",
      position: "",
      email: "",
      phone: "",
      insurance: "",
      poc: "",
      broker: "",
    },
  });

  const onSubmit = (data: z.infer<typeof employeeFormSchema>) => {
    // Here you would typically save the new employee data
    console.log("New employee data:", data);
    setIsAddEmployeeOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-gray-500">Manage employee information and claims performance</p>
        </div>

        <Button 
          className="flex items-center gap-2" 
          onClick={() => setIsAddEmployeeOpen(true)}
        >
          <UserPlus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>
      
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80"
        />
      </div>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Claims</TableHead>
              <TableHead className="text-right">Performance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell className="text-right">{employee.claims}</TableCell>
                <TableCell className="text-right">{employee.performance}%</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEmployeeDetails(employee)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Employee Information</DialogTitle>
          </DialogHeader>
          {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
        </DialogContent>
      </Dialog>

      <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
        <DialogContent className="sm:max-w-[475px]">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
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
                      <Input placeholder="Employee name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Job title" {...field} />
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
                      <Input placeholder="employee@finview.com" {...field} />
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
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="insurance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Insurance provider" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="poc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Point of Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="POC name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="broker"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Broker/Agent</FormLabel>
                    <FormControl>
                      <Input placeholder="Broker name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <Button type="submit">Add Employee</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
