import pandas as pd
import numpy as np
from datetime import datetime
import re

def preprocess_input(data):
    """Preprocess input data for prediction"""
    df = pd.DataFrame([data])
    
    # Handle distance conversion
    if 'Distance' in df.columns:
        df['Distance'] = df['Distance'].apply(convert_distance_to_numeric)
    
    # Extract hour from order time if available
    if 'Order Placed At' in df.columns:
        df['order_hour'] = df['Order Placed At'].apply(extract_hour)
    
    # Handle categorical encoding
    categorical_cols = ['City', 'Subzone', 'Order Status', 'Delivery']
    for col in categorical_cols:
        if col in df.columns:
            df[col] = pd.Categorical(df[col]).codes
    
    return df

def convert_distance_to_numeric(distance_str):
    """Convert distance string to numeric value"""
    if pd.isna(distance_str):
        return 0
    
    distance_str = str(distance_str).lower()
    if '<1km' in distance_str or 'less than 1km' in distance_str:
        return 0.5
    
    # Extract numeric value
    match = re.search(r'(\d+(?:\.\d+)?)', distance_str)
    if match:
        return float(match.group(1))
    return 0

def extract_hour(timestamp_str):
    """Extract hour from timestamp string"""
    if pd.isna(timestamp_str):
        return 12
    
    try:
        # Parse various timestamp formats
        if 'AM' in timestamp_str or 'PM' in timestamp_str:
            time_part = timestamp_str.split(',')[0].strip()
            dt = datetime.strptime(time_part, '%I:%M %p')
            return dt.hour
        return 12
    except:
        return 12

def clean_dataset(df):
    """Clean and preprocess the full dataset"""
    # Convert distance to numeric
    df['Distance_numeric'] = df['Distance'].apply(convert_distance_to_numeric)
    
    # Extract order hour
    df['order_hour'] = df['Order Placed At'].apply(extract_hour)
    
    # Create performance label based on rating and KPT duration
    df['performance_label'] = df.apply(create_performance_label, axis=1)
    
    # Handle missing values
    df['Rating'].fillna(3.0, inplace=True)
    df['KPT duration (minutes)'].fillna(df['KPT duration (minutes)'].median(), inplace=True)
    df['Rider wait time (minutes)'].fillna(df['Rider wait time (minutes)'].median(), inplace=True)
    
    return df

def create_performance_label(row):
    """Create performance label based on multiple factors"""
    rating = row.get('Rating', 3.0)
    kpt_duration = row.get('KPT duration (minutes)', 15)
    order_ready = row.get('Order Ready Marked', 'Correctly')
    
    # Good performance: High rating, fast KPT, correct marking
    if rating >= 4.0 and kpt_duration <= 15 and order_ready == 'Correctly':
        return 1  # Good
    # Poor performance: Low rating, slow KPT, or incorrect marking
    elif rating <= 2.0 or kpt_duration >= 25 or order_ready != 'Correctly':
        return 0  # Poor
    else:
        return 1  # Average -> Good (binary classification)