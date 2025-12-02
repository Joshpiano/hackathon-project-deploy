import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';




function PatientManagement() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Ibrahim Musa',
      age: 45,
      gender: 'Male',
      contact: '+1234567890',
      admissionDate: '2024-01-10',
      status: 'admitted',
      medicalWard: 'Male-Medical'
    },
    {
      id: 2,
      name: 'Ogunleye Oluwaseun',
      age: 32,
      gender: 'Female',
      contact: '+0987654321',
      admissionDate: '2024-01-12',
      status: 'discharged',
      medicalWard: 'Female-Medical'
    },
     {
      id: 3,
      name: 'Adekunle Olumide',
      age: 12,
      gender: 'Female',
      contact: '+0987654321',
      admissionDate: '2024-01-12',
      status: 'discharged',
      medicalWard: 'Pediatric Ward'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    medicalWard: '',
    medicalHistory: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPatient = {
      id: patients.length + 1,
      ...formData,
      admissionDate: new Date().toISOString().split('T')[0],
      status: 'admitted'
    };
    setPatients([...patients, newPatient]);
    setFormData({ name: '', age: '', gender: '', contact: '', medicalHistory: '' });
    setShowForm(false);
  };

  const dischargePatient = (patientId) => {
    setPatients(patients.map(patient => 
      patient.id === patientId ? { ...patient, status: 'discharged' } : patient
    ));
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




      <div className="flex justify-between items-center mb-6 mt-6">
        <h2 className="text-xl font-semibold">Patient Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium"
        >
          Add New Patient
        </button>
      </div>

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
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <select
  name="medicalWard"
  value={formData.medicalWard}
  onChange={handleInputChange}
  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
>
  <option value="">Select Admission Ward</option>
  <option value="Male-Medical">Male-Medical</option>
  <option value="Female-Medical">Female-Medical</option>
  <option value="Pediatric Ward">Pediatric Ward</option>
  <option value="Emergency Ward">Emergency Ward</option>
  <option value="Surgical Ward">Surgical Ward</option>
  <option value="Maternity Ward">Maternity Ward</option>
</select>

                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  placeholder="Medical History"
                  rows="3"
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
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.admissionDate}</td>
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
                      onClick={() => dischargePatient(patient.id)}
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