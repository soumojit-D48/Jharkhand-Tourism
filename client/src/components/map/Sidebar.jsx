import React from "react";
import RoutePlanner from "./RoutePlanner";
import TouristSportsList from "./TouristSportsList";

const Sidebar = ({
  showSidebar,
  // Route planner props
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
  clearRoute,
  // Tourist spots props
  selectedCategory,
  setSelectedCategory,
}) => {
  if (!showSidebar) return null;

  return (
    <div className="w-80 bg-white shadow-xl h-screen overflow-y-auto">
      <RoutePlanner
        fromLocation={fromLocation}
        setFromLocation={setFromLocation}
        toLocation={toLocation}
        setToLocation={setToLocation}
        transportMode={transportMode}
        setTransportMode={setTransportMode}
        distance={distance}
        duration={duration}
        isCalculating={isCalculating}
        error={error}
        calculateRoute={calculateRoute}
        clearRoute={clearRoute}
      />

      <TouristSportsList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default Sidebar;
