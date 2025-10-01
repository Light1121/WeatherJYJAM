import pandas as pd

# Load the weather data
weather_df = pd.read_csv('all_states_weather.csv')

# List of Australian state abbreviations
state_abbrs = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT']

# Remove rows where the second column is a state abbreviation and the third column is 'Totals:'
weather_df = weather_df[~((weather_df.iloc[:, 1].isin(state_abbrs)) & (weather_df.iloc[:, 2] == 'Totals:'))]

# Remove all rows where the row matches ',STATE,Totals:,,,,,'
weather_df = weather_df[~((weather_df.iloc[:, 0] == 'STATE') & (weather_df.iloc[:, 1] == 'Totals:'))]

# Load the stations data
stations_df = pd.read_csv('clean_stations.csv')

# Merge to add station_id to weather data by matching 'station' with 'station_name'
merged_df = weather_df.merge(
    stations_df[['station_name', 'station_id']],
    left_on='station',
    right_on='station_name',
    how='left'
)

# Drop the extra 'station_name' column if desired
merged_df = merged_df.drop(columns=['station_name'])

merged_df['station_id'] = merged_df['station_id'].astype('Int64')

# Find unmatched station names
unmatched_stations = merged_df[merged_df['station_id'].isna()]['station'].unique()
print("Stations with no match:", list(unmatched_stations))
print(len(unmatched_stations), "unmatched stations found.")

merged_df = merged_df.dropna(subset=['station_id'])

# Find unmatched station names
unmatched_stations = merged_df[merged_df['station_id'].isna()]['station'].unique()
print("Stations with no match:", list(unmatched_stations))
print(len(unmatched_stations), "unmatched stations found.")

# Save the cleaned and merged data
merged_df.to_csv('all_states_weather_with_ids.csv', index=False)