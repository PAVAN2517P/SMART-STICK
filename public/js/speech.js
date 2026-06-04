// Speech Synthesis Wrapper for Voice Alerts
const SpeechEngine = {
    speechInstance: window.speechSynthesis,
    
    speak: function(text) {
        if (!this.speechInstance) {
            console.error("Speech Synthesis not supported in this browser.");
            return;
        }
        
        // Cancel any current speaking to announce the new message immediately
        this.speechInstance.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;  // Speed of speech
        utterance.pitch = 1.0; // Voice pitch
        
        this.speechInstance.speak(utterance);
    }
};