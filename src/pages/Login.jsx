import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Hbackground from '../assets/Hbackground.png';
import HMSlogo from '../assets/HMSlogo.png';
function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const users = [
      { email: 'admin@hospital.com', password: 'admin123', name: 'Admin User', role: 'admin' },
      { email: 'doctor@hospital.com', password: 'doctor123', name: 'Dr. John Smith', role: 'doctor' },
      { email: 'nurse@hospital.com', password: 'nurse123', name: 'Nurse Sarah Johnson', role: 'nurse' },
      { email: 'pharmacist@hospital.com', password: 'pharma123', name: 'Pharmacist Mike Brown', role: 'pharmacist' },
      { email: 'laboratory@hospital.com', password: 'lab123', name: 'Lab Technician', role: 'laboratory' },
      { email: 'patient@hospital.com', password: 'patient123', name: 'Patient User', role: 'patient' },
      

    ];

    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    
    if (user) {
      login(user);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div  className="min-h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center py-12 px-4"
  style={{ backgroundImage: `url(${Hbackground})` }}>
      
      <div className="max-w-md w-full space-y-8 ">
        <div className="flex flex-col items-center ">    
          <img src={HMSlogo} alt="Eksuth " className='w-[50%]'/>
          <h2 className="mt-6 text-center text-3xl font-extrabold  text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-white">
            Hospital Management System
          </h2>
          <p className="mt-2 text-center text-sm text-white">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-white">
              Demo credentials: admin@hospital.com / admin123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;