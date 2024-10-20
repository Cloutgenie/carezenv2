import React from 'react';
import { Phone, Mail, User } from 'lucide-react';

interface CareTeamMember {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
}

const CareTeamContacts: React.FC = () => {
  // Using dummy data to ensure HIPAA compliance
  const careTeam: CareTeamMember[] = [
    { id: 1, name: 'Dr. S.', role: 'Primary Physician', phone: '(XXX) XXX-XXXX', email: 'doctor@example.com' },
    { id: 2, name: 'Nurse J.', role: 'Head Nurse', phone: '(XXX) XXX-XXXX', email: 'nurse@example.com' },
    { id: 3, name: 'T. Johnson', role: 'Physical Therapist', phone: '(XXX) XXX-XXXX', email: 'therapist@example.com' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Care Team Contacts</h2>
      <div className="space-y-6">
        {careTeam.map((member) => (
          <div key={member.id} className="border-b pb-4">
            <div className="flex items-center mb-2">
              <User className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold">{member.name}</h3>
            </div>
            <p className="text-gray-600 mb-2">{member.role}</p>
            <div className="flex items-center mb-1">
              <Phone className="w-4 h-4 text-gray-500 mr-2" />
              <p>{member.phone}</p>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-500 mr-2" />
              <p>{member.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareTeamContacts;