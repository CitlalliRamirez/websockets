'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  
  ws.on('message', function(message) {

    console.log('message: ' + message);
    wss.broadcast(message);

  });
  ws.on('close', () => console.log('Client disconnected'));
  console.log('Client connected');

});

wss.broadcast = function broadcast(msg){
  const msgNuevo = msg.toString('utf8');
  console.log("MSGJ",msgNuevo);
  wss.clients.forEach(function each(client){
    client.send(msgNuevo);
  });
}

/**setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);**/