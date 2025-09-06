
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer, Gauge, MapPin, Clock, Leaf, AlertCircle } from 'lucide-react';

import CurrentWeather from '../components/weather/CurrentWeather';
import WeatherCard from '../components/weather/WeatherCard';
import AirQuality from '../components/weather/AirQuality';
import TourismTip from '../components/weather/TourismTip';
import Loading from '../components/weather/Loading';
import ErrorMessage from '../components/weather/ErrorMessage';

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'http://api.weatherapi.com/v1/current.json?key=daa15d2ce6dd4e1bb0a90226250409&q=Jharkhand&aqi=yes'
      );
      
      if (!response.ok) {
        throw new Error(`Weather service unavailable (${response.status})`);
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Refresh every 10 minutes
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchWeather} />;
  if (!weatherData) return <ErrorMessage message="No weather data available" onRetry={fetchWeather} />;

  const { current, location } = weatherData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]">
        </div> */}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Jharkhand Weather
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Stay updated with real-time weather conditions for your eco & cultural tourism adventures in the Land of Forests
          </p>
        </div>

        {/* Current Weather */}
        <div className="max-w-4xl mx-auto">
          <CurrentWeather weather={current} location={location} />

          {/* Weather Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <WeatherCard
              title="Humidity"
              value={current.humidity}
              unit="%"
              icon={Droplets}
              color="text-blue-400"
            />
            <WeatherCard
              title="Wind Speed"
              value={current.wind_kph}
              unit="km/h"
              icon={Wind}
              color="text-gray-300"
            />
            <WeatherCard
              title="Visibility"
              value={current.vis_km}
              unit="km"
              icon={Eye}
              color="text-green-400"
            />
            <WeatherCard
              title="Pressure"
              value={current.pressure_mb}
              unit="mb"
              icon={Gauge}
              color="text-purple-400"
            />
          </div>

          {/* Additional Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <AirQuality airQuality={current.air_quality} />
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Thermometer className="w-6 h-6 text-red-400 mr-2" />
                Temperature Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Heat Index</span>
                  <span className="text-white font-medium">{Math.round(current.heatindex_c)}°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Dew Point</span>
                  <span className="text-white font-medium">{Math.round(current.dewpoint_c)}°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">UV Index</span>
                  <span className="text-white font-medium">{current.uv}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Cloud Cover</span>
                  <span className="text-white font-medium">{current.cloud}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tourism Tip */}
          <TourismTip weather={current} />

          {/* Refresh Button */}
          <div className="text-center mt-8">
            <button
              onClick={fetchWeather}
              disabled={loading}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-medium backdrop-blur-md border border-white/20 transition-all duration-300"
            >
              {loading ? 'Refreshing...' : 'Refresh Weather'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;


