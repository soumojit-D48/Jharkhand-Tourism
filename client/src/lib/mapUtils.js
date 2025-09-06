
// create start , end point with the route
export const createRouteOnMap = (map, routeData, fromResult, toResult) => {
  // Create polyline for route 
  const polyline = window.L.polyline(routeData.coordinates, {
    color: "#3B82F6",
    weight: 4,
    opacity: 0.8,
  });

  // Start marker
  const startMarker = window.L.marker([fromResult.lat, fromResult.lng], {
    icon: window.L.divIcon({
      html: '<div style="background: #22c55e; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">A</div>',
      className: "custom-div-icon",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    }),
  }).bindPopup(`<strong>From:</strong> ${fromResult.display_name}`);

  // End marker
  const endMarker = window.L.marker([toResult.lat, toResult.lng], {
    icon: window.L.divIcon({
      html: '<div style="background: #ef4444; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px;">B</div>',
      className: "custom-div-icon",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    }),
  }).bindPopup(`<strong>To:</strong> ${toResult.display_name}`);

  // Group them
  const routeGroup = window.L.layerGroup([polyline, startMarker, endMarker]);

  // Add group to map 
  routeGroup.addTo(map);

  // Fit map to route bounds
  map.fitBounds(polyline.getBounds(), { padding: [20, 20] });

  return routeGroup;
};


export const clearRouteFromMap = (map, routeLayer, setRouteLayer) => {
  if (map && routeLayer) {
    map.removeLayer(routeLayer);
    setRouteLayer(null);
  }
  if (map) {
    map.setView([23.6102, 85.2799], 9); // Jharkhand center
  }
};
