import React, { useEffect, useState } from 'react';
import axios from "axios";

// --- ICONS ---
const PlusIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const XIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const TrashIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
);

// --- API CONFIGURATION ---
const BASE_URL = "https://hms-management-system-ae3n.onrender.com/api/v1/auth";

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL, 
  // removed the duplicate baseURL1 here, which was causing errors
});

// Interceptor to add token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));


function AdminPanel() {
  // --- STATE MANAGEMENT ---
  const [allStaffs, setAllStaffs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showStaffForm, setShowStaffForm] = useState(false);
  
  // Form State
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    email: '',
    password: ''
  });

  // --- EFFECTS ---
  
  // Initial Fetch
  useEffect(() => {
    fetchStaffs();
  }, []);

  // Auto-clear messages
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  // --- HANDLERS ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff(prev => ({ ...prev, [name]: value }));
  };

  // 1. Fetch Staff List
  const fetchStaffs = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/staffs-list');
      
      const formatted = res.data.staffs.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        status: item.status || "active"
      }));
      
      setAllStaffs(formatted);
    } catch (err) {
      console.error(err);
      setError("Failed to load staff list.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Add Staff Member
  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', newStaff);
      
      setSuccessMessage("Staff member successfully registered!");
      setShowStaffForm(false);
      setNewStaff({ name: "", role: "", email: "", password: "" });
      
      // Refresh the list immediately
      fetchStaffs(); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  // 3. Deactivate Staff
  const handleDeactivate = async (id) => {
    // Professional confirmation step
    if (!window.confirm("Are you sure you want to deactivate this user?")) return;

    try {
      // FIX: Changed from .delete() to .patch()
      // Endpoints ending in verbs like /deactivate are actions/updates, not deletions.
      // If this fails with 405 Method Not Allowed, change .patch to .post
      await api.patch(`/staffs/${id}/deactivate`);

      setSuccessMessage("Staff member deactivated successfully.");
      
      // Update UI: Filter out the deactivated user (Optimistic update)
      setAllStaffs(prev => prev.filter(staff => staff.id !== id));

    } catch (err) {
      console.error("Deactivation Error:", err);
      
      // Detailed error handling to help you debug
      if (err.response?.status === 404) {
         setError("Endpoint not found. Try changing '/staffs' to '/staffs-list' in the URL.");
      } else if (err.response?.status === 405) {
         setError("Method not allowed. The server might expect POST instead of PATCH.");
      } else {
         setError(err.response?.data?.message || "Failed to deactivate staff member.");
      }
    }
  };

  // --- RENDER ---
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
        <button
          onClick={() => setShowStaffForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow-md flex items-center transition"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Staff Member
        </button>
      </div>

      {/* Feedback Messages */}
      {successMessage && (
        <div className="p-3 mb-4 text-sm font-medium text-green-800 bg-green-100 rounded-lg border border-green-200">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="p-3 mb-4 text-sm font-medium text-red-800 bg-red-100 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Staff Table */}
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4 border-b pb-2">Staff Management</h3>

        {isLoading ? (
          <div className="text-center py-8 text-blue-600">Loading data...</div>
        ) : allStaffs.length === 0 ? (
          <p className="text-gray-500 italic">No staff records found.</p>
        ) : (
          <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {allStaffs.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{member.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">{member.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeactivate(member.id)}
                        className="text-red-500 hover:text-red-700 flex items-center justify-end w-full gap-2 transition"
                        title="Deactivate User"
                      >
                         Deactivate <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reports Section */}
      <div>
        <h3 className="text-xl font-medium mb-4 border-b pb-2">System Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ReportCard title="Total Patients" value="127" color="blue" />
          <ReportCard title="Active Admissions" value="24" color="green" />
          <ReportCard title="Monthly Revenue" value="₦ 45,670" color="purple" />
        </div>
      </div>

      {/* Modal Form */}
      {showStaffForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h3 className="text-xl font-bold text-gray-800">New Staff Member</h3>
              <button onClick={() => setShowStaffForm(false)} className="text-gray-400 hover:text-gray-600 transition">
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddStaff} className="space-y-4">
              <input
                type="text"
                name="name"
                value={newStaff.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
              <select
                name="role"
                value={newStaff.role}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
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
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
              <input
                type="password"
                name="password"
                value={newStaff.password}
                onChange={handleInputChange}
                placeholder="Temporary Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowStaffForm(false)}
                  className="px-6 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-md transition"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Sub-component for Reports to keep main code clean
const ReportCard = ({ title, value, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    green: "bg-green-50 border-green-200 text-green-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800"
  };

  return (
    <div className={`border rounded-lg p-4 ${colorClasses[color]}`}>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default AdminPanel;