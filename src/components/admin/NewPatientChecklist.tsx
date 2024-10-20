import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Trash, Save } from 'lucide-react';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

const NewPatientChecklist: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: 1, text: 'Complete admission paperwork', completed: false },
    { id: 2, text: 'Conduct initial health assessment', completed: false },
    { id: 3, text: 'Assign room and provide tour', completed: false },
    { id: 4, text: 'Introduce to staff and other residents', completed: false },
    { id: 5, text: 'Review facility rules and policies', completed: false },
    { id: 6, text: 'Set up medication management plan', completed: false },
  ]);

  const [newItemText, setNewItemText] = useState('');

  const toggleItem = (id: number) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addItem = () => {
    if (newItemText.trim()) {
      const newItem: ChecklistItem = {
        id: checklist.length + 1,
        text: newItemText.trim(),
        completed: false,
      };
      setChecklist([...checklist, newItem]);
      setNewItemText('');
    }
  };

  const removeItem = (id: number) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  const saveChecklist = () => {
    // In a real application, you would save this to a backend or local storage
    console.log('Saving checklist:', checklist);
    alert('Checklist saved successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">New Patient Welcome Checklist</h2>
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add new checklist item"
            className="flex-grow mr-2 p-2 border rounded-md"
          />
          <button
            onClick={addItem}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
      <ul className="space-y-2 mb-4">
        {checklist.map(item => (
          <li key={item.id} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
            <div className="flex items-center">
              <button 
                onClick={() => toggleItem(item.id)}
                className="mr-2 focus:outline-none"
              >
                {item.completed ? (
                  <CheckSquare className="w-6 h-6 text-green-500" />
                ) : (
                  <Square className="w-6 h-6 text-gray-400" />
                )}
              </button>
              <span className={item.completed ? 'line-through text-gray-500' : ''}>{item.text}</span>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={saveChecklist}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
      >
        <Save className="h-5 w-5 mr-2" />
        Save Checklist
      </button>
    </div>
  );
};

export default NewPatientChecklist;