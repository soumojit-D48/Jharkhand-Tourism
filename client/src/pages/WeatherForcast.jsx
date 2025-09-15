import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Thermometer,
  Gauge,
  MapPin,
  Clock,
  Leaf,
  AlertCircle,
  Umbrella,
  Sunrise,
  Sunset,
  Moon,
  Star,
  CloudSnow,
  Zap,
} from "lucide-react";

import LoadingSpinner from '../components/layout/LoadingSpinner'


const WeatherForcast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=Jharkhand&days=7&aqi=yes&alerts=yes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Weather service unavailable (${response.status})`);
      }

      const data = await response.json();

      if (!data || !data.current || !data.location) {
        throw new Error("Invalid weather data received");
      }

      setWeatherData(data);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError(err.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition, isDay = true) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
      return <CloudRain className="w-8 h-8 text-blue-400" />;
    } else if (conditionLower.includes("snow")) {
      return <CloudSnow className="w-8 h-8 text-blue-200" />;
    } else if (conditionLower.includes("thunder")) {
      return <Zap className="w-8 h-8 text-yellow-400" />;
    } else if (conditionLower.includes("cloud")) {
      return <Cloud className="w-8 h-8 text-gray-400" />;
    } else if (
      conditionLower.includes("clear") ||
      conditionLower.includes("sunny")
    ) {
      return isDay ? (
        <Sun className="w-8 h-8 text-yellow-400" />
      ) : (
        <Moon className="w-8 h-8 text-blue-200" />
      );
    }
    return <Sun className="w-8 h-8 text-yellow-400" />;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };
  if (loading) return <LoadingSpinner/>

  if (!weatherData) return null;

  const { current, location, forecast, alerts } = weatherData;
  const selectedDayData = forecast.forecastday[selectedDay];

   

   

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Jharkhand Weather Forecast
            </h1>
            {/* <p className="text-white/80 text-lg max-w-2xl mx-auto flex items-center justify-center">
              <MapPin className="w-5 h-5 mr-2" />
              {location.name}, {location.region}, {location.country}
            </p> */}
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Stay updated with real-time weather conditions for your eco &
              cultural tourism adventures in the Land of Forests
            </p>
          </div>

          {/* Weather Alerts */}
          {alerts && alerts.alert && alerts.alert.length < 0 && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-6 border border-red-500/30">
                <h3 className="text-xl font-semibold text-red-300 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2" />
                  Weather Alerts
                </h3>
                {alerts.alert.map((alert, index) => (
                  <div key={index} className="mb-3 last:mb-0">
                    <h4 className="font-semibold text-red-200">
                      {alert.headline}
                    </h4>
                    <p className="text-red-100 text-sm">{alert.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Weather */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <MapPin className="w-5 h-5 text-white/70 mr-2" />
                <span className="text-white/80 text-lg">
                  {location.name}, {location.region}
                </span>
              </div>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-4">
                  {getWeatherIcon(current.condition.text, current.is_day)}
                  <div className="ml-4">
                    <div className="text-6xl font-bold text-white">
                      {Math.round(current.temp_c)}°C
                    </div>
                    <div className="text-white/80 text-lg">
                      {current.condition.text}
                    </div>
                  </div>
                </div>
                <div className="text-white/60 flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Last updated:{" "}
                  {new Date(current.last_updated).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>

          {/* Weather Stats Grid */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Humidity</p>
                    <p className="text-2xl font-bold text-white">
                      {current.humidity}%
                    </p>
                  </div>
                  <Droplets className="w-8 h-8 text-blue-400" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Wind Speed</p>
                    <p className="text-2xl font-bold text-white">
                      {current.wind_kph} km/h
                    </p>
                  </div>
                  <Wind className="w-8 h-8 text-gray-300" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Visibility</p>
                    <p className="text-2xl font-bold text-white">
                      {current.vis_km} km
                    </p>
                  </div>
                  <Eye className="w-8 h-8 text-green-400" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Pressure</p>
                    <p className="text-2xl font-bold text-white">
                      {current.pressure_mb} mb
                    </p>
                  </div>
                  <Gauge className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Additional Weather Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Air Quality */}
              {current.air_quality && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Leaf className="w-6 h-6 text-green-400 mr-2" />
                    Air Quality
                  </h3>
                  <div className="space-y-3">
                    <div className="text-sm text-white/80 space-y-1">
                      <div className="flex justify-between">
                        <span>CO:</span>
                        <span>{Math.round(current.air_quality.co)} μg/m³</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NO₂:</span>
                        <span>{Math.round(current.air_quality.no2)} μg/m³</span>
                      </div>
                      <div className="flex justify-between">
                        <span>O₃:</span>
                        <span>{Math.round(current.air_quality.o3)} μg/m³</span>
                      </div>
                      <div className="flex justify-between">
                        <span>S0₂:</span>
                        <span>{Math.round(current.air_quality.so2)} μg/m³</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sun & Moon Info */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Sun className="w-6 h-6 text-yellow-400 mr-2" />
                  Sun & Moon
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 flex items-center">
                      <Sunrise className="w-4 h-4 mr-1" />
                      Sunrise
                    </span>
                    <span className="text-white font-medium">
                      {selectedDayData.astro.sunrise}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 flex items-center">
                      <Sunset className="w-4 h-4 mr-1" />
                      Sunset
                    </span>
                    <span className="text-white font-medium">
                      {selectedDayData.astro.sunset}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Moon Phase</span>
                    <span className="text-white font-medium">
                      {selectedDayData.astro.moon_phase}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="max-w-4xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              7-Day Forecast
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {forecast.forecastday.map((day, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`cursor-pointer transition-all duration-300 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center hover:bg-white/20 ${
                    selectedDay === index ? "bg-white/20 border-white/40" : ""
                  }`}
                >
                  <div className="text-white/80 text-sm mb-2">
                    {index === 0 ? "Today" : formatDate(day.date)}
                  </div>
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(day.day.condition.text)}
                  </div>
                  <div className="text-white font-semibold mb-1">
                    {Math.round(day.day.maxtemp_c)}°
                  </div>
                  <div className="text-white/60 text-sm">
                    {Math.round(day.day.mintemp_c)}°
                  </div>
                  <div className="flex items-center justify-center text-blue-400 text-sm mt-2">
                    <Umbrella className="w-3 h-3 mr-1" />
                    {day.day.daily_chance_of_rain}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Day Details */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">
                {selectedDay === 0 ? "Today" : formatDate(selectedDayData.date)}{" "}
                Details
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-white/80 text-sm">Max Temp</div>
                  <div className="text-white font-semibold text-lg">
                    {Math.round(selectedDayData.day.maxtemp_c)}°C
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-white/80 text-sm">Min Temp</div>
                  <div className="text-white font-semibold text-lg">
                    {Math.round(selectedDayData.day.mintemp_c)}°C
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-white/80 text-sm">Rain Chance</div>
                  <div className="text-white font-semibold text-lg">
                    {selectedDayData.day.daily_chance_of_rain}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-white/80 text-sm">UV Index</div>
                  <div className="text-white font-semibold text-lg">
                    {selectedDayData.day.uv}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tourism Tip */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Leaf className="w-6 h-6 text-green-400 mr-2" />
                Tourism Tip for Jharkhand
              </h3>
              <p className="text-white/90">
                {current.temp_c > 30
                  ? "Hot weather today! Perfect for visiting waterfalls like Hundru Falls or exploring caves. Stay hydrated and start early."
                  : current.temp_c < 15
                  ? "Cool weather is ideal for trekking in Netarhat or exploring Betla National Park. Pack warm clothes for early morning safaris."
                  : "Pleasant weather for outdoor activities! Great time to visit Ranchi's Rock Garden or explore the tribal villages."}
              </p>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="text-center">
            <button
              onClick={fetchWeather}
              disabled={loading}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-medium backdrop-blur-md border border-white/20 transition-all duration-300"
            >
              {loading ? "Refreshing..." : "Refresh Weather"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherForcast;
