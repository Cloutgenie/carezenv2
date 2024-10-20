import React, { useState, useEffect } from 'react';
import { FileText, Download, Search, AlertCircle } from 'lucide-react';
import { useApi } from '../../hooks/useApi';

interface LabResult {
  id: number;
  testName: string;
  date: string;
  status: 'normal' | 'abnormal' | 'critical';
  resultSummary: string;
}

const LabResults: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: labResults, error, loading, execute } = useApi<LabResult[]>();

  useEffect(() => {
    const fetchLabResults = async () => {
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockResults: LabResult[] = [
          { id: 1, testName: 'Complete Blood Count', date: '2023-04-01', status: 'normal', resultSummary: 'All values within normal range' },
          { id: 2, testName: 'Lipid Panel', date: '2023-03-15', status: 'abnormal', resultSummary: 'Elevated LDL cholesterol' },
          { id: 3, testName: 'Thyroid Function', date: '2023-02-28', status: 'normal', resultSummary: 'TSH within normal limits' },
        ];
        return mockResults;
      } catch (error) {
        throw new Error('Failed to fetch lab results. Please try again later.');
      }
    };

    execute(fetchLabResults());
  }, [execute]);

  const filteredResults = labResults?.filter(result =>
    result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.date.includes(searchTerm)
  ) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-100';
      case 'abnormal':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Laboratory Results</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Laboratory Results</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Laboratory Results</h2>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search lab results..."
          className="w-full p-2 pl-10 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
      </div>
      {filteredResults.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          <AlertCircle className="w-16 h-16 mx-auto mb-2" />
          No results found
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResults.map((result) => (
            <div key={result.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{result.testName}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(result.status)}`}>
                  {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Date: {result.date}</p>
              <p className="mb-2">{result.resultSummary}</p>
              <button className="text-blue-500 hover:text-blue-700 flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                View Full Report
              </button>
              <button className="text-green-500 hover:text-green-700 flex items-center mt-2">
                <Download className="w-4 h-4 mr-1" />
                Download PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LabResults;