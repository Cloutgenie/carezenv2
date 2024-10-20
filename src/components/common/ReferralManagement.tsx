import React, { useState } from 'react';
import { User, Briefcase, Calendar, ArrowRight } from 'lucide-react';

interface Referral {
  id: number;
  patientName: string;
  referredFrom: string;
  referredTo: string;
  reason: string;
  status: 'pending' | 'accepted' | 'declined';
  date: string;
}

const ReferralManagement: React.FC = () => {
  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: 1,
      patientName: 'John Doe',
      referredFrom: 'Dr. Smith (OB)',
      referredTo: 'Dr. Johnson (Orthopedics)',
      reason: 'Persistent joint pain',
      status: 'pending',
      date: '2023-04-20',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      referredFrom: 'HealthGuard Insurance',
      referredTo: 'Dr. Brown (Cardiology)',
      reason: 'Routine heart checkup',
      status: 'accepted',
      date: '2023-04-18',
    },
  ]);

  const [newReferral, setNewReferral] = useState<Omit<Referral, 'id' | 'status'>>({
    patientName: '',
    referredFrom: '',
    referredTo: '',
    reason: '',
    date: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReferral({ ...newReferral, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = referrals.length + 1;
    setReferrals([...referrals, { ...newReferral, id, status: 'pending' }]);
    setNewReferral({ patientName: '', referredFrom: '', referredTo: '', reason: '', date: '' });
  };

  const handleStatusChange = (id: number, newStatus: 'accepted' | 'declined') => {
    setReferrals(referrals.map(referral => 
      referral.id === id ? { ...referral, status: newStatus } : referral
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Referral Management</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient Name</label>
            <input
              type="text"
              name="patientName"
              id="patientName"
              value={newReferral.patientName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="referredFrom" className="block text-sm font-medium text-gray-700">Referred From</label>
            <input
              type="text"
              name="referredFrom"
              id="referredFrom"
              value={newReferral.referredFrom}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="referredTo" className="block text-sm font-medium text-gray-700">Referred To</label>
            <input
              type="text"
              name="referredTo"
              id="referredTo"
              value={newReferral.referredTo}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={newReferral.date}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Referral</label>
          <textarea
            name="reason"
            id="reason"
            value={newReferral.reason}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          ></textarea>
        </div>
        <div className="mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Create Referral
          </button>
        </div>
      </form>
      <div>
        <h3 className="text-lg font-medium mb-2">Recent Referrals</h3>
        <ul className="space-y-4">
          {referrals.map((referral) => (
            <li key={referral.id} className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{referral.patientName}</p>
                  <p className="text-sm text-gray-600">
                    <User className="inline-block w-4 h-4 mr-1" />
                    From: {referral.referredFrom}
                  </p>
                  <p className="text-sm text-gray-600">
                    <Briefcase className="inline-block w-4 h-4 mr-1" />
                    To: {referral.referredTo}
                  </p>
                  <p className="text-sm text-gray-600">
                    <Calendar className="inline-block w-4 h-4 mr-1" />
                    Date: {referral.date}
                  </p>
                  <p className="text-sm mt-2">{referral.reason}</p>
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    referral.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    referral.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                  </span>
                </div>
              </div>
              {referral.status === 'pending' && (
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleStatusChange(referral.id, 'accepted')}
                    className="bg-green-500 text-white px-2 py-1 rounded-md text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(referral.id, 'declined')}
                    className="bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                  >
                    Decline
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReferralManagement;