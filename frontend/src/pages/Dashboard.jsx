import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [featureImportance, setFeatureImportance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    fetchFeatureImportance();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:5000/analyze');
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Set fallback data when backend is not available
      setAnalytics({
        summary: {
          avg_rating: 4.2,
          avg_kpt_duration: 18.5,
          avg_distance: 3.8,
          delivery_success_rate: 87.3
        },
        performance_distribution: { 0: 120, 1: 380 },
        peak_hours: { 12: 45, 13: 67, 18: 89, 19: 95, 20: 78 },
        total_orders: 500
      });
      setLoading(false);
    }
  };

  const fetchFeatureImportance = async () => {
    try {
      const response = await fetch('http://localhost:5000/feature-importance');
      const data = await response.json();
      setFeatureImportance(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching feature importance:', error);
      // Set fallback feature importance data
      setFeatureImportance([
        { feature: 'KPT Duration', importance: 0.35 },
        { feature: 'Distance', importance: 0.28 },
        { feature: 'Rider Wait Time', importance: 0.22 },
        { feature: 'Order Hour', importance: 0.15 }
      ]);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const peakHoursData = analytics?.peak_hours ? 
    Object.entries(analytics.peak_hours).map(([hour, count]) => ({
      hour: `${hour}:00`,
      orders: count
    })) : [
      { hour: '12:00', orders: 45 },
      { hour: '13:00', orders: 67 },
      { hour: '18:00', orders: 89 },
      { hour: '19:00', orders: 95 },
      { hour: '20:00', orders: 78 }
    ];

  return (
    <div style={{ minHeight: '100vh', backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://content.jdmagicbox.com/v2/comp/hyderabad/u1/040pxx40.xx40.220319152238.e7u1/catalogue/pnr-food-plaza-and-restaurant-hyderabad-restaurants-m6h57h0sej.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-block', padding: '8px 24px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50px', marginBottom: '16px', backdropFilter: 'blur(10px)' }}>
            <span style={{ color: 'white', fontSize: '12px', fontWeight: '600', letterSpacing: '1px' }}>ANALYTICS DASHBOARD</span>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: 'white', marginBottom: '16px', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>Restaurant Analytics</h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>Real-time insights and performance metrics for your food delivery operations</p>
        </div>
        
        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '60px' }}>
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '32px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '60px', height: '60px', background: 'linear-gradient(45deg, #ff5200, #ff7b3d)', borderRadius: '50%', opacity: '0.1' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #ff5200, #ff7b3d)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280', margin: 0 }}>Average Rating</h3>
            </div>
            <p style={{ fontSize: '36px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>{analytics?.summary?.avg_rating ? `${analytics.summary.avg_rating}/5.0` : 'N/A'}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '32px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '60px', height: '60px', background: 'linear-gradient(45deg, #10b981, #34d399)', borderRadius: '50%', opacity: '0.1' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #10b981, #34d399)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280', margin: 0 }}>Avg KPT Duration</h3>
            </div>
            <p style={{ fontSize: '36px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>{analytics?.summary?.avg_kpt_duration || 'N/A'} <span style={{ fontSize: '18px', color: '#6b7280' }}>min</span></p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '32px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '60px', height: '60px', background: 'linear-gradient(45deg, #3b82f6, #60a5fa)', borderRadius: '50%', opacity: '0.1' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22S19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280', margin: 0 }}>Avg Distance</h3>
            </div>
            <p style={{ fontSize: '36px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>{analytics?.summary?.avg_distance || 'N/A'} <span style={{ fontSize: '18px', color: '#6b7280' }}>km</span></p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '32px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '60px', height: '60px', background: 'linear-gradient(45deg, #8b5cf6, #a78bfa)', borderRadius: '50%', opacity: '0.1' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280', margin: 0 }}>Success Rate</h3>
            </div>
            <p style={{ fontSize: '36px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>{analytics?.summary?.delivery_success_rate || 'N/A'}<span style={{ fontSize: '18px', color: '#6b7280' }}>%</span></p>
          </div>
        </div>

        {/* Charts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '40px' }}>
          
          {/* Performance Distribution */}
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 30px 80px rgba(0,0,0,0.12)', padding: '40px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.3)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#1a1a1a' }}>Performance Distribution</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '200px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'conic-gradient(#10b981 0deg 274deg, #ef4444 274deg 360deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700' }}>76%</div>
                </div>
                <div style={{ fontSize: '14px', color: '#10b981', fontWeight: '600' }}>Good Performance</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{analytics?.performance_distribution?.[1] || 380} orders</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#ef4444', fontWeight: '600', marginBottom: '8px' }}>Poor Performance</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{analytics?.performance_distribution?.[0] || 120} orders (24%)</div>
              </div>
            </div>
          </div>

          {/* Feature Importance */}
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 30px 80px rgba(0,0,0,0.12)', padding: '40px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.3)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#1a1a1a' }}>Feature Importance</h2>
            <div style={{ space: '16px' }}>
              {featureImportance.map((item, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>{item.feature}</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>{(item.importance * 100).toFixed(1)}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
                    <div style={{ width: `${item.importance * 100}%`, height: '100%', backgroundColor: '#3b82f6', borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Hours */}
          <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 30px 80px rgba(0,0,0,0.12)', padding: '40px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.3)', gridColumn: '1 / -1' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#1a1a1a' }}>Order Volume by Hour</h2>
            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-around', height: '200px', padding: '20px 0' }}>
              {peakHoursData.map((item, index) => (
                <div key={index} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: `${(item.orders / 100) * 150}px`, backgroundColor: '#8b5cf6', borderRadius: '4px 4px 0 0', marginBottom: '8px', minHeight: '20px' }}></div>
                  <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>{item.hour}</div>
                  <div style={{ fontSize: '10px', color: '#9ca3af' }}>{item.orders}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div style={{ marginTop: '60px', background: 'rgba(255,255,255,0.95)', borderRadius: '32px', boxShadow: '0 30px 80px rgba(0,0,0,0.12)', padding: '60px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.3)' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1a1a1a', marginBottom: '40px', textAlign: 'center' }}>Business Insights</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            <div style={{ padding: '32px', background: 'linear-gradient(145deg, #f8fafc, #e2e8f0)', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #ff5200, #ff7b3d)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </div>
                <h3 style={{ fontWeight: '700', color: '#1a1a1a', margin: 0, fontSize: '20px' }}>Performance Metrics</h3>
              </div>
              <ul style={{ fontSize: '16px', color: '#6b7280', lineHeight: '2', listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '12px' }}>• Total Orders Analyzed: <strong>{analytics?.total_orders || 'Loading...'}</strong></li>
                <li style={{ marginBottom: '12px' }}>• Live Predictions Made: <strong>{analytics?.predictions_made || 0}</strong></li>
                <li style={{ marginBottom: '12px' }}>• Average Rating: <strong>{analytics?.summary?.avg_rating ? `${analytics.summary.avg_rating}/5.0` : 'Loading...'}</strong></li>
                <li>• Kitchen Prep Time: <strong>{analytics?.summary?.avg_kpt_duration ? `${analytics.summary.avg_kpt_duration} minutes` : 'Loading...'}</strong></li>
              </ul>
            </div>
            <div style={{ padding: '32px', background: 'linear-gradient(145deg, #f8fafc, #e2e8f0)', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #10b981, #34d399)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M2.81 14.12L5.64 11.29L8.17 10.79C11.39 6.41 17.55 5.54 19.78 7.77C22 10 21.14 16.17 16.76 19.39L16.26 21.92L13.43 19.09L14.19 16.76L9.24 14.76L6.91 15.52L2.81 14.12M16.77 8.5C17.33 8.5 17.77 8.94 17.77 9.5C17.77 10.06 17.33 10.5 16.77 10.5C16.21 10.5 15.77 10.06 15.77 9.5C15.77 8.94 16.21 8.5 16.77 8.5Z"/>
                  </svg>
                </div>
                <h3 style={{ fontWeight: '700', color: '#1a1a1a', margin: 0, fontSize: '20px' }}>Operational Insights</h3>
              </div>
              <ul style={{ fontSize: '16px', color: '#6b7280', lineHeight: '2', listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '12px' }}>• Delivery Success Rate: <strong>{analytics?.summary?.delivery_success_rate ? `${analytics.summary.delivery_success_rate}%` : 'Loading...'}</strong></li>
                <li style={{ marginBottom: '12px' }}>• Average Delivery Distance: <strong>{analytics?.summary?.avg_distance ? `${analytics.summary.avg_distance} km` : 'Loading...'}</strong></li>
                <li>• Peak ordering hours identified from data trends</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;