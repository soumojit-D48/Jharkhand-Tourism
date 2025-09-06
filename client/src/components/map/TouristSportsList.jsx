// components/map/touristSpotsMap.jsx
import React from "react";
import { Camera, Star } from "lucide-react";
import { touristSpotsMap } from "@/data";

const TouristSportsList = ({ selectedCategory, setSelectedCategory }) => {
  const filteredSpots =
    selectedCategory === "all"
      ? touristSpotsMap
      : touristSpotsMap.filter((spot) => spot.category === selectedCategory);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Camera className="w-5 h-5 mr-2 text-green-600" />
        Jharkhand Tourist Spots
      </h2>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["all", "nature", "cultural", "wildlife"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === category
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Spots List */}
      <div className="space-y-4">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-gray-800">{spot.name}</h3>
              <span className="text-2xl">{spot.image}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{spot.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="ml-1 text-sm text-gray-700">
                  {spot.rating}
                </span>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  spot.category === "nature"
                    ? "bg-green-100 text-green-800"
                    : spot.category === "cultural"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-orange-100 text-orange-800"
                }`}
              >
                {spot.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TouristSportsList;
