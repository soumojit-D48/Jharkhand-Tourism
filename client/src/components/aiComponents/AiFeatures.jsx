
import { Card } from "@/components/ui/card";
import { TreePine, Camera, MapPin } from "lucide-react";

const AiFeatures = () => {
    return (
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border border-green-200 hover:border-green-300 hover:bg-green-50/50">
            <TreePine className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2 text-gray-800">Eco-Tourism</h3>
            <p className="text-sm text-gray-600">
              Discover pristine forests, waterfalls, and wildlife sanctuaries
            </p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border border-blue-200 hover:border-blue-300 hover:bg-blue-50/50">
            <Camera className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2 text-gray-800">Cultural Heritage</h3>
            <p className="text-sm text-gray-600">
              Explore tribal traditions, festivals, and historical sites
            </p>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border border-purple-200 hover:border-purple-300 hover:bg-purple-50/50">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold mb-2 text-gray-800">Travel Planning</h3>
            <p className="text-sm text-gray-600">
              Get personalized itineraries and travel recommendations
            </p>
          </Card>
        </div>
    );
};

export default AiFeatures;
