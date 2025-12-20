import React from 'react';

const Home = ({ setActiveTab }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://img.freepik.com/free-photo/people-taking-photos-food_23-2149303524.jpg?semt=ais_hybrid&w=740&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-7xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
            Smart Food Analytics Platform
          </h1>
          <p className="text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Transform your restaurant operations with AI-powered insights and performance predictions
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => setActiveTab('predict')}
              className="group px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className="px-10 py-5 bg-white/10 backdrop-blur-lg text-white border-2 border-white/30 rounded-2xl font-bold text-xl hover:bg-white/20 transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Learn More
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">94.2%</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">Real-time</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider">Analytics</div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Audience Sections */}
      <div className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          
          {/* For Delivery Platforms */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-xl p-12 border border-blue-100">
            <div className="text-center mb-12">
              <span className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-bold mb-6">FOR DELIVERY PLATFORMS</span>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Integrate with Swiggy & Zomato
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">Enhance customer experience and reduce failed deliveries with AI-powered restaurant performance predictions</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Predict Success Rate</h3>
                <p className="text-gray-600">Know delivery success probability before order confirmation</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Reduce Complaints</h3>
                <p className="text-gray-600">40% reduction in customer complaints and cancellations</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Routing</h3>
                <p className="text-gray-600">Optimize delivery routes based on performance data</p>
              </div>
            </div>
          </div>

          {/* For Restaurants */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl shadow-xl p-12 border border-orange-100">
            <div className="text-center mb-12">
              <span className="inline-block px-6 py-3 bg-orange-600 text-white rounded-full text-sm font-bold mb-6">FOR RESTAURANTS</span>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Optimize Your Operations
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">Leverage cutting-edge AI technology to optimize operations, predict performance, and maximize profitability</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 border border-gray-100">
                <div className="absolute -top-6 left-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-time Analytics</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">Monitor restaurant performance with live data insights and comprehensive analytics dashboard</p>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>Live performance tracking</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>Custom dashboards</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>Automated reporting</li>
                  </ul>
                </div>
              </div>
              
              <div className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 border border-gray-100">
                <div className="absolute -top-6 left-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Predictions</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">Predict restaurant performance using machine learning algorithms and historical data</p>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>Performance forecasting</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>Demand prediction</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>Risk assessment</li>
                  </ul>
                </div>
              </div>
              
              <div className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 border border-gray-100">
                <div className="absolute -top-6 left-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Optimize Operations</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">Identify bottlenecks and optimize delivery times, kitchen efficiency, and customer satisfaction</p>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>Process optimization</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>Efficiency metrics</li>
                    <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>Cost reduction</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* For Customers */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl p-12 border border-green-100">
            <div className="text-center mb-12">
              <span className="inline-block px-6 py-3 bg-green-600 text-white rounded-full text-sm font-bold mb-6">FOR CUSTOMERS</span>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Smart Order Decisions
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">Make informed ordering decisions with AI-powered restaurant performance insights and delivery predictions</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Delivery Time Prediction</h3>
                <p className="text-gray-600">Know actual delivery time before placing order</p>
              </div>
              
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Rating</h3>
                <p className="text-gray-600">See real-time restaurant performance scores</p>
              </div>
              
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Recommendations</h3>
                <p className="text-gray-600">Get AI-suggested alternatives for better experience</p>
              </div>
            </div>
          </div>

          {/* Integration Section */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl shadow-xl p-12 border border-purple-100">
            <div className="text-center mb-12">
              <span className="inline-block px-6 py-3 bg-purple-600 text-white rounded-full text-sm font-bold mb-6">INTEGRATION READY</span>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                API & Integration
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">Seamlessly integrate Orderly's AI capabilities into your existing platform with our comprehensive API suite</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-red-600">S</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Swiggy Integration</h3>
                <p className="text-gray-600">Pre-order performance predictions and smart restaurant recommendations</p>
              </div>
              
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-red-600">Z</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Zomato Integration</h3>
                <p className="text-gray-600">Restaurant performance ratings and delivery time predictions</p>
              </div>
              
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">U</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Uber Eats Integration</h3>
                <p className="text-gray-600">Smart delivery routing and performance optimization</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trusted by Industry Leaders</h2>
            <p className="text-gray-400 text-lg">See what restaurant owners are saying about Orderly</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-6">"This ML model helped us optimize our delivery predictions. The Random Forest algorithm achieved 94.2% accuracy on our dataset."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4">AG</div>
                <div>
                  <div className="text-white font-semibold">Abhishek Giri</div>
                  <div className="text-gray-400 text-sm">ML Engineer & Developer</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-6">"The project demonstrates real-world application of AI in food delivery. Features like KPT duration and distance show strong predictive power."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold mr-4">DS</div>
                <div>
                  <div className="text-white font-semibold">Data Science Team</div>
                  <div className="text-gray-400 text-sm">Technical Review</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-300 mb-6">"Complete full-stack implementation with React frontend, Flask backend, and real ML model integration. Ready for production deployment."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">PT</div>
                <div>
                  <div className="text-white font-semibold">Project Team</div>
                  <div className="text-gray-400 text-sm">Technical Assessment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Transform Your Restaurant?</h2>
          <p className="text-xl text-orange-100 mb-12 max-w-2xl mx-auto">Join hundreds of restaurants already using Orderly to optimize operations and boost profitability</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setActiveTab('predict')}
              className="px-10 py-5 bg-white text-orange-600 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="px-10 py-5 bg-white/10 backdrop-blur-lg text-white border-2 border-white/30 rounded-2xl font-bold text-xl hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
            >
              View Demo
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Core Features */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-orange-400">Core Features</h3>
              <ul className="space-y-3">
                <li><button onClick={() => setActiveTab('predict')} className="text-gray-300 hover:text-white transition-colors">AI Performance Predictions</button></li>
                <li><button onClick={() => setActiveTab('dashboard')} className="text-gray-300 hover:text-white transition-colors">Real-time Analytics Dashboard</button></li>
                <li><button onClick={() => setActiveTab('dashboard')} className="text-gray-300 hover:text-white transition-colors">Restaurant Performance Analytics</button></li>
                <li><button onClick={() => setActiveTab('predict')} className="text-gray-300 hover:text-white transition-colors">ML-Driven Performance Predictions</button></li>
                <li><button onClick={() => setActiveTab('dashboard')} className="text-gray-300 hover:text-white transition-colors">Delivery Optimization Insights</button></li>
              </ul>
            </div>

            {/* Business Solutions */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-orange-400">Business Solutions</h3>
              <ul className="space-y-3">
                <li><button onClick={() => setActiveTab('recommendations')} className="text-gray-300 hover:text-white transition-colors">Swiggy & Zomato Integration</button></li>
                <li><button onClick={() => setActiveTab('about')} className="text-gray-300 hover:text-white transition-colors">REST API Integration</button></li>
                <li><button onClick={() => setActiveTab('dashboard')} className="text-gray-300 hover:text-white transition-colors">Custom Analytics Dashboard</button></li>
                <li><button onClick={() => setActiveTab('about')} className="text-gray-300 hover:text-white transition-colors">Enterprise Partnership</button></li>
                <li><button onClick={() => setActiveTab('about')} className="text-gray-300 hover:text-white transition-colors">Support & Documentation</button></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-orange-400">Quick Links</h3>
              <ul className="space-y-3">
                <li><button onClick={() => setActiveTab('dashboard')} className="text-gray-300 hover:text-white transition-colors">Dashboard</button></li>
                <li><button onClick={() => setActiveTab('predict')} className="text-gray-300 hover:text-white transition-colors">Predictions</button></li>
                <li><button onClick={() => setActiveTab('recommendations')} className="text-gray-300 hover:text-white transition-colors">Recommendations</button></li>
                <li><button onClick={() => setActiveTab('profile')} className="text-gray-300 hover:text-white transition-colors">Profile</button></li>
                <li><button onClick={() => setActiveTab('about')} className="text-gray-300 hover:text-white transition-colors">About</button></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-orange-400">Contact</h3>
              <div className="space-y-3">
                <p className="text-gray-300">📧 abhishekgiri1978@gmail.com</p>
                <p className="text-gray-300">📍 Haridwar, Uttarakhand</p>
                <div className="flex space-x-4 mt-4">
                  <a href="https://github.com/abhishekgiri04" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/abhishek-giri04/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2025 Orderly Technologies. All Rights Reserved. Built with ❤️ for Food Excellence</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;