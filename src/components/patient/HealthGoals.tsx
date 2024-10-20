import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, CheckCircle } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  targetDate: string;
  progress: number;
  completed: boolean;
}

const HealthGoals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({ title: '', targetDate: '' });
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  useEffect(() => {
    // Simulating API call to fetch goals
    const fetchGoals = () => {
      const mockGoals: Goal[] = [
        { id: 1, title: 'Lose 10 pounds', targetDate: '2023-06-30', progress: 30, completed: false },
        { id: 2, title: 'Exercise 3 times a week', targetDate: '2023-05-31', progress: 66, completed: false },
        { id: 3, title: 'Reduce blood pressure to 120/80', targetDate: '2023-07-31', progress: 50, completed: false },
      ];
      setGoals(mockGoals);
    };

    fetchGoals();
  }, []);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.title && newGoal.targetDate) {
      setGoals([...goals, { ...newGoal, id: Date.now(), progress: 0, completed: false }]);
      setNewGoal({ title: '', targetDate: '' });
    }
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
  };

  const handleUpdateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGoal) {
      setGoals(goals.map(g => g.id === editingGoal.id ? editingGoal : g));
      setEditingGoal(null);
    }
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Health Goals</h2>
      <form onSubmit={handleAddGoal} className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            placeholder="Enter a new goal"
            className="flex-grow p-2 border rounded-md"
            required
          />
          <input
            type="date"
            value={newGoal.targetDate}
            onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
            className="p-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Goal
          </button>
        </div>
      </form>
      <div className="space-y-4">
        {goals.map(goal => (
          <div key={goal.id} className="border rounded-lg p-4">
            {editingGoal && editingGoal.id === goal.id ? (
              <form onSubmit={handleUpdateGoal} className="space-y-2">
                <input
                  type="text"
                  value={editingGoal.title}
                  onChange={(e) => setEditingGoal({ ...editingGoal, title: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="date"
                  value={editingGoal.targetDate}
                  onChange={(e) => setEditingGoal({ ...editingGoal, targetDate: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="number"
                  value={editingGoal.progress}
                  onChange={(e) => setEditingGoal({ ...editingGoal, progress: Number(e.target.value) })}
                  min="0"
                  max="100"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <div className="flex justify-end space-x-2">
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Save
                  </button>
                  <button type="button" onClick={() => setEditingGoal(null)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{goal.title}</h3>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditGoal(goal)} className="text-blue-500 hover:text-blue-700">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDeleteGoal(goal.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleToggleComplete(goal.id)} className={`${goal.completed ? 'text-green-500' : 'text-gray-400'} hover:text-green-700`}>
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">Target Date: {goal.targetDate}</p>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {goal.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div style={{ width: `${goal.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthGoals;