import React, { useState } from 'react';

import { useAuth } from '../../context/AuthContext';

 
 

 
    


function DoctorDashboard() {
  

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      condition: 'Hypertension',
      lastVisit: '2024-01-15',
      testResults: [
        { test: 'Blood Pressure', result: '140/90 mmHg', date: '2024-01-15' },
        { test: 'Blood Sugar', result: '110 mg/dL', date: '2024-01-15' }
      ],
      diagnosis: '',
      prescription: ''
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');

  const handleSaveDiagnosis = (patientId) => {
    setPatients(patients.map(patient => 
      patient.id === patientId ? { ...patient, diagnosis } : patient
    ));
    setDiagnosis('');
  };

  const handleSendPrescription = (patientId) => {
    setPatients(patients.map(patient => 
      patient.id === patientId ? { ...patient, prescription } : patient
    ));
    setPrescription('');
    alert('Prescription sent to patient and pharmacy');
  };


const { user, } = useAuth();

  const stats = [
    { name: 'Total Patients', value: '127', change: '+12%', changeType: 'increase' },
    { name: 'Active Admissions', value: '24', change: '+4%', changeType: 'increase' },
    { name: 'Pending Tests', value: '8', change: '-2%', changeType: 'decrease' },
    { name: 'Today\'s Appointments', value: '15', change: '+3%', changeType: 'increase' },
  ];



  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Doctor's Dashboard</h2>
      
      <div> 
        <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-green-900">Dashboard</h1>
        <p className="text-green-600">Welcome back, {user?.name}</p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-transparent-500 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.value}</dd>
              <div className={`text-sm font-medium ${
                item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg- shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            <li className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-green-600 truncate">New patient admission</p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    John Doe was admitted to Ward A
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>2 hours ago</p>
                </div>
              </div>
            </li>
            <li className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-green-600 truncate">Lab test results ready</p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    Blood test results for Jane Smith are available
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>4 hours ago</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  
      </div>
    

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium pt-6">Patient List</h3>
          {patients.map(patient => (
            <div key={patient.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{patient.name}</h4>
                  <p className="text-sm text-gray-600">Age: {patient.age} | Condition: {patient.condition}</p>
                  <p className="text-sm text-gray-500">Last Visit: {patient.lastVisit}</p>
                </div>
                <button
                  onClick={() => setSelectedPatient(patient)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedPatient && (
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Patient Details - {selectedPatient.name}</h3>
            
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Test Results</h4>
              {selectedPatient.testResults.map((test, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded mb-2">
                  <p className="font-medium">{test.test}</p>
                  <p>Result: {test.result}</p>
                  <p className="text-sm text-gray-500">Date: {test.date}</p>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Chief Complaint</h4>
              <textarea
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Enter Complaint..."
                rows="3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleSaveDiagnosis(selectedPatient.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
              >
                Save Complaint
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Diagnosis</h4>
              <textarea
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Enter diagnosis..."
                rows="3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleSaveDiagnosis(selectedPatient.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
              >
                Save Diagnosis
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Prescription</h4>
              <textarea
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                placeholder="Enter prescription..."
                rows="3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleSendPrescription(selectedPatient.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
              >
                Send to Pharmacy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;