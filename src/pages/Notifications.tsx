
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, CheckCircle, Clock, AlertTriangle, Info } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: "New claim submitted",
    description: "Rahul Sharma has submitted a new claim for approval",
    time: "2 hours ago",
    read: false,
    type: "claim",
    priority: "medium"
  },
  {
    id: 2,
    title: "Claim approved",
    description: "Claim #CL-2023-045 has been approved by the admin",
    time: "5 hours ago",
    read: true,
    type: "claim",
    priority: "low"
  },
  {
    id: 3,
    title: "System maintenance",
    description: "Scheduled system maintenance on May 10th at 2:00 AM IST",
    time: "1 day ago",
    read: false,
    type: "system",
    priority: "high"
  },
  {
    id: 4,
    title: "New employee registered",
    description: "Ananya Patel has been registered as a claims specialist",
    time: "2 days ago",
    read: true,
    type: "employee",
    priority: "medium"
  },
  {
    id: 5,
    title: "Critical alert",
    description: "Multiple failed login attempts detected on your account",
    time: "3 days ago",
    read: false,
    type: "security",
    priority: "high"
  },
  {
    id: 6,
    title: "Payment processed",
    description: "Payment of ₹45,000 for claim #CL-2023-032 has been processed",
    time: "3 days ago",
    read: false,
    type: "payment",
    priority: "medium"
  },
  {
    id: 7,
    title: "Report ready",
    description: "Monthly claims summary report for April is now available",
    time: "4 days ago",
    read: true,
    type: "report",
    priority: "low"
  }
];

const NotificationItem = ({ notification, onMarkAsRead }: { notification: any, onMarkAsRead: (id: number) => void }) => {
  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "medium":
        return <Info className="h-5 w-5 text-amber-500" />;
      case "low":
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className={`p-4 border-b last:border-0 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {getPriorityIcon(notification.priority)}
        </div>
        <div className="flex-1">
          <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-black'}`}>
            {notification.title}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{notification.description}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">{notification.time}</span>
            {!notification.read && (
              <Button variant="ghost" size="sm" onClick={() => onMarkAsRead(notification.id)}>
                Mark as read
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const [notificationsList, setNotificationsList] = useState(notifications);
  
  const unreadCount = notificationsList.filter(n => !n.read).length;
  
  const markAsRead = (id: number) => {
    setNotificationsList(notificationsList.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotificationsList(notificationsList.map(n => ({ ...n, read: true })));
  };
  
  const filterByType = (type: string) => {
    if (type === 'all') return notificationsList;
    return notificationsList.filter(n => n.type === type);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Bell className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-gray-500">{unreadCount} unread notifications</p>
          </div>
        </div>
        
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-5 mb-0 mx-4 mt-0">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="claim">Claims</TabsTrigger>
              <TabsTrigger value="payment">Payments</TabsTrigger>
              <TabsTrigger value="employee">Employees</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="m-0 divide-y">
              {notificationsList.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  No notifications to display
                </div>
              ) : (
                notificationsList.map(notification => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification} 
                    onMarkAsRead={markAsRead}
                  />
                ))
              )}
            </TabsContent>
            
            {["claim", "payment", "employee", "system"].map((type) => (
              <TabsContent key={type} value={type} className="m-0 divide-y">
                {filterByType(type).length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    No {type} notifications to display
                  </div>
                ) : (
                  filterByType(type).map(notification => (
                    <NotificationItem 
                      key={notification.id} 
                      notification={notification} 
                      onMarkAsRead={markAsRead}
                    />
                  ))
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
