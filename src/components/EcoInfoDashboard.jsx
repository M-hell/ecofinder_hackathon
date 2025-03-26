"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EcoInfoDashboard() {
  const [ecoData, setEcoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeLocation, setActiveLocation] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/ecoinfo');
        setEcoData(response.data.data || []);
        setFilteredData(response.data.data || []);
        setTimeout(() => setIsLoaded(true), 500);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(ecoData);
      return;
    }
    
    const filtered = ecoData.filter(item => 
      (item.location?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (item.reforestation?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (item.garbage_collection?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
    
    setFilteredData(filtered);
  }, [searchTerm, ecoData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-flex">
            <div className="w-20 h-20 bg-green-100 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-green-800 animate-pulse">Loading eco data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-red-100">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-emerald-200/50 transition-all transform hover:-translate-y-1"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Stats calculation
  const stats = {
    locations: filteredData.length,
    reforestation: filteredData.filter(item => item.reforestation).length,
    cleanup: filteredData.filter(item => item.garbage_collection).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-green-100/30 -translate-y-1/2 translate-x-1/3 animate-[float_20s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full bg-teal-100/30 animate-[float_15s_ease-in-out_infinite_0.5s]"></div>
        
        {/* Animated eco elements */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-green-400/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 20}px`,
              animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite ${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            {['🍃', '🌿', '🌱', '🌲', '♻️'][i % 5]}
          </div>
        ))}
      </div>
      
      <div className={`max-w-7xl mx-auto p-6 relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <header className="mb-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <span className="bg-green-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                Eco Information Dashboard
              </h1>
              <p className="text-gray-600 mt-1 md:ml-12">Track environmental conservation efforts</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by location or activity..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-indigo-100 hover:shadow-xl transition-all hover:-translate-y-1 group animate-fadeSlideUp"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center">
              <div className="bg-indigo-100 p-4 rounded-xl group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm font-medium">Locations Tracked</p>
                <h3 className="text-4xl font-bold text-gray-800 mt-1">{stats.locations}</h3>
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-full mt-4 transform origin-left group-hover:scale-x-110 transition-transform"></div>
          </div>

          <div 
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-all hover:-translate-y-1 group animate-fadeSlideUp"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-4 rounded-xl group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm font-medium">Reforestation Efforts</p>
                <h3 className="text-4xl font-bold text-gray-800 mt-1">{stats.reforestation}</h3>
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-green-300 to-green-500 rounded-full mt-4 transform origin-left group-hover:scale-x-110 transition-transform"></div>
          </div>

          <div 
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all hover:-translate-y-1 group animate-fadeSlideUp"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-4 rounded-xl group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm font-medium">Cleanup Activities</p>
                <h3 className="text-4xl font-bold text-gray-800 mt-1">{stats.cleanup}</h3>
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-blue-300 to-blue-500 rounded-full mt-4 transform origin-left group-hover:scale-x-110 transition-transform"></div>
          </div>
        </div>

        {/* Data cards */}
        <div className="space-y-5 mb-8">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div 
                key={item._id || index}
                className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all border border-white/50 overflow-hidden animate-fadeSlideUp ${activeLocation === index ? 'ring-2 ring-green-500' : ''}`}
                style={{ animationDelay: `${400 + (index * 100)}ms` }}
                onClick={() => setActiveLocation(activeLocation === index ? null : index)}
              >
                <div className="p-5 md:p-6">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{item.location || 'Unknown Location'}</h3>
                      
                      <div className="flex flex-col md:flex-row md:items-center md:gap-6 mt-2">
                        {item.reforestation && (
                          <div className="flex items-center text-green-600 mb-2 md:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                            <span className="line-clamp-1">Reforestation analysis available</span>
                          </div>
                        )}
                        
                        {item.garbage_collection && (
                          <div className="flex items-center text-blue-600 mb-2 md:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span className="line-clamp-1">Cleanup data available</span>
                          </div>
                        )}
                      </div>
                      
                      {activeLocation === index && (
                        <div className="mt-4 bg-gray-50 p-4 rounded-xl animate-fadeIn">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {item.reforestation && (
                              <div className="flex flex-col">
                                <h4 className="font-medium text-green-800 mb-2 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  </svg>
                                  Reforestation Status
                                </h4>
                                <p className="text-gray-700">{item.reforestation}</p>
                              </div>
                            )}
                            
                            {item.garbage_collection && (
                              <div className="flex flex-col">
                                <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Cleanup Status
                                </h4>
                                <p className="text-gray-700">{item.garbage_collection}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      className={`flex-shrink-0 bg-gray-100 p-2 rounded-full transform transition-transform ${activeLocation === index ? 'rotate-180' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveLocation(activeLocation === index ? null : index);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-3">
                    <span>Last updated: {new Date(item.updatedAt).toLocaleString()}</span>
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-10 text-center animate-fadeSlideUp" style={{ animationDelay: "400ms" }}>
              <div className="inline-flex bg-yellow-100 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No matching eco data found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or check back later for new data.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Keyframes for animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-fadeSlideUp {
            animation: fadeSlideUp 0.6s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
}