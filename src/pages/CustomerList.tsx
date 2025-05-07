
import React from 'react';
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
import { IndianRupee, Plus } from 'lucide-react';

const customers = [
  { id: 1, name: 'राहुल शर्मा', email: 'rahul.sharma@example.com', phone: '9876543210', city: 'नई दिल्ली', totalClaims: 3, totalAmount: 45000 },
  { id: 2, name: 'प्रिया पटेल', email: 'priya.patel@example.com', phone: '8765432109', city: 'मुंबई', totalClaims: 1, totalAmount: 25000 },
  { id: 3, name: 'अमित कुमार', email: 'amit.kumar@example.com', phone: '7654321098', city: 'बैंगलोर', totalClaims: 2, totalAmount: 35000 },
  { id: 4, name: 'नेहा गुप्ता', email: 'neha.gupta@example.com', phone: '6543210987', city: 'कोलकाता', totalClaims: 4, totalAmount: 75000 },
  { id: 5, name: 'संजय वर्मा', email: 'sanjay.verma@example.com', phone: '9876543211', city: 'चेन्नई', totalClaims: 1, totalAmount: 15000 },
  { id: 6, name: 'अनुराधा सिंह', email: 'anuradha.singh@example.com', phone: '8765432100', city: 'हैदराबाद', totalClaims: 2, totalAmount: 30000 },
];

const CustomerList = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">ग्राहक सूची</h1>
          <p className="text-gray-500">कुल {customers.length} ग्राहक</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          नया ग्राहक
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 py-4">
          <CardTitle className="text-lg">ग्राहक विवरण</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>नाम</TableHead>
                  <TableHead>ईमेल</TableHead>
                  <TableHead>फोन</TableHead>
                  <TableHead>शहर</TableHead>
                  <TableHead>कुल क्लेम्स</TableHead>
                  <TableHead>कुल राशि</TableHead>
                  <TableHead className="text-right">कार्य</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.city}</TableCell>
                    <TableCell>{customer.totalClaims}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <IndianRupee className="h-3.5 w-3.5" />
                      {customer.totalAmount.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">विवरण देखें</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerList;
