import React, { useState } from 'react';
import { Shield, Key, Lock, Eye, EyeOff } from 'lucide-react';

const SecuritySettings: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTwoFAToggle = () => {
    setTwoFAEnabled(!twoFAEnabled);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Change Password</h3>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 pr-10 border rounded-md"
              placeholder="Enter new password"
            />
            <button
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Update Password
          </button>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={twoFAEnabled}
              onChange={handleTwoFAToggle}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Enable Two-Factor Authentication</span>
          </div>
          {twoFAEnabled && (
            <p className="mt-2 text-sm text-gray-600">
              Two-factor authentication is enabled. Use an authenticator app to generate codes.
            </p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Security Log</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-gray-600">
              <Shield className="w-4 h-4 mr-2 text-green-500" />
              Last successful login: 2023-04-15 10:30:00
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <Key className="w-4 h-4 mr-2 text-blue-500" />
              Password last changed: 2023-03-01 14:45:00
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <Lock className="w-4 h-4 mr-2 text-red-500" />
              Failed login attempts: 2 (Last: 2023-04-10 08:15:00)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;