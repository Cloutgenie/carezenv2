import React, { useState } from 'react';
import { Home, Calendar, FileText, MessageCircle, Bell, Activity, Users, Settings, X } from 'lucide-react';
import Header from '../common/Header';
import { useAuth } from '../../context/AuthContext';
import ResidentOverview from './ResidentOverview';
import UpcomingAppointments from './UpcomingAppointments';
import MedicationSchedule from './MedicationSchedule';
import ActivityLog from './ActivityLog';
import CareTeamContacts from './CareTeamContacts';
import SecureMessaging from '../common/SecureMessaging';
import FamilyNotifications from './FamilyNotifications';
import FamilySettings from './FamilySettings';

const FamilyDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('home');
  const { user } = useAuth();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <ResidentOverview />;
      case 'appointments':
        return <UpcomingAppointments />;
      case 'medications':
        return <MedicationSchedule />;
      case 'activity':
        return <ActivityLog />;
      case 'care-team':
        return <CareTeamContacts />;
      case 'messaging':
        return <SecureMessaging userRole="family" userName={user?.name || ''} />;
      case 'notifications':
        return <FamilyNotifications />;
      case 'settings':
        return <FamilySettings />;
      default:
        return <div>Select a menu item</div>;
    }
  };

  const menuItems = [
    { icon: Home, label: 'Overview', key: 'home' },
    { icon: Calendar, label: 'Appointments', key: 'appointments' },
    { icon: FileText, label: 'Medications', key: 'medications' },
    { icon: Activity, label: 'Activity Log', key: 'activity' },
    { icon: Users, label: 'Care Team', key: 'care-team' },
    { icon: MessageCircle, label: 'Messaging', key: 'messaging' },
    { icon: Bell, label: 'Notifications', key: 'notifications' },
    { icon: Settings, label: 'Settings', key: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-600 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
        <button onClick={toggleSidebar} className="absolute top-5 right-5 md:hidden">
          <X className="w-6 h-6" />
        </button>
        <nav>
          {menuItems.map((item) => (
            <a
              key={item.key}
              href="#"
              onClick={() => setActiveComponent(item.key)}
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white ${activeComponent === item.key ? 'bg-blue-700 text-white' : ''}`}
            >
              <item.icon className="inline-block mr-2 w-5 h-5" /> {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Family Portal</h1>
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FamilyDashboard;