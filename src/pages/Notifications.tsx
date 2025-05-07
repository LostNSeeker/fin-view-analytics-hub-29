
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, File, IndianRupee, Users, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const notifications = [
  {
    id: 1,
    type: 'claim',
    title: 'नया क्लेम अनुरोध प्राप्त हुआ',
    description: 'अमित शर्मा ने एक नया क्लेम अनुरोध जमा किया है। कृपया समीक्षा करें।',
    time: '10 मिनट पहले',
    read: false,
    icon: File
  },
  {
    id: 2,
    type: 'payment',
    title: '₹45,000 का भुगतान प्राप्त हुआ',
    description: 'प्रिया पटेल के क्लेम #3542 के लिए भुगतान सफलतापूर्वक प्राप्त हुआ है।',
    time: '2 घंटे पहले',
    read: false,
    icon: IndianRupee
  },
  {
    id: 3,
    type: 'user',
    title: 'नया कर्मचारी जोड़ा गया',
    description: 'संजय वर्मा को सिस्टम में नए कर्मचारी के रूप में जोड़ा गया है।',
    time: '5 घंटे पहले',
    read: true,
    icon: Users
  },
  {
    id: 4,
    type: 'claim',
    title: 'क्लेम अनुरोध अपडेट किया गया',
    description: 'अनुराधा सिंह के क्लेम #3245 में अपडेट किया गया है। कृपया समीक्षा करें।',
    time: '1 दिन पहले',
    read: true,
    icon: File
  },
  {
    id: 5,
    type: 'payment',
    title: '₹25,000 का भुगतान प्रक्रियाधीन',
    description: 'राहुल शर्मा के क्लेम #3656 के लिए भुगतान प्रक्रिया में है।',
    time: '2 दिन पहले',
    read: true,
    icon: IndianRupee
  }
];

const NotificationItem = ({ notification }) => {
  const IconComponent = notification.icon;
  
  return (
    <div className={`p-4 ${notification.read ? '' : 'bg-blue-50'} hover:bg-gray-50`}>
      <div className="flex gap-4">
        <div className={`flex-shrink-0 h-10 w-10 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-blue-100'} flex items-center justify-center`}>
          <IconComponent className={`h-5 w-5 ${notification.read ? 'text-gray-600' : 'text-blue-600'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <p className={`text-sm font-medium ${notification.read ? 'text-gray-900' : 'text-blue-900'}`}>
              {notification.title}
            </p>
            <p className="text-xs text-gray-500">
              {notification.time}
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">नोटिफिकेशन</h1>
          <p className="text-gray-500">{notifications.length} नोटिफिकेशन, {unreadCount} अपठित</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            सभी पढ़े हुए के रूप में चिह्नित करें
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-600 hover:text-red-700">
            <X className="h-4 w-4" />
            सभी साफ़ करें
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <NotificationItem notification={notification} />
              {index < notifications.length - 1 && <Separator />}
            </React.Fragment>
          ))}
          {notifications.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">कोई नोटिफिकेशन नहीं</h3>
              <p className="text-gray-500 text-sm mt-1">आपके पास कोई अपठित नोटिफिकेशन नहीं है</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
