"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";
const AdminDashboard = () => {
  const router = useRouter();
  const [ngos, setNgos] = useState([]); // NGOs should be an array
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoaded, setIsLoaded] = useState(false);

  // Add animation loading effect
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const response = await fetch("/api/getallngo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data.success) {
          const formattedNGOs = data.data.map((ngo, index) => ({
            id: ngo._id || index + 1,
            name: ngo.name || "Unknown NGO",
            email: ngo.email || "notavailable@example.com",
            registrationDate: ngo.registrationDate || "2023-01-01",
            status: ngo.status || "Active",
            projects: ngo.projects || 0,
          }));

          setNgos(formattedNGOs);
        }
      } catch (error) {
        console.error("Error fetching NGOs:", error);
      }
    };

    fetchNGOs();
  }, []); // Runs once on mount

  const addNGO = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/addngo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Default NGO",
          email: "notavailable@example.com",
          registrationDate: "2023-01-01",
          status: "Pending",
          projects: 0,
        }),
      });

      const result = await response.json();
      console.log("Response:", result);

      // Refetch the NGOs list after adding a new one
      if (result.success) {
        fetchNGOs();
      }
    } catch (error) {
      console.error("Error adding NGO:", error);
    }
  };
  const handleLogout = () => {
    router.push("/");
  };

  const openRobotMonitor = () => {
    window.open(
      "https://project-eight-black-46.vercel.app/meeting/9580e1f5-530b-43b8-8f89-8c760cdcd0f7",
      "_blank"
    );
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      {/* Add these animation keyframes to your globals.css */}
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
          0% { box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(72, 187, 120, 0); }
          100% { box-shadow: 0 0 0 0 rgba(72, 187, 120, 0); }
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
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-mint-50 via-green-50 to-mint-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden z-0 opacity-30">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-green-200 animate-[float_15s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-green-100 animate-[float_12s_ease-in-out_infinite_1s]"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-green-100 animate-[float_20s_ease-in-out_infinite_0.5s]"></div>
        </div>

        {/* Sidebar - lightened colors */}
        <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-green-500 to-green-600 text-white shadow-lg z-10">
          <div className="flex items-center justify-center h-16 px-4 border-b border-green-400">
            <h1 className="text-xl font-bold shine-effect">Community Connect</h1>
          </div>
          <nav className="p-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center w-full px-4 py-3 rounded-lg mb-2 transition-all transform hover:scale-105 ${
                activeTab === "dashboard" 
                  ? "bg-green-400 text-white shadow-md" 
                  : "hover:bg-green-400/40"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("ngos")}
              className={`flex items-center w-full px-4 py-3 rounded-lg mb-2 transition-all transform hover:scale-105 ${
                activeTab === "ngos" 
                  ? "bg-green-400 text-white shadow-md" 
                  : "hover:bg-green-400/40"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              NGOs
            </button>
            <button
              onClick={() => setActiveTab("robotics")}
              className={`flex items-center w-full px-4 py-3 rounded-lg mb-2 transition-all transform hover:scale-105 ${
                activeTab === "robotics" 
                  ? "bg-green-400 text-white shadow-md" 
                  : "hover:bg-green-400/40"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              Robotics Monitoring
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-lg mb-2 hover:bg-green-400/40 transition-all transform hover:scale-105 mt-8"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className={`ml-64 p-8 relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 animate-[float_4s_ease-in-out_infinite]">
              {activeTab === "dashboard" && "Admin Dashboard"}
              {activeTab === "ngos" && "Registered NGOs"}
              {activeTab === "robotics" && "Robotics Monitoring"}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-green-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              </div>
              <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-full py-1 pl-1 pr-4 shadow-md hover:shadow-lg transition-all">
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
                  AD
                </div>
                <span className="ml-2 text-gray-700">Admin User</span>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Total NGOs",
                    value: "24",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ),
                    stats: "+2 from last month",
                  },
                  {
                    title: "Active Projects",
                    value: "42",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    ),
                    stats: "+5 from last month",
                  },
                  {
                    title: "Robotic Vehicles",
                    value: "8",
                    icon: (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    ),
                    stats: "All systems operational",
                  },
                ].map((card, index) => (
                  <div 
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-b-2 border-green-400 transform hover:-translate-y-1 hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500">{card.title}</p>
                        <h3 className="text-3xl font-bold mt-1">{card.value}</h3>
                        <p className="text-sm text-green-500 mt-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          {card.stats}
                        </p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg animate-pulse">
                        {card.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <button
                    onClick={() => setActiveTab("robotics")}
                    className="shine-effect flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-green-400 hover:to-green-500 hover:text-white transition-all group transform hover:-translate-y-1"
                  >
                    <div className="bg-green-100 p-3 rounded-lg group-hover:bg-white/20 transition-colors mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    Monitor Robotics
                  </button>
                  <button
                    onClick={() => router.push("/garbage")}
                    className="shine-effect flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-green-400 hover:to-green-500 hover:text-white transition-all group transform hover:-translate-y-1"
                  >
                    <div className="bg-green-100 p-3 rounded-lg group-hover:bg-white/20 transition-colors mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    Generate Report
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recent Activity
                </h3>
                <div className="divide-y divide-gray-100">
                  {[
                    {
                      title: "New NGO registered",
                      desc: "Urban Health Alliance completed registration",
                      time: "2 hours ago",
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                    },
                    {
                      title: "Project updated",
                      desc: "Green Earth Initiative updated their Clean Water project",
                      time: "5 hours ago",
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      ),
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start py-3 transform hover:translate-x-2 transition-transform">
                      <div className="bg-green-100 p-2 rounded-full mr-3 animate-pulse">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.desc}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* NGOs Tab */}
          {activeTab === "ngos" && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">Registered NGOs</h3>
                  <button className="shine-effect bg-gradient-to-r from-green-400 to-green-500 text-white py-2 px-4 rounded-md text-sm flex items-center transform hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add NGO
                  </button>
                </div>
              </div>
              
              {/* NGO table - keeping it simple */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/80 divide-y divide-gray-200">
                    {ngos.map((ngo) => (
                      <tr key={ngo.id} className="hover:bg-green-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{ngo.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{ngo.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{ngo.registrationDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            ngo.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {ngo.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{ngo.projects}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-green-500 hover:text-green-700 mr-3 hover:underline transition-colors">Edit</button>
                          <button className="text-red-500 hover:text-red-700 hover:underline transition-colors">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Robotics Tab */}
          {activeTab === "robotics" && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-800">Robotic Vehicle Monitoring</h3>
                <button
                  onClick={openRobotMonitor}
                  className="shine-effect bg-gradient-to-r from-green-400 to-green-500 text-white py-2 px-4 rounded-md text-sm flex items-center transform hover:scale-105 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Open Full Monitoring
                </button>
              </div>
              
              {/* Robot status cards with animations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-green-200 bg-white/70 rounded-lg p-4 hover:border-green-300 hover:shadow-lg transition-all transform hover:-translate-y-1">
                  <h4 className="font-medium text-gray-800 mb-3">Vehicle Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Vehicles</span>
                      <span className="font-medium bg-green-100 px-2 py-1 rounded-full text-green-800">5/8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">In Maintenance</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Battery Levels</span>
                      <span className="font-medium text-green-500">78% avg</span>
                    </div>
                  </div>
                </div>

                <div className="border border-green-200 bg-white/70 rounded-lg p-4 hover:border-green-300 hover:shadow-lg transition-all transform hover:-translate-y-1">
                  <h4 className="font-medium text-gray-800 mb-3">Live Feed</h4>
                  <div className="bg-gray-50 rounded-md h-48 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-green-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p>Live robot feed will appear here</p>
                      <button onClick={openRobotMonitor} className="shine-effect mt-2 text-green-500 hover:text-green-700 text-sm flex items-center justify-center">
                        Click to view full feed
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
