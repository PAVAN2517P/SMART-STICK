// Map Initialization and GPS Tracking Logic
const MapTracker = {
    initMap: function() {
        console.log("Map overlay initialized.");
        // If using standard maps, you would initialize your leaflet or google map element here
    },
    
    updateLocation: function(lat, lng) {
        const gpsText = `Latitude: ${lat}, Longitude: ${lng}`;
        const gpsContainer = document.getElementById('gps-status');
        
        if (gpsContainer) {
            gpsContainer.innerText = `Current Location: Lat ${lat.toFixed(4)}, Lng ${lng.toFixed(4)}`;
        }
        console.log(`Map marked at: ${gpsText}`);
    }
};