import React from 'react';
import { Activity, Users, Stethoscope, Calendar } from 'lucide-react';

interface ActivityItem {
  id: number;
  date: string;
  description: string;
  type: 'exercise' | 'social' | 'medical' | 'other';
}

const ActivityLog: React.FC = () => {
  // Using dummy data to ensure HIPAA compliance
  const activities: ActivityItem[] = [
    { id: 1, date: 'Today', description: 'Participated in group activity', type: 'exercise' },
    { id: 2, date: 'Yesterday', description: 'Attended social event', type: 'social' },
    { id: 3, date: '2 days ago', description: 'Routine health check', type: 'medical' },
    { id: 4, date: '3 days ago', description: 'Family visit', type: 'social' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'exercise':
        return <Activity className="w-5 h-5 text-green-500" />;
      case 'social':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'medical':
        return <Stethoscope className="w-5 h-5 text-red-500" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Activity Log</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start border-b pb-2">
            <div className="mr-4">
              {getActivityIcon(activity.type)}
            </div>
            <div>
              <p className="font-semibold">{activity.description}</p>
              <p className="text-sm text-gray-600">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;