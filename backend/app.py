import warnings
warnings.filterwarnings('ignore')

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

sys.path.append('src')
sys.path.append('utils')

try:
    from preprocess import preprocess_input, clean_dataset, convert_distance_to_numeric, extract_hour
except ImportError:
    from utils.preprocess import preprocess_input, clean_dataset, convert_distance_to_numeric, extract_hour

app = Flask(__name__)
CORS(app)

# Store prediction history in memory (in production, use a database)
prediction_history = []

@app.route('/', methods=['GET'])
def home():
    """API status endpoint"""
    return jsonify({
        'message': 'Orderly Backend API is running!',
        'status': 'active',
        'endpoints': {
            'predict': '/predict',
            'analyze': '/analyze', 
            'recommendations': '/recommendations',
            'customers': '/customers',
            'feature-importance': '/feature-importance'
        }
    })

# Load and prepare data
def load_data():
    """Load and preprocess the dataset"""
    try:
        import os
        current_dir = os.path.dirname(os.path.abspath(__file__))
        csv_path = os.path.join(current_dir, 'data', 'dataset.csv')
        df = pd.read_csv(csv_path)
        df = clean_dataset(df)
        return df
    except Exception as e:
        print(f"Error loading data: {e}")
        return None

# Load or train model
def get_model():
    """Load existing model or train new one"""
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, 'data', 'food_delivery_model.pkl')
    
    if os.path.exists(model_path):
        return joblib.load(model_path)
    
    # Train new model
    df = load_data()
    if df is None or len(df) == 0:
        print("No data available for training")
        return None
    
    try:
        # Prepare features
        feature_cols = ['Distance_numeric', 'KPT duration (minutes)', 'Rider wait time (minutes)', 'order_hour']
        X = df[feature_cols].fillna(0)
        y = df['performance_label']
        
        # Train model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X, y)
        
        # Save model
        joblib.dump(model, model_path)
        print(f"Model trained and saved to {model_path}")
        return model
    except Exception as e:
        print(f"Error training model: {e}")
        return None

