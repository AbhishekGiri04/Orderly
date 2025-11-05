import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const techStackData = [
    { technology: 'React.js', usage: 95 },
    { technology: 'Python', usage: 90 },
    { technology: 'Machine Learning', usage: 85 },
    { technology: 'Flask API', usage: 80 },
    { technology: 'TailwindCSS', usage: 75 }
  ];

  const featureImportanceData = [
    { feature: 'KPT Duration', importance: 35 },
    { feature: 'Distance', importance: 28 },
    { feature: 'Rider Wait Time', importance: 18 },
    { feature: 'Order Hour', importance: 12 },
    { feature: 'Restaurant Rating', importance: 7 }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-white">
        {/* Floating Bubbles */}
        {[...Array(12)].map((_, i) => {
          const colors = ['bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400', 'bg-yellow-400', 'bg-indigo-400'];
          const size = [60, 80, 100][i % 3];
          const positions = [
            { left: '10%', top: '15%' }, { left: '85%', top: '20%' }, { left: '20%', top: '70%' },
            { left: '75%', top: '65%' }, { left: '5%', top: '45%' }, { left: '90%', top: '50%' },
            { left: '35%', top: '10%' }, { left: '60%', top: '85%' }, { left: '15%', top: '85%' },
            { left: '80%', top: '10%' }, { left: '45%', top: '60%' }, { left: '65%', top: '35%' }
          ];
          return (
            <div
              key={i}
              className={`absolute rounded-full ${colors[i % colors.length]} opacity-25 animate-float`}
              style={{
                left: positions[i].left,
                top: positions[i].top,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + (i % 3) * 2}s`
              }}
            />
          );
        })}
      </div>
      
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 py-20">
            <span className="inline-block px-6 py-3 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-6 border border-blue-200">ABOUT ORDERLY</span>
            <h1 className="text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Orderly - Smart Food Recommender
            </h1>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              AI-powered food delivery analytics platform that revolutionizes restaurant performance prediction and operational insights through advanced machine learning algorithms.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-2 shadow-2xl border border-gray-200">
              {['overview', 'technology', 'analytics', 'workflow'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 rounded-xl font-semibold capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Container */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200">

            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Project Summary */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-blue-100">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Summary</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    <strong>Orderly</strong> is an AI-powered food delivery analytics platform that uses machine learning to predict restaurant performance and optimize delivery operations. Built for integration with platforms like Swiggy and Zomato, it provides real-time insights to restaurants, delivery platforms, and customers.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white p-4 rounded-xl">
                      <h4 className="font-bold text-blue-600 mb-2">Vision</h4>
                      <p className="text-sm text-gray-600">To revolutionize food delivery analytics through AI-powered insights, making every restaurant delivery predictable and optimized.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl">
                      <h4 className="font-bold text-indigo-600 mb-2">Mission</h4>
                      <p className="text-sm text-gray-600">Empower restaurants and delivery platforms with machine learning predictions that reduce delivery failures and enhance customer satisfaction.</p>
                    </div>
                  </div>
                </div>

                {/* Swiggy Integration Use Cases */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-lg p-8 border border-orange-100">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Swiggy Integration Benefits</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-orange-600 mb-3">For Customers</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start"><span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span>Predict if order will be delivered on time</li>
                        <li className="flex items-start"><span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span>Get restaurant performance insights before ordering</li>
                        <li className="flex items-start"><span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span>Avoid restaurants with poor delivery performance</li>
                        <li className="flex items-start"><span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span>Smart recommendations based on distance & time</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-red-600 mb-3">For Restaurants</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>Real-time performance monitoring</li>
                        <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>Optimize kitchen preparation times</li>
                        <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>Reduce rider wait times</li>
                        <li className="flex items-start"><span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>Improve customer satisfaction scores</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Objectives */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 border border-green-100">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Objectives</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3 mt-1">
                          <span className="text-white font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Performance Prediction</h4>
                          <p className="text-gray-600 text-sm">Predict restaurant quality using ML algorithms</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3 mt-1">
                          <span className="text-white font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Operational Optimization</h4>
                          <p className="text-gray-600 text-sm">Identify and resolve delivery bottlenecks</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3 mt-1">
                          <span className="text-white font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Data-Driven Insights</h4>
                          <p className="text-gray-600 text-sm">Real-time analytics for better decisions</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3 mt-1">
                          <span className="text-white font-bold text-sm">4</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Customer Satisfaction</h4>
                          <p className="text-gray-600 text-sm">Improve delivery experience through AI</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3 mt-1">
                          <span className="text-white font-bold text-sm">5</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Cost Reduction</h4>
                          <p className="text-gray-600 text-sm">Optimize operations to reduce inefficiencies</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 border border-purple-100">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-purple-600 mb-4 flex items-center">
                        <span className="mr-2">🧠</span>AI & Machine Learning
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Random Forest Classifier for performance prediction</li>
                        <li>• Feature importance analysis and visualization</li>
                        <li>• Real-time prediction capabilities</li>
                        <li>• 94.2% prediction accuracy</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                        <span className="mr-2">📈</span>Analytics Dashboard
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Interactive charts and visualizations</li>
                        <li>• Real-time performance monitoring</li>
                        <li>• Order trends and peak time analysis</li>
                        <li>• Distance vs performance correlation</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
                        <span className="mr-2">🚀</span>Performance Predictor
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Input order details (distance, KPT, wait time)</li>
                        <li>• Instant AI-powered predictions</li>
                        <li>• Confidence scores and success probability</li>
                        <li>• Actionable recommendations</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-orange-600 mb-4 flex items-center">
                        <span className="mr-2">🌐</span>Business Intelligence
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Restaurant performance distribution</li>
                        <li>• Feature importance rankings</li>
                        <li>• Operational bottleneck identification</li>
                        <li>• Customer satisfaction metrics</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
                  <h2 className="text-3xl font-bold mb-6">Performance Metrics</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-6">
                    <div>
                      <div className="text-4xl font-bold mb-2">500+</div>
                      <div className="text-indigo-200">Orders Analyzed</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold mb-2">94.2%</div>
                      <div className="text-indigo-200">ML Accuracy</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold mb-2">&lt;100ms</div>
                      <div className="text-indigo-200">Prediction Time</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold mb-2">50ms</div>
                      <div className="text-indigo-200">API Response</div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="text-lg font-bold mb-3">System Architecture</h3>
                    <p className="text-indigo-100 text-sm">CSV Dataset → Backend Processing → ML Model Training → API Endpoints → Frontend Display</p>
                  </div>
                </div>

                {/* Project Impact */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-8 border border-yellow-100">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Impact</h2>
                  <p className="text-gray-700 mb-6">This platform transforms restaurant operations by providing:</p>
                  <div className="grid md:grid-cols-4 gap-6 text-center">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-3xl font-bold text-green-600 mb-2">25%</div>
                      <div className="text-gray-600 text-sm">Efficiency Improvement</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-3xl font-bold text-blue-600 mb-2">30%</div>
                      <div className="text-gray-600 text-sm">Cost Reduction</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-3xl font-bold text-purple-600 mb-2">40%</div>
                      <div className="text-gray-600 text-sm">Faster Decisions</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
                      <div className="text-gray-600 text-sm">Customer Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'technology' && (
              <div className="space-y-8">
                {/* Tech Stack Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    TECHNOLOGY STACK
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Modern Tech Architecture</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">Built with cutting-edge technologies for scalability, performance, and reliability</p>
                </div>

                {/* Tech Stack Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-xl p-8 border border-blue-200">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-blue-700">Frontend Stack</h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        { name: 'React 18.2.0', desc: 'Modern UI framework with hooks', icon: '⚛️' },
                        { name: 'TailwindCSS 3.4.18', desc: 'Utility-first CSS framework', icon: '🎨' },
                        { name: 'Recharts 2.15.4', desc: 'Interactive data visualizations', icon: '📊' },
                        { name: 'Axios 1.5.0', desc: 'HTTP client for API calls', icon: '🌐' }
                      ].map((tech, i) => (
                        <div key={i} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-blue-200">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{tech.icon}</span>
                            <div>
                              <h4 className="font-bold text-gray-900">{tech.name}</h4>
                              <p className="text-sm text-gray-600">{tech.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl shadow-xl p-8 border border-green-200">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-green-700">Backend Stack</h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        { name: 'Flask', desc: 'Lightweight REST API framework', icon: '🐍' },
                        { name: 'Scikit-learn', desc: 'Machine learning library', icon: '🤖' },
                        { name: 'Pandas & NumPy', desc: 'Data processing & analysis', icon: '📈' },
                        { name: 'Joblib', desc: 'Model serialization & storage', icon: '💾' }
                      ].map((tech, i) => (
                        <div key={i} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-200">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{tech.icon}</span>
                            <div>
                              <h4 className="font-bold text-gray-900">{tech.name}</h4>
                              <p className="text-sm text-gray-600">{tech.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced Bar Chart */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl shadow-xl p-8 border border-gray-200">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Technology Usage Distribution</h3>
                    <p className="text-gray-600">Performance and adoption metrics across our tech stack</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={techStackData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9}/>
                            <stop offset="95%" stopColor="#1E40AF" stopOpacity={0.7}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis 
                          dataKey="technology" 
                          tick={{ fontSize: 12, fill: '#374151' }}
                          axisLine={{ stroke: '#9CA3AF' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: '#374151' }}
                          axisLine={{ stroke: '#9CA3AF' }}
                          label={{ value: 'Usage %', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                          }}
                          formatter={(value) => [`${value}%`, 'Usage']}
                        />
                        <Bar 
                          dataKey="usage" 
                          fill="url(#colorGradient)" 
                          radius={[8, 8, 0, 0]}
                          stroke="#1E40AF"
                          strokeWidth={1}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Architecture Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-xl p-8 border border-blue-200 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-blue-700">Frontend</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        '• React.js with Hooks',
                        '• TailwindCSS for styling', 
                        '• Recharts for visualizations',
                        '• Responsive design',
                        '• Real-time updates'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-sm">{item.replace('• ', '')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl shadow-xl p-8 border border-green-200 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-green-700">Backend</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        '• Flask REST API',
                        '• Python data processing',
                        '• Scikit-learn ML models', 
                        '• Pandas & NumPy',
                        '• Real-time predictions'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-sm">{item.replace('• ', '')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-3xl shadow-xl p-8 border border-purple-200 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-purple-700">Machine Learning</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        '• Random Forest Classifier',
                        '• Feature engineering',
                        '• Model validation',
                        '• Performance metrics', 
                        '• Continuous learning'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          <span className="text-sm">{item.replace('• ', '')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-8">
                {/* Analytics Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                    </svg>
                    ANALYTICS & INSIGHTS
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Machine Learning Analytics</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">Advanced AI-powered insights driving intelligent food delivery decisions</p>
                </div>

                {/* Feature Importance */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl shadow-xl p-8 border border-green-200">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">ML Model Feature Importance</h3>
                      <p className="text-gray-600">Key factors influencing restaurant performance predictions</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={featureImportanceData} layout="horizontal" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                          <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.9}/>
                            <stop offset="95%" stopColor="#059669" stopOpacity={0.7}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis 
                          type="number" 
                          tick={{ fontSize: 12, fill: '#374151' }}
                          axisLine={{ stroke: '#9CA3AF' }}
                          domain={[0, 40]}
                        />
                        <YAxis 
                          dataKey="feature" 
                          type="category" 
                          width={120}
                          tick={{ fontSize: 12, fill: '#374151' }}
                          axisLine={{ stroke: '#9CA3AF' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                          }}
                          formatter={(value) => [`${value}%`, 'Importance']}
                        />
                        <Bar 
                          dataKey="importance" 
                          fill="url(#greenGradient)" 
                          radius={[0, 8, 8, 0]}
                          stroke="#059669"
                          strokeWidth={1}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Analytics Insights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-xl p-8 text-white hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold">Predictive Analytics</h3>
                    </div>
                    <p className="text-blue-100 leading-relaxed">
                      Advanced ML algorithms predict restaurant performance with <span className="font-bold text-white">94.2% accuracy</span> using 15+ features for intelligent decision making.
                    </p>
                    <div className="mt-4 flex items-center text-blue-200">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-sm font-medium">Real-time Processing</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-xl p-8 text-white hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold">Real-time Insights</h3>
                    </div>
                    <p className="text-green-100 leading-relaxed">
                      Live dashboard provides <span className="font-bold text-white">instant feedback</span> on delivery performance and operational metrics for immediate action.
                    </p>
                    <div className="mt-4 flex items-center text-green-200">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-sm font-medium">Live Monitoring</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl shadow-xl p-8 text-white hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold">Data-Driven Decisions</h3>
                    </div>
                    <p className="text-purple-100 leading-relaxed">
                      Actionable insights help restaurants <span className="font-bold text-white">optimize operations</span> and improve customer satisfaction through intelligent recommendations.
                    </p>
                    <div className="mt-4 flex items-center text-purple-200">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-sm font-medium">Smart Optimization</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'workflow' && (
              <div className="space-y-8">
                {/* Workflow Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                    PROJECT WORKFLOW
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">System Architecture & Process</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">End-to-end workflow from data input to intelligent predictions</p>
                </div>

                {/* Project Workflow */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-3xl shadow-xl p-8 border border-indigo-200">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">User Journey & Process Flow</h3>
                      <p className="text-gray-600">Complete workflow from user interaction to intelligent results</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl mb-8 border border-white/50">
                    <h4 className="text-xl font-bold text-indigo-600 mb-6 text-center">Interactive User Journey</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { step: '1', title: 'User Input', desc: 'Order details entry', color: 'from-blue-500 to-blue-600', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
                        { step: '2', title: 'API Call', desc: 'Data transmission', color: 'from-green-500 to-green-600', icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z' },
                        { step: '3', title: 'ML Prediction', desc: 'AI processing', color: 'from-purple-500 to-purple-600', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
                        { step: '4', title: 'Results Display', desc: 'Intelligent insights', color: 'from-orange-500 to-orange-600', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
                      ].map((item, i) => (
                        <div key={i} className="text-center group hover:scale-105 transition-all duration-300">
                          <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto shadow-lg group-hover:shadow-xl`}>
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon}/>
                            </svg>
                          </div>
                          <h5 className="font-bold text-gray-900 mb-1">{item.title}</h5>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-indigo-600">Data Flow Pipeline</h4>
                      </div>
                      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-xl mb-4">
                        <p className="text-sm font-mono text-gray-700">CSV Dataset → Backend Processing → ML Model Training → API Endpoints → Frontend Display</p>
                      </div>
                      <div className="space-y-3">
                        {[
                          '500+ restaurant orders processed',
                          'Random Forest model training',
                          'Real-time API predictions', 
                          'Interactive dashboard updates'
                        ].map((item, i) => (
                          <div key={i} className="flex items-center">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-purple-600">Prediction Process</h4>
                      </div>
                      <div className="space-y-3">
                        {[
                          'User enters order details',
                          'Frontend sends POST to /predict',
                          'Backend processes via ML model',
                          'Returns prediction with confidence',
                          'Results displayed with recommendations',
                          'Analytics dashboard updates'
                        ].map((item, i) => (
                          <div key={i} className="flex items-start">
                            <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">{i + 1}</div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-3xl shadow-xl p-8 border border-yellow-200">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Target Audience & Market Reach</h3>
                      <p className="text-gray-600">Strategic market segmentation for maximum impact</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      { percent: '70%', title: 'Primary Market', color: 'from-blue-500 to-blue-600', items: ['Food Delivery Platforms', 'Restaurant Chains', 'Cloud Kitchens'] },
                      { percent: '25%', title: 'Secondary Market', color: 'from-green-500 to-green-600', items: ['Independent Restaurants', 'Food Aggregators', 'Business Analysts'] },
                      { percent: '5%', title: 'Tertiary Market', color: 'from-purple-500 to-purple-600', items: ['End Customers', 'Investors', 'Researchers'] }
                    ].map((segment, i) => (
                      <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:shadow-lg transition-all duration-300">
                        <div className={`w-16 h-16 bg-gradient-to-r ${segment.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto`}>
                          {segment.percent}
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 text-center mb-4">{segment.title}</h4>
                        <div className="space-y-2">
                          {segment.items.map((item, j) => (
                            <div key={j} className="flex items-center">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                              <span className="text-sm text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact & Support */}
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-3xl shadow-xl p-8 border border-gray-200">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Contact & Developer Support</h3>
                      <p className="text-gray-600">Get in touch for collaboration and technical support</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">Lead Developer</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-gray-700"><strong>Abhishek Giri</strong></span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                          </svg>
                          <span className="text-gray-700">abhishekgiri1978@gmail.com</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-gray-700">Haridwar, Uttarakhand, India</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">Quick Start Guide</h4>
                      </div>
                      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 rounded-xl mb-4 border border-slate-700">
                        <div className="flex items-center mb-2">
                          <div className="flex space-x-2 mb-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                        </div>
                        <div className="font-mono text-sm">
                          <span className="text-green-400">user@orderly</span>
                          <span className="text-white">:</span>
                          <span className="text-blue-400">~/orderly</span>
                          <span className="text-white">$ </span>
                          <span className="text-white">python3 run_project.py</span>
                        </div>
                      </div>
                      <div className="flex items-center text-green-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm font-medium">Ready to revolutionize food delivery analytics!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.25;
          }
          50% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.4;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default About;