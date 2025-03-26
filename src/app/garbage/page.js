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
  const [garbageData, setGarbageData] = useState([]);
  const [garbageLoading, setGarbageLoading] = useState(false);
  const [garbageError, setGarbageError] = useState(null);

  // Hardcoded examples
  const hardcodedGarbage = [
    {
      _id: "1",
      location: "Beachfront, Miami",
      type: "Plastic",
      description: "Plastic bags and straws washed up on shore",
      foundAt: "2025-03-24T10:30:00.000Z",
    },
    {
      _id: "2",
      location: "Mountain Trail, Colorado",
      type: "Paper",
      description: "Discarded food wrappers and paper waste along hiking path",
      foundAt: "2025-03-23T14:15:00.000Z",
    },
    {
      _id: "3",
      location: "Urban Alleyway, Chicago",
      type: "Metal",
      description: "Broken appliances and metal scraps dumped illegally",
      foundAt: "2025-03-22T08:45:00.000Z",
    },
  ];

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

  // Fetch garbage data
  const fetchGarbageData = async () => {
    try {
      setGarbageLoading(true);
      setGarbageError(null);
      const response = await axios.post("/api/getgarbage");
      setGarbageData([...hardcodedGarbage, ...response.data]);
    } catch (err) {
      setGarbageError(err.message);
      // Fallback to hardcoded data if API fails
      setGarbageData(hardcodedGarbage);
    } finally {
      setGarbageLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      checkUserExists();
    }
  }, [userId]);

  useEffect(() => {
    if (userExists) {
      fetchGarbageData();
    }
  }, [userExists]);

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
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Clean Earth Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back, {ngoData.name}
              </p>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-700">
              {ngoData.location}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Garbage Reports
          </h2>

          {garbageLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md overflow-hidden h-48 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 w-3/4 mt-6 mx-4 rounded"></div>
                  <div className="h-3 bg-gray-200 w-1/2 mt-4 mx-4 rounded"></div>
                  <div className="h-3 bg-gray-200 w-full mt-8 mx-4 rounded"></div>
                  <div className="h-3 bg-gray-200 w-5/6 mt-2 mx-4 rounded"></div>
                </div>
              ))}
            </div>
          ) : garbageError ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    Failed to load garbage data: {garbageError}. Showing
                    hardcoded examples instead.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {garbageData.map((report) => (
              <div
                key={report._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        report.type === "Plastic"
                          ? "bg-blue-100 text-blue-800"
                          : report.type === "Paper"
                          ? "bg-green-100 text-green-800"
                          : report.type === "Metal"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {report.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(report.foundAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {report.location}
                  </h3>
                  <p className="text-gray-600 mb-4">{report.description}</p>
                  <div className="flex justify-between items-center">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                      View Details
                    </button>
                    <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full hover:bg-indigo-700 transition">
                      Claim
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Garbage Collection Stats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-indigo-100 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Reports</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {garbageData.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-800">12</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-800">5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NGODashboard;
