const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

// 1. Setup WebSocket Integration
const wss = new WebSocket.Server({ server });

// 2. Fallback Path Engine to run flawlessly both locally and on Render
const rootPath = 
  path.join(__dirname, '..');


const publicPath = 
  fs.existsSync(
    path.join(__dirname, '../public'))
  ? path.join(__dirname, '../public')
  : path.join(__dirname, '..');

app.use(express.static(publicPath));

// Explicit fallback endpoint route
app.get('/', (req, res) => {
    if (fs.existsSync(path.join(publicPath, 'index.html'))) {
        res.sendFile(path.join(publicPath, 'index.html'));
    } else {
        res.sendFile(path.join(rootPath, 'index.html'));
    }
});

// 3. Multi-Client Socket Broadcast Logic (Phone-to-Phone communication)
wss.on('connection', (ws) => {
    console.log('📱 New Device Connected to Dashboard Network');

    ws.on('message', (message) => {
        const data = message.toString().trim();
        console.log(`📥 Received Stream Data: ${data}`);

        // Broadcast to every connected phone/device instantly
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    ws.on('close', () => {
        console.log('❌ Device disconnected from network');
    });
});

// 4. Start Server Instance
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`===============================================`);
    console.log(`🚀 LIVE NETWORK RUNNING`);
    console.log(`💻 Local Workstation Link: http://localhost:${PORT}`);
    console.log(`===============================================`);
});