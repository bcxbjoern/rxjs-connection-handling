const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let messages = [];

wss.on('connection', ws => {
  console.log('Client connected');

  const interval = setInterval(() => {
    const newMessage = { message: 'This is a message from the server', timestamp: new Date() };
    messages.push(newMessage);
    ws.send(JSON.stringify(messages));
  }, 1000);

  ws.on('message', message => {
    console.log('received: %s', message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
    // Reset messages when client disconnects for a clean state on next connection
    messages = [];
  });
});

console.log('WebSocket server started on port 8080');
