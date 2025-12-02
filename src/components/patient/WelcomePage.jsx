import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function WelcomePage({ user, onContinue }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-green-600 to-green-700 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">💳</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Welcome, {user?.name || "Patient"}!
            </h1>
            <p className="text-gray-600 text-lg">Your Patient Wallet Dashboard</p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-3xl mb-2">💰</p>
              <p className="text-gray-700 font-semibold">Easy Payments</p>
              <p className="text-gray-600 text-sm">Manage all transactions</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-3xl mb-2">📊</p>
              <p className="text-gray-700 font-semibold">Track History</p>
              <p className="text-gray-600 text-sm">View your spending</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-3xl mb-2">🔒</p>
              <p className="text-gray-700 font-semibold">Secure</p>
              <p className="text-gray-600 text-sm">Safe & encrypted</p>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="text-gray-700">
              <strong>Email:</strong> {user?.email || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Role:</strong> {user?.role || "Patient"}
            </p>
          </div>

          {/* Description */}
          <div className="text-center mb-8">
            <p className="text-gray-600 text-base leading-relaxed">
              Manage your healthcare payments, view transaction history, and balance
              with ease. Your wallet is secure and encrypted for your protection.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onContinue}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Go to Wallet
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition duration-300"
            >
              Back to Dashboard
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full mt-4 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white text-sm opacity-75">
            © 2025 Hospital Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;