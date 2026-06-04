const fs = require('fs');
const path = require('path');

const alertService = {
    triggerEmergency: (alertType) => {
        console.warn(`[Alert Service] CRITICAL ALERT TRIGGERED: ${alertType}`);
        
        // Load contact details from our JSON database file
        const contactsPath = path.join(__dirname, '../data/contacts.json');
        
        try {
            const contactsData = fs.readFileSync(contactsPath, 'utf8');
            const contacts = JSON.parse(contactsData);
            
            // Filter out emergency recipients
            const emergencyContacts = contacts.filter(c => c.isEmergencyContact);
            
            emergencyContacts.forEach(contact => {
                console.log(`[ALERT SENT] Dispatching SOS message to ${contact.name} (${contact.phone})`);
                // Real-world implementation would integrate Twilio API or Nodemailer here
            });

            return { success: true, alertedCount: emergencyContacts.length };
        } catch (error) {
            console.error("[Alert Service] Error reading contacts configuration:", error);
            return { success: false, error: "Database unreachable" };
        }
    }
};

module.exports = alertService;