
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const faqs = [
  { 
    question: 'नया क्लेम कैसे जोड़ें?',
    answer: 'नया क्लेम जोड़ने के लिए, "क्लेम्स" पृष्ठ पर जाएं और "नया क्लेम" बटन पर क्लिक करें। फिर अपेक्षित जानकारी भरें और फॉर्म सबमिट करें।'
  },
  { 
    question: 'क्लेम रिपोर्ट कैसे डाउनलोड करें?',
    answer: 'क्लेम रिपोर्ट डाउनलोड करने के लिए, संबंधित क्लेम पर जाएं और "डाउनलोड" बटन पर क्लिक करें। आप PDF या Excel फॉर्मेट में रिपोर्ट डाउनलोड कर सकते हैं।'
  },
  { 
    question: 'कर्मचारी का विवरण कहां देखें?',
    answer: 'कर्मचारी का विवरण देखने के लिए, "कर्मचारी सूची" पृष्ठ पर जाएं और संबंधित कर्मचारी के नाम पर क्लिक करें।'
  },
  { 
    question: 'एनालिटिक्स डैशबोर्ड के बारे में अधिक जानकारी?',
    answer: 'एनालिटिक्स डैशबोर्ड पर आपको क्लेम्स, सर्वेयर्स, भुगतान और अन्य महत्वपूर्ण मेट्रिक्स के बारे में विस्तृत जानकारी मिलेगी। आप विभिन्न फिल्टर का उपयोग करके डेटा को कस्टमाइज़ कर सकते हैं।'
  },
  { 
    question: 'पासवर्ड कैसे रीसेट करें?',
    answer: 'अपना पासवर्ड रीसेट करने के लिए, लॉगिन पेज पर "पासवर्ड भूल गए?" विकल्प पर क्लिक करें और अपना ईमेल पता दर्ज करें। आपको पासवर्ड रीसेट करने के लिए एक लिंक प्राप्त होगा।'
  },
];

const categories = [
  { name: 'सामान्य प्रश्न', count: 12 },
  { name: 'क्लेम्स', count: 8 },
  { name: 'कर्मचारी', count: 5 },
  { name: 'ग्राहक', count: 7 },
  { name: 'भुगतान', count: 9 },
  { name: 'रिपोर्ट्स', count: 6 },
];

const HelpCenter = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">सहायता केंद्र</h1>
        <p className="text-gray-500">आपके प्रश्नों के उत्तर</p>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input 
          className="w-full pl-10 pr-4 py-6 rounded-lg" 
          placeholder="अपना प्रश्न खोजें..."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>अक्सर पूछे जाने वाले प्रश्न</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>श्रेणियाँ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <span>{category.name}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>सहायता चाहिए?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                यदि आप अपने प्रश्न का उत्तर नहीं ढूंढ पा रहे हैं, तो हमारी सहायता टीम से संपर्क करें।
              </p>
              <Button className="w-full">सहायता टिकट जोड़ें</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
