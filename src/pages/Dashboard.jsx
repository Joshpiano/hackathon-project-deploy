import React from 'react';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, } = useAuth();

  const stats = [
    { name: 'Total Patients', value: '127', change: '+12%', changeType: 'increase' },
    { name: 'Active Admissions', value: '24', change: '+4%', changeType: 'increase' },
    { name: 'Pending Tests', value: '8', change: '-2%', changeType: 'decrease' },
    { name: 'Today\'s Appointments', value: '15', change: '+3%', changeType: 'increase' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-green-900">Dashboard</h1>
        <p className="text-green-600">Welcome back, {user?.name}</p>
      </div>

      {/* Header */}
      <header className="hover:bg-green-700 text-white p-4 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center">Health & Wellness Tips</h1>
        <p className="mt-2 text-lg text-center">Your daily guide to staying healthy, safe, and strong.</p>
      </header>

      {/* Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

        {/* Card 1 */}
        <div className="hover:bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold text-green-700">💧 Stay Hydrated</h2>
          <p className="mt-3 text-gray-600">
            Drink at least 6–8 glasses of water daily to keep your body active,
            energized, and functioning properly.
          </p>
        </div>

        {/* Card 2 */}
        <div className="hover:bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold text-green-700">🥗 Eat Balanced Meals</h2>
          <p className="mt-3 text-gray-600">
            Include fruits, vegetables, proteins, and whole grains in your meals.
            Avoid excessive sugar and junk foods.
          </p>
        </div>

        {/* Card 3 */}
        <div className="hover:bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold text-green-900">🏃‍♂️ Exercise Regularly</h2>
          <p className="mt-3 text-gray-600">
            Do at least 30 minutes of physical activity daily. Walking, jogging,
            or stretching helps your body stay flexible and healthy.
          </p>
        </div>

        {/* Card 4 */}
        <div className="hover:bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold text-green-700">😴 Sleep Well</h2>
          <p className="mt-3 text-gray-600">
            Ensure 7–9 hours of sleep every night. Quality sleep strengthens
            your body and boosts your immune system.
          </p>
        </div>

        {/* Card 5 */}
        <div className="hover:bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold text-green-700">🩺 Regular Checkups</h2>
          <p className="mt-3 text-gray-600">
            Visit a healthcare professional for routine medical checkups.
            Early detection saves lives.
          </p>
        </div>

        {/* Card 6 */}
        <div className="hover:bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold text-green-700">🧠 Mental Health Matters</h2>
          <p className="mt-3 text-gray-600">
            Reduce stress, practice mindfulness, and talk to someone if you feel
            overwhelmed. A healthy mind equals a healthy life.
          </p>
        </div>

      </div>

      {/* Big Advice Section */}
      <div className="hover:bg-white transition duration-300  shadow rounded-xl p-8 mt-10">
        <h2 className="text-2xl font-bold text-green-700">💡 General Health Advice</h2>
        
        <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-800">
          <li>Wash your hands regularly to avoid infections.</li>
          <li>Maintain a clean environment and good personal hygiene.</li>
          <li>Limit alcohol intake and avoid smoking.</li>
          <li>Stay at a healthy weight through diet and exercise.</li>
          <li>Manage stress with relaxation, prayer, and deep breathing.</li>
          <li>Get vaccinated and follow medical instructions when given.</li>
          <li>Stay connected with friends, family, and community.</li>
        </ul>
      </div>

    </div>
  );
}

export default Dashboard;