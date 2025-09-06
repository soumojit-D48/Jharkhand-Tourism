

import AiHeader from "@/components/aiComponents/AiHeader";
import AiChat from "@/components/aiComponents/AiChat";
import AiFeatures from "@/components/aiComponents/AiFeatures";

const AskMe = () => {


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <AiHeader/>

        {/* Chat Interface */}
        <AiChat/>

        {/* Features */}
        <AiFeatures/>
      </div>
    </div>
  );
};

export default AskMe;





