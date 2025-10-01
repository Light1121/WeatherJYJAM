import pandas as pd

# Read the CSV file
df = pd.read_csv('stations.csv')

# Keep station_id and station_name, drop only area_code and station_code
df = df.drop(columns=['area_code', 'station_code'])

# Remove 'AWS' from station_name
df['station_name'] = df['station_name'].str.replace('AWS', '', regex=False)

# Replace multiple spaces with a single space and strip
df['station_name'] = df['station_name'].str.replace(r'\s+', ' ', regex=True).str.strip()

# Remove space before closing parenthesis
df['station_name'] = df['station_name'].str.replace(r'\s+\)', ')', regex=True)

#replace '/' with '_' to avoid path issues
df['station_name'] = df['station_name'].str.replace('/', '_', regex=False)

# Write to a new CSV file, preserving station_id
df.to_csv('clean_stations.csv', index=False)