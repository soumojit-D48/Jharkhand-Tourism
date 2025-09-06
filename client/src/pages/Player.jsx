

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { culturalHighlights } from "@/components/CulturalHeritage";
import { culturalHighlights } from '@/data';
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";


const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    // Find the video data based on the ID from URL params
    window.scrollTo(0,0)
    const video = culturalHighlights.find(item => item.id === id);
    setVideoData(video);
  }, [id]);

  // Show loading or error if video not found
  if (!videoData) {
    return (
      <div className="h-screen flex flex-col justify-center items-center relative">
        <div className="text-white text-xl">
          {id ? "Video not found" : "Loading..."}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center relative bg-black">

        <button
                onClick={() => navigate('/')}
                className="absolute top-15 left-5 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
      
      <iframe
        width="90%"
        height="80%"  // https://www.youtube.com/shorts/ef5e4RgD5i4
        // src={`https://www.youtube.com/${videoData.ytKey}?autoplay=1`}
        // src={`https://www.youtube.com/embed/${videoData.ytKey}?autoplay=1`}
        src={`https://www.youtube.com/embed/${videoData.ytKey.replace("shorts/", "")}?rel=0&modestbranding=1`}
        title={videoData.title}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="rounded-lg"
      ></iframe>
      
      <div className="flex items-center justify-around w-[90%] mt-4 text-white px-4">
        <div className="text-center">
          <p className="text-sm text-gray-300">Date</p>
          <p className="font-medium">{videoData.date}</p>
        </div>
        <div className="text-center flex-1 mx-4">
          <p className="text-sm text-gray-300">Title</p>
          <p className="font-bold text-lg">{videoData.title}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-300">Participants</p>
          <p className="font-medium">{videoData.participants}</p>
        </div>
      </div>
      
      <div className="w-[90%] mt-2 text-center">
        <p className="text-gray-300 text-sm">{videoData.description}</p>
      </div>
    </div>
  );
};

export default Player;