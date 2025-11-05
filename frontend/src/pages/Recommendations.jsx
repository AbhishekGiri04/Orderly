import React, { useState } from 'react';
import CustomerForm from '../components/CustomerForm.js';
import RecommendationList from '../components/RecommendationList.js';
import LocationView from '../components/MapView.js';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [profileLocation, setProfileLocation] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [activeView, setActiveView] = useState('form');

  const handleRecommendations = (recs, userProfile) => {
    setRecommendations(recs);
    if (recs && recs.length > 0) {
      setCustomerLocation({ latitude: 12.9716, longitude: 77.5946 });
    }
    if (userProfile) {
      setProfileLocation({ latitude: userProfile.latitude, longitude: userProfile.longitude });
      setCurrentCity(userProfile.city);
    }
    setActiveView('results');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url("https://figmaelements.com/wp-content/uploads/2020/12/food-app-ui.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '40px 20px' 
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 28px', backgroundColor: 'rgba(255,107,53,0.9)', borderRadius: '50px', marginBottom: '20px', backdropFilter: 'blur(15px)', boxShadow: '0 8px 32px rgba(255,107,53,0.3)' }}>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: '700', letterSpacing: '1px' }}>FOOD RECOMMENDATIONS</span>
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: '900', color: 'white', marginBottom: '20px', textShadow: '0 6px 30px rgba(0,0,0,0.5)', lineHeight: '1.1' }}>
            Discover Your Next
            <br/>
            <span style={{ background: 'linear-gradient(45deg, #ff6b35, #f7931e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Favorite Meal</span>
          </h1>
          <p style={{ fontSize: '22px', color: 'rgba(255,255,255,0.9)', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
            AI-powered recommendations tailored to your taste, location, and dining preferences
          </p>
        </div>

        {/* Interactive Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '50px', maxWidth: '800px', margin: '0 auto 50px' }}>
          {[
            { label: 'AI Powered', value: '94.2%' },
            { label: 'Restaurants', value: '500+' },
            { label: 'Rating', value: '4.2/5' },
            { label: 'Delivery', value: '<30min' }
          ].map((stat, i) => (
            <div key={i} style={{ 
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '20px', 
              padding: '24px 20px', 
              textAlign: 'center', 
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.25)',
              transition: 'all 0.3s ease', 
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              }}>
              <div style={{ color: 'white', fontSize: '20px', fontWeight: '800', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', fontWeight: '600' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Horizontal Tab Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.4)', borderRadius: '16px', padding: '8px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            {[
              { key: 'form', label: 'Profile' },
              { key: 'results', label: 'Results' },
              { key: 'map', label: 'Map' }
            ].map((view) => (
              <button
                key={view.key}
                onClick={() => setActiveView(view.key)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: activeView === view.key ? 'white' : 'rgba(255,255,255,0.7)',
                  background: activeView === view.key ? 'linear-gradient(135deg, #ff6b35, #f7931e)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minWidth: '100px',
                  boxShadow: activeView === view.key ? '0 4px 15px rgba(255,107,53,0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeView !== view.key) {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeView !== view.key) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '32px', boxShadow: '0 40px 100px rgba(0,0,0,0.2)', padding: '50px', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.3)', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative Elements */}
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'linear-gradient(45deg, #ff6b35, #f7931e)', borderRadius: '50%', opacity: '0.1' }}></div>
          <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '100px', height: '100px', background: 'linear-gradient(45deg, #667eea, #764ba2)', borderRadius: '50%', opacity: '0.1' }}></div>
          
          {activeView === 'form' && (
            <CustomerForm onRecommendations={handleRecommendations} />
          )}
          
          {activeView === 'results' && (
            <RecommendationList recommendations={recommendations} currentCity={currentCity} />
          )}
          
          {activeView === 'map' && (
            <LocationView customerLocation={customerLocation} recommendations={recommendations} profileLocation={profileLocation} selectedCity={currentCity} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;