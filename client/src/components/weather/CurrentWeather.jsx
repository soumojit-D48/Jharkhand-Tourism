
import { Cloud, Sun, CloudRain, Droplets, Eye, Thermometer, Gauge, MapPin, Clock, Leaf, AlertCircle } from 'lucide-react';

const CurrentWeather = ({ weather, location }) => {
    const getWeatherIcon = (condition) => {
      const conditionText = condition.text.toLowerCase();
      if (conditionText.includes('rain')) return CloudRain;
      if (conditionText.includes('cloud')) return Cloud;
      return Sun;
    };
  
    const WeatherIcon = getWeatherIcon(weather.condition);
  
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
        <div className="flex items-center mb-6">
          <MapPin className="w-5 h-5 text-white/70 mr-2" />
          <span className="text-white/80 text-lg">{location.name}, {location.region}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <WeatherIcon className="w-16 h-16 text-yellow-400 mr-6" />
            <div>
              <div className="text-6xl font-bold text-white mb-2">{Math.round(weather.temp_c)}°</div>
              <div className="text-white/70 text-lg capitalize">{weather.condition.text}</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-white/70 text-sm mb-2">Feels like</div>
            <div className="text-3xl font-semibold text-white">{Math.round(weather.feelslike_c)}°</div>
          </div>
        </div>
  
        <div className="flex items-center mt-6 text-white/70">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">Last updated: {weather.last_updated}</span>
        </div>
      </div>
    );
  };
  
  export default CurrentWeather;