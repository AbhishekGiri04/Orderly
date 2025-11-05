import React from 'react';

const LocationView = ({ customerLocation, recommendations, profileLocation, selectedCity }) => {
  // City coordinates mapping
  const cityCoordinates = {
    'Haridwar': [29.9457, 78.1642],
    'Dehradun': [30.3165, 78.0322],
    'Mumbai': [19.0760, 72.8777],
    'Delhi': [28.7041, 77.1025],
    'New Delhi': [28.6139, 77.2090],
    'Central Delhi': [28.6562, 77.2410],
    'South Delhi': [28.5355, 77.2490],
    'North Delhi': [28.7041, 77.1025],
    'East Delhi': [28.6508, 77.3152],
    'West Delhi': [28.6692, 77.1100],
    'Bangalore': [12.9716, 77.5946],
    'Chennai': [13.0827, 80.2707],
    'Kolkata': [22.5726, 88.3639],
    'Hyderabad': [17.3850, 78.4867],
    'Pune': [18.5204, 73.8567],
    'Jaipur': [26.9124, 75.7873],
    'Lucknow': [26.8467, 80.9462],
    'Agra': [27.1767, 78.0081],
    'Mysore': [12.2958, 76.6394],
    'Coimbatore': [11.0168, 76.9558],
    'Ahmedabad': [23.0225, 72.5714],
    'Kochi': [9.9312, 76.2673],
    'Patna': [25.5941, 85.1376]
  };
  
  // Use selected city coordinates from recommendations
  const getLocationCoords = () => {
    if (selectedCity && cityCoordinates[selectedCity]) {
      return cityCoordinates[selectedCity];
    }
    if (profileLocation && profileLocation.city) {
      return cityCoordinates[profileLocation.city] || [29.9457, 78.1642];
    }
    if (profileLocation) {
      return [profileLocation.latitude, profileLocation.longitude];
    }
    if (customerLocation) {
      return [customerLocation.latitude, customerLocation.longitude];
    }
    return [29.9457, 78.1642];
  };
  
  const center = getLocationCoords();
  const userLocation = { latitude: center[0], longitude: center[1] };
  
  // Generate nearby restaurant coordinates around user location
  const generateNearbyCoords = (baseCoords, restaurants) => {
    const offsets = [
      [0.0045, 0.0085], // Restaurant 1
      [0.0136, -0.0026], // Restaurant 2  
      [0.0022, 0.0085], // Restaurant 3
      [-0.0021, 0.0011], // Restaurant 4
      [0.0095, 0.0071]  // Restaurant 5
    ];
    
    return restaurants.map((restaurant, index) => {
      const offset = offsets[index] || [0.005, 0.005];
      return {
        ...restaurant,
        latitude: baseCoords[0] + offset[0],
        longitude: baseCoords[1] + offset[1]
      };
    });
  };
  
  const restaurantsWithCoords = generateNearbyCoords(center, recommendations);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1a1a1a', marginBottom: '12px' }}>Location View</h2>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>Your location and nearby restaurants</p>
      </div>
      
      <div style={{ background: 'linear-gradient(145deg, #ffffff, #f8fafc)', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
        {userLocation && (
          <div style={{ marginBottom: '30px' }}>
            <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,107,53,0.1), rgba(247,147,30,0.1))', padding: '20px', borderRadius: '16px', border: '2px solid rgba(255,107,53,0.2)', marginBottom: '20px' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📍</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#374151', marginBottom: '4px' }}>Your Location</h3>
              <p style={{ color: '#6b7280' }}>Coordinates: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}</p>
              {selectedCity && <p style={{ color: '#ff6b35', fontSize: '14px', fontWeight: '600' }}>📍 {selectedCity}</p>}
            </div>
            
            <div style={{ height: '300px', borderRadius: '16px', overflow: 'hidden', border: '2px solid #e5e7eb', position: 'relative' }}>
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${userLocation.longitude-0.01},${userLocation.latitude-0.01},${userLocation.longitude+0.01},${userLocation.latitude+0.01}&layer=mapnik&marker=${userLocation.latitude},${userLocation.longitude}`}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="Location Map"
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '20px', background: 'white', zIndex: 10 }}></div>
            </div>
          </div>
        )}
        
        <div style={{ display: 'grid', gap: '16px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#374151', marginBottom: '16px' }}>Nearby Restaurants</h3>
          {restaurantsWithCoords.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>No restaurants to display</p>
          ) : (
            restaurantsWithCoords.map((restaurant, index) => (
              <div key={restaurant.vendor_id} style={{ background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' }}>{restaurant.name}</h4>
                    <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>⭐ {restaurant.rating} • {restaurant.distance} km away</p>
                    <p style={{ color: '#9ca3af', fontSize: '12px' }}>📍 {restaurant.latitude?.toFixed(4)}, {restaurant.longitude?.toFixed(4)}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ background: '#e5e7eb', color: '#6b7280', padding: '8px 12px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>
                      #{index + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationView;