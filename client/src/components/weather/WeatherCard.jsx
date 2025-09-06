
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer, Gauge, MapPin, Clock, Leaf, AlertCircle } from 'lucide-react'; 

const WeatherCard = ({ title, value, unit, icon: Icon, color = "text-blue-500" }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-white/70 text-sm">{title}</span>
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className="text-white/70 text-sm ml-1">{unit}</span>
      </div>
    </div>
  );

export default WeatherCard;