import React from 'react';
import { Activity, FileText, Pill, Calendar } from 'lucide-react';

interface TimelineEvent {
  id: number;
  date: string;
  type: 'appointment' | 'test' | 'medication' | 'vitals';
  title: string;
  description: string;
}

const HealthTimeline: React.FC = () => {
  const events: TimelineEvent[] = [
    { id: 1, date: '2023-04-15', type: 'appointment', title: 'Annual Checkup', description: 'General health assessment with Dr. Smith' },
    { id: 2, date: '2023-04-10', type: 'test', title: 'Blood Test Results', description: 'Cholesterol levels within normal range' },
    { id: 3, date: '2023-04-05', type: 'medication', title: 'New Prescription', description: 'Started on Lisinopril 10mg daily' },
    { id: 4, date: '2023-04-01', type: 'vitals', title: 'Blood Pressure Check', description: '120/80 mmHg' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-6 h-6 text-blue-500" />;
      case 'test':
        return <FileText className="w-6 h-6 text-green-500" />;
      case 'medication':
        return <Pill className="w-6 h-6 text-red-500" />;
      case 'vitals':
        return <Activity className="w-6 h-6 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Health Timeline</h2>
      <div className="relative">
        {events.map((event, index) => (
          <div key={event.id} className="mb-8 flex">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              {getIcon(event.type)}
            </div>
            <div className="ml-4 flex-grow">
              <div className="flex items-center mb-1">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <span className="ml-2 text-sm text-gray-500">{event.date}</span>
              </div>
              <p className="text-gray-600">{event.description}</p>
            </div>
            {index < events.length - 1 && (
              <div className="absolute top-12 left-6 w-0.5 h-full bg-gray-300 -z-10"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTimeline;