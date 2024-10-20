import React, { useState } from 'react';
import { Menu, X, Home, Calendar, FileText, Pill, Activity, Video, Book, DollarSign, MessageCircle, Star, Clock, Bell, Target } from 'lucide-react';
import Header from '../common/Header';
import { useAuth } from '../../context/AuthContext';
import PatientOverview from './PatientOverview';
import UpcomingAppointments from './UpcomingAppointments';
import MedicationReminder from './MedicationReminder';
import HealthTimeline from './HealthTimeline';
import CalendarView from './CalendarView';
import MedicalRecords from './MedicalRecords';
import MedicationTracker from './MedicationTracker';
import HealthMetrics from './HealthMetrics';
import AppointmentBooking from './AppointmentBooking';
import SecureMessaging from '../common/SecureMessaging';
import Prescriptions from './Prescriptions';
import VideoConsultation from '../telemedicine/VideoConsultation';
import PatientEducation from './PatientEducation';
import BillingAndInsurance from './BillingAndInsurance';
import LabResults from './LabResults';
import HealthGoals from './HealthGoals';

const PatientDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('home');
  const { user } = useAuth();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PatientOverview />
            <UpcomingAppointments />
            <MedicationReminder />
            <HealthTimeline />
          </div>
        );
      case 'appointments':
        return <CalendarView />;
      case 'records':
        return <MedicalRecords />;
      case 'medications':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MedicationTracker />
            <Prescriptions />
          </div>
        );
      case 'health':
        return <HealthMetrics />;
      case 'goals':
        return <HealthGoals />;
      case 'book':
        return <AppointmentBooking />;
      case 'messaging':
        return <SecureMessaging userRole="patient" userName={user?.name || ''} />;
      case 'telemedicine':
        return <VideoConsultation />;
      case 'education':
        return <PatientEducation />;
      case 'billing':
        return <BillingAndInsurance />;
      case 'lab':
        return <LabResults />;
      default:
        return <div>Select a menu item</div>;
    }
  };

  const menuItems = [
    { icon: Home, label: 'Home', key: 'home' },
    { icon: Calendar, label: 'Appointments', key: 'appointments' },
    { icon: FileText, label: 'Medical Records', key: 'records' },
    { icon: Pill, label: 'Medications', key: 'medications' },
    { icon: Activity, label: 'Health Metrics', key: 'health' },
    { icon: Target, label: 'Health Goals', key: 'goals' },
    { icon: Bell, label: 'Book Appointment', key: 'book' },
    { icon: Video, label: 'Telemedicine', key: 'telemedicine' },
    { icon: Book, label: 'Patient Education', key: 'education' },
    { icon: DollarSign, label: 'Billing & Insurance', key: 'billing' },
    { icon: MessageCircle, label: 'Messaging', key: 'messaging' },
    { icon: Clock, label: 'Lab Results', key: 'lab' },
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
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Patient Dashboard</h1>
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;