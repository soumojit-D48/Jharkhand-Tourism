import React, { useState } from "react";
import { MapPin } from "lucide-react";
// import { MapContainer } from "react-leaflet";
import MapContainer from "@/components/map/MapContainer";
import Sidebar from "@/components/map/Sidebar";
import { geocodeLocation, getRoute, formatDuration } from "@/lib/mapService";
import { createRouteOnMap, clearRouteFromMap } from "@/lib/mapUtils";

const MapPage = () => {
  // map state
  const [map, setMap] = useState(null);
  const [routeLayer, setRouteLayer] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  // Route planning state
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [transportMode, setTransportMode] = useState("driving");
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false); // when calculating it shows a loading state on that button after click sumbit
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [error, setError] = useState(null);

  // Tourist spots state  // all, nature, cultural etc
  const [selectedCategory, setSelectedCategory] = useState("all");

  const calculateRoute = async () => {
    if (!fromLocation || !toLocation) {
      setError("Please enter both loactions");
      return;
    }

    // both entered then set states and then call api

    setIsCalculating(true); // loading on button
    setError(null);

    try {
      // Geocode both locations via the helper func in services
      const fromResult = await geocodeLocation(fromLocation);
      const toResult = await geocodeLocation(toLocation);
      // it will return an obj of lat, lng, display_name

      // if geocodeLoaction returns null then
      if (!fromResult) {
        setError('Could not find "From" location! Please check the spelling.');
        setIsCalculating(false);
        return;
      }
      if (!toResult) {
        setError(
          'Could not find "Destination" location! Please check the spelling.'
        );
        setIsCalculating(false);
        return;
      }

      // this state is used in map conatiner
      setFromCoords(fromResult);
      setToCoords(toResult);

      // get the route
      const routeData = await getRoute(fromResult, toResult, transportMode);

      if (!routeData) {
        setError("Could not calculate route. Please try a different route.");
        setIsCalculating(false);
        return;
      }

      // update distance and duration
      setDistance(`${routeData.distance}km`);
      setDuration(formatDuration(routeData.duration));

      // clear existing route if  layer present
      if (map && routeLayer) {
        map.removeLayer(routeLayer);
      }

      if (map) {
        // createRouteOnMap from utils
        const newRouteLayer = createRouteOnMap(
          map,
          routeData,
          fromResult,
          toResult
        );
        setRouteLayer(newRouteLayer);
      }
    } catch (error) {
      setError(
        "An error occurred while calculating the route! Please try again."
      );
      console.error("Route calculation error:", error);
    } finally {
      setIsCalculating(false); // route is shown or not but after api call and calculation loading is over
    }
  };

  // function for clear route
  const clearRoute = () => {
    // clearRouteFromMap is from utils
    clearRouteFromMap(map, routeLayer, setRouteLayer);
    // setRouteLayer(null)
    setDistance(null);
    setDuration(null);
    setFromCoords(null);
    setToCoords(null);
    setError(null);
    setFromLocation("");
    setToLocation("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="flex">
        <Sidebar
          showSidebar={showSidebar}
          // Route planner props
          // input
          fromLocation={fromLocation}
          setFromLocation={setFromLocation}
          toLocation={toLocation}
          setToLocation={setToLocation}
          transportMode={transportMode}
          setTransportMode={setTransportMode}
          // result
          distance={distance}
          duration={duration}
          isCalculating={isCalculating}
          error={error}
          // button controller function
          calculateRoute={calculateRoute}
          clearRoute={clearRoute}
          // Tourist spots props
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Map Container */}

        <div className="flex-1 relative">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            // toggle button
            className="absolute top-4 left-4 z-1000 bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50"
          >
            <MapPin className="w-5 h-5" />
          </button>

          <MapContainer
            map={map}
            setMap={setMap}
            routeLayer={routeLayer}
            fromCoords={fromCoords}
            toCoords={toCoords}
          />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
