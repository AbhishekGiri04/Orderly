import React, { useState } from 'react';
import { api } from '../services/api';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    Distance: '2km',
    KPT_duration: '15',
    Rider_wait_time: '5',
    Order_time: '12:00 PM'
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Call real backend API with ML model
      const result = await api.predict(formData);
      setPrediction(result);
    } catch (error) {
      console.error('Prediction error:', error);
      // Fallback to simple logic if backend is not running
      try {
        const kptDuration = parseInt(formData.KPT_duration);
        const riderWait = parseInt(formData.Rider_wait_time);
        const distance = parseInt(formData.Distance.replace(/\D/g, '')) || 1;
        
        const score = (kptDuration <= 15 ? 0.4 : 0.1) + 
                     (riderWait <= 5 ? 0.3 : 0.1) + 
                     (distance <= 3 ? 0.3 : 0.1);
        
        const performance = score >= 0.6 ? 'Good' : 'Poor';
        const confidence = Math.min(0.95, 0.6 + Math.random() * 0.3);
        
        setPrediction({
          predicted_label: performance === 'Good' ? 1 : 0,
          performance: performance,
          confidence: confidence,
          probability_good: performance === 'Good' ? confidence : 1 - confidence,
          note: '⚠️ Backend not running - Using fallback logic. Run: python3 run_project.py'
        });
      } catch (fallbackError) {
        setPrediction({
          error: '❌ Unable to connect to ML service. Please start the backend server using: python3 run_project.py'
        });
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://shipsy.io/wp-content/uploads/2021/07/Blog-64.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-600/20 backdrop-blur-sm text-blue-200 rounded-full text-sm font-semibold mb-4 border border-blue-400/30">PERFORMANCE PREDICTOR</span>
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">AI-Powered Analytics</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-lg">Advanced machine learning algorithms to optimize restaurant operations</p>
          </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Prediction Form */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Delivery Distance
                </label>
                <select
                  name="Distance"
                  value={formData.Distance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  <option value="<1km">Less than 1km</option>
                  <option value="1km">1km</option>
                  <option value="2km">2km</option>
                  <option value="3km">3km</option>
                  <option value="4km">4km</option>
                  <option value="5km">5km</option>
                  <option value="6km">6km</option>
                  <option value="7km">7km</option>
                  <option value="8km">8km</option>
                  <option value="9km">9km</option>
                  <option value="10km">10km+</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Kitchen Prep Time (minutes)
                </label>
                <input
                  type="number"
                  name="KPT_duration"
                  value={formData.KPT_duration}
                  onChange={handleInputChange}
                  min="1"
                  max="60"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  placeholder="Enter prep time"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Rider Wait Time (minutes)
                </label>
                <input
                  type="number"
                  name="Rider_wait_time"
                  value={formData.Rider_wait_time}
                  onChange={handleInputChange}
                  min="0"
                  max="30"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  placeholder="Enter wait time"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Order Time
                </label>
                <select
                  name="Order_time"
                  value={formData.Order_time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  <option value="08:00 AM">8:00 AM</option>
                  <option value="09:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">1:00 PM</option>
                  <option value="02:00 PM">2:00 PM</option>
                  <option value="03:00 PM">3:00 PM</option>
                  <option value="04:00 PM">4:00 PM</option>
                  <option value="05:00 PM">5:00 PM</option>
                  <option value="06:00 PM">6:00 PM</option>
                  <option value="07:00 PM">7:00 PM</option>
                  <option value="08:00 PM">8:00 PM</option>
                  <option value="09:00 PM">9:00 PM</option>
                  <option value="10:00 PM">10:00 PM</option>
                  <option value="11:00 PM">11:00 PM</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                  loading 
                    ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Performance...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Predict Performance
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Prediction Results */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Prediction Results</h2>
            </div>
            
            {prediction ? (
              <div className="space-y-6 animate-fadeIn">
                {prediction.error ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600">{prediction.error}</p>
                  </div>
                ) : (
                  <>
                    <div className={`p-6 rounded-2xl border-2 ${prediction.performance === 'Good' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 mb-2">Performance Prediction</h3>
                          <p className={`text-3xl font-bold ${prediction.performance === 'Good' ? 'text-green-600' : 'text-red-600'}`}>
                            {prediction.performance}
                          </p>
                        </div>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${prediction.performance === 'Good' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {prediction.performance === 'Good' ? (
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">Confidence</h3>
                        <p className="text-2xl font-bold text-blue-600">
                          {(prediction.confidence * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">Success Rate</h3>
                        <p className="text-2xl font-bold text-purple-600">
                          {(prediction.probability_good * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="text-sm font-semibold text-gray-600 mb-3">Performance Probability</h3>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${prediction.probability_good * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {(prediction.probability_good * 100).toFixed(1)}% likelihood of good performance
                      </p>
                    </div>

                    {prediction.note && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                        <p className="text-yellow-800 text-sm font-medium">{prediction.note}</p>
                      </div>
                    )}

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <h3 className="font-semibold text-blue-900">{prediction.note ? 'Simple Logic' : 'AI'} Recommendations</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-blue-800">
                        {prediction.performance === 'Poor' ? (
                          <>
                            <li className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Optimize kitchen preparation time to improve efficiency
                            </li>
                            <li className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Reduce rider wait time for better delivery performance
                            </li>
                            <li className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Consider delivery distance impact on overall performance
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Excellent performance indicators detected
                            </li>
                            <li className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Maintain current operational standards
                            </li>
                            <li className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              Use as benchmark for future orders
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready for Analysis</h3>
                <p className="text-gray-500">Enter order details and click "Predict Performance" to see AI-powered insights</p>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PredictionForm;