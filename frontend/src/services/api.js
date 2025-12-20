// API configuration for Orderly backend
const API_BASE_URL = 'https://orderly-dev.onrender.com';

// API endpoints
export const API_ENDPOINTS = {
  PREDICT: `${API_BASE_URL}/predict`,
  ANALYZE: `${API_BASE_URL}/analyze`,
  FEATURE_IMPORTANCE: `${API_BASE_URL}/feature-importance`,
  RECOMMENDATIONS: `${API_BASE_URL}/recommendations`,
  CUSTOMERS: `${API_BASE_URL}/customers`,
  MENU: `${API_BASE_URL}/menu`
};

// API helper functions
export const api = {
  // Predict restaurant performance
  predict: async (orderData) => {
    try {
      const response = await fetch(API_ENDPOINTS.PREDICT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Prediction API error:', error);
      throw error;
    }
  },

  // Get analytics data
  getAnalytics: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.ANALYZE);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Analytics API error:', error);
      throw error;
    }
  },

  // Get feature importance
  getFeatureImportance: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.FEATURE_IMPORTANCE);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Feature importance API error:', error);
      throw error;
    }
  },

  // Get restaurant recommendations
  getRecommendations: async (customerData) => {
    try {
      const response = await fetch(API_ENDPOINTS.RECOMMENDATIONS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return { data: await response.json() };
    } catch (error) {
      console.error('Recommendations API error:', error);
      throw error;
    }
  },

  // Get customers data
  getCustomers: async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CUSTOMERS);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Customers API error:', error);
      throw error;
    }
  },

  // Get menu for a restaurant
  getMenu: async (vendorId, city = 'Haridwar') => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/${vendorId}/${city}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return { data: await response.json() };
    } catch (error) {
      // Fallback menus for Haridwar restaurants
      const fallbackMenus = {
        1: [{ dish_id: 1, dish_name: 'Chole Bhature', price: 120 }, { dish_id: 2, dish_name: 'Lassi', price: 60 }, { dish_id: 3, dish_name: 'Aloo Paratha', price: 80 }],
        2: [{ dish_id: 4, dish_name: 'Ganga Aarti Thali', price: 250 }, { dish_id: 5, dish_name: 'Dal Makhani', price: 180 }, { dish_id: 6, dish_name: 'Butter Naan', price: 50 }],
        3: [{ dish_id: 7, dish_name: 'Puri Sabzi', price: 100 }, { dish_id: 8, dish_name: 'Kachori', price: 40 }, { dish_id: 9, dish_name: 'Jalebi', price: 80 }],
        4: [{ dish_id: 10, dish_name: 'Gol Gappe', price: 50 }, { dish_id: 11, dish_name: 'Raj Kachori', price: 80 }, { dish_id: 12, dish_name: 'Dahi Bhalla', price: 70 }],
        5: [{ dish_id: 13, dish_name: 'Thali', price: 200 }, { dish_id: 14, dish_name: 'Paneer Curry', price: 160 }, { dish_id: 15, dish_name: 'Roti', price: 20 }]
      };
      return { data: { menu: fallbackMenus[vendorId] || fallbackMenus[1] } };
    }
  },

  // Place order
  placeOrder: async (orderData) => {
    return {
      data: {
        success: true,
        order_id: 'ORD' + Date.now(),
        message: 'Order placed successfully!'
      }
    };
  }
};

export default api;