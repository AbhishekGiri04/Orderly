import React, { useState } from 'react';
import { api } from '../services/api.js';

const RecommendationList = ({ recommendations, onSelectRestaurant, currentCity }) => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleRestaurantClick = async (vendor) => {
    setSelectedVendor(vendor);
    setShowMenu(true);
    
    try {
      const response = await api.getMenu(vendor.vendor_id, currentCity || 'Haridwar');
      setMenu(response.data.menu);
    } catch (error) {
      console.error('Error loading menu:', error);
    }
  };

  const addToCart = (dish) => {
    const existingItem = cart.find(item => item.dish_id === dish.dish_id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.dish_id === dish.dish_id 
          ? {...item, quantity: item.quantity + 1}
          : item
      ));
    } else {
      setCart([...cart, {...dish, quantity: 1}]);
    }
  };

  const removeFromCart = (dishId) => {
    setCart(cart.filter(item => item.dish_id !== dishId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;
    
    const orderData = {
      vendor_id: selectedVendor.vendor_id,
      vendor_name: selectedVendor.name,
      items: cart,
      total_price: getTotalPrice()
    };
    
    try {
      const response = await api.placeOrder(orderData);
      if (response.data.success) {
        setCart([]);
        
        // Update profile activity dashboard
        const savedProfile = localStorage.getItem('orderlyUserProfile');
        if (savedProfile) {
          try {
            const profile = JSON.parse(savedProfile);
            const updatedProfile = {
              ...profile,
              ordersPlaced: (parseInt(profile.ordersPlaced) || 0) + 1,
              totalSpent: (parseInt(profile.totalSpent) || 0) + getTotalPrice(),
              restaurantsTried: (parseInt(profile.restaurantsTried) || 0) + 1,
              avgRating: 4.5
            };
            localStorage.setItem('orderlyUserProfile', JSON.stringify(updatedProfile));
            console.log('Profile updated:', updatedProfile);
          } catch (error) {
            console.error('Error updating profile:', error);
          }
        } else {
          // Create new profile if none exists
          const newProfile = {
            ordersPlaced: 1,
            totalSpent: getTotalPrice(),
            restaurantsTried: 1,
            avgRating: 4.5
          };
          localStorage.setItem('orderlyUserProfile', JSON.stringify(newProfile));
          console.log('New profile created:', newProfile);
        }
        
        setNotification({
          type: 'success',
          message: `Order placed successfully! Order ID: ${response.data.order_id}`
        });
        setTimeout(() => setNotification(null), 5000);
        
        // Force immediate profile refresh
        setTimeout(() => {
          window.dispatchEvent(new Event('profileUpdate'));
        }, 1000);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setNotification({
        type: 'error',
        message: 'Error placing order. Please try again.'
      });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div style={{ maxWidth: showMenu ? '1200px' : '900px', margin: '0 auto', padding: '20px', position: 'relative' }}>
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: notification.type === 'success' ? 'linear-gradient(135deg, #10b981, #34d399)' : 'linear-gradient(135deg, #ef4444, #f87171)',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: `0 10px 30px ${notification.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
          zIndex: 1000,
          maxWidth: '400px',
          fontSize: '14px',
          fontWeight: '600',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {notification.type === 'success' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            )}
            {notification.message}
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      
      {showMenu && selectedVendor ? (
        <>
          <button 
            onClick={() => setShowMenu(false)}
            style={{
              background: 'linear-gradient(135deg, #1f2937, #374151)',
              color: 'white',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '20px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              marginBottom: '30px',
              boxShadow: '0 8px 24px rgba(31,41,55,0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            ← Back to Recommendations
          </button>
          
          <div style={{ background: 'linear-gradient(145deg, #fef7ff, #f3e8ff)', borderRadius: '28px', padding: '50px', boxShadow: '0 25px 80px rgba(168,85,247,0.15)', marginBottom: '40px', border: '2px solid rgba(168,85,247,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #a855f7, #9333ea)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#1f2937', marginBottom: '4px' }}>{selectedVendor.name}</h1>
                <p style={{ fontSize: '16px', color: '#7c3aed', fontWeight: '600', margin: 0 }}>Premium Dining Experience</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.8)', padding: '12px 20px', borderRadius: '16px' }}>
                <span style={{ fontSize: '20px' }}>⭐</span>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>{selectedVendor.rating}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.8)', padding: '12px 20px', borderRadius: '16px' }}>
                <span style={{ fontSize: '20px' }}>📍</span>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>{selectedVendor.distance} km</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            <div style={{ background: 'linear-gradient(145deg, #ffffff, #f0f9ff)', borderRadius: '28px', padding: '40px', boxShadow: '0 20px 60px rgba(59,130,246,0.1)' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1f2937', marginBottom: '32px' }}>Our Special Menu</h2>
              <div style={{ display: 'grid', gap: '16px' }}>
                {menu.map((dish, index) => (
                  <div key={dish.dish_id} style={{
                    background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    border: '2px solid rgba(59,130,246,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.4s ease',
                    position: 'relative'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', marginBottom: '6px' }}>{dish.dish_name}</h3>
                      <span style={{ fontSize: '24px', fontWeight: '800', color: '#059669' }}>₹{dish.price}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(dish)}
                      style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        border: 'none',
                        padding: '14px 28px',
                        borderRadius: '16px',
                        fontSize: '15px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(16,185,129,0.3)'
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ background: 'linear-gradient(145deg, #fef7ff, #f3e8ff)', borderRadius: '28px', padding: '40px', boxShadow: '0 20px 60px rgba(168,85,247,0.15)' }}>
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#7c3aed', marginBottom: '28px' }}>Your Cart ({cart.length})</h2>
              
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.6)', borderRadius: '20px' }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="#a855f7" style={{ marginBottom: '20px' }}>
                    <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#7c3aed' }}>Cart is Empty</h3>
                  <p style={{ color: '#9ca3af' }}>Add delicious items!</p>
                </div>
              ) : (
                <>
                  <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                    {cart.map(item => (
                      <div key={item.dish_id} style={{
                        background: 'rgba(255,255,255,0.8)',
                        borderRadius: '12px',
                        padding: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1f2937' }}>{item.dish_name}</div>
                          <div style={{ color: '#7c3aed', fontWeight: '600' }}>₹{item.price} × {item.quantity}</div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.dish_id)}
                          style={{
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{
                    background: 'linear-gradient(135deg, #a855f7, #9333ea)',
                    borderRadius: '20px',
                    padding: '28px',
                    color: 'white',
                    boxShadow: '0 12px 40px rgba(168,85,247,0.4)'
                  }}>
                    <div style={{ fontSize: '32px', fontWeight: '900', marginBottom: '20px', textAlign: 'center' }}>
                      ₹{getTotalPrice()}
                    </div>
                    <button 
                      onClick={placeOrder}
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.9)',
                        color: '#7c3aed',
                        border: 'none',
                        padding: '16px',
                        borderRadius: '16px',
                        fontSize: '18px',
                        fontWeight: '800',
                        cursor: 'pointer'
                      }}
                    >
                      Place Order Now
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#000000', marginBottom: '12px' }}>Recommended Restaurants</h2>
            <p style={{ color: '#6b7280', fontSize: '18px', fontWeight: '500' }}>AI-powered recommendations tailored for you ✨</p>
          </div>
          
          {recommendations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'linear-gradient(145deg, #f8fafc, #e2e8f0)', borderRadius: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>No recommendations yet</h3>
              <p style={{ color: '#6b7280' }}>Fill out your profile to get personalized restaurant suggestions</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {recommendations.map((restaurant, index) => (
                <div 
                  key={restaurant.vendor_id}
                  onClick={() => handleRestaurantClick(restaurant)}
                  style={{
                    background: `linear-gradient(145deg, ${index % 2 === 0 ? '#fef7ff, #f3e8ff' : '#f0f9ff, #e0f2fe'})`,
                    borderRadius: '24px',
                    padding: '28px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: `2px solid ${index % 2 === 0 ? 'rgba(168, 85, 247, 0.1)' : 'rgba(59, 130, 246, 0.1)'}`,
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = `0 20px 60px ${index % 2 === 0 ? 'rgba(168, 85, 247, 0.15)' : 'rgba(59, 130, 246, 0.15)'}`;
                    e.currentTarget.style.borderColor = index % 2 === 0 ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)';
                    e.currentTarget.style.background = index % 2 === 0 ? 'linear-gradient(145deg, #faf5ff, #f3e8ff)' : 'linear-gradient(145deg, #eff6ff, #dbeafe)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = index % 2 === 0 ? 'rgba(168, 85, 247, 0.1)' : 'rgba(59, 130, 246, 0.1)';
                    e.currentTarget.style.background = index % 2 === 0 ? 'linear-gradient(145deg, #fef7ff, #f3e8ff)' : 'linear-gradient(145deg, #f0f9ff, #e0f2fe)';
                  }}
                >
                  <div style={{ position: 'absolute', top: '20px', right: '20px', background: index % 2 === 0 ? 'linear-gradient(135deg, #a855f7, #9333ea)' : 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white', padding: '10px 18px', borderRadius: '24px', fontSize: '13px', fontWeight: '700', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                    #{index + 1}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#111827', marginBottom: '10px', letterSpacing: '-0.5px' }}>{restaurant.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                        <span style={{ background: index % 2 === 0 ? 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(147,51,234,0.1))' : 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(37,99,235,0.1))', color: index % 2 === 0 ? '#7c3aed' : '#2563eb', padding: '6px 16px', borderRadius: '16px', fontSize: '13px', fontWeight: '600', border: index % 2 === 0 ? '1px solid rgba(168,85,247,0.2)' : '1px solid rgba(59,130,246,0.2)' }}>
                          {restaurant.cuisine}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '16px' }}>⭐</span>
                          <span style={{ fontWeight: '700', color: '#1f2937', fontSize: '15px' }}>{restaurant.rating}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          <span style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500' }}>{restaurant.distance} km</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: `linear-gradient(90deg, #ff6b35 ${restaurant.probability * 100}%, #f3f4f6 ${restaurant.probability * 100}%)`, height: '6px', width: '140px', borderRadius: '8px', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}></div>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#ea580c', letterSpacing: '0.5px' }}>
                        {Math.round(restaurant.probability * 100)}% MATCH
                      </span>
                    </div>
                    <button style={{
                      background: index % 2 === 0 ? 'linear-gradient(135deg, #a855f7, #9333ea)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '16px',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: index % 2 === 0 ? '0 4px 16px rgba(168,85,247,0.3)' : '0 4px 16px rgba(59,130,246,0.3)',
                      letterSpacing: '0.5px'
                    }}>
                      VIEW MENU
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecommendationList;