"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Auth } from "@/components/auth";

const DashboardLogin = () => {
  const [activeTab, setActiveTab] = useState('ngo');
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation loading effect
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleNGOLogin = () => {
    router.push('/ngo');
  };

  const handleAdminLogin = () => {
    router.push('/admin');
  };

  return (
    <>
      <Head>
        <title>Community Connect | Dashboard</title>
      </Head>
      
      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes shine {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .shine-effect {
          position: relative;
          overflow: hidden;
        }
        .shine-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shine 3s infinite;
          background-size: 200% 100%;
        }
        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.8s ease-out forwards;
        }
        .animate-delay-1 {
          animation-delay: 0.1s;
          opacity: 0;
        }
        .animate-delay-2 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animate-delay-3 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        .animate-delay-4 {
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-green-100/30 -translate-y-1/2 translate-x-1/3 animate-[float_20s_ease-in-out_infinite]"></div>
          <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full bg-teal-100/30 animate-[float_15s_ease-in-out_infinite_0.5s]"></div>
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-emerald-100/30 animate-[float_12s_ease-in-out_infinite_1s]"></div>
        </div>
        
        {/* Leaves animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute text-green-400/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 30 + 20}px`,
                animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite ${Math.random() * 5}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            >
              {['🍃', '🌿', '🌱', '🍂', '🌴', '🌳'][i % 6]}
            </div>
          ))}
        </div>
        
        {/* Auth component in top right */}
        <div className="absolute top-6 right-6 z-20">
          <Auth />
        </div>
        
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Logo and title */}
          <div className="text-center mb-12 animate-fadeSlideUp">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-green-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3 animate-[float_4s_ease-in-out_infinite]">Community Connect</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Uniting NGOs and Administrators for a greener, more sustainable world</p>
          </div>

          {/* Login Tabs */}
          <div className="max-w-md mx-auto mb-12 animate-fadeSlideUp animate-delay-1">
            <div className="bg-white/70 backdrop-blur-md rounded-full shadow-lg p-2 flex">
            <button
              onClick={() => setActiveTab('ngo')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'ngo' 
                    ? 'bg-green-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-green-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                NGO Login
            </button>
            <button
              onClick={() => setActiveTab('admin')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'admin' 
                    ? 'bg-green-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-green-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 7H7a4 4 0 00-4 4v1a2 2 0 002 2h2.5M15 7h3a4 4 0 014 4v1a2 2 0 01-2 2h-2.5m0 0h-6m6 0l-1 4m4-4l1 4m0 0h-6m6 0h2" />
                </svg>
                Admin Login
              </button>
              </div>
          </div>

          {/* Main Content Card */}
          <div className="max-w-4xl mx-auto animate-fadeSlideUp animate-delay-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-green-200/50 border border-white/50">
            {activeTab === 'ngo' ? (
                <div className="flex flex-col lg:flex-row">
                  {/* Left column - icon */}
                  <div className="lg:w-2/5 bg-gradient-to-br from-green-50 to-emerald-100 p-10 flex flex-col justify-center items-center">
                    <div className="relative h-56 w-56">
                      <div className="absolute inset-0 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
                      <div className="absolute inset-4 bg-green-100 rounded-full animate-[pulse_2s_ease-in-out_infinite]"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right column - content */}
                  <div className="lg:w-3/5 p-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">NGO Dashboard</h2>
                    <p className="text-gray-600 mb-8">
                      Access your NGO management tools and resources. Track environmental conservation efforts, manage projects, and collaborate with the community.
                    </p>
                    
                    <div className="space-y-4 mb-10">
                      <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-green-50 transition-colors">
                        <div className="bg-green-100 p-2 rounded-full text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Advanced analytics and reporting</h3>
                          <p className="text-sm text-gray-600">Gain insights with comprehensive data visualization</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-green-50 transition-colors">
                        <div className="bg-green-100 p-2 rounded-full text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Eco-monitoring tools and resources</h3>
                          <p className="text-sm text-gray-600">Track environmental metrics and conservation impact</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-green-50 transition-colors">
                        <div className="bg-green-100 p-2 rounded-full text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Real-time activity tracking</h3>
                          <p className="text-sm text-gray-600">Monitor projects and field operations in real-time</p>
                        </div>
                      </div>
                </div>
                    
                <button 
                  onClick={handleNGOLogin}
                      className="shine-effect group w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-medium text-lg shadow-lg hover:shadow-green-200/50 transition-all flex items-center justify-center gap-2 overflow-hidden"
                >
                      <span>Enter NGO Dashboard</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                </button>
                  </div>
              </div>
            ) : (
                <div className="flex flex-col lg:flex-row">
                  {/* Left column - icon */}
                  <div className="lg:w-2/5 bg-gradient-to-br from-emerald-50 to-teal-100 p-10 flex flex-col justify-center items-center">
                    <div className="relative h-56 w-56">
                      <div className="absolute inset-0 bg-teal-200 rounded-full opacity-20 animate-pulse"></div>
                      <div className="absolute inset-4 bg-teal-100 rounded-full animate-[pulse_2s_ease-in-out_infinite]"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 7H7a4 4 0 00-4 4v1a2 2 0 002 2h2.5M15 7h3a4 4 0 014 4v1a2 2 0 01-2 2h-2.5m0 0h-6m6 0l-1 4m4-4l1 4m0 0h-6m6 0h2" />
                  </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right column - content */}
                  <div className="lg:w-3/5 p-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Admin Dashboard</h2>
                    <p className="text-gray-600 mb-8">
                      Manage system settings and oversee all organizations. Control user access, monitor activities, and generate comprehensive reports.
                    </p>
                    
                    <div className="space-y-4 mb-10">
                      <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-teal-50 transition-colors">
                        <div className="bg-teal-100 p-2 rounded-full text-teal-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">User management and permissions</h3>
                          <p className="text-sm text-gray-600">Control access levels and manage user accounts</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-teal-50 transition-colors">
                        <div className="bg-teal-100 p-2 rounded-full text-teal-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">System configuration and monitoring</h3>
                          <p className="text-sm text-gray-600">Monitor system performance and configure settings</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-teal-50 transition-colors">
                        <div className="bg-teal-100 p-2 rounded-full text-teal-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">Comprehensive analytics dashboard</h3>
                          <p className="text-sm text-gray-600">Access visual reports and system-wide metrics</p>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleAdminLogin}
                      className="shine-effect group w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-medium text-lg shadow-lg hover:shadow-teal-200/50 transition-all flex items-center justify-center gap-2 overflow-hidden"
                    >
                      <span>Enter Admin Dashboard</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Impact stats */}
          <div className="max-w-5xl mx-auto mt-16 animate-fadeSlideUp animate-delay-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: "250+", label: "Cities Served", icon: "🌇" },
                { value: "10M+", label: "Trees Planted", icon: "🌳" },
                { value: "45K+", label: "Tons of Waste Collected", icon: "♻️" },
                { value: "98%", label: "Accuracy Rate", icon: "📊" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white/60 backdrop-blur-sm border border-white/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
                >
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3 group-hover:scale-125 transition-transform">{stat.icon}</span>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-gradient-to-r from-green-300 to-emerald-500 rounded-full transform origin-left group-hover:scale-x-110 transition-transform"></div>
                </div>
              ))}
              </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 text-gray-500 text-sm animate-fadeSlideUp animate-delay-4">
            <p>© 2023 Community Connect. All rights reserved.</p>
            <p className="mt-1">Making our planet greener, one community at a time.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLogin;