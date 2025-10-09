import os
import glob
import pandas as pd
from pandas.errors import EmptyDataError

# Paths
RAW_BASE    = r"C:\Users\RadiumPCs\Desktop\Uni\fit3164 data\WeatherDownload"
CLEANED_DIR = r"C:\Users\RadiumPCs\Desktop\Uni\fit3164 data"
os.makedirs(CLEANED_DIR, exist_ok=True)

# List of states to process
states = ["vic", "nsw", "qld", "wa", "sa", "tas", "nt"]

# Container for all DataFrames
all_dfs = []

# Full list of 11 column names from the raw CSV
colnames_11 = [
    "station",            # 0: station identifier
    "date",               # 1: date (DD/MM/YYYY)
    "evap_0000_2400",     # 2: evaporation 0000–2400
    "rainfall_0900_0900", # 3: rainfall 0900–0900
    "evap_0900_0900",     # 4: evaporation 0900–0900
    "max_temp",           # 5: maximum temperature (°C)
    "min_temp",           # 6: minimum temperature (°C)
    "max_humid",          # 7: maximum relative humidity (%)
    "min_humid",          # 8: minimum relative humidity (%)
    "wind_speed",         # 9: wind speed (m/s)
    "solar"               # 10: solar exposure (MJ/m²)
]

for state in states:
    folder = os.path.join(RAW_BASE, state)
    pattern = os.path.join(folder, "*.csv")

    for fpath in glob.glob(pattern):
        # Skip zero-byte files
        if os.path.getsize(fpath) == 0:
            print(f"[Skip] Empty file: {fpath}")
            continue

        # Read CSV, skipping the first 13 lines of header/notes
        try:
            df = pd.read_csv(fpath, skiprows=13, header=None, encoding="utf-8")
        except EmptyDataError:
            print(f"[Skip] No data: {fpath}")
            continue

        # Validate column count and assign names
        ncol = df.shape[1]
        if ncol == 11:
            df.columns = colnames_11
        elif ncol == 10:
            # Some files may lack the 'solar' column
            df.columns = colnames_11[:-1]
        else:
            print(f"[Skip] Unexpected column count ({ncol}): {fpath}")
            continue

        # Convert date to ISO format YYYY-MM-DD
        df["date"] = pd.to_datetime(df["date"], dayfirst=True).dt.strftime("%Y-%m-%d")
        # Add a state column
        df["state"] = state.upper()

        # Keep only the 8 required columns and rename them
        df = df[[
            "date", "state", "station",
            "max_temp", "min_temp",
            "max_humid", "min_humid",
            "wind_speed"
        ]]
        df.rename(columns={
            "max_temp":  "max_Temperature_C",
            "min_temp":  "min_Temperature_C",
            "max_humid": "max_Humidity_pct",
            "min_humid": "min_Humidity_pct",
            "wind_speed":"wind_speed_m_s"
        }, inplace=True)

        all_dfs.append(df)
        print(f"✔ Processed: {os.path.basename(fpath)}")

# Merge and write out
if all_dfs:
    big_df = pd.concat(all_dfs, ignore_index=True)
    out_f = os.path.join(CLEANED_DIR, "all_states_weather.csv")
    big_df.to_csv(out_f, index=False, encoding="utf-8")
    print(f"\n✅ Done! {len(big_df)} records written to: {out_f}")
else:
    print("⚠️ No valid data processed. Please check the raw files.")