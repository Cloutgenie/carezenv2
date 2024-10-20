import React, { useState } from 'react';
import { Calendar, Clock, User, Plus, Edit, Trash } from 'lucide-react';

interface Shift {
  id: number;
  staffName: string;
  date: string;
  startTime: string;
  endTime: string;
  role: string;
}

const StaffScheduling: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([
    { id: 1, staffName: "John Doe", date: "2023-04-20", startTime: "09:00", endTime: "17:00", role: "Nurse" },
    { id: 2, staffName: "Jane Smith", date: "2023-04-20", startTime: "13:00", endTime: "21:00", role: "Caregiver" },
  ]);

  const [newShift, setNewShift] = useState<Omit<Shift, 'id'>>({
    staffName: '',
    date: '',
    startTime: '',
    endTime: '',
    role: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewShift({ ...newShift, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = shifts.length + 1;
    setShifts([...shifts, { ...newShift, id }]);
    setNewShift({ staffName: '', date: '', startTime: '', endTime: '', role: '' });
  };

  const handleDelete = (id: number) => {
    setShifts(shifts.filter(shift => shift.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Staff Scheduling</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="staffName" className="block text-sm font-medium text-gray-700">Staff Name</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="staffName"
                id="staffName"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="John Doe"
                value={newShift.staffName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="date"
                id="date"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                value={newShift.date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="time"
                name="startTime"
                id="startTime"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                value={newShift.startTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="time"
                name="endTime"
                id="endTime"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                value={newShift.endTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              id="role"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={newShift.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a role</option>
              <option value="Nurse">Nurse</option>
              <option value="Caregiver">Caregiver</option>
              <option value="Doctor">Doctor</option>
              <option value="Administrative">Administrative</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Shift
          </button>
        </div>
      </form>
      <div>
        <h3 className="text-lg font-medium mb-2">Scheduled Shifts</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shifts.map((shift) => (
                <tr key={shift.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{shift.staffName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{shift.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{shift.startTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{shift.endTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{shift.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(shift.id)} className="text-red-600 hover:text-red-900">
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffScheduling;