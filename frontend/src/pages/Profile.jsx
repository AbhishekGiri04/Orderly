import React, { useState } from 'react';

const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`px-6 py-4 rounded-lg shadow-lg border-l-4 ${
        type === 'success' ? 'bg-green-50 border-green-400 text-green-800' : 'bg-red-50 border-red-400 text-red-800'
      }`}>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
            {type === 'success' ? (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            )}
          </svg>
          <span className="font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Abhishek Giri',
    email: 'user@gmail.com',
    phone: '+91 1234567890',
    age: 22,
    gender: 'Male',
    language: 'Hindi',
    state: 'Uttarakhand',
    city: 'Haridwar',
    preferences: ['North Indian', 'South Indian', 'Chinese', 'Italian'],
    dietType: 'Vegetarian',
    bio: 'Food enthusiast and tech developer from Haridwar',
    joinDate: 'January 2024',
    profileImage: 'https://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg',
    ordersPlaced: 0,
    restaurantsTried: 0,
    avgRating: 0,
    totalSpent: 0
  });

  const stateCityMap = {
    'Uttarakhand': ['Dehradun', 'Haridwar', 'Rishikesh', 'Nainital', 'Mussoorie', 'Roorkee'],
    'Delhi': ['New Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Allahabad'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool'],
    'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
    'Haryana': ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain']
  };

  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(profile.profileImage);
  const [toast, setToast] = useState(null);

  React.useEffect(() => {
    const loadProfile = () => {
      const savedProfile = localStorage.getItem('orderlyUserProfile');
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          setProfile(parsedProfile);
          setImageUrl(parsedProfile.profileImage || parsedProfile.profileImage);
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      }
    };
    
    loadProfile();
    
    // Listen for profile updates
    window.addEventListener('profileUpdate', loadProfile);
    
    return () => {
      window.removeEventListener('profileUpdate', loadProfile);
    };
  }, []);



  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
        setProfile({...profile, profileImage: e.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{backgroundImage: 'url(https://backgroundabstract.com/wp-content/uploads/edd/2022/02/5594016-e1656071131636.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            MY PROFILE
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Profile Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your personal information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Cover Section */}
          <div className="h-48 relative" style={{backgroundImage: 'url(https://img.freepik.com/premium-photo/cute-cartoon-food-seamless-pattern-perfect-wallpaper-fabric-packaging_14117-1194382.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="absolute top-6 right-6 flex gap-2">
              <button
                onClick={() => {
                  localStorage.removeItem('orderlyUserProfile');
                  const resetProfile = {
                    name: 'User Profile',
                    email: 'user@example.com',
                    phone: '+91 XXXXXXXXXX',
                    age: '',
                    gender: '',
                    language: '',
                    state: '',
                    city: '',
                    preferences: [],
                    dietType: '',
                    bio: 'Tell us about yourself...',
                    joinDate: 'January 2024',
                    profileImage: 'https://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg',
                    ordersPlaced: 0,
                    restaurantsTried: 0,
                    avgRating: 0,
                    totalSpent: 0
                  };
                  setProfile(resetProfile);
                  setImageUrl(resetProfile.profileImage);
                  localStorage.setItem('orderlyUserProfile', JSON.stringify(resetProfile));
                  setToast({ message: 'Profile reset successfully!', type: 'success' });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/90 backdrop-blur-sm text-white border border-red-400 rounded-xl text-sm font-semibold hover:bg-red-600 shadow-lg transition-all duration-300"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  if (isEditing) {
                    try {
                      localStorage.setItem('orderlyUserProfile', JSON.stringify(profile));
                      setToast({ message: 'Profile saved successfully!', type: 'success' });
                      // Dispatch event to update other components
                      window.dispatchEvent(new CustomEvent('profileUpdate', { detail: profile }));
                    } catch (error) {
                      setToast({ message: 'Failed to save profile. Please try again.', type: 'error' });
                    }
                  }
                  setIsEditing(!isEditing);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 border border-white rounded-xl text-sm font-semibold hover:bg-white shadow-lg transition-all duration-300"
              >
                {isEditing ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                      <polyline points="17,21 17,13 7,13 7,21"/>
                      <polyline points="7,3 7,8 15,8"/>
                    </svg>
                    Save
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Edit
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Picture Section */}
          <div className="text-center -mt-20 mb-8 relative z-10">
            <div className="relative inline-block">
              <img 
                src={imageUrl || 'https://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg'} 
                alt="Profile" 
                className="w-40 h-40 rounded-full border-6 border-white shadow-2xl object-cover"
                onError={(e) => {
                  e.target.src = 'https://4.bp.blogspot.com/-zsbDeAUd8aY/US7F0ta5d9I/AAAAAAAAEKY/UL2AAhHj6J8/s1600/facebook-default-no-profile-pic.jpg';
                }}
              />
              {isEditing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="absolute bottom-2 right-2 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full cursor-pointer flex items-center justify-center shadow-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                  </label>
                </>
              )}
            </div>
            <div className="mt-6 px-8">
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="text-3xl font-bold text-gray-900 text-center border-none bg-transparent border-b-2 border-blue-500 outline-none w-full mb-2 focus:border-blue-600 placeholder-gray-400"
                />
              ) : (
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h2>
              )}
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  placeholder="Enter your email address"
                  className="text-gray-600 text-center border-none bg-transparent border-b border-gray-300 outline-none w-full mb-2 focus:border-blue-500 placeholder-gray-400"
                />
              ) : (
                <p className="text-gray-600 mb-2">{profile.email}</p>
              )}
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="text-sm text-gray-500 text-center border-none bg-transparent border-b border-gray-300 outline-none w-full resize-none h-10 focus:border-blue-500"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-500 text-sm italic">{profile.bio}</p>
              )}
              <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Joined {profile.joinDate}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {profile.city}, {profile.state}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Personal Information */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Personal Info</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Phone', value: profile.phone, key: 'phone', type: 'tel' },
                  { label: 'Age', value: profile.age, key: 'age', type: 'number' },
                  { label: 'Gender', value: profile.gender, key: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
                  { label: 'Language', value: profile.language, key: 'language', type: 'select', options: ['Hindi', 'English', 'Tamil', 'Bengali'] }
                ].map((item) => (
                  <div key={item.key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{item.label}</label>
                    {isEditing ? (
                      item.type === 'select' ? (
                        <select
                          value={item.value}
                          onChange={(e) => setProfile({...profile, [item.key]: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        >
                          <option value="">Select {item.label}</option>
                          {item.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={item.type}
                          value={item.value}
                          onChange={(e) => setProfile({...profile, [item.key]: e.target.value})}
                          placeholder={`Enter your ${item.label.toLowerCase()}`}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                        />
                      )
                    ) : (
                      <div className="px-4 py-3 bg-white rounded-xl border border-gray-200 text-gray-700">
                        {item.value || <span className="text-gray-400 italic">Not specified</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                    <line x1="6" y1="1" x2="6" y2="4"/>
                    <line x1="10" y1="1" x2="10" y2="4"/>
                    <line x1="14" y1="1" x2="14" y2="4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Preferences</h3>
              </div>
              <div className="space-y-4">
                {[
                  { 
                    label: 'State', 
                    value: profile.state, 
                    key: 'state', 
                    options: Object.keys(stateCityMap).sort(),
                    onChange: (value) => {
                      setProfile({...profile, state: value, city: stateCityMap[value][0]});
                    }
                  },
                  { 
                    label: 'City', 
                    value: profile.city, 
                    key: 'city', 
                    options: stateCityMap[profile.state] || []
                  },
                  { label: 'Diet Type', value: profile.dietType, key: 'dietType', options: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Jain'] }
                ].map((item) => (
                  <div key={item.key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{item.label}</label>
                    {isEditing ? (
                      <select
                        value={item.value}
                        onChange={(e) => item.onChange ? item.onChange(e.target.value) : setProfile({...profile, [item.key]: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="">Select {item.label}</option>
                        {item.options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="px-4 py-3 bg-white rounded-xl border border-gray-200 text-gray-700">
                        {item.value || <span className="text-gray-400 italic">Not selected</span>}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Food Preferences */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Food Preferences</label>
                  {isEditing ? (
                    <div className="space-y-2">
                      {['North Indian', 'South Indian', 'Chinese', 'Italian', 'Continental', 'Mexican', 'Thai', 'Japanese'].map((cuisine) => (
                        <label key={cuisine} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={profile.preferences.includes(cuisine)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setProfile({...profile, preferences: [...profile.preferences, cuisine]});
                              } else {
                                setProfile({...profile, preferences: profile.preferences.filter(p => p !== cuisine)});
                              }
                            }}
                            className="mr-2 rounded"
                          />
                          <span className="text-sm">{cuisine}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 bg-white rounded-xl border border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        {profile.preferences.length > 0 ? (
                          profile.preferences.map((pref, i) => (
                            <span key={i} className="inline-block bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                              {pref}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 italic">No preferences selected</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Dashboard */}
          <div className="mx-8 mb-8 p-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl text-gray-800 border border-gray-200">
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Activity Dashboard</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Orders Placed', value: profile.ordersPlaced, key: 'ordersPlaced', icon: 'shopping-cart', type: 'number' },
                { label: 'Restaurants Tried', value: profile.restaurantsTried, key: 'restaurantsTried', icon: 'store', type: 'number' },
                { label: 'Avg Rating Given', value: profile.avgRating, key: 'avgRating', icon: 'star', type: 'number', step: '0.1' },
                { label: 'Total Spent', value: `₹${profile.totalSpent.toLocaleString()}`, key: 'totalSpent', icon: 'dollar-sign', type: 'number' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200 hover:bg-white transition-all duration-300 shadow-sm">
                  <div className="mb-3">
                    <svg className="w-8 h-8 mx-auto text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      {stat.icon === 'shopping-cart' && <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></>}
                      {stat.icon === 'store' && <><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></>}
                      {stat.icon === 'star' && <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>}
                      {stat.icon === 'dollar-sign' && <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>}
                    </svg>
                  </div>
                  <div className="text-2xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;