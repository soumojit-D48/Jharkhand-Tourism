
import { MessageCircle } from "lucide-react";


const AiHeader = () => {
    return (
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-green-600 to-blue-600 shadow-lg">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ask Jharkhand AI
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Your intelligent guide to Jharkhand's eco & cultural tourism
          </p>
        </div>
    );
};


export default AiHeader