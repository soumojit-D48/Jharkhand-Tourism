// Geocode location using Nominatim (OpenStreetMap's geocoding service)

// PlaceName ->(geocodeLocation) from corrdinate(x,y) to corrdinate(x,y) ->(getRoute) from x, from y | to x, to y

// take a location gave the name and coords
export const geocodeLocation = async (loaction) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(loaction)}&&countrycodes=in&limit=1`
        )

        const data = await response.json()

        if(data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
                display_name: data[0].display_name
            }
        }
        return null // when data is not valid or api error
    } catch (error) {
        console.error("Geocoding error:", error);
        return null
    }
}

// Get route using OSRM (Open Source Routing Machine)

export const getRoute = async (fromCoords, toCoords, profile="driving") => {
    try {
        const profileMap = {
            driving: "car",
            walking: "foot",
            cycling: "bike"
        }

        const osrmProfile = profileMap[profile] || "car"
        const url = `https://router.project-osrm.org/route/v1/${osrmProfile}/${fromCoords.lng},${fromCoords.lat};${toCoords.lng},${toCoords.lat}?overview=full&geometries=geojson`

        const response = await fetch(url)
        const data = await response.json()

        if(data && data.routes && data.routes.length > 0) {
            const route = data.routes[0] // get first best route 1st index of arr, each index's elm is an obj
            return {
                coordinates: route.geometry.coordinates.map((coord) => [
                    coord[1],
                    coord[0],
                ]),
                distance: (route.distance / 1000).toFixed(1), // to km
                duration: Math.ceil(route.duration / 60) // to min
            }
        }
        return null
    } catch (error) {
        console.error("Routing error:", error);
        return null
    }
}

// helper func Format duration from minutes to readable format

export const formatDuration = (minutes) => {
    if(minutes < 60) {
        return `${minutes}m`
    }
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h` 
    // if min = 60 it will return 1h
}


/*
{
  "routes": [
    {
      "geometry": {
        "coordinates": [
          [85.3096, 23.3441],  // [longitude, latitude]
          [85.3100, 23.3445],
          [85.3105, 23.3450],
          // ... hundreds more coordinate pairs
          [72.8777, 19.0760]
        ],
        "type": "LineString"
      },
      "distance": 1234567.8,  // meters
      "duration": 45678.9     // seconds
    }
  ],
  "waypoints": [...],
  "code": "Ok"
}



OSRM API[longitude, latitude][85.3096, 23.3441]
Leaflet Maps[latitude, longitude][23.3441, 85.3096]


*/

