import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // ⬅️ Import Axios
import { useAuth } from '../../context/AuthContext';

// Define the API URL
const API_URL = 'https://hms-management-system-ae3n.onrender.com/api/v1/patients';

function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    email: '',
    medicalWard: '',
    password: ''
  });

  const { user } = useAuth(); 

  // --- API Function: GET All Patients ---
  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Axios automatically returns the response data in the 'data' property
      const response = await axios.get(API_URL);
      setPatients(response.data); 
    } catch (err) {
      console.error("Fetch Error:", err);
      // Axios errors often include a response object for better detail
      const errorMessage = err.response ? `API Error: ${err.response.status}` : 'Network Error';
      setError(`Failed to fetch patient data. (${errorMessage})`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // --- Input Handlers (No Change) ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // --- API Function: POST New Patient ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Axios handles JSON stringification automatically
      const response = await axios.post(API_URL, {
        ...formData,
        age: parseInt(formData.age, 10), // Ensure age is a number
      });

      // Response data is accessed via response.data
      const newPatient = response.data;
      
      // Update local state
      setPatients(prevPatients => [newPatient, ...prevPatients]);
      
      // Reset form and close modal
      setFormData({ name: '', age: '', gender: '', contact: '', email: '', medicalWard: '', password: '' });
      setShowForm(false);

    } catch (submitError) {
      console.error('Error adding new patient:', submitError);
      alert('Failed to add patient. Please check the data and try again.');
    }
  };

  // --- API Function: PUT/PATCH Discharge Patient ---
  const dischargePatient = async (patientId) => {
    if (!window.confirm('Are you sure you want to discharge this patient?')) {
      return;
    }

    try {
      // Use Axios to send a PUT request to update the status
      await axios.put(`${API_URL}/${patientId}`, { 
        status: 'discharged' 
      });

      // Update local state optimistically
      setPatients(patients.map(patient => 
        patient._id === patientId || patient.id === patientId ? { ...patient, status: 'discharged' } : patient
      ));

    } catch (dischargeError) {
      console.error('Error discharging patient:', dischargeError);
      alert('Failed to discharge patient. Please try again.');
    }
  };

  // --- Component Rendering (JSX) ---

  const stats = [
    { name: 'Total Patients', value: patients.length.toString(), change: '+12%', changeType: 'increase' },
    { name: 'Active Admissions', value: patients.filter(p => p.status === 'admitted').length.toString(), change: '+4%', changeType: 'increase' },
    { name: 'Pending Tests', value: '8', change: '-2%', changeType: 'decrease' },
    { name: 'Today\'s Appointments', value: '15', change: '+3%', changeType: 'increase' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-green-900">Dashboard</h1>
          <p className="text-green-600">Welcome back, {user?.name}</p>
        </div>
        
        {/* Stats Grid */}
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
        
        {/* Recent Activity (omitted for brevity) */}
        {/* ... */}
      </div>

      <div className="flex justify-between items-center mb-6 mt-6">
        <h2 className="text-xl font-semibold">Patient Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium"
        >
          Add New Patient
        </button>
      </div>

      {/* Loading and Error States */}
      {loading && <p className="text-blue-500">Loading patients...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Add New Patient Form Modal (omitted for brevity) */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Patient</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                
                <input
                  type="email"
                  name="email"
                  value={formData.email} 
                  onChange={handleInputChange}
                  placeholder="Email" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Age"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="Contact Number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <select
                  name="medicalWard"
                  value={formData.medicalWard}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Admission Ward</option>
                  <option value="Male-Medical">male ward</option>
                  <option value="Female-Medical">female ward</option>
                  <option value="Pediatric Ward">pediatric ward</option>
                  <option value="Emergency Ward">emergency ward</option>
                  <option value="Surgical Ward">surgical ward</option>
                  <option value="Maternity Ward">maternity ward</option>
                  <option value="General Outpatient Department">general outpatient department</option>
                </select>

                <textarea
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="password"
                  rows="1"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Patient Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admission Ward</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient._id || patient.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.admissionDate ? new Date(patient.admissionDate).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.medicalWard}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    patient.status === 'admitted' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-green-600 hover:text-green-900">Edit</button>
                  {patient.status === 'admitted' && (
                    <button
                      onClick={() => dischargePatient(patient._id || patient.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Discharge
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientManagement;