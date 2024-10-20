import React from 'react';
import { Bell, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface Notification {
  id: number;
  type: 'info' | 'warning' | 'success';
  message: string;
  date: string;
}

const FamilyNotifications: React.FC = () => {
  // This would typically come from an API
  const notifications: Notification[] = [
    { id: 1, type: 'info', message: 'Upcoming family event this weekend', date: '2023-04-15' },
    { id: 2, type: 'warning', message: 'Medication schedule updated', date: '2023-04-14' },
    { id: 3, type: 'success', message: 'Health check-up completed successfully', date: '2023-04-13' },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start border-b pb-2">
            <div className="mr-4">
              {getNotificationIcon(notification.type)}
            </div>
            <div>
              <p className="font-semibold">{notification.message}</p>
              <p className="text-sm text-gray-600">{notification.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyNotifications;