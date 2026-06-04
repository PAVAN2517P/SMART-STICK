// Main Dashboard Application Orchestrator
document.addEventListener('DOMContentLoaded', () => {
    console.log("Smart Stick Dashboard Initialized Successfully.");
    
    // Initialize standard maps
    MapTracker.initMap();
    
    const pingButton = document.getElementById('trigger-voice');
    
    if (pingButton) {
        pingButton.addEventListener('click', () => {
            const message = "Pinging Smart Stick hardware for audio feedback loop.";
            console.log(message);
            
            // Speak confirmation to user/caregiver
            if (typeof SpeechEngine !== 'undefined') {
                SpeechEngine.speak("Pinging stick location now.");
            }
            
            // Send signal back via WebSocket if connected
            if (typeof socket !== 'undefined' && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ action: 'ping_hardware' }));
            }
        });
    }
});