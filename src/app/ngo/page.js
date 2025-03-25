"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

function NGODashboard() {
  const { userId } = useAuth();
  const [userExists, setUserExists] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationError, setRegistrationError] = useState(null);
  const [ngoData, setNgoData] = useState({
    name: "",
    location: "",
    email: "",
  });

  // Check if user exists in your database
  const checkUserExists = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "/api/ngodatafetch/check-user",
        {
          clerkUserId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUserExists(response.data.exists);
      if (response.data.ngo) {
        setNgoData(response.data.ngo);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      checkUserExists();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNgoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setRegistrationError(null);
      const response = await axios.post("/api/ngodatafetch/register", {
        ...ngoData,
        clerkUserId: userId,
      });

      // After successful registration, check user again to get the full data
      await checkUserExists();
    } catch (err) {
      setRegistrationError(err.response?.data?.message || err.message);
    }
  };

  if (loading && !error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-indigo-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-indigo-100 rounded"></div>
        </div>
      </div>
    );
  }

  // Show registration form if user doesn't exist (error from checkUserExists)
  if (error || !userExists) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6">
        <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">NGO Connect</span>
          </div>
        </header>

        <main className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md mx-auto">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white text-center">
              <h2 className="text-2xl font-bold">Register Your NGO</h2>
              <p className="text-indigo-100">
                Complete your profile to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="p-4 bg-red-100 text-amber-300">
                  Please complete your registration
                </div>
              )}

              {registrationError && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                  {registrationError}
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  NGO Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={ngoData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={ngoData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={ngoData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-md"
              >
                Complete Registration
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // Show dashboard if user exists
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6">
      <h1>hello</h1>
    </div>
  );
}

export default NGODashboard;
