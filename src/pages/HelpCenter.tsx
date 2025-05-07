
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const faqs = [
  {
    question: "How do I create a new claim?",
    answer: "To create a new claim, navigate to the Claims page and click on the 'Add Claim' button. Fill out the required information in the form and submit it."
  },
  {
    question: "How can I view a customer's details?",
    answer: "Go to the Customer List page and find the customer you want to view. Click on the 'View Details' button on the right side of their entry to see their complete information."
  },
  {
    question: "How do I update an employee's information?",
    answer: "Visit the Employees page, find the employee whose information you want to update, and click on 'View Details'. From there, you'll be able to edit their information as needed."
  },
  {
    question: "How can I generate reports?",
    answer: "You can generate various reports from the Analytics page. Select the type of report you want, set your desired parameters, and click on 'Generate Report'."
  },
  {
    question: "How do I track the status of a claim?",
    answer: "You can track the status of any claim by going to the Claims page. Each claim has a status indicator showing whether it's pending, in progress, or completed."
  },
  {
    question: "Can I export customer data?",
    answer: "Yes, you can export customer data as CSV or PDF files. Look for the export options at the top of the Customer List page."
  }
];

const categories = [
  { name: "Account Management", count: 15 },
  { name: "Claims Processing", count: 24 },
  { name: "Customer Data", count: 18 },
  { name: "Employee Management", count: 12 },
  { name: "Reports & Analytics", count: 20 },
  { name: "System Settings", count: 9 }
];

const HelpCenter = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Help Center</h1>
        <p className="text-gray-500">Find answers and support for the Financial Management System</p>
      </div>
      
      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input 
          type="search" 
          placeholder="Search for help topics..." 
          className="pl-10 py-6 text-lg w-full" 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Help Categories</CardTitle>
              <CardDescription>Browse by topic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div key={index} className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-md cursor-pointer">
                    <span>{category.name}</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{category.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
              <CardDescription>Contact our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Our team is available Monday to Friday, 9am to 6pm.</p>
              <Button className="w-full">Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
