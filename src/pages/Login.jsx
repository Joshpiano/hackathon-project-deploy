import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import HMSlogo from '../assets/HMSlogo.png';
import axios from "axios";

function Login() {
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Submit form + API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://hms-management-system-ae3n.onrender.com/api/v1/auth/signin",
        credentials
      );

      const userData = response.data;

      // ✅ Save token
      localStorage.setItem("token", userData.token);

      // ✅ Update global auth state
      login(userData);

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      <iframe
        className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] -translate-x-1/2 -translate-y-1/2"
        src="https://www.youtube.com/embed/cDDWvj_q-o8?autoplay=1&mute=1&loop=1&playlist=cDDWvj_q-o8"
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>

      <div className="max-w-md w-full space-y-8">

        <div className="flex flex-col items-center">
          <img src={HMSlogo} alt="HMS Logo" className="w-1/2" />
          <h2 className="mt-4 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-white">
            Hospital Management System
          </h2>
          <p className="text-sm text-center text-white text-xl">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            value={credentials.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />

          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-green-600 text-white rounded"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;
