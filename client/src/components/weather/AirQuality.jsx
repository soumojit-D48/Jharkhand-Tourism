

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer, Gauge, MapPin, Clock, Leaf, AlertCircle } from 'lucide-react';

const AirQuality = ({ airQuality }) => {
    const getAQILevel = (index) => {
      switch(index) {
        case 1: return { label: 'Good', color: 'bg-green-500' };
        case 2: return { label: 'Moderate', color: 'bg-yellow-500' };
        case 3: return { label: 'Unhealthy for Sensitive', color: 'bg-orange-500' };
        case 4: return { label: 'Unhealthy', color: 'bg-red-500' };
        case 5: return { label: 'Very Unhealthy', color: 'bg-purple-500' };
        case 6: return { label: 'Hazardous', color: 'bg-red-900' };
        default: return { label: 'Unknown', color: 'bg-gray-500' };
      }
    };
  
    const aqi = getAQILevel(airQuality['us-epa-index']);
  
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex items-center mb-4">
          <Leaf className="w-6 h-6 text-green-400 mr-2" />
          <h3 className="text-xl font-semibold text-white">Air Quality</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/80">Status</span>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${aqi.color} mr-2`}></div>
              <span className="text-white font-medium">{aqi.label}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-white/70">PM2.5</span>
              <span className="text-white">{airQuality.pm2_5?.toFixed(1)} &micro;g/m&sup3;</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">PM10</span>
              <span className="text-white">{airQuality.pm10?.toFixed(1)} &micro;g/m&sup3;</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">NO2</span>
              <span className="text-white">{airQuality.no2?.toFixed(1)} &micro;g/m&sup3;</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">O3</span>
              <span className="text-white">{airQuality.o3?.toFixed(1)} &micro;g/m&sup3;</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default AirQuality;