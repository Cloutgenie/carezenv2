import React from 'react';
import { Calendar, Activity, FileText, Pill } from 'lucide-react';

const PatientOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center">
          <Calendar className="w-8 h-8 text-blue-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Next Appointment</h3>
            <p className="text-gray-600">April 15, 2023</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center">
          <Activity className="w-8 h-8 text-green-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Latest Vitals</h3>
            <p className="text-gray-600">BP: 120/80, HR: 72</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center">
          <FileText className="w-8 h-8 text-yellow-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Recent Test Results</h3>
            <p className="text-gray-600">Blood Work (03/28)</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center">
          <Pill className="w-8 h-8 text-red-500 mr-3" />
          <div>
            <h3 className="text-lg font-semibold">Medications</h3>
            <p className="text-gray-600">2 Active Prescriptions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientOverview;