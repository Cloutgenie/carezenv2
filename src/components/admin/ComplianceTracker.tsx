import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface ComplianceItem {
  id: number;
  name: string;
  status: 'compliant' | 'pending' | 'non-compliant';
  dueDate: string;
}

const ComplianceTracker: React.FC = () => {
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([
    { id: 1, name: 'Annual Fire Safety Inspection', status: 'compliant', dueDate: '2023-12-31' },
    { id: 2, name: 'Staff Training on Infection Control', status: 'pending', dueDate: '2023-06-30' },
    { id: 3, name: 'Medication Management Audit', status: 'non-compliant', dueDate: '2023-05-15' },
    { id: 4, name: 'Emergency Preparedness Plan Update', status: 'compliant', dueDate: '2023-09-30' },
    { id: 5, name: 'Resident Rights Review', status: 'pending', dueDate: '2023-07-31' },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'non-compliant':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Compliance Tracker</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complianceItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'compliant' ? 'bg-green-100 text-green-800' :
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {getStatusIcon(item.status)}
                    <span className="ml-1">{item.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceTracker;