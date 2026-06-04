// Service to decode or flag voice shortcuts sent from hardware buttons
const voiceCommandService = {
    parseCommand: (voiceToken) => {
        const command = voiceToken.toLowerCase().trim();
        console.log(`[Voice Service] Parsing keyword: "${command}"`);

        switch(command) {
            case 'help':
                return { action: 'TRIGGER_SOS', priority: 'high' };
            case 'where am i':
                return { action: 'FETCH_GPS', priority: 'normal' };
            default:
                return { action: 'UNKNOWN_COMMAND', priority: 'low' };
        }
    }
};

module.exports = voiceCommandService;