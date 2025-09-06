// components/map/RoutePlanner.jsx
import React from 'react';
import { Route, Car, Bike, Clock, Loader } from "lucide-react";

const RoutePlanner = ({
  fromLocation,
  setFromLocation,
  toLocation,
  setToLocation,
  transportMode,
  setTransportMode,
  distance,
  duration,
  isCalculating,
  error,
  calculateRoute,
  clearRoute
}) => {


  return (
    <div className="p-6 border-b">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Route className="w-5 h-5 mr-2 text-blue-600" />
        Plan Your Route
      </h2>
      
      <div className="space-y-4">
        {/* loaction from */}
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <input
            type="text"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            placeholder="e.g., Kolkata, West Bengal"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* location to */}
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <input
            type="text"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            placeholder="e.g., Ranchi, Jharkhand"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Transportation Mode */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Transportation Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {/* transport[driving] = car */}
            <button
              onClick={() => setTransportMode("driving")}
              className={`p-3 rounded-lg border-2 flex flex-col items-center ${
                transportMode === "driving"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Car className="w-5 h-5 mb-1" />
              <span className="text-xs">Car</span>
              
            </button>
            {/* walk */}
            <button
              onClick={() => setTransportMode("walking")}
              className={`p-3 rounded-lg border-2 flex flex-col items-center ${
                transportMode === "walking"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="w-5 h-5 mb-1 flex items-center justify-center text-sm">
                🚶
              </span>
              <span className="text-xs">Walk</span>
            </button>
            {/* cycle */}
            <button
              onClick={() => setTransportMode("cycling")}
              className={`p-3 rounded-lg border-2 flex flex-col items-center ${
                transportMode === "cycling"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Bike className="w-5 h-5 mb-1" />
              <span className="text-xs">Bike</span>
            </button>
          </div>
        </div>

        {/* button of calculate root */}
        <button
          onClick={calculateRoute}
          disabled={isCalculating}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isCalculating ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Calculating...
            </>
          ) : (
            "Calculate Route"
          )}
        </button>

          {/* error handling */}
        {error && (
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {distance && duration && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800">
                Distance:
              </span>
              <span className="text-green-700 font-bold">{distance}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-green-800">
                Duration:
              </span>
              <span className="text-green-700 font-bold flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {duration}
              </span>
            </div>
            <button
              onClick={clearRoute}
              className="w-full text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear Route
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutePlanner;