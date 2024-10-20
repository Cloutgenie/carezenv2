import React from 'react';
import { Users, Clock, Clipboard, MessageCircle } from 'lucide-react';

const DoctorOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center">
          <Users className="w-8 h-8 text-blue-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Today's Patients</h3>
            <p className="text-gray-600">8 Appointments</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center">
          <Clock className="w-8 h-8 text-green-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Next Appointment</h3>
            <p className="text-gray-600">In 30 minutes</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center">
          <Clipboard className="w-8 h-8 text-yellow-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Pending Reports</h3>
            <p className="text-gray-600">3 Reports to Review</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center">
          <MessageCircle className="w-8 h-8 text-red-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">New Messages</h3>
            <p className="text-gray-600">5 Unread Messages</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorOverview;