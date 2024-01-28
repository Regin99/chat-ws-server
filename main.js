import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { WebSocketServer } from 'ws';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Received message: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = 7500;
server.listen(PORT, () => {
  console.log(server.address());
  console.log(`Server started on port ${PORT}`);
});
