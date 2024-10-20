import React, { useState } from 'react';
import { Menu, X, Home, Calendar, FileText, Pill, Activity, Video, MessageCircle, Users, Clipboard, BarChart, Heart, ArrowRight, Brain, AlertTriangle } from 'lucide-react';
import Header from '../common/Header';
import { useAuth } from '../../context/AuthContext';
import DoctorOverview from './DoctorOverview';
import PatientManagement from './PatientManagement';
import PatientNotes from './PatientNotes';
import PatientHistory from './PatientHistory';
import PrescriptionManagement from './PrescriptionManagement';
import SecureMessaging from '../common/SecureMessaging';
import VideoConsultation from '../telemedicine/VideoConsultation';
import PatientQueue from './PatientQueue';
import AppointmentScheduler from './AppointmentScheduler';
import PerformanceMetrics from './PerformanceMetrics';
import IntegratedPatientView from './IntegratedPatientView';
import ReferralManagement from '../common/ReferralManagement';
import EPrescribing from './EPrescribing';
import AIAnalystReporting from './AIAnalystReporting';
import NarcoticsTracking from './NarcoticsTracking';

const DoctorDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('home');
  const { user } = useAuth();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return (
          <>
            <DoctorOverview />
            <PatientQueue />
          </>
        );
      case 'patients':
        return <PatientManagement />;
      case 'notes':
        return <PatientNotes />;
      case 'history':
        return <PatientHistory />;
      case 'prescriptions':
        return <PrescriptionManagement />;
      case 'eprescribing':
        return <EPrescribing />;
      case 'narcotics':
        return <NarcoticsTracking />;
      case 'integrated-view':
        return <IntegratedPatientView />;
      case 'appointments':
        return <AppointmentScheduler />;
      case 'video':
        return <VideoConsultation />;
      case 'messaging':
        return <SecureMessaging userRole="doctor" userName={user?.name || ''} />;
      case 'performance':
        return <PerformanceMetrics />;
      case 'referrals':
        return <ReferralManagement />;
      case 'ai-analyst':
        return <AIAnalystReporting />;
      default:
        return <div>Select a menu item</div>;
    }
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', key: 'home' },
    { icon: Users, label: 'Patient Management', key: 'patients' },
    { icon: Heart, label: 'Integrated Patient View', key: 'integrated-view' },
    { icon: FileText, label: 'Patient Notes', key: 'notes' },
    { icon: Clipboard, label: 'Patient History', key: 'history' },
    { icon: Pill, label: 'Prescriptions', key: 'prescriptions' },
    { icon: Pill, label: 'E-Prescribing', key: 'eprescribing' },
    { icon: AlertTriangle, label: 'Narcotics Tracking', key: 'narcotics' },
    { icon: Calendar, label: 'Appointments', key: 'appointments' },
    { icon: Video, label: 'Video Consultation', key: 'video' },
    { icon: MessageCircle, label: 'Messaging', key: 'messaging' },
    { icon: BarChart, label: 'Performance', key: 'performance' },
    { icon: ArrowRight, label: 'Referrals', key: 'referrals' },
    { icon: Brain, label: 'AI Analyst', key: 'ai-analyst' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-600 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20 flex flex-col h-full`}>
        <button onClick={toggleSidebar} className="absolute top-5 right-5 md:hidden">
          <X className="w-6 h-6" />
        </button>
        <nav className="flex-grow overflow-y-auto">
          {menuItems.map((item) => (
            <a
              key={item.key}
              href="#"
              onClick={() => setActiveComponent(item.key)}
              className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white ${activeComponent === item.key ? 'bg-blue-700 text-white' : ''}`}
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
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Doctor Dashboard</h1>
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;