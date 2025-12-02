import React, { useState } from 'react';

function AdminPanel() {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Dr. John Smith', role: 'doctor', email: 'john.smith@hospital.com', status: 'active' },
    { id: 2, name: 'Nurse Sarah Johnson', role: 'nurse', email: 'sarah.j@hospital.com', status: 'active' },
    { id: 3, name: 'Pharmacist Mike Brown', role: 'pharmacist', email: 'mike.b@hospital.com', status: 'active' },
    { id: 4, name: 'Finance Officer Lisa Wang', role: 'finance', email: 'lisa.w@hospital.com', status: 'active' }
  ]);

  const [showStaffForm, setShowStaffForm] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff(prev => ({ ...prev, [name]: value }));
  };

  const addStaff = (e) => {
    e.preventDefault();
    const staffMember = {
      id: staff.length + 1,
      ...newStaff,
      status: 'active'
    };
    setStaff([...staff, staffMember]);
    setNewStaff({ name: '', role: '', email: '', password: '' });
    setShowStaffForm(false);
  };

  const toggleStaffStatus = (staffId) => {
    setStaff(staff.map(member => 
      member.id === staffId 
        ? { ...member, status: member.status === 'active' ? 'inactive' : 'active' }
        : member
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
        <button
          onClick={() => setShowStaffForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium"
        >
          Add Staff Member
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Staff Management</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staff.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">{member.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toggleStaffStatus(member.id)}
                      className={`${
                        member.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {member.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">System Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800">Total Patients</h4>
            <p className="text-2xl font-bold text-blue-600">127</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800">Active Admissions</h4>
            <p className="text-2xl font-bold text-green-600">24</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800">Monthly Revenue</h4>
            <p className="text-2xl font-bold text-purple-600">&#8358; 45,670</p>
          </div>
        </div>
      </div>

      {showStaffForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Staff Member</h3>
            <form onSubmit={addStaff}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={newStaff.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <select
                  name="role"
                  value={newStaff.role}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="finance">Finance Officer</option>
                  <option value="paypoint">Paypoint Staff</option>
                  <option value="lab_technician">Lab Technician</option>
                </select>
                <input
                  type="email"
                  name="email"
                  value={newStaff.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={newStaff.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowStaffForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Add Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;