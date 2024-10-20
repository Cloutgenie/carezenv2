import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface Log {
  id: number;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
}

const SystemLogs: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([
    { id: 1, timestamp: '2023-04-15 10:30:00', level: 'info', message: 'User login successful' },
    { id: 2, timestamp: '2023-04-15 11:15:00', level: 'warning', message: 'High CPU usage detected' },
    { id: 3, timestamp: '2023-04-15 12:00:00', level: 'error', message: 'Database connection failed' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(log =>
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.timestamp.includes(searchTerm)
  );

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">System Logs</h2>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search logs..."
          className="w-full p-2 pl-8 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-2 top-2.5 text-gray-400" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    log.level === 'info' ? 'bg-blue-100 text-blue-800' :
                    log.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {getLogIcon(log.level)}
                    <span className="ml-1">{log.level}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SystemLogs;