@app.route('/predict', methods=['POST'])
def predict():
    """Predict restaurant performance"""
    try:
        data = request.json
        
        # Extract features
        features = {
            'Distance_numeric': convert_distance_to_numeric(data.get('Distance', '1km')),
            'KPT duration (minutes)': float(data.get('KPT_duration', 15)),
            'Rider wait time (minutes)': float(data.get('Rider_wait_time', 5)),
            'order_hour': extract_hour(data.get('Order_time', '12:00 PM'))
        }
        
        model = get_model()
        if model is None:
            return jsonify({'error': 'Model not available'}), 500
        
        # Make prediction with proper feature names
        import warnings
        warnings.filterwarnings('ignore')
        
        feature_names = ['Distance_numeric', 'KPT duration (minutes)', 'Rider wait time (minutes)', 'order_hour']
        X = pd.DataFrame([[features['Distance_numeric'], features['KPT duration (minutes)'], 
                          features['Rider wait time (minutes)'], features['order_hour']]], 
                         columns=feature_names)
        
        prediction = model.predict(X)[0]
        probability = model.predict_proba(X)[0]
        
        # Store prediction in history
        prediction_record = {
            'distance': features['Distance_numeric'],
            'kpt_duration': features['KPT duration (minutes)'],
            'rider_wait_time': features['Rider wait time (minutes)'],
            'order_hour': features['order_hour'],
            'predicted_performance': int(prediction),
            'confidence': float(max(probability))
        }
        prediction_history.append(prediction_record)
        
        return jsonify({
            'predicted_label': int(prediction),
            'performance': 'Good' if prediction == 1 else 'Poor',
            'confidence': float(max(probability)),
            'probability_good': float(probability[1]) if len(probability) > 1 else 0.5
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/analyze', methods=['GET'])
def analyze():
    """Get analytics insights"""
    try:
        df = load_data()
        if df is None or len(df) == 0:
            return jsonify({
                'error': 'No data available',
                'summary': {
                    'avg_rating': 0,
                    'avg_kpt_duration': 0,
                    'avg_distance': 0,
                    'delivery_success_rate': 0
                },
                'performance_distribution': {0: 0, 1: 0},
                'peak_hours': {},
                'total_orders': 0
            })
        
        print(f"Loaded {len(df)} records")
        print(f"Columns: {df.columns.tolist()}")
        
        # If we have prediction history, combine with dataset
        if prediction_history:
            # Create DataFrame from predictions
            pred_df = pd.DataFrame(prediction_history)
            
            # Calculate metrics from both dataset and predictions
            avg_rating = df['Rating'].fillna(0).mean()
            
            # Combine KPT duration from dataset and predictions
            all_kpt = list(df['KPT duration (minutes)'].fillna(0)) + [p['kpt_duration'] for p in prediction_history]
            avg_kpt = np.mean(all_kpt)
            
            # Combine distance from dataset and predictions
            all_distance = list(df['Distance_numeric'].fillna(0)) + [p['distance'] for p in prediction_history]
            avg_distance = np.mean(all_distance)
            
            delivery_success_rate = (df['Order Status'] == 'Delivered').mean() * 100
            
            # Performance distribution (dataset + predictions)
            dataset_perf = df['performance_label'].value_counts().to_dict()
            pred_perf = pred_df['predicted_performance'].value_counts().to_dict()
            
            performance_dist = {}
            for key in [0, 1]:
                performance_dist[key] = dataset_perf.get(key, 0) + pred_perf.get(key, 0)
            
            # Peak hours (dataset + predictions)
            dataset_hours = df.groupby('order_hour').size().to_dict()
            pred_hours = pred_df.groupby('order_hour').size().to_dict()
            
            peak_hours = {}
            all_hours = set(list(dataset_hours.keys()) + list(pred_hours.keys()))
            for hour in all_hours:
                peak_hours[hour] = dataset_hours.get(hour, 0) + pred_hours.get(hour, 0)
                
            total_orders = len(df) + len(prediction_history)
        else:
            # Use only dataset
            avg_rating = df['Rating'].fillna(0).mean()
            avg_kpt = df['KPT duration (minutes)'].fillna(0).mean()
            avg_distance = df['Distance_numeric'].fillna(0).mean()
            delivery_success_rate = (df['Order Status'] == 'Delivered').mean() * 100
            
            # Performance distribution
            performance_dist = df['performance_label'].value_counts().to_dict()
            
            # Peak hours analysis
            peak_hours = df.groupby('order_hour').size().to_dict()
            
            total_orders = len(df)
        
        return jsonify({
            'summary': {
                'avg_rating': round(avg_rating, 2) if not pd.isna(avg_rating) else 0,
                'avg_kpt_duration': round(avg_kpt, 2) if not pd.isna(avg_kpt) else 0,
                'avg_distance': round(avg_distance, 2) if not pd.isna(avg_distance) else 0,
                'delivery_success_rate': round(delivery_success_rate, 2) if not pd.isna(delivery_success_rate) else 0
            },
            'performance_distribution': performance_dist,
            'peak_hours': peak_hours,
            'total_orders': total_orders,
            'predictions_made': len(prediction_history)
        })
    except Exception as e:
        print(f"Error in analyze: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/feature-importance', methods=['GET'])
def feature_importance():
    """Get model feature importance"""
    try:
        model = get_model()
        if model is None:
            return jsonify({'error': 'Model not available'}), 500
        
        feature_names = ['Distance', 'KPT Duration', 'Rider Wait Time', 'Order Hour']
        importances = model.feature_importances_
        
        feature_imp = [{
            'feature': name,
            'importance': float(imp)
        } for name, imp in zip(feature_names, importances)]
        
        # Sort by importance
        feature_imp.sort(key=lambda x: x['importance'], reverse=True)
        
        return jsonify(feature_imp)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/stats', methods=['GET'])
def get_stats():
    """Get current prediction statistics"""
    return jsonify({
        'total_predictions': len(prediction_history),
        'recent_predictions': prediction_history[-10:] if prediction_history else []
    })

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    """Get restaurant recommendations based on customer data"""
    try:
        data = request.json
        print(f"Received recommendation request: {data}")
        
        # Extract customer features
        age = int(data.get('age', 25))
        gender = data.get('gender', 'M')
        city = data.get('city', 'Haridwar')
        print(f"Processing for: age={age}, gender={gender}, city={city}")
        
        # City-based restaurant recommendations (6 states, 2 cities each)
        city_restaurants = {
            # Uttarakhand
            'Dehradun': [
                {'name': 'BlackPepper Restaurant', 'cuisine': 'North Indian', 'rating': 4.6, 'distance': 1.2},
                {'name': 'Kalsang Cafe & Restaurant', 'cuisine': 'Cafe', 'rating': 4.4, 'distance': 1.5},
                {'name': 'Walk In Woods', 'cuisine': 'North Indian', 'rating': 4.6, 'distance': 1.8},
                {'name': 'Ellora Restaurant', 'cuisine': 'Multi-cuisine', 'rating': 4.3, 'distance': 2.1},
                {'name': 'Clock Tower Cafe', 'cuisine': 'Italian', 'rating': 4.2, 'distance': 1.9}
            ],
            'Haridwar': [
                {'name': 'Hoshiyarpuri', 'cuisine': 'North Indian', 'rating': 4.1, 'distance': 0.8},
                {'name': 'Dilliwasi Fine Dine Restaurant', 'cuisine': 'Family Restaurant', 'rating': 4.8, 'distance': 1.2},
                {'name': 'Masala Club', 'cuisine': 'North Indian', 'rating': 4.4, 'distance': 1.5},
                {'name': 'Ganga Aarti Restaurant', 'cuisine': 'Traditional', 'rating': 4.3, 'distance': 1.0},
                {'name': 'Chotiwala Restaurant', 'cuisine': 'Vegetarian', 'rating': 4.5, 'distance': 1.8}
            ],

            
            # Delhi
            'New Delhi': [
                {'name': 'Indian Accent', 'cuisine': 'Fine Dining', 'rating': 4.7, 'distance': 2.5},
                {'name': 'Tamra Restaurant', 'cuisine': 'Buffet Restaurant', 'rating': 4.4, 'distance': 1.8},
                {'name': 'Bukhara', 'cuisine': 'North Indian', 'rating': 4.5, 'distance': 3.2},
                {'name': 'Paranthe Wali Gali', 'cuisine': 'North Indian', 'rating': 4.4, 'distance': 2.1},
                {'name': 'Karim\'s', 'cuisine': 'Mughlai', 'rating': 4.6, 'distance': 2.8}
            ],
            'Central Delhi': [
                {'name': 'CP Central Cafe', 'cuisine': 'Continental', 'rating': 4.3, 'distance': 1.5},
                {'name': 'Rajdhani Thali House', 'cuisine': 'Gujarati', 'rating': 4.4, 'distance': 1.8},
                {'name': 'Wenger Bakery CP', 'cuisine': 'Bakery', 'rating': 4.2, 'distance': 1.2},
                {'name': 'Embassy Fine Dining', 'cuisine': 'North Indian', 'rating': 4.1, 'distance': 2.0},
                {'name': 'Nirula Corner', 'cuisine': 'Fast Food', 'rating': 4.0, 'distance': 1.6}
            ],

            
            # Maharashtra
            'Mumbai': [
                {'name': 'Ziya The Oberoi', 'cuisine': 'North Indian', 'rating': 4.5, 'distance': 2.1},
                {'name': 'Masala Library by Jiggs Kalra', 'cuisine': 'North Indian', 'rating': 4.5, 'distance': 1.8},
                {'name': 'The Bombay Canteen', 'cuisine': 'Modern Indian', 'rating': 4.5, 'distance': 1.5},
                {'name': 'Trishna', 'cuisine': 'Seafood', 'rating': 4.7, 'distance': 2.4},
                {'name': 'Leopold Cafe', 'cuisine': 'Continental', 'rating': 4.3, 'distance': 1.9}
            ],
            'Pune': [
                {'name': 'Malaka Spice', 'cuisine': 'Thai Restaurant', 'rating': 4.3, 'distance': 1.8},
                {'name': 'The Sassy Spoon', 'cuisine': 'Restaurant', 'rating': 4.4, 'distance': 1.5},
                {'name': 'Le Plaisir', 'cuisine': 'European Restaurant', 'rating': 4.4, 'distance': 2.1},
                {'name': 'Vaishali FC Road', 'cuisine': 'South Indian', 'rating': 4.4, 'distance': 1.3},
                {'name': 'German Bakery Koregaon', 'cuisine': 'Continental', 'rating': 4.2, 'distance': 1.6}
            ],

            
            # Karnataka
            'Bangalore': [
                {'name': 'Karavalli', 'cuisine': 'South Indian', 'rating': 4.6, 'distance': 1.5},
                {'name': 'Oota Bangalore', 'cuisine': 'Karnataka', 'rating': 4.3, 'distance': 2.1},
                {'name': 'The Only Place', 'cuisine': 'Steak House', 'rating': 4.2, 'distance': 1.8},
                {'name': 'Byg Brewski Brewing Company', 'cuisine': 'Brew Pub', 'rating': 4.4, 'distance': 2.3},
                {'name': 'Bengaluru Oota Company', 'cuisine': 'Fusion', 'rating': 4.3, 'distance': 1.2}
            ],
            'Mysore': [
                {'name': 'The Old House', 'cuisine': 'Vegetarian', 'rating': 4.3, 'distance': 1.2},
                {'name': 'Vinayaka Mylari', 'cuisine': 'Restaurant', 'rating': 4.2, 'distance': 1.6},
                {'name': 'Infinit Mysore', 'cuisine': 'Asian Fusion', 'rating': 4.1, 'distance': 1.9},
                {'name': 'Hotel RRR', 'cuisine': 'Andhra', 'rating': 4.3, 'distance': 1.1},
                {'name': 'Mylari Dosa Corner', 'cuisine': 'South Indian', 'rating': 4.5, 'distance': 2.0}
            ],

            
            # Tamil Nadu
            'Chennai': [
                {'name': 'Dakshin', 'cuisine': 'South Indian', 'rating': 4.6, 'distance': 1.3},
                {'name': 'Jamavar', 'cuisine': 'North Indian', 'rating': 4.7, 'distance': 1.8},
                {'name': 'Paati Veedu', 'cuisine': 'Fine Dining', 'rating': 4.2, 'distance': 2.5},
                {'name': 'Avartana', 'cuisine': 'South Indian', 'rating': 4.8, 'distance': 2.1},
                {'name': 'Southern Spice', 'cuisine': 'South Indian', 'rating': 4.5, 'distance': 1.9}
            ],
            'Coimbatore': [
                {'name': 'WelcomCafe Kovai', 'cuisine': 'Buffet Restaurant', 'rating': 4.4, 'distance': 1.2},
                {'name': 'Latest Recipe', 'cuisine': 'Multi-cuisine', 'rating': 4.3, 'distance': 1.5},
                {'name': 'Shree Anandhaas', 'cuisine': 'Vegetarian', 'rating': 4.2, 'distance': 1.8},
                {'name': 'Annapoorna Kovai', 'cuisine': 'South Indian', 'rating': 4.4, 'distance': 1.6},
                {'name': 'Kongu Nadu Mess', 'cuisine': 'Tamil', 'rating': 4.3, 'distance': 2.0}
            ],
            
            # Uttar Pradesh
            'Lucknow': [
                {'name': 'Tunday Kababi', 'cuisine': 'Kebab Shop', 'rating': 4.2, 'distance': 1.4},
                {'name': 'Milan A Speciality Restaurant', 'cuisine': 'Restaurant', 'rating': 4.8, 'distance': 1.2},
                {'name': 'Baati Chokha Restaurant', 'cuisine': 'North Indian', 'rating': 4.3, 'distance': 1.8},
                {'name': 'Dastarkhwan', 'cuisine': 'Mughlai', 'rating': 4.4, 'distance': 2.0},
                {'name': 'Idris Biryani', 'cuisine': 'Biryani', 'rating': 4.5, 'distance': 1.6}
            ],
            'Agra': [
                {'name': 'The Salt Cafe Kitchen & Bar', 'cuisine': 'Restaurant', 'rating': 4.6, 'distance': 1.3},
                {'name': '2nd Wife Fine Dining', 'cuisine': 'North Indian', 'rating': 4.6, 'distance': 1.5},
                {'name': 'Daawat-e-Nawab', 'cuisine': 'Restaurant', 'rating': 4.4, 'distance': 1.8},
                {'name': 'Pinch of Spice', 'cuisine': 'North Indian', 'rating': 4.4, 'distance': 1.2},
                {'name': 'Petha Ghar', 'cuisine': 'Sweets', 'rating': 4.2, 'distance': 1.1}
            ]
        }
        
        restaurants = city_restaurants.get(city, [
            {'name': 'Local Restaurant', 'cuisine': 'Multi-cuisine', 'rating': 4.0, 'distance': 1.5},
            {'name': 'City Kitchen', 'cuisine': 'Traditional', 'rating': 4.1, 'distance': 1.8},
            {'name': 'Regional Dhaba', 'cuisine': 'North Indian', 'rating': 4.2, 'distance': 1.2}
        ])
        
        # Generate recommendations with AI-like scoring
        recommendations = []
        for i, rest in enumerate(restaurants):
            # Calculate probability based on rating, distance, and user preferences
            rating_score = rest['rating'] / 5.0
            distance_score = max(0, 1 - (rest['distance'] / 5.0))
            age_preference = 0.9 if int(age) < 30 else 0.8
            
            probability = (rating_score * 0.4 + distance_score * 0.4 + age_preference * 0.2)
            probability = min(0.98, probability + (np.random.random() * 0.1 - 0.05))
            
            recommendations.append({
                'vendor_id': i + 1,
                'name': rest['name'],
                'cuisine': rest['cuisine'],
                'rating': rest['rating'],
                'distance': rest['distance'],
                'latitude': 29.9457 + (np.random.random() - 0.5) * 0.01 if city == 'Haridwar' else 12.9716 + (np.random.random() - 0.5) * 0.01,
                'longitude': 78.1642 + (np.random.random() - 0.5) * 0.01 if city == 'Haridwar' else 77.5946 + (np.random.random() - 0.5) * 0.01,
                'probability': round(probability, 3)
            })
        
        # Sort by probability (highest first)
        recommendations.sort(key=lambda x: x['probability'], reverse=True)
        
        result = {
            'recommendations': recommendations[:5],  # Top 5 recommendations
            'total_found': len(recommendations),
            'city': city
        }
        print(f"Returning {len(result['recommendations'])} recommendations")
        return jsonify(result)
        
    except Exception as e:
        print(f"Error in get_recommendations: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/customers', methods=['GET'])
def get_customers():
    """Get sample customer data"""
    customers = [
        {'customer_id': 1, 'age': 28, 'gender': 'M', 'language': 'English', 'state': 'Delhi', 'city': 'New Delhi', 'loyalty_score': 0.8},
        {'customer_id': 2, 'age': 32, 'gender': 'F', 'language': 'Hindi', 'state': 'Maharashtra', 'city': 'Mumbai', 'loyalty_score': 0.9},
        {'customer_id': 3, 'age': 25, 'gender': 'M', 'language': 'English', 'state': 'Karnataka', 'city': 'Bangalore', 'loyalty_score': 0.7},
        {'customer_id': 4, 'age': 29, 'gender': 'F', 'language': 'Tamil', 'state': 'Tamil Nadu', 'city': 'Chennai', 'loyalty_score': 0.85},
        {'customer_id': 5, 'age': 35, 'gender': 'M', 'language': 'Hindi', 'state': 'Uttarakhand', 'city': 'Dehradun', 'loyalty_score': 0.75}
    ]
    return jsonify({'data': customers})

@app.route('/menu/<int:vendor_id>/<city>', methods=['GET'])
def get_menu(vendor_id, city):
    """Get city-specific menu for restaurant"""
    city_menus = {
        'Haridwar': {
            1: [{'dish_id': 1, 'dish_name': 'Chole Bhature', 'price': 120}, {'dish_id': 2, 'dish_name': 'Lassi', 'price': 60}, {'dish_id': 3, 'dish_name': 'Aloo Paratha', 'price': 80}],
            2: [{'dish_id': 4, 'dish_name': 'Ganga Aarti Thali', 'price': 250}, {'dish_id': 5, 'dish_name': 'Dal Makhani', 'price': 180}, {'dish_id': 6, 'dish_name': 'Butter Naan', 'price': 50}],
            3: [{'dish_id': 7, 'dish_name': 'Puri Sabzi', 'price': 100}, {'dish_id': 8, 'dish_name': 'Kachori', 'price': 40}, {'dish_id': 9, 'dish_name': 'Jalebi', 'price': 80}],
            4: [{'dish_id': 10, 'dish_name': 'Gol Gappe', 'price': 50}, {'dish_id': 11, 'dish_name': 'Raj Kachori', 'price': 80}, {'dish_id': 12, 'dish_name': 'Dahi Bhalla', 'price': 70}],
            5: [{'dish_id': 13, 'dish_name': 'Thali', 'price': 200}, {'dish_id': 14, 'dish_name': 'Paneer Curry', 'price': 160}, {'dish_id': 15, 'dish_name': 'Roti', 'price': 20}]
        },
        'Dehradun': {
            1: [{'dish_id': 46, 'dish_name': 'Black Pepper Chicken', 'price': 320}, {'dish_id': 47, 'dish_name': 'Garlic Naan', 'price': 60}, {'dish_id': 48, 'dish_name': 'Paneer Tikka', 'price': 280}],
            2: [{'dish_id': 49, 'dish_name': 'Tibetan Momos', 'price': 150}, {'dish_id': 50, 'dish_name': 'Thukpa', 'price': 180}, {'dish_id': 51, 'dish_name': 'Butter Tea', 'price': 40}],
            3: [{'dish_id': 52, 'dish_name': 'Grilled Chicken', 'price': 350}, {'dish_id': 53, 'dish_name': 'Forest Salad', 'price': 120}, {'dish_id': 54, 'dish_name': 'Herbal Tea', 'price': 50}],
            4: [{'dish_id': 55, 'dish_name': 'Multi Cuisine Platter', 'price': 400}, {'dish_id': 56, 'dish_name': 'Pasta Arrabiata', 'price': 220}, {'dish_id': 57, 'dish_name': 'Garlic Bread', 'price': 80}],
            5: [{'dish_id': 58, 'dish_name': 'Margherita Pizza', 'price': 280}, {'dish_id': 59, 'dish_name': 'Tiramisu', 'price': 150}, {'dish_id': 60, 'dish_name': 'Cappuccino', 'price': 80}]
        },
        'Mumbai': {
            1: [{'dish_id': 61, 'dish_name': 'Koliwada Prawns', 'price': 350}, {'dish_id': 62, 'dish_name': 'Fish Curry', 'price': 280}, {'dish_id': 63, 'dish_name': 'Sol Kadhi', 'price': 80}],
            2: [{'dish_id': 64, 'dish_name': 'Chicken Steak', 'price': 450}, {'dish_id': 65, 'dish_name': 'Fish & Chips', 'price': 380}, {'dish_id': 66, 'dish_name': 'Beer', 'price': 200}],
            3: [{'dish_id': 67, 'dish_name': 'Berry Pulao', 'price': 320}, {'dish_id': 68, 'dish_name': 'Dhansak', 'price': 280}, {'dish_id': 69, 'dish_name': 'Caramel Custard', 'price': 120}],
            4: [{'dish_id': 70, 'dish_name': 'Seekh Kebab', 'price': 180}, {'dish_id': 71, 'dish_name': 'Mutton Biryani', 'price': 350}, {'dish_id': 72, 'dish_name': 'Roomali Roti', 'price': 40}],
            5: [{'dish_id': 73, 'dish_name': 'Vada Pav', 'price': 30}, {'dish_id': 74, 'dish_name': 'Pav Bhaji', 'price': 120}, {'dish_id': 75, 'dish_name': 'Cutting Chai', 'price': 15}]
        },
        'Pune': {
            1: [{'dish_id': 76, 'dish_name': 'Thai Green Curry', 'price': 280}, {'dish_id': 77, 'dish_name': 'Pad Thai', 'price': 250}, {'dish_id': 78, 'dish_name': 'Tom Yum Soup', 'price': 180}],
            2: [{'dish_id': 79, 'dish_name': 'Chicken Sizzler', 'price': 320}, {'dish_id': 80, 'dish_name': 'Pasta Alfredo', 'price': 240}, {'dish_id': 81, 'dish_name': 'Chocolate Mousse', 'price': 120}],
            3: [{'dish_id': 82, 'dish_name': 'French Onion Soup', 'price': 180}, {'dish_id': 83, 'dish_name': 'Beef Bourguignon', 'price': 450}, {'dish_id': 84, 'dish_name': 'Crème Brûlée', 'price': 160}],
            4: [{'dish_id': 85, 'dish_name': 'Masala Dosa', 'price': 120}, {'dish_id': 86, 'dish_name': 'Filter Coffee', 'price': 40}, {'dish_id': 87, 'dish_name': 'Rava Idli', 'price': 80}],
            5: [{'dish_id': 88, 'dish_name': 'German Pretzel', 'price': 150}, {'dish_id': 89, 'dish_name': 'Apple Strudel', 'price': 180}, {'dish_id': 90, 'dish_name': 'Black Forest Cake', 'price': 200}]
        },
        'New Delhi': {
            1: [{'dish_id': 91, 'dish_name': 'Mutton Korma', 'price': 420}, {'dish_id': 92, 'dish_name': 'Chicken Changezi', 'price': 380}, {'dish_id': 93, 'dish_name': 'Sheermal', 'price': 60}],
            2: [{'dish_id': 94, 'dish_name': 'Aloo Paratha', 'price': 80}, {'dish_id': 95, 'dish_name': 'Gobi Paratha', 'price': 90}, {'dish_id': 96, 'dish_name': 'Makkhan', 'price': 20}],
            3: [{'dish_id': 97, 'dish_name': 'Dal Bukhara', 'price': 650}, {'dish_id': 98, 'dish_name': 'Sikandari Raan', 'price': 1200}, {'dish_id': 99, 'dish_name': 'Kulfi', 'price': 180}],
            4: [{'dish_id': 100, 'dish_name': 'Stuffed Paratha', 'price': 120}, {'dish_id': 101, 'dish_name': 'Chole', 'price': 100}, {'dish_id': 102, 'dish_name': 'Pickle', 'price': 30}],
            5: [{'dish_id': 103, 'dish_name': 'Mutton Seekh', 'price': 280}, {'dish_id': 104, 'dish_name': 'Chicken Tikka', 'price': 250}, {'dish_id': 105, 'dish_name': 'Rumali Roti', 'price': 40}]
        },
        'Central Delhi': {
            1: [{'dish_id': 106, 'dish_name': 'Continental Platter', 'price': 350}, {'dish_id': 107, 'dish_name': 'Grilled Sandwich', 'price': 150}, {'dish_id': 108, 'dish_name': 'Cold Coffee', 'price': 80}],
            2: [{'dish_id': 109, 'dish_name': 'Gujarati Thali', 'price': 280}, {'dish_id': 110, 'dish_name': 'Dhokla', 'price': 80}, {'dish_id': 111, 'dish_name': 'Buttermilk', 'price': 40}],
            3: [{'dish_id': 112, 'dish_name': 'Chocolate Pastry', 'price': 120}, {'dish_id': 113, 'dish_name': 'Black Forest', 'price': 150}, {'dish_id': 114, 'dish_name': 'Vanilla Shake', 'price': 100}],
            4: [{'dish_id': 115, 'dish_name': 'Butter Chicken', 'price': 320}, {'dish_id': 116, 'dish_name': 'Jeera Rice', 'price': 120}, {'dish_id': 117, 'dish_name': 'Raita', 'price': 60}],
            5: [{'dish_id': 118, 'dish_name': 'Burger', 'price': 180}, {'dish_id': 119, 'dish_name': 'French Fries', 'price': 100}, {'dish_id': 120, 'dish_name': 'Coke', 'price': 50}]
        },
        'Bangalore': {
            1: [{'dish_id': 121, 'dish_name': 'Fish Curry', 'price': 280}, {'dish_id': 122, 'dish_name': 'Neer Dosa', 'price': 80}, {'dish_id': 123, 'dish_name': 'Coconut Chutney', 'price': 40}],
            2: [{'dish_id': 124, 'dish_name': 'Bisi Bele Bath', 'price': 150}, {'dish_id': 125, 'dish_name': 'Mysore Pak', 'price': 100}, {'dish_id': 126, 'dish_name': 'Filter Coffee', 'price': 40}],
            3: [{'dish_id': 127, 'dish_name': 'Grilled Steak', 'price': 450}, {'dish_id': 128, 'dish_name': 'Mashed Potato', 'price': 120}, {'dish_id': 129, 'dish_name': 'Wine', 'price': 300}],
            4: [{'dish_id': 130, 'dish_name': 'Craft Beer', 'price': 250}, {'dish_id': 131, 'dish_name': 'Chicken Wings', 'price': 280}, {'dish_id': 132, 'dish_name': 'Nachos', 'price': 180}],
            5: [{'dish_id': 133, 'dish_name': 'Fusion Curry', 'price': 220}, {'dish_id': 134, 'dish_name': 'Quinoa Salad', 'price': 180}, {'dish_id': 135, 'dish_name': 'Green Tea', 'price': 60}]
        },
        'Mysore': {
            1: [{'dish_id': 136, 'dish_name': 'Veg Thali', 'price': 180}, {'dish_id': 137, 'dish_name': 'Sambar', 'price': 60}, {'dish_id': 138, 'dish_name': 'Rasam', 'price': 50}],
            2: [{'dish_id': 139, 'dish_name': 'Mysore Masala Dosa', 'price': 120}, {'dish_id': 140, 'dish_name': 'Coconut Chutney', 'price': 30}, {'dish_id': 141, 'dish_name': 'Coffee', 'price': 40}],
            3: [{'dish_id': 142, 'dish_name': 'Asian Noodles', 'price': 180}, {'dish_id': 143, 'dish_name': 'Manchurian', 'price': 160}, {'dish_id': 144, 'dish_name': 'Fried Rice', 'price': 150}],
            4: [{'dish_id': 145, 'dish_name': 'Andhra Meals', 'price': 200}, {'dish_id': 146, 'dish_name': 'Spicy Chicken', 'price': 250}, {'dish_id': 147, 'dish_name': 'Pickle Rice', 'price': 120}],
            5: [{'dish_id': 148, 'dish_name': 'Mysore Dosa', 'price': 100}, {'dish_id': 149, 'dish_name': 'Idli Vada', 'price': 80}, {'dish_id': 150, 'dish_name': 'South Coffee', 'price': 35}]
        },
        'Chennai': {
            1: [{'dish_id': 151, 'dish_name': 'Chettinad Chicken', 'price': 320}, {'dish_id': 152, 'dish_name': 'Appam', 'price': 60}, {'dish_id': 153, 'dish_name': 'Coconut Milk', 'price': 40}],
            2: [{'dish_id': 154, 'dish_name': 'Mutton Biryani', 'price': 380}, {'dish_id': 155, 'dish_name': 'Raita', 'price': 60}, {'dish_id': 156, 'dish_name': 'Shorba', 'price': 80}],
            3: [{'dish_id': 157, 'dish_name': 'Traditional Thali', 'price': 250}, {'dish_id': 158, 'dish_name': 'Payasam', 'price': 80}, {'dish_id': 159, 'dish_name': 'Buttermilk', 'price': 40}],
            4: [{'dish_id': 160, 'dish_name': 'Innovative Dosa', 'price': 150}, {'dish_id': 161, 'dish_name': 'Fusion Curry', 'price': 200}, {'dish_id': 162, 'dish_name': 'Modern Coffee', 'price': 60}],
            5: [{'dish_id': 163, 'dish_name': 'Spice Curry', 'price': 180}, {'dish_id': 164, 'dish_name': 'Lemon Rice', 'price': 100}, {'dish_id': 165, 'dish_name': 'Pickle', 'price': 30}]
        },
        'Coimbatore': {
            1: [{'dish_id': 166, 'dish_name': 'Buffet Spread', 'price': 350}, {'dish_id': 167, 'dish_name': 'Live Counter', 'price': 200}, {'dish_id': 168, 'dish_name': 'Dessert Bar', 'price': 120}],
            2: [{'dish_id': 169, 'dish_name': 'Multi Cuisine', 'price': 280}, {'dish_id': 170, 'dish_name': 'Continental', 'price': 220}, {'dish_id': 171, 'dish_name': 'Indian', 'price': 180}],
            3: [{'dish_id': 172, 'dish_name': 'Pure Veg Thali', 'price': 180}, {'dish_id': 173, 'dish_name': 'Sweets', 'price': 100}, {'dish_id': 174, 'dish_name': 'Lassi', 'price': 60}],
            4: [{'dish_id': 175, 'dish_name': 'South Meals', 'price': 150}, {'dish_id': 176, 'dish_name': 'Sambar Rice', 'price': 100}, {'dish_id': 177, 'dish_name': 'Curd Rice', 'price': 80}],
            5: [{'dish_id': 178, 'dish_name': 'Tamil Special', 'price': 200}, {'dish_id': 179, 'dish_name': 'Kongu Cuisine', 'price': 180}, {'dish_id': 180, 'dish_name': 'Traditional Tea', 'price': 30}]
        },
        'Lucknow': {
            1: [{'dish_id': 181, 'dish_name': 'Galouti Kebab', 'price': 280}, {'dish_id': 182, 'dish_name': 'Sheermal', 'price': 60}, {'dish_id': 183, 'dish_name': 'Kulcha', 'price': 40}],
            2: [{'dish_id': 184, 'dish_name': 'Awadhi Thali', 'price': 450}, {'dish_id': 185, 'dish_name': 'Lucknowi Biryani', 'price': 350}, {'dish_id': 186, 'dish_name': 'Kulfi', 'price': 80}],
            3: [{'dish_id': 187, 'dish_name': 'Litti Chokha', 'price': 120}, {'dish_id': 188, 'dish_name': 'Sattu Drink', 'price': 40}, {'dish_id': 189, 'dish_name': 'Gud', 'price': 30}],
            4: [{'dish_id': 190, 'dish_name': 'Mughlai Paratha', 'price': 180}, {'dish_id': 191, 'dish_name': 'Korma', 'price': 250}, {'dish_id': 192, 'dish_name': 'Roomali Roti', 'price': 40}],
            5: [{'dish_id': 193, 'dish_name': 'Lucknowi Biryani', 'price': 320}, {'dish_id': 194, 'dish_name': 'Kebab Platter', 'price': 400}, {'dish_id': 195, 'dish_name': 'Thandai', 'price': 60}]
        },
        'Agra': {
            1: [{'dish_id': 196, 'dish_name': 'Tandoori Platter', 'price': 380}, {'dish_id': 197, 'dish_name': 'Naan Basket', 'price': 120}, {'dish_id': 198, 'dish_name': 'Lassi', 'price': 80}],
            2: [{'dish_id': 199, 'dish_name': 'Mughlai Cuisine', 'price': 420}, {'dish_id': 200, 'dish_name': 'Biryani', 'price': 300}, {'dish_id': 201, 'dish_name': 'Shahi Tukda', 'price': 120}],
            3: [{'dish_id': 202, 'dish_name': 'Royal Thali', 'price': 350}, {'dish_id': 203, 'dish_name': 'Nawabi Curry', 'price': 280}, {'dish_id': 204, 'dish_name': 'Kulfi Falooda', 'price': 100}],
            4: [{'dish_id': 205, 'dish_name': 'Spice Kitchen', 'price': 250}, {'dish_id': 206, 'dish_name': 'Tandoori Roti', 'price': 30}, {'dish_id': 207, 'dish_name': 'Mint Chutney', 'price': 20}],
            5: [{'dish_id': 208, 'dish_name': 'Agra Petha', 'price': 150}, {'dish_id': 209, 'dish_name': 'Milk Cake', 'price': 120}, {'dish_id': 210, 'dish_name': 'Rabri', 'price': 80}]
        }
    }
    
    menu = city_menus.get(city, {}).get(vendor_id, [])
    return jsonify({'menu': menu})

if __name__ == '__main__':
    # Initialize model
    print("Initializing Orderly Analytics Platform...")
    model = get_model()
    if model:
        print("Model loaded successfully!")
    else:
        print("Warning: Model not available")
    
    port = int(os.environ.get('PORT', 8000))
    print(f"Starting server on port {port}")
    app.run(debug=False, port=port, host='0.0.0.0')