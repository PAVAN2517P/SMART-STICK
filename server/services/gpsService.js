// Service to process and format GPS tracking logs
const gpsService = {
    processCoordinates: (rawData) => {
        // Expected incoming structure: { lat: 12.9716, lng: 77.5946 }
        const { lat, lng } = rawData;
        
        if (!lat || !lng) {
            return { error: "Invalid coordinates received." };
        }

        console.log(`[GPS Service] Processing location: Lat ${lat}, Lng ${lng}`);
        
        return {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            timestamp: new Date().toISOString(),
            status: "Location Active"
        };
    }
};

module.exports = gpsService;