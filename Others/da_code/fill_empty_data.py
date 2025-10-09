# Script to fill missing weather data in all_states_weather_with_ids.csv
import pandas as pd
import numpy as np
from tqdm import tqdm
from scipy import stats
from sklearn.neighbors import KNeighborsRegressor

# Read the CSV
df = pd.read_csv('all_states_weather_with_ids.csv')

# Columns to fill
cols_to_fill = [
    'max_Temperature_C',
    'min_Temperature_C',
    'max_Humidity_pct',
    'min_Humidity_pct',
    'wind_speed_m_s'
]

# Convert date to datetime and sort for proper interpolation
df['date'] = pd.to_datetime(df['date'])
df = df.sort_values(['station_id', 'date'])

# Add seasonal features for better prediction
df['month'] = df['date'].dt.month
df['day_of_year'] = df['date'].dt.dayofyear
df['season_sin'] = np.sin(2 * np.pi * df['day_of_year'] / 365.25)
df['season_cos'] = np.cos(2 * np.pi * df['day_of_year'] / 365.25)

def fill_with_seasonal_knn(station_data, col, k=5):
    """Fill missing values using KNN with seasonal features"""
    # Convert to numeric
    station_data[col] = pd.to_numeric(station_data[col], errors='coerce')
    
    # Find rows with and without missing values
    missing_mask = station_data[col].isna()
    
    if missing_mask.all() or not missing_mask.any():
        # If all missing or none missing, use simple interpolation
        return station_data[col].interpolate().ffill().bfill()
    
    # Features for prediction (seasonal components)
    features = ['month', 'season_sin', 'season_cos']
    
    # Train on non-missing data
    train_data = station_data[~missing_mask]
    test_data = station_data[missing_mask]
    
    if len(train_data) < k:
        # Not enough data for KNN, fall back to interpolation
        return station_data[col].interpolate().ffill().bfill()
    
    # Use KNN to predict missing values
    knn = KNeighborsRegressor(n_neighbors=min(k, len(train_data)))
    knn.fit(train_data[features], train_data[col])
    
    # Predict missing values
    predicted = knn.predict(test_data[features])
    
    # Add some realistic variation based on historical data variance
    if len(train_data) > 1:
        std_dev = train_data[col].std()
        noise = np.random.normal(0, std_dev * 0.1, len(predicted))  # 10% of std as noise
        predicted += noise
    
    # Fill the missing values
    result = station_data[col].copy()
    result.loc[missing_mask] = predicted
    
    return result

def fill_with_time_series_modeling(station_data, col):
    """Fill missing values using time series decomposition and modeling"""
    station_data[col] = pd.to_numeric(station_data[col], errors='coerce')
    
    missing_mask = station_data[col].isna()
    
    if not missing_mask.any():
        return station_data[col]
    
    result = station_data[col].copy()
    
    # Get valid data points
    valid_data = station_data[~missing_mask].copy()
    
    if len(valid_data) < 10:  # Need enough data for modeling
        return station_data[col].interpolate().ffill().bfill()
    
    # Create time-based features for modeling
    valid_data = valid_data.copy()
    valid_data['days_since_start'] = (valid_data['date'] - valid_data['date'].min()).dt.days
    
    # Simple trend + seasonal model
    X = np.column_stack([
        valid_data['days_since_start'],  # Linear trend
        valid_data['season_sin'],        # Seasonal component
        valid_data['season_cos'],        # Seasonal component
        np.ones(len(valid_data))         # Intercept
    ])
    
    y = valid_data[col].values
    
    # Fit linear model
    try:
        coeffs = np.linalg.lstsq(X, y, rcond=None)[0]
        
        # Predict for missing values
        for idx in station_data[missing_mask].index:
            days_since_start = (station_data.loc[idx, 'date'] - valid_data['date'].min()).days
            
            prediction = (coeffs[0] * days_since_start + 
                         coeffs[1] * station_data.loc[idx, 'season_sin'] +
                         coeffs[2] * station_data.loc[idx, 'season_cos'] + 
                         coeffs[3])
            
            # Add realistic noise based on residuals
            residuals = y - X @ coeffs
            noise_std = np.std(residuals)
            noise = np.random.normal(0, noise_std * 0.2)
            
            result.loc[idx] = prediction + noise
            
    except np.linalg.LinAlgError:
        # Fall back to interpolation if modeling fails
        result = station_data[col].interpolate().ffill().bfill()
    
    return result

