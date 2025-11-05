import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const CustomerForm = ({ onRecommendations }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customData, setCustomData] = useState({
    age: 25,
    gender: 'M',
    language: 'English',
    state: 'Uttarakhand',
    city: 'Haridwar',
    latitude: 12.9716,
    longitude: 77.5946,
    loyalty_score: 0.8
  });

  const stateCityMap = {
    'Delhi': ['New Delhi', 'Central Delhi'],
    'Maharashtra': ['Mumbai', 'Pune'],
    'Karnataka': ['Bangalore', 'Mysore'],
    'Tamil Nadu': ['Chennai', 'Coimbatore'],
    'Uttarakhand': ['Dehradun', 'Haridwar'],
    'Uttar Pradesh': ['Lucknow', 'Agra']
  };

  const handleStateChange = (e) => {
    const newState = e.target.value;
    const cities = stateCityMap[newState] || [];
    setCustomData({
      ...customData, 
      state: newState,
      city: cities[0] || ''
    });
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCustomers();
    
    // Listen for profile updates
    const handleProfileUpdate = () => {
      loadCustomers();
    };
    
    window.addEventListener('profileUpdate', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('profileUpdate', handleProfileUpdate);
    };
  }, []);

  const loadCustomers = async () => {
    try {
      // Get profile data from localStorage (Profile page)
      const profileData = localStorage.getItem('orderlyUserProfile');
      if (profileData) {
        const profile = JSON.parse(profileData);
        
        // Check if profile has required fields filled
        const hasCompleteProfile = profile.name && profile.name !== 'User Profile' && 
                                 profile.email && profile.email !== 'user@example.com' &&
                                 profile.age && profile.gender && profile.language && 
                                 profile.state && profile.city;
        
        if (hasCompleteProfile) {
          const customerProfile = {
            customer_id: 1,
            age: profile.age,
            gender: profile.gender === 'Male' ? 'M' : profile.gender === 'Female' ? 'F' : 'M',
            language: profile.language,
            state: profile.state,
            city: profile.city,
            loyalty_score: 0.8
          };
          
          setCustomers([customerProfile]);
          setSelectedCustomer('1'); // Auto-select the profile
          
          // Auto-fill form with real profile data
          setCustomData({
            age: profile.age,
            gender: profile.gender === 'Male' ? 'M' : profile.gender === 'Female' ? 'F' : 'M',
            language: profile.language,
            state: profile.state,
            city: profile.city,
            latitude: 12.9716,
            longitude: 77.5946,
            loyalty_score: 0.8
          });
        } else {
          // Profile exists but incomplete
          setCustomers([]);
          setCustomData({
            age: '',
            gender: '',
            language: '',
            state: '',
            city: '',
            latitude: 12.9716,
            longitude: 77.5946,
            loyalty_score: 0.8
          });
        }
      } else {
        setCustomers([]);
        // Reset form when no profile exists
        setCustomData({
          age: '',
          gender: '',
          language: '',
          state: '',
          city: '',
          latitude: 12.9716,
          longitude: 77.5946,
          loyalty_score: 0.8
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setCustomers([]);
    }
  };

  const handleCustomerSelect = (e) => {
    const customerId = e.target.value;
    setSelectedCustomer(customerId);
    
    if (customerId) {
      const customer = customers.find(c => c.customer_id === parseInt(customerId));
      if (customer) {
        setCustomData({
          age: customer.age,
          gender: customer.gender,
          language: customer.language,
          state: customer.state,
          city: customer.city,
          latitude: customer.latitude || 12.9716,
          longitude: customer.longitude || 77.5946,
          loyalty_score: customer.loyalty_score
        });
      }
    } else {
      // Reset to empty when no profile selected
      setCustomData({
        age: '',
        gender: '',
        language: '',
        state: '',
        city: '',
        latitude: 12.9716,
        longitude: 77.5946,
        loyalty_score: 0.8
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if profile exists
    if (customers.length === 0 || !selectedCustomer) {
      alert('Please create a profile first by going to Profile page, or select an existing profile.');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await api.getRecommendations(customData);
      const recommendations = response.data.recommendations || [];
      onRecommendations(recommendations, { ...customData, city: customData.city, state: customData.state });
    } catch (error) {
      console.error('Backend error:', error);
      onRecommendations([], { ...customData, city: customData.city, state: customData.state });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1a1a1a', marginBottom: '12px' }}>Tell Us About Yourself</h2>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>Help us find the perfect restaurants for your taste and location</p>
      </div>
      
      <form onSubmit={handleSubmit} style={{ background: 'linear-gradient(145deg, #f8fafc, #e2e8f0)', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
            Profile Selection <span style={{ color: '#ef4444', fontSize: '14px', fontWeight: '500' }}>(Required)</span>
          </label>
          <select 
            value={selectedCustomer} 
            onChange={handleCustomerSelect}
            required
            style={{ width: '100%', padding: '16px', border: '2px solid #e5e7eb', borderRadius: '16px', fontSize: '16px', backgroundColor: 'white', transition: 'all 0.3s ease', outline: 'none' }}
            onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          >
            {customers.length === 0 ? (
              <option value="">No profiles available - Please create profile first</option>
            ) : (
              <>
                <option value="">-- Choose existing profile or create new --</option>
                {customers.map(customer => (
                  <option key={customer.customer_id} value={customer.customer_id}>
                    {customer.age}y {customer.gender === 'M' ? 'Male' : 'Female'} from {customer.city}, {customer.state} ({customer.language})
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
              Age
            </label>
            <input 
              type="number" 
              value={customData.age}
              onChange={(e) => setCustomData({...customData, age: parseInt(e.target.value) || ''})}
              placeholder="Enter age"
              disabled={customers.length === 0}
              style={{ width: '100%', padding: '16px', border: '2px solid #e5e7eb', borderRadius: '16px', fontSize: '16px', backgroundColor: customers.length === 0 ? '#f9fafb' : 'white', color: customers.length === 0 ? '#9ca3af' : '#000', transition: 'all 0.3s ease', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
        
          <div>
            <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
              Gender
            </label>
            <select 
              value={customData.gender}
              onChange={(e) => setCustomData({...customData, gender: e.target.value})}
              disabled={customers.length === 0}
              style={{ width: '100%', padding: '16px', border: '2px solid #e5e7eb', borderRadius: '16px', fontSize: '16px', backgroundColor: customers.length === 0 ? '#f9fafb' : 'white', color: customers.length === 0 ? '#9ca3af' : '#000', transition: 'all 0.3s ease', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
        
          <div>
            <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
              Language
            </label>
            <select 
              value={customData.language}
              onChange={(e) => setCustomData({...customData, language: e.target.value})}
              disabled={customers.length === 0}
              style={{ width: '100%', padding: '16px', border: '2px solid #e5e7eb', borderRadius: '16px', fontSize: '16px', backgroundColor: customers.length === 0 ? '#f9fafb' : 'white', color: customers.length === 0 ? '#9ca3af' : '#000', transition: 'all 0.3s ease', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Tamil">Tamil</option>
            </select>
          </div>
        </div>
        
        <div style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.1), rgba(247,147,30,0.1))', borderRadius: '24px', padding: '32px', marginBottom: '32px', border: '2px solid rgba(255,107,53,0.2)', boxShadow: '0 10px 30px rgba(255,107,53,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>Your Location</h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Choose your city and area for better recommendations</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                State
              </label>
              <select 
                value={customData.state || ''}
                onChange={handleStateChange}
                disabled={customers.length === 0}
                style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '14px', backgroundColor: customers.length === 0 ? '#f9fafb' : 'white', color: customers.length === 0 ? '#9ca3af' : '#000', transition: 'all 0.3s ease', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              >
                <option value="">Select State</option>
                {Object.keys(stateCityMap).sort().map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                City/District
              </label>
              <select 
                value={customData.city || ''}
                onChange={(e) => setCustomData({...customData, city: e.target.value})}
                disabled={customers.length === 0}
                style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '14px', backgroundColor: customers.length === 0 ? '#f9fafb' : 'white', color: customers.length === 0 ? '#9ca3af' : '#000', transition: 'all 0.3s ease', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              >
                <option value="">Select City</option>
                {(stateCityMap[customData.state] || []).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <button 
          type={customers.length === 0 || !selectedCustomer ? 'button' : 'submit'}
          disabled={loading}
          onClick={customers.length === 0 || !selectedCustomer ? () => {
            // Redirect to profile page
            const event = new CustomEvent('navigateToProfile');
            window.dispatchEvent(event);
            // Also try hash navigation as fallback
            window.location.hash = 'profile';
          } : undefined}
          style={{
            width: '100%',
            padding: '20px',
            background: loading ? 'linear-gradient(135deg, #9ca3af, #6b7280)' : (customers.length === 0 || !selectedCustomer) ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'linear-gradient(135deg, #ff6b35, #f7931e)',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: loading ? 'none' : (customers.length === 0 || !selectedCustomer) ? '0 10px 30px rgba(59,130,246,0.4)' : '0 10px 30px rgba(255,107,53,0.4)',
            transform: loading ? 'none' : 'translateY(0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}
          onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
        >
          {loading ? (
            <>
              <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              Finding Perfect Matches...
            </>
          ) : customers.length === 0 || !selectedCustomer ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Go to Profile Page - Create Profile
            </>
          ) : (
            <>
              Get My Food Recommendations
            </>
          )}
        </button>
      </form>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CustomerForm;