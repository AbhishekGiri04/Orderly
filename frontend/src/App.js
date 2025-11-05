import React, { useState, useEffect } from 'react';
import { Home, Dashboard, About, PredictionForm, Recommendations, Profile } from './pages';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [openFaq, setOpenFaq] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setActiveTab('home');
    }, 2000);
    
    // Listen for profile navigation from recommendations
    const handleProfileNavigation = () => {
      setActiveTab('profile');
    };
    
    window.addEventListener('navigateToProfile', handleProfileNavigation);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('navigateToProfile', handleProfileNavigation);
    };
  }, []);
  
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'dashboard':
        return <Dashboard />;
      case 'predict':
        return <PredictionForm />;
      case 'about':
        return <About />;
      case 'recommendations':
        return <Recommendations />;
      case 'profile':
        return <Profile />;
      case 'help':
        return (
          <div style={{ padding: '60px 20px', minHeight: '60vh', backgroundColor: '#f9fafb' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '16px' }}>Help & Support</h1>
                <p style={{ fontSize: '18px', color: '#6b7280' }}>Need help with Orderly? Send us a message!</p>
              </div>
              
              <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px' }}>Send us a Message</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const name = formData.get('name');
                  const email = formData.get('email');
                  const subject = formData.get('subject');
                  const message = formData.get('message');
                  
                  // Store form data in localStorage
                  const submissionData = {
                    name,
                    email,
                    subject,
                    message,
                    timestamp: new Date().toISOString(),
                    id: Date.now()
                  };
                  
                  const existingSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                  existingSubmissions.push(submissionData);
                  localStorage.setItem('contactSubmissions', JSON.stringify(existingSubmissions));
                  
                  // Send email
                  const mailtoLink = `mailto:abhishekgiri1978@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                  window.location.href = mailtoLink;
                  
                  // Show success notification
                  setNotification('Thank you for contacting us! Your message has been sent successfully. We will get back to you within 24 hours.');
                  setTimeout(() => setNotification(null), 5000);
                  
                  // Reset form
                  e.target.reset();
                }}>
                  <input name="name" type="text" placeholder="Your Name" required style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', marginBottom: '16px' }} />
                  <input name="email" type="email" placeholder="Your Email" required style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', marginBottom: '16px' }} />
                  <select name="subject" style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', marginBottom: '16px' }}>
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Integration Help</option>
                    <option>Billing Question</option>
                    <option>Feature Request</option>
                  </select>
                  <textarea name="message" placeholder="Your Message" rows="5" required style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', resize: 'vertical', marginBottom: '20px' }}></textarea>
                  <button type="submit" style={{ backgroundColor: '#ff5200', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '16px' }}>Send Message</button>
                </form>
              </div>
              
              <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', marginBottom: '24px', textAlign: 'center' }}>Frequently Asked Questions</h3>
                
                {[
                  { q: 'How does Orderly\'s AI prediction work?', a: 'Orderly uses Random Forest machine learning algorithms trained on 500+ restaurant orders to predict performance with 94.2% accuracy. It analyzes KPT duration, distance, rider wait time, and order timing.' },
                  { q: 'Can I integrate with Swiggy/Zomato?', a: 'Yes! Orderly provides REST API endpoints designed for seamless integration with food delivery platforms like Swiggy and Zomato. Contact us for integration documentation.' },
                  { q: 'What analytics does the dashboard provide?', a: 'Real-time performance metrics, delivery success rates, peak hour analysis, feature importance rankings, and predictive insights to optimize your restaurant operations.' },
                  { q: 'How do I get started with Orderly?', a: 'Simply run \'python3 run_project.py\' to start both frontend and backend servers. The platform includes sample data and trained ML models ready for immediate use.' },
                  { q: 'Is my restaurant data secure?', a: 'Absolutely. All data is processed locally on your servers. We follow industry-standard security practices and never store sensitive business information externally.' },
                  { q: 'What\'s the pricing model?', a: 'Orderly is currently in beta phase. Contact us at abhishekgiri1978@gmail.com for enterprise pricing and custom deployment options.' }
                ].map((faq, i) => (
                  <div key={i} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '20px', marginBottom: '20px' }}>
                    <div onClick={() => toggleFaq(i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '16px 0' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', margin: 0 }}>{faq.q}</h4>
                      <span style={{ fontSize: '20px', color: '#6b7280', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                    </div>
                    {openFaq === i && <p style={{ color: '#6b7280', lineHeight: '1.6', paddingLeft: '0', marginTop: '12px' }}>{faq.a}</p>}
                  </div>
                ))}
              </div>
              
              <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginTop: '40px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a1a1a', marginBottom: '20px', textAlign: 'center' }}>Quick Access</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                  <button onClick={() => setActiveTab('about')} style={{ padding: '16px', border: 'none', borderRadius: '8px', background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', cursor: 'pointer', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#1e40af' }}>Get Started</button>
                  <button onClick={() => setActiveTab('dashboard')} style={{ padding: '16px', border: 'none', borderRadius: '8px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', cursor: 'pointer', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#166534' }}>View Analytics</button>
                  <button onClick={() => setActiveTab('predict')} style={{ padding: '16px', border: 'none', borderRadius: '8px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', cursor: 'pointer', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#92400e' }}>Try Predictions</button>
                  <button onClick={() => setActiveTab('profile')} style={{ padding: '16px', border: 'none', borderRadius: '8px', background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', cursor: 'pointer', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#be185d' }}>Manage Profile</button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #10b981, #34d399)',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(16,185,129,0.3)',
          zIndex: 1000,
          maxWidth: '400px',
          fontSize: '14px',
          fontWeight: '600',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
            {notification}
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
      {/* Navigation */}
      <nav style={{ backgroundColor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderBottom: '1px solid #e5e7eb', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://img.freepik.com/premium-vector/logo-steak-restaurant-with-fork-knife_1240970-33805.jpg" alt="Orderly Logo" style={{ width: '55px', height: '55px', marginRight: '16px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(255,82,0,0.2)' }} />
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff5200', margin: 0, lineHeight: '1.2', letterSpacing: '-0.5px' }}>Orderly</h1>
                <span style={{ fontSize: '13px', color: '#686b78', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Smart Food Recommender</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: '12px', padding: '6px' }}>
              {['home', 'dashboard', 'predict', 'recommendations', 'profile', 'about', 'help'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: activeTab === tab ? 'white' : '#686b78',
                    backgroundColor: activeTab === tab ? '#ff5200' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'capitalize',
                    position: 'relative',
                    transform: activeTab === tab ? 'translateY(-1px)' : 'translateY(0)',
                    boxShadow: activeTab === tab ? '0 4px 12px rgba(255,82,0,0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab) {
                      e.target.style.backgroundColor = '#f1f3f4';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ minHeight: 'calc(100vh - 128px)' }}>
        {renderContent()}
      </main>
      
      {/* Footer */}
      <footer style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '60px 0 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img src="https://img.freepik.com/free-vector/order-now-banner_52683-48697.jpg?semt=ais_hybrid&w=740&q=80" alt="Orderly" style={{ width: '45px', height: '45px', marginRight: '12px', borderRadius: '8px' }} />
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff5200', margin: 0 }}>Orderly</h3>
              </div>
              <p style={{ color: '#b0b0b0', lineHeight: '1.6', fontSize: '15px', marginBottom: '24px' }}>Leading AI-powered food recommendation platform transforming how restaurants connect with customers through intelligent data analytics and personalized dining experiences.</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="https://www.linkedin.com/in/abhishek-giri04/" target="_blank" rel="noopener noreferrer" style={{ 
                  width: '40px', height: '40px', backgroundColor: '#0077b5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'transform 0.2s ease'
                }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://github.com/abhishekgiri04" target="_blank" rel="noopener noreferrer" style={{ 
                  width: '40px', height: '40px', backgroundColor: '#333', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'transform 0.2s ease'
                }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://t.me/AbhishekGiri7" target="_blank" rel="noopener noreferrer" style={{ 
                  width: '40px', height: '40px', backgroundColor: '#0088cc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'transform 0.2s ease'
                }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'white' }}>Core Features</h4>
              <ul style={{ listStyle: 'none', padding: 0, color: '#b0b0b0', fontSize: '15px', lineHeight: '2.2' }}>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '6px', height: '6px', backgroundColor: '#ff5200', borderRadius: '50%', marginRight: '12px' }}></div>
                  <button onClick={() => setActiveTab('predict')} style={{ background: 'none', border: 'none', color: '#b0b0b0', cursor: 'pointer', fontSize: '15px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#ff5200'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>AI Performance Predictions</button>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '6px', height: '6px', backgroundColor: '#ff5200', borderRadius: '50%', marginRight: '12px' }}></div>
                  <button onClick={() => setActiveTab('dashboard')} style={{ background: 'none', border: 'none', color: '#b0b0b0', cursor: 'pointer', fontSize: '15px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#ff5200'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>Real-time Analytics Dashboard</button>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '6px', height: '6px', backgroundColor: '#ff5200', borderRadius: '50%', marginRight: '12px' }}></div>
                  <button onClick={() => setActiveTab('dashboard')} style={{ background: 'none', border: 'none', color: '#b0b0b0', cursor: 'pointer', fontSize: '15px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#ff5200'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>Restaurant Performance Analytics</button>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '6px', height: '6px', backgroundColor: '#ff5200', borderRadius: '50%', marginRight: '12px' }}></div>
                  <button onClick={() => setActiveTab('predict')} style={{ background: 'none', border: 'none', color: '#b0b0b0', cursor: 'pointer', fontSize: '15px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#ff5200'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>ML-Driven Performance Predictions</button>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '6px', height: '6px', backgroundColor: '#ff5200', borderRadius: '50%', marginRight: '12px' }}></div>
                  <button onClick={() => setActiveTab('dashboard')} style={{ background: 'none', border: 'none', color: '#b0b0b0', cursor: 'pointer', fontSize: '15px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#ff5200'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>Delivery Optimization Insights</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'white' }}>Business Solutions</h4>
              <ul style={{ listStyle: 'none', padding: 0, color: '#b0b0b0', fontSize: '15px', lineHeight: '2.2' }}>
                <li style={{ marginBottom: '12px' }}>
                  <button onClick={() => setActiveTab('about')} style={{ background: 'none', border: 'none', color: '#b0b0b0', cursor: 'pointer', fontSize: '15px', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#ff5200'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>Swiggy & Zomato Integration</button>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <button onClick={() => setActiveTab('about')} style={{ background: 'none', border: 'none', color: '#b0b0b0', cursor: 'pointer', fontSize: '15px', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#ff5200'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>REST API Integration</button>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <button onClick={() => setActiveTab('dashboard')} style={{ background: 'none', border: 'none', color: '#b0b0b0', cursor: 'pointer', fontSize: '15px', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#ff5200'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>Custom Analytics Dashboard</button>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <button onClick={() => setActiveTab('about')} style={{ background: 'none', border: 'none', color: '#b0b0b0', cursor: 'pointer', fontSize: '15px', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#ff5200'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>Enterprise Partnership</button>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <button onClick={() => setActiveTab('help')} style={{ background: 'none', border: 'none', color: '#b0b0b0', cursor: 'pointer', fontSize: '15px', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#ff5200'} onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}>Support & Documentation</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'white' }}>Get In Touch</h4>
              <div style={{ color: '#b0b0b0', fontSize: '15px', lineHeight: '2.2' }}>
                <div style={{ marginBottom: '16px' }}>
                  <a href="mailto:abhishekgiri1978@gmail.com" style={{ color: '#ff5200', textDecoration: 'none', fontWeight: '500' }}>support@orderly.com</a>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <span>Haridwar, Uttarakhand, India</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #333', marginTop: '40px', paddingTop: '24px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>© 2025 <span style={{ color: '#ff5200', fontWeight: '600' }}>Orderly Technologies</span>. All rights reserved.</p>
              <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
                <button style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#ff5200'} onMouseLeave={(e) => e.target.style.color = '#888'}>Privacy Policy</button>
                <button style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#ff5200'} onMouseLeave={(e) => e.target.style.color = '#888'}>Terms of Service</button>
                <button style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#ff5200'} onMouseLeave={(e) => e.target.style.color = '#888'}>Cookie Policy</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;