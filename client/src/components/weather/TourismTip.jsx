
import { Sun } from 'lucide-react'; 


const TourismTip = ({ weather }) => {
  const getTip = (condition, temp) => {
    const conditionText = condition.text.toLowerCase();
    if (conditionText.includes('rain')) {
      return "Perfect weather to visit indoor attractions like museums or enjoy the monsoon beauty of Jharkhand's waterfalls!";
    }
    if (temp > 30) {
      return "Great day to explore hill stations like Netarhat or enjoy cool caves and underground attractions!";
    }
    if (temp < 15) {
      return "Perfect weather for trekking and outdoor adventures in Jharkhand's beautiful landscapes!";
    }
    return "Ideal weather for exploring Jharkhand's rich cultural heritage sites and tribal villages!";
  };

  return (
    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
        <Sun className="w-6 h-6 mr-2 text-yellow-400" />
        Tourism Tip
      </h3>
      <p className="text-white/90 leading-relaxed">{getTip(weather.condition, weather.temp_c)}</p>
    </div>
  );
};

export default TourismTip;