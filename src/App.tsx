import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './components/auth/Login';
import PatientDashboard from './components/patient/PatientDashboard';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import FamilyDashboard from './components/family/FamilyDashboard';
import ErrorBoundary from './components/common/ErrorBoundary';
import CustomerSupport from './components/common/CustomerSupport';
import FAQ from './components/common/FAQ';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <ThemeProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/patient" element={
                    <ProtectedRoute role="patient">
                      <PatientDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/doctor" element={
                    <ProtectedRoute role="doctor">
                      <DoctorDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin" element={
                    <ProtectedRoute role="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/family" element={
                    <ProtectedRoute role="family">
                      <FamilyDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
                <CustomerSupport />
              </div>
            </Router>
          </ThemeProvider>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;