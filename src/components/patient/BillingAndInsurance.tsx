import React, { useState, useEffect } from 'react';
import { DollarSign, FileText, CreditCard } from 'lucide-react';

interface Bill {
  id: number;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  coverageType: string;
  expirationDate: string;
}

const BillingAndInsurance: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [insuranceInfo, setInsuranceInfo] = useState<InsuranceInfo | null>(null);

  useEffect(() => {
    // Simulating API calls to fetch billing and insurance information
    const fetchBillingInfo = () => {
      const mockBills: Bill[] = [
        { id: 1, date: '2023-04-01', description: 'Annual check-up', amount: 150, status: 'paid' },
        { id: 2, date: '2023-04-15', description: 'Lab tests', amount: 75, status: 'pending' },
        { id: 3, date: '2023-03-20', description: 'Prescription medication', amount: 50, status: 'overdue' },
      ];
      setBills(mockBills);
    };

    const fetchInsuranceInfo = () => {
      const mockInsurance: InsuranceInfo = {
        provider: 'HealthGuard Insurance',
        policyNumber: 'HG123456789',
        coverageType: 'Comprehensive',
        expirationDate: '2023-12-31',
      };
      setInsuranceInfo(mockInsurance);
    };

    fetchBillingInfo();
    fetchInsuranceInfo();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'overdue':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-6">Billing and Insurance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-blue-500" />
            Billing History
          </h3>
          <div className="space-y-4">
            {bills.map((bill) => (
              <div key={bill.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{bill.description}</p>
                  <p className="text-sm text-gray-600">{bill.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${bill.amount.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(bill.status)}`}>
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-blue-500" />
            Insurance Information
          </h3>
          {insuranceInfo && (
            <div className="border rounded-lg p-4">
              <p><strong>Provider:</strong> {insuranceInfo.provider}</p>
              <p><strong>Policy Number:</strong> {insuranceInfo.policyNumber}</p>
              <p><strong>Coverage Type:</strong> {insuranceInfo.coverageType}</p>
              <p><strong>Expiration Date:</strong> {insuranceInfo.expirationDate}</p>
            </div>
          )}
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingAndInsurance;