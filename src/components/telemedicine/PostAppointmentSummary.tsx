import React, { useState } from 'react';
import { FileText, Download, Send } from 'lucide-react';

interface AppointmentSummary {
  doctorName: string;
  patientName: string;
  date: string;
  diagnosis: string;
  treatment: string;
  followUp: string;
  notes: string;
}

const PostAppointmentSummary: React.FC = () => {
  const [summary, setSummary] = useState<AppointmentSummary>({
    doctorName: 'Dr. Jane Smith',
    patientName: 'John Doe',
    date: '2023-04-15',
    diagnosis: 'Seasonal allergies',
    treatment: 'Prescribed antihistamines and nasal spray',
    followUp: 'Follow up in 2 weeks if symptoms persist',
    notes: 'Patient reported improvement in sleep after previous treatment'
  });

  const handleDownload = () => {
    // In a real application, this would generate a PDF or other document format
    console.log('Downloading summary...');
    alert('Summary downloaded successfully!');
  };

  const handleSendToPatient = () => {
    // In a real application, this would send the summary to the patient's email or patient portal
    console.log('Sending summary to patient...');
    alert('Summary sent to patient successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Post-Appointment Summary</h2>
      <div className="space-y-4">
        <div>
          <p className="font-semibold">Doctor:</p>
          <p>{summary.doctorName}</p>
        </div>
        <div>
          <p className="font-semibold">Patient:</p>
          <p>{summary.patientName}</p>
        </div>
        <div>
          <p className="font-semibold">Date:</p>
          <p>{summary.date}</p>
        </div>
        <div>
          <p className="font-semibold">Diagnosis:</p>
          <p>{summary.diagnosis}</p>
        </div>
        <div>
          <p className="font-semibold">Treatment:</p>
          <p>{summary.treatment}</p>
        </div>
        <div>
          <p className="font-semibold">Follow-up:</p>
          <p>{summary.followUp}</p>
        </div>
        <div>
          <p className="font-semibold">Additional Notes:</p>
          <p>{summary.notes}</p>
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Summary
        </button>
        <button
          onClick={handleSendToPatient}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out flex items-center"
        >
          <Send className="w-5 h-5 mr-2" />
          Send to Patient
        </button>
      </div>
    </div>
  );
};

export default PostAppointmentSummary;