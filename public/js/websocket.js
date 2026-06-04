// 1. Initialize Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-IN'; // Optimized for Indian English
recognition.continuous = true; 

// 2. Start listening when the user clicks anywhere (Browsers require a click to start audio)
document.body.onclick = () => {
    recognition.start();
    console.log("Listening for commands...");
};

// 3. Handle the commands
recognition.onresult = (event) => {
    const speechToText = event.results[event.results.length - 1][0].transcript.toLowerCase();
    
    if (speechToText.includes("where am i")) {
        // Trigger the Phone GPS
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude.toFixed(2);
            const lon = position.coords.longitude.toFixed(2);
            speak(`You are currently at coordinates ${lat} and ${lon}.`);
        });
    }

    if (speechToText.includes("help")) {
        speak("Sending your location to your guardian now.");
        // Here you could add code to send an SMS or Alert to the server
    }
};

// Function to talk back
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}
