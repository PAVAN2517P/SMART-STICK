const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 1. Setup WebSocket on the same server
const wss = new WebSocket.Server({ server });

// 2. Serve your Dashboard files from the 'public' folder
app.use(express.static(path.join(__dirname));

// 3. WebSocket Connection Logic
wss.on('connection', (ws) => {
    console.log('New client connected (Stick or Dashboard)');

    ws.on('message', (message) => {
        // This is where the stick sends data (e.g., "OBSTACLE_DETECTED")
        const data = message.toString();
        console.log(`Received from stick: ${data}`);

        // Send this message to the Dashboard (Phone)
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// 4. Start the server on Port 3000
const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`-----------------------------------------------`);
    console.log(`🚀 SERVER ACTIVE: http://localhost:${PORT}`);
    console.log(`📡 FOR PHONE ACCESS: Use your IP address at port 3000`);
    console.log(`-----------------------------------------------`);
});