import React, { useState } from 'react';
import { Search, Edit, Trash2, UserPlus } from 'lucide-react';

const UserRow: React.FC<{
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}> = ({ name, email, role, status }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={`https://source.unsplash.com/random/40x40?face`} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{name}</div>
            <div className="text-sm text-gray-500">{email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{role}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
          <Edit className="w-5 h-5" />
        </button>
        <button className="text-red-600 hover:text-red-900">
          <Trash2 className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { name: "Dr. Jane Smith", email: "jane.smith@example.com", role: "Doctor", status: "active" },
    { name: "John Doe", email: "john.doe@example.com", role: "Patient", status: "active" },
    { name: "Admin User", email: "admin@example.com", role: "Admin", status: "active" },
    { name: "Nurse Johnson", email: "nurse.johnson@example.com", role: "Nurse", status: "inactive" },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
          <UserPlus className="w-5 h-5 mr-2" />
          Add User
        </button>
      </div>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 pl-10 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user, index) => (
              <UserRow key={index} {...user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;