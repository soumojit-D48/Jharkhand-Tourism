// components/map/MapContainer.jsx
import React, { useRef, useEffect } from 'react';
import { touristSpotsMap } from '@/data';

const MapContainer = ({ 
  map, 
  setMap, 
  routeLayer, 
  fromCoords, 
  toCoords, 
  onRouteCalculated 
}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Load Leaflet CSS and JS
    if (typeof window !== "undefined" && !window.L) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
      script.onload = () => {
        initializeMap();
      };
      document.head.appendChild(script);
    } else if (window.L && mapRef.current && !map) {
      initializeMap();
    }
  }, []);

  const initializeMap = () => {
    if (mapRef.current && !map) {
      const mapInstance = window.L.map(mapRef.current, {
        center: [23.6102, 85.2799],
        zoom: 8,
        zoomControl: false,
      });

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstance);

      // Add tourist spots markers
      touristSpotsMap.forEach((spot) => {
        const marker = window.L.marker([spot.lat, spot.lng]).addTo(mapInstance)
          .bindPopup(`
            <div class="p-3 min-w-48">
              <h3 class="font-bold text-lg">${spot.name}</h3>
              <p class="text-sm text-gray-600 mt-1">${spot.description}</p>
              <div class="flex items-center mt-2">
                <span class="text-yellow-500">★</span>
                <span class="ml-1 text-sm">${spot.rating}</span>
              </div>
              <div class="mt-2">
                <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">${spot.category}</span>
              </div>
            </div>
          `);
      });

      setMap(mapInstance);
    }
  };

  return (
    <div
      ref={mapRef}
      className="w-full h-screen"
      style={{ minHeight: "80vh" }}
    />
  );
};

export default MapContainer;