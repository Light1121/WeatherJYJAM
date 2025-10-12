// ---------- Interfaces ----------
interface RawWeatherEntry {
  'Station Name': string;
  Date: string;
  'Avg_Rainfall': number;
  'Avg_Temperature': number;
  'Avg_Relative_Humidity': number;
  'Avg_Wind_Speed': number;
}

interface FormattedWeatherData {
  date: string
  temperature: number
  humidity: number
  wind_speed: number
  precipitation: number
}

export type { RawWeatherEntry, FormattedWeatherData };