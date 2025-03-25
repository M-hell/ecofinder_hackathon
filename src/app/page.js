"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
// import { Logo } from "@/components/logo";
import { Auth } from "@/components/auth";

export default function Home() {
  const { userId } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('');
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const featuresRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (userId) {
      router.push("/dashboard");
    }
    
    // Mouse movement parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    
    // Smooth scroll and animations handler
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Observe sections for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "-50px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal');
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [userId, router]);

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white overflow-hidden">
      {/* Enhanced Navbar with glass morphism */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-500 ${
        scrollY > 50 ? 'bg-white/90 border-b border-green-100/50 shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg group-hover:shadow-green-200/50 group-hover:scale-105 transition-all duration-500 rotate-hover">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-700 group-hover:rotate-[360deg]"
                >
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                  <path d="M8.5 8.5v.01"></path>
                  <path d="M16 15.5v.01"></path>
                  <path d="M12 12v.01"></path>
                  <path d="M11 17v.01"></path>
                  <path d="M7 14v.01"></path>
                </svg>
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500 tracking-tight">EcoGuardian</span>
            </div>
            
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex items-center space-x-8">
                {[
                  { name: 'Features', ref: featuresRef, id: 'features' },
                  { name: 'About', ref: aboutRef, id: 'about' },
                  { name: 'Contact', ref: contactRef, id: 'contact' }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => scrollToSection(item.ref)} 
                    className={`relative font-medium transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-green-500 after:transition-all hover:after:w-full ${
                      activeSection === item.id 
                        ? 'text-green-600 after:w-full' 
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-green-500 transition-all duration-300 ${
                      activeSection === item.id ? 'opacity-100' : 'opacity-0'
                    }`}></span>
                  </button>
                ))}
              </nav>
              
              <div className="custom-sign-in shine-effect">
                <Auth />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with parallax effect */}
        <section className="w-full py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div 
              className="absolute top-40 -left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl animate-blob"
              style={{ 
                transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)` 
              }}
            ></div>
            <div 
              className="absolute bottom-40 -right-10 w-72 h-72 bg-green-100/30 rounded-full blur-3xl animate-blob animation-delay-2000"
              style={{ 
                transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)` 
              }}
            ></div>
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl animate-blob animation-delay-4000"
              style={{ 
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) translate(-50%, -50%)` 
              }}
            ></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              {/* Enhanced floating logo with glow effect */}
              <div className="relative inline-flex p-6 rounded-full mb-4 animate-float group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-teal-300/20 blur-xl group-hover:blur-2xl transform scale-110 group-hover:scale-125 transition-all duration-700"></div>
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:shadow-green-500/40 transition-shadow duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-spin-slow group-hover:animate-spin-faster"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                    <path d="M8.5 8.5v.01"></path>
                    <path d="M16 15.5v.01"></path>
                    <path d="M12 12v.01"></path>
                    <path d="M11 17v.01"></path>
                    <path d="M7 14v.01"></path>
                  </svg>
                </div>
              </div>

              <div className="space-y-6 w-full max-w-3xl mx-auto animate-fade-in">
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-gray-900">
                  Smart <span className="relative">
                    <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-green-600/20 to-teal-500/20 blur-md"></span>
                    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500 animate-text-gradient">Eco</span>
                  </span> Guardian
                </h1>
                <h2 className="text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500 animate-slide-up px-3 py-1 inline-block">
                  AI-Powered Green Vehicle
                </h2>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed animate-slide-up animation-delay-300">
                  An autonomous vehicle that detects garbage for cleanup and identifies barren lands for reforestation. 
                  Leveraging AI-powered image analysis to make cities cleaner and greener.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-slide-up animation-delay-500">
                <button className="cta-primary">
                  Get Started
                </button>
                <button className="cta-secondary">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features section with enhanced cards */}
        <section id="features" ref={featuresRef} className="w-full py-24 relative pre-animate-section overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50/50 to-white -z-10"></div>
          <div className="absolute right-0 top-1/4 w-64 h-64 bg-green-100/30 rounded-full blur-3xl -z-10"></div>
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-20 scroll-reveal">
              <span className="px-4 py-1 bg-green-100 rounded-full text-green-700 text-sm font-medium inline-block mb-4">Our Solutions</span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">Features</span></h2>
              <p className="max-w-2xl mx-auto text-gray-600 md:text-lg">Pioneering sustainable solutions through advanced AI technology.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 staggered-animation">
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  ),
                  title: "Clean Cities",
                  description: "Detects and reports garbage to NGOs in real-time using advanced AI image recognition technology."
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                      <path d="M8.5 8.5v.01"></path>
                      <path d="M16 15.5v.01"></path>
                      <path d="M12 12v.01"></path>
                      <path d="M11 17v.01"></path>
                      <path d="M7 14v.01"></path>
                    </svg>
                  ),
                  title: "Reforestation",
                  description: "Analyzes soil and terrain conditions to identify optimal locations for planting new trees and vegetation."
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  ),
                  title: "AI Technology",
                  description: "Proprietary neural networks trained on millions of environmental data points for precise recognition and analysis."
                }
              ].map((feature, index) => (
                <div key={index} className="feature-card-pro scroll-item" style={{transitionDelay: `${index * 100}ms`}}>
                  <div className="feature-icon-pro">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" ref={aboutRef} className="w-full py-20 bg-gradient-to-b from-white to-green-50 relative pre-animate-section">
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-green-100/30 rounded-full blur-3xl -z-10"></div>
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">Us</span></h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Smart Eco Guardian is a pioneering tech company founded in 2022 with a mission to harness the power of AI and autonomous vehicles to combat environmental degradation.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team of engineers, environmental scientists, and AI specialists have developed cutting-edge technology that actively contributes to cleaner cities and healthier ecosystems.
                </p>
                
                <div className="pt-4 grid grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                    <div className="text-3xl font-bold text-green-600 mb-1">250+</div>
                    <div className="text-gray-600">Cities Served</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                    <div className="text-3xl font-bold text-green-600 mb-1">10M+</div>
                    <div className="text-gray-600">Trees Planted</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                    <div className="text-3xl font-bold text-green-600 mb-1">45K+</div>
                    <div className="text-gray-600">Tons of Waste Collected</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                    <div className="text-3xl font-bold text-green-600 mb-1">98%</div>
                    <div className="text-gray-600">Accuracy Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl perspective-card-container">
                <div className="perspective-card bg-gradient-to-br from-green-500 to-green-600 p-8 text-white h-full">
                  <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
                  <p className="mb-6 text-white/90">
                    To create a sustainable future where technology and nature thrive together.
                  </p>
                  
                  <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
                  <p className="mb-6 text-white/90">
                    A world where every city is clean, green, and sustainable, powered by intelligent eco-friendly technology.
                  </p>
                  
                  <h3 className="text-2xl font-bold mb-6">Core Values</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="mr-2 text-white">✓</span> Environmental Responsibility
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-white">✓</span> Technological Innovation
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-white">✓</span> Community Empowerment
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-white">✓</span> Scientific Integrity
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="w-full py-20 bg-white relative pre-animate-section">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">Touch</span></h2>
              <p className="max-w-2xl mx-auto text-gray-600">Have questions or want to partner with us? We'd love to hear from you!</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-50 rounded-2xl p-8 border border-green-100">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" id="name" placeholder="Your name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" id="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea id="message" rows="5" placeholder="How can we help you?" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </form>
              </div>
              
              <div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-8 h-full">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1 bg-white/20 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Location</h4>
                        <p className="text-white/80">123 Green Avenue, Eco Park</p>
                        <p className="text-white/80">San Francisco, CA 94158</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 mt-1 bg-white/20 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Phone</h4>
                        <p className="text-white/80">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 mt-1 bg-white/20 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <p className="text-white/80">info@ecoguardian.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 mt-1 bg-white/20 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Business Hours</h4>
                        <p className="text-white/80">Monday - Friday: 9:00 AM to 6:00 PM</p>
                        <p className="text-white/80">Saturday: 10:00 AM to 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="font-semibold mb-4">Connect With Us</h4>
                    <div className="flex space-x-4">
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                        </svg>
                      </a>
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                        </svg>
                      </a>
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                        </svg>
                      </a>
                      <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced footer */}
      <footer className="bg-gradient-to-r from-green-50 to-white border-t border-green-100 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="p-2"
                >
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                </svg>
              </div>
              <span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">EcoGuardian</span>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Smart Eco Guardian. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}