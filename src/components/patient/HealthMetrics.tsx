import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PlusCircle, AlertTriangle } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface HealthData {
  date: string;
  weight: number;
  bloodPressure: string;
  bloodSugar: number;
}

const HealthMetrics: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthData[]>([
    { date: '2023-03-01', weight: 70, bloodPressure: '120/80', bloodSugar: 95 },
    { date: '2023-03-15', weight: 69, bloodPressure: '118/79', bloodSugar: 92 },
    { date: '2023-04-01', weight: 68.5, bloodPressure: '115/78', bloodSugar: 90 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newData, setNewData] = useState<HealthData>({ date: '', weight: 0, bloodPressure: '', bloodSugar: 0 });
  const [alerts, setAlerts] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedHealthData = [...healthData, newData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setHealthData(updatedHealthData);
    setNewData({ date: '', weight: 0, bloodPressure: '', bloodSugar: 0 });
    setShowForm(false);
    checkForAlerts(newData);
  };

  const checkForAlerts = (data: HealthData) => {
    const newAlerts: string[] = [];
    const [systolic, diastolic] = data.bloodPressure.split('/').map(Number);

    if (systolic > 140 || diastolic > 90) {
      newAlerts.push('High blood pressure detected. Please consult your doctor.');
    }

    if (data.bloodSugar > 126) {
      newAlerts.push('High blood sugar level detected. Please monitor closely and consult your doctor.');
    }

    if (data.weight > 100) {
      newAlerts.push('Weight exceeds recommended range. Consider discussing a weight management plan with your doctor.');
    }

    setAlerts(newAlerts);
  };

  const chartData = {
    labels: healthData.map(data => data.date),
    datasets: [
      {
        label: 'Weight (kg)',
        data: healthData.map(data => data.weight),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Blood Sugar (mg/dL)',
        data: healthData.map(data => data.bloodSugar),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Health Metrics</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm flex items-center"
        >
          <PlusCircle className="w-4 h-4 mr-1" />
          Add New Data
        </button>
      </div>

      {alerts.length > 0 && (
        <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <h3 className="font-bold flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Health Alerts
          </h3>
          <ul className="list-disc list-inside">
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={newData.date}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={newData.weight || ''}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="bloodPressure"
              placeholder="Blood Pressure (e.g., 120/80)"
              value={newData.bloodPressure}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
            <input
              type="number"
              name="bloodSugar"
              placeholder="Blood Sugar (mg/dL)"
              value={newData.bloodSugar || ''}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="mt-4">
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Recent Measurements</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Pressure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Sugar (mg/dL)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {healthData.slice().reverse().map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{data.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.bloodPressure}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.bloodSugar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HealthMetrics;