def fill_with_nearby_stations(df, station_id, col, max_distance_km=50):
    """Fill missing values using data from nearby weather stations"""
    # This is a simplified version - in practice, you'd need station coordinates
    # For now, use stations in the same state as a proxy for "nearby"
    
    station_data = df[df['station_id'] == station_id].copy()
    station_state = station_data['state'].iloc[0] if len(station_data) > 0 else None
    
    if station_state is None:
        return station_data[col]
    
    # Get other stations in the same state
    nearby_stations = df[
        (df['state'] == station_state) & 
        (df['station_id'] != station_id) &
        (~df[col].isna())
    ]
    
    if len(nearby_stations) == 0:
        return station_data[col]
    
    result = station_data[col].copy()
    missing_mask = result.isna()
    
    for idx in station_data[missing_mask].index:
        date_val = station_data.loc[idx, 'date']
        
        # Find nearby stations with data for this date (±3 days)
        date_range_data = nearby_stations[
            abs((nearby_stations['date'] - date_val).dt.days) <= 3
        ]
        
        if len(date_range_data) > 0:
            # Weight by inverse of time difference
            weights = 1 / (abs((date_range_data['date'] - date_val).dt.days) + 1)
            weighted_mean = np.average(date_range_data[col], weights=weights)
            
            # Add some variation based on the spread of nearby stations
            std_nearby = date_range_data[col].std()
            variation = np.random.normal(0, std_nearby * 0.1) if std_nearby > 0 else 0
            
            result.loc[idx] = weighted_mean + variation
    
    return result

def apply_weather_constraints(df, col):
    """Apply realistic constraints to weather data"""
    if col == 'max_Temperature_C':
        # Temperature constraints
        df[col] = np.clip(df[col], -50, 60)  # Reasonable temperature range
    elif col == 'min_Temperature_C':
        df[col] = np.clip(df[col], -60, 50)
        # Ensure min_temp <= max_temp
        if 'max_Temperature_C' in df.columns:
            df[col] = np.minimum(df[col], df['max_Temperature_C'])
    elif col in ['max_Humidity_pct', 'min_Humidity_pct']:
        # Humidity constraints
        df[col] = np.clip(df[col], 0, 100)
        if col == 'min_Humidity_pct' and 'max_Humidity_pct' in df.columns:
            df[col] = np.minimum(df[col], df['max_Humidity_pct'])
    elif col == 'wind_speed_m_s':
        # Wind speed constraints
        df[col] = np.clip(df[col], 0, 100)  # Max realistic wind speed
    
    return df[col]

# Fill missing values for each station using improved methods
print("Filling missing weather data with seasonal and historical patterns...")
for station_id in tqdm(df['station_id'].unique(), desc="Processing stations"):
    mask = df['station_id'] == station_id
    station_data = df[mask].copy()
    
    for col in cols_to_fill:
        try:
            # Try KNN with seasonal features first
            filled_values = fill_with_seasonal_knn(station_data, col)
            df.loc[mask, col] = filled_values
        except Exception as e:
            print(f"KNN failed for station {station_id}, column {col}. Using time series modeling. Error: {e}")
            # Fall back to time series modeling
            try:
                filled_values = fill_with_time_series_modeling(station_data, col)
                df.loc[mask, col] = filled_values
            except Exception as e2:
                print(f"Time series modeling failed for station {station_id}, column {col}. Using simple interpolation. Error: {e2}")
                # Final fallback to simple interpolation
                df.loc[mask, col] = pd.to_numeric(df.loc[mask, col], errors='coerce')
                df.loc[mask, col] = df.loc[mask, col].interpolate().ffill().bfill()

# Apply weather constraints to ensure realistic values
print("Applying weather constraints...")
for col in cols_to_fill:
    df[col] = apply_weather_constraints(df, col)

# Round all weather values to 1 decimal place
print("Rounding values to 1 decimal place...")
for col in cols_to_fill:
    # Ensure numeric dtype before rounding
    df[col] = pd.to_numeric(df[col], errors='coerce')
    df[col] = df[col].round(1)

# Drop temporary columns used for modeling
df = df.drop(['month', 'day_of_year', 'season_sin', 'season_cos'], axis=1, errors='ignore')

# Save the filled data
df.to_csv('all_states_weather_with_ids_filled.csv', index=False)
print("Filling complete. Output saved to all_states_weather_with_ids_filled.csv")
