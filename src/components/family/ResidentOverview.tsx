import React from 'react';
import { User, Calendar, Activity, FileText } from 'lucide-react';

const ResidentOverview: React.FC = () => {
  // Using dummy data to ensure HIPAA compliance
  const residentInfo = {
    name: "J. D.",
    age: "70-75",
    room: "2XX",
    lastCheckup: "Last Week",
    nextAppointment: "Next Week",
    recentActivity: "Participated in group activity",
    medicationChanges: "No recent changes"
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Resident Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <User className="w-12 h-12 text-blue-500 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">{residentInfo.name}</h3>
            <p className="text-gray-600">Age Range: {residentInfo.age} | Room: {residentInfo.room}</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold flex items-center"><Calendar className="w-5 h-5 mr-2 text-blue-500" /> Appointments</h4>
          <p>Last Checkup: {residentInfo.lastCheckup}</p>
          <p>Next Appointment: {residentInfo.nextAppointment}</p>
        </div>
        <div>
          <h4 className="font-semibold flex items-center"><Activity className="w-5 h-5 mr-2 text-blue-500" /> Recent Activity</h4>
          <p>{residentInfo.recentActivity}</p>
        </div>
        <div>
          <h4 className="font-semibold flex items-center"><FileText className="w-5 h-5 mr-2 text-blue-500" /> Medication Updates</h4>
          <p>{residentInfo.medicationChanges}</p>
        </div>
      </div>
    </div>
  );
};

export default ResidentOverview;