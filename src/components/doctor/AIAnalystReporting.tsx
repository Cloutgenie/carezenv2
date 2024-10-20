import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { AlertCircle, TrendingUp, TrendingDown, Activity, Link } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const AIAnalystReporting: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [isAzuraConnected, setIsAzuraConnected] = useState(false);

  // Dummy data for AI-generated insights
  const aiInsights = [
    { id: 1, type: 'alert', message: 'Potential drug interaction detected for Patient ID 12345' },
    { id: 2, type: 'trend_up', message: 'Increase in respiratory issues among patients aged 60+' },
    { id: 3, type: 'trend_down', message: 'Decrease in average patient wait times this month' },
    { id: 4, type: 'info', message: 'New treatment protocol for diabetes showing positive results' },
  ];

  // Dummy data for charts
  const patientOutcomesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Positive Outcomes',
        data: [65, 70, 80, 81, 85, 87],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const treatmentEfficacyData = {
    labels: ['Treatment A', 'Treatment B', 'Treatment C', 'Treatment D'],
    datasets: [
      {
        label: 'Efficacy Rate (%)',
        data: [78, 82, 75, 88],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const handleAzuraConnection = () => {
    // In a real application, this would initiate the connection process with Azura AI
    setIsAzuraConnected(true);
    // You would then update the insights and chart data with Azura AI's analysis
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">AI Analyst Reporting</h2>
        <button
          onClick={handleAzuraConnection}
          className={`flex items-center px-4 py-2 rounded-md ${
            isAzuraConnected
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <Link className="w-4 h-4 mr-2" />
          {isAzuraConnected ? 'Connected to Azura AI' : 'Connect to Azura AI'}
        </button>
      </div>
      
      {/* Timeframe selector */}
      <div className="mb-6">
        <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700">Select Timeframe:</label>
        <select
          id="timeframe"
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="1W">1 Week</option>
          <option value="1M">1 Month</option>
          <option value="3M">3 Months</option>
          <option value="6M">6 Months</option>
          <option value="1Y">1 Year</option>
        </select>
      </div>

      {/* AI-generated insights */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">AI-Generated Insights</h3>
        <div className="space-y-2">
          {aiInsights.map((insight) => (
            <div key={insight.id} className="flex items-start p-3 bg-gray-50 rounded-md">
              {insight.type === 'alert' && <AlertCircle className="w-5 h-5 text-red-500 mr-2" />}
              {insight.type === 'trend_up' && <TrendingUp className="w-5 h-5 text-green-500 mr-2" />}
              {insight.type === 'trend_down' && <TrendingDown className="w-5 h-5 text-blue-500 mr-2" />}
              {insight.type === 'info' && <Activity className="w-5 h-5 text-yellow-500 mr-2" />}
              <span>{insight.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Patient Outcomes Trend</h3>
          <Line data={patientOutcomesData} />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Treatment Efficacy Comparison</h3>
          <Bar data={treatmentEfficacyData} />
        </div>
      </div>

      {/* Additional AI-driven recommendations */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">AI Recommendations</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Consider adjusting treatment plans for patients with chronic conditions based on recent outcome data.</li>
          <li>Schedule follow-up appointments for patients who haven't shown improvement in the last 30 days.</li>
          <li>Review and potentially update the protocol for Treatment D, which shows the highest efficacy rate.</li>
        </ul>
      </div>
    </div>
  );
};

export default AIAnalystReporting;