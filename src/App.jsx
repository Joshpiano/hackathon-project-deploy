import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientManagement from './pages/PatientManagement';
import PatientWallet from './pages/PatientWallet';
import DoctorDashboard from './pages/DoctorDashboard';
import Laboratory from './pages/Laboratory';
import Pharmacy from './pages/Pharmacy';
import AdminPanel from './pages/AdminPanel';
import DischargeModule from './pages/DischargeModule';
import LaboratoryClone from './components/lab/laboratoryClone';
import nursepicture from './assets/nursepictures.jpg';

function AppContent() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-gray-800 min-h-screen w-screen bg-cover bg-center bg-no-repeat  " style={{ backgroundImage: `url(${nursepicture})` }}>
      
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          
          <Routes> 
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<PatientManagement />} />
            <Route path="/wallet" element={<PatientWallet />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/lab" element={<Laboratory />} />
            <Route path="/lb" element={<LaboratoryClone />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/discharge" element={<DischargeModule />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;