import React, { useState, useEffect } from 'react';
import { FileText, Download } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const MedicalRecords: React.FC = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    const fetchRecords = async () => {
      try {
        // Replace this with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockRecords = [
          { id: 1, date: '2023-03-15', doctor: 'Dr. Jane Smith', type: 'Annual Checkup' },
          { id: 2, date: '2023-02-01', doctor: 'Dr. John Doe', type: 'Blood Test Results' },
          { id: 3, date: '2022-11-20', doctor: 'Dr. Emily Brown', type: 'X-Ray Report' },
        ];
        setRecords(mockRecords);
      } catch (error) {
        console.error('Error fetching medical records:', error);
        // Handle error (e.g., show error message)
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Medical Records</h2>
      <div className="space-y-4">
        {records.map((record) => (
          <div key={record.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-blue-500 mr-3" />
              <div>
                <p className="font-medium">{record.type}</p>
                <p className="text-sm text-gray-600">{record.date} - {record.doctor}</p>
              </div>
            </div>
            <button className="flex items-center text-blue-500 hover:text-blue-700">
              <Download className="w-4 h-4 mr-1" />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;