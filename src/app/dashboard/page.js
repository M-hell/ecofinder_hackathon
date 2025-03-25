"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Auth } from "@/components/auth";

const DashboardLogin = () => {
  const [activeTab, setActiveTab] = useState('ngo');
  const router = useRouter();

  const handleNGOLogin = () => {
    router.push('/ngo');
  };

  const handleAdminLogin = () => {
    router.push('/admin');
  };

  return (
    <>
      <Head>
        <title>Dashboard Login</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative">
        {/* Auth component positioned at top right of the screen */}
        <div className="absolute top-4 right-4">
          <Auth />
        </div>
        
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header with logo */}
          <div className="bg-blue-600 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Community Connect</h1>
            <p className="text-blue-100 mt-1">Uniting NGOs and Administrators</p>
          </div>

          {/* Rest of your component remains the same */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('ngo')}
              className={`flex-1 py-4 font-medium text-sm ${activeTab === 'ngo' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                NGO Login
              </div>
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-4 font-medium text-sm ${activeTab === 'admin' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 7H7a4 4 0 00-4 4v1a2 2 0 002 2h2.5M15 7h3a4 4 0 014 4v1a2 2 0 01-2 2h-2.5m0 0h-6m6 0l-1 4m4-4l1 4m0 0h-6m6 0h2" />
                </svg>
                Admin Login
              </div>
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'ngo' ? (
              <div className="space-y-4 text-center">
                <div className="p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">NGO Dashboard</h3>
                  <p className="mt-1 text-sm text-gray-500">Access your NGO management tools and resources</p>
                </div>
                <button 
                  onClick={handleNGOLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Enter NGO Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <div className="p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 7H7a4 4 0 00-4 4v1a2 2 0 002 2h2.5M15 7h3a4 4 0 014 4v1a2 2 0 01-2 2h-2.5m0 0h-6m6 0l-1 4m4-4l1 4m0 0h-6m6 0h2" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Admin Dashboard</h3>
                  <p className="mt-1 text-sm text-gray-500">Manage system settings and oversee all organizations</p>
                </div>
                <button 
                  onClick={handleAdminLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Enter Admin Dashboard
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-6 py-4 text-center">
            <p className="text-xs text-gray-500">
              {activeTab === 'ngo' 
                ? "For NGO management and reporting"
                : "Administrative controls and system oversight"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLogin;