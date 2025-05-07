
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { LineChart } from '@/components/charts/LineChart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data for analytics
const surveyorData = [
  { name: 'John Smith', count: 58, efficiency: 92 },
  { name: 'Sarah Johnson', count: 52, efficiency: 88 },
  { name: 'Michael Brown', count: 47, efficiency: 85 },
  { name: 'Emily Davis', count: 45, efficiency: 90 },
  { name: 'Robert Wilson', count: 39, efficiency: 82 },
];

const claimTypesData = [
  { name: 'Medical', value: 35 },
  { name: 'Auto', value: 25 },
  { name: 'Property', value: 20 },
  { name: 'Life', value: 15 },
  { name: 'Other', value: 5 },
];

const monthlyClaimsData = [
  { name: 'Jan', 'Medical': 65, 'Auto': 45, 'Property': 30 },
  { name: 'Feb', 'Medical': 59, 'Auto': 40, 'Property': 28 },
  { name: 'Mar', 'Medical': 80, 'Auto': 55, 'Property': 39 },
  { name: 'Apr', 'Medical': 81, 'Auto': 66, 'Property': 29 },
  { name: 'May', 'Medical': 56, 'Auto': 47, 'Property': 23 },
  { name: 'Jun', 'Medical': 55, 'Auto': 30, 'Property': 18 },
];

const companyData = [
  { name: 'Affinity Insurance', claims: 245, amount: 1250000 },
  { name: 'Guardian Trust', claims: 186, amount: 980000 },
  { name: 'SafeHaven Inc', claims: 132, amount: 756000 },
  { name: 'Pinnacle Partners', claims: 109, amount: 645000 },
  { name: 'Anchor Protection', claims: 98, amount: 520000 },
];

const paymentTrendData = [
  { name: 'Week 1', value: 140000 },
  { name: 'Week 2', value: 120000 },
  { name: 'Week 3', value: 180000 },
  { name: 'Week 4', value: 195000 },
  { name: 'Week 5', value: 210000 },
  { name: 'Week 6', value: 250000 },
  { name: 'Week 7', value: 220000 },
  { name: 'Week 8', value: 290000 },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-gray-500">Comprehensive data analytics and insights</p>
      </div>
      
      <Tabs defaultValue="surveyors" className="space-y-4">
        <TabsList className="grid grid-cols-4 max-w-2xl">
          <TabsTrigger value="surveyors">Surveyors</TabsTrigger>
          <TabsTrigger value="claims">Claim Types</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="surveyors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Surveyor Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Claims</TableHead>
                      <TableHead className="text-right">Efficiency (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {surveyorData.map((surveyor) => (
                      <TableRow key={surveyor.name}>
                        <TableCell>{surveyor.name}</TableCell>
                        <TableCell className="text-right">{surveyor.count}</TableCell>
                        <TableCell className="text-right">{surveyor.efficiency}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Surveyor Claims Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={surveyorData.map(s => ({ name: s.name.split(' ')[0], value: s.count }))}
                  dataKey="name"
                  barKey="value"
                  barColor="#3949ab"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="claims" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Claim Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={claimTypesData}
                  dataKey="value"
                  nameKey="name"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Monthly Claims by Type</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <BarChart
                  data={monthlyClaimsData}
                  dataKey="name"
                  barKey="Medical"
                  barColor="#3949ab"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="companies" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Insurance Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead className="text-right">Total Claims</TableHead>
                      <TableHead className="text-right">Total Amount ($)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companyData.map((company) => (
                      <TableRow key={company.name}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell className="text-right">{company.claims}</TableCell>
                        <TableCell className="text-right">${company.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Company Claims Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={companyData}
                  dataKey="name"
                  barKey="claims"
                  barColor="#3949ab"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={paymentTrendData}
                  dataKey="name"
                  lineKey="value"
                  lineColor="#3949ab"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Payments</p>
                      <p className="text-2xl font-bold">$5.4M</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Average Claim</p>
                      <p className="text-2xl font-bold">$12,500</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Highest Claim</p>
                      <p className="text-2xl font-bold">$86,000</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Lowest Claim</p>
                      <p className="text-2xl font-bold">$2,300</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
