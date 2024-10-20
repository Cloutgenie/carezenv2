import React, { useState } from 'react';
import { CheckSquare, Square, AlertCircle } from 'lucide-react';

interface ChecklistItem {
  id: number;
  text: string;
  checked: boolean;
}

const PreAppointmentChecklist: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: 1, text: 'Ensure your device (computer, tablet, or smartphone) is charged', checked: false },
    { id: 2, text: 'Test your camera and microphone', checked: false },
    { id: 3, text: 'Find a quiet, private space for your appointment', checked: false },
    { id: 4, text: 'Prepare a list of your current medications', checked: false },
    { id: 5, text: 'Write down any questions or concerns you want to discuss', checked: false },
    { id: 6, text: 'Have your insurance information ready', checked: false },
  ]);

  const toggleItem = (id: number) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const allChecked = checklist.every(item => item.checked);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Pre-Appointment Checklist</h2>
      <p className="mb-4 text-gray-600">Please complete this checklist before your telemedicine appointment:</p>
      <ul className="space-y-2 mb-6">
        {checklist.map(item => (
          <li key={item.id} className="flex items-center">
            <button 
              onClick={() => toggleItem(item.id)}
              className="mr-2 focus:outline-none"
              aria-label={item.checked ? "Mark as uncompleted" : "Mark as completed"}
            >
              {item.checked ? (
                <CheckSquare className="w-6 h-6 text-green-500" />
              ) : (
                <Square className="w-6 h-6 text-gray-400" />
              )}
            </button>
            <span className={item.checked ? 'line-through text-gray-500' : ''}>{item.text}</span>
          </li>
        ))}
      </ul>
      {!allChecked && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm">Please complete all items on the checklist before your appointment.</p>
            </div>
          </div>
        </div>
      )}
      {allChecked && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckSquare className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm">Great job! You're all set for your telemedicine appointment.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreAppointmentChecklist;