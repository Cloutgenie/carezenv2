import React, { useState } from 'react';
import { Save, Bell } from 'lucide-react';

const FamilySettings: React.FC = () => {
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    activityUpdates: true,
    medicationReminders: true,
    appointmentReminders: true,
  });

  const handleToggle = (setting: string) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof notificationPreferences],
    }));
  };

  const handleSave = () => {
    // In a real application, you would save these settings to a backend
    console.log('Saving settings:', notificationPreferences);
    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Family Settings</h2>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Notification Preferences</h3>
        <div className="space-y-2">
          {Object.entries(notificationPreferences).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                id={key}
                checked={value}
                onChange={() => handleToggle(key)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label htmlFor={key} className="ml-2 text-gray-700">
                {key.split(/(?=[A-Z])/).join(' ')}
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default FamilySettings;