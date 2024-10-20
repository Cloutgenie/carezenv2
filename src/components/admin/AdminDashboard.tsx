import React, { useState } from 'react';
import { Menu, X, Home, Users, MessageCircle, Settings, BarChart, FileText, Bell, DollarSign, Shield, Clipboard, Heart, Briefcase, ArrowRight, Calendar, CheckSquare, Package } from 'lucide-react';
import Header from '../common/Header';
import { useAuth } from '../../context/AuthContext';
import KeyMetrics from './KeyMetrics';
import UserManagement from './UserManagement';
import DashboardAnalytics from './DashboardAnalytics';
import SystemLogs from './SystemLogs';
import NotificationCenter from './NotificationCenter';
import FinancialReports from './FinancialReports';
import SecuritySettings from './SecuritySettings';
import SecureMessaging from '../common/SecureMessaging';
import CareQualityMetrics from './CareQualityMetrics';
import ComplianceTracker from './ComplianceTracker';
import StaffEfficiency from './StaffEfficiency';
import ClinicalOutcomes from './ClinicalOutcomes';
import ReferralManagement from '../common/ReferralManagement';
import StaffScheduling from './StaffScheduling';
import NewPatientChecklist from './NewPatientChecklist';
import InventoryManagement from './InventoryManagement';

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('home');
  const { user } = useAuth();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return (
          <>
            <KeyMetrics />
            <DashboardAnalytics />
          </>
        );
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <DashboardAnalytics />;
      case 'logs':
        return <SystemLogs />;
      case 'notifications':
        return <NotificationCenter />;
      case 'financial':
        return <FinancialReports />;
      case 'security':
        return <SecuritySettings />;
      case 'messaging':
        return <SecureMessaging userRole="admin" userName={user?.name || ''} />;
      case 'care-quality':
        return <CareQualityMetrics />;
      case 'compliance':
        return <ComplianceTracker />;
      case 'staff-efficiency':
        return <StaffEfficiency />;
      case 'clinical-outcomes':
        return <ClinicalOutcomes />;
      case 'referrals':
        return <ReferralManagement />;
      case 'staff-scheduling':
        return <StaffScheduling />;
      case 'new-patient-checklist':
        return <NewPatientChecklist />;
      case 'inventory':
        return <InventoryManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <div>Select a menu item</div>;
    }
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', key: 'home' },
    { icon: Users, label: 'User Management', key: 'users' },
    { icon: BarChart, label: 'Analytics', key: 'analytics' },
    { icon: FileText, label: 'System Logs', key: 'logs' },
    { icon: Bell, label: 'Notification Center', key: 'notifications' },
    { icon: DollarSign, label: 'Financial Reports', key: 'financial' },
    { icon: Shield, label: 'Security Settings', key: 'security' },
    { icon: Heart, label: 'Care Quality Metrics', key: 'care-quality' },
    { icon: Clipboard, label: 'Compliance Tracker', key: 'compliance' },
    { icon: Users, label: 'Staff Efficiency', key: 'staff-efficiency' },
    { icon: Briefcase, label: 'Clinical Outcomes', key: 'clinical-outcomes' },
    { icon: ArrowRight, label: 'Referral Management', key: 'referrals' },
    { icon: Calendar, label: 'Staff Scheduling', key: 'staff-scheduling' },
    { icon: CheckSquare, label: 'New Patient Checklist', key: 'new-patient-checklist' },
    { icon: Package, label: 'Inventory Management', key: 'inventory' },
    { icon: MessageCircle, label: 'Messaging', key: 'messaging' },
    { icon: Settings, label: 'Settings', key: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-600 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20 ${sidebarOpen ? 'w-64' : 'w-20'} overflow-y-auto`}>
        <button onClick={toggleSidebar} className="absolute top-5 right-5 md:hidden">
          <X className="w-6 h-6" />
        </button>
        <nav>
          {menuItems.map((item) => (
            <a
              key={item.key}
              href="#"
              onClick={() => setActiveComponent(item.key)}
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white ${activeComponent === item.key ? 'bg-blue-700 text-white' : ''} ${sidebarOpen ? '' : 'flex justify-center'}`}
            >
              <item.icon className={`inline-block ${sidebarOpen ? 'mr-2 w-5 h-5' : 'w-6 h-6'}`} />
              {sidebarOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;