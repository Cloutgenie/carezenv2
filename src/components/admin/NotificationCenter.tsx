import React, { useState } from 'react';
import { Bell, X, Check } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: string;
  read: boolean;
}

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: 'New user registration', type: 'info', timestamp: '2023-04-15 10:30:00', read: false },
    { id: 2, message: 'System update scheduled', type: 'warning', timestamp: '2023-04-15 11:15:00', read: false },
    { id: 3, message: 'Backup completed successfully', type: 'success', timestamp: '2023-04-15 12:00:00', read: true },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Notification Center</h2>
        <button
          onClick={markAllAsRead}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Mark All as Read
        </button>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg ${
              notification.read ? 'bg-gray-100' : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <Bell className={`w-5 h-5 mr-2 ${
                  notification.type === 'info' ? 'text-blue-500' :
                  notification.type === 'warning' ? 'text-yellow-500' :
                  'text-green-500'
                }`} />
                <div>
                  <p className={`font-semibold ${notification.read ? 'text-gray-600' : 'text-gray-800'}`}>
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500">{notification.timestamp}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;