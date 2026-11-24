const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let cidx = 0;
const colors = ['red', 'green', 'blue', 'brown', 'orange', 'purple', 'darkpink', 'bluegreen', 'gray', 'black'];

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.mycolor = colors[cidx % colors.length];
  cidx++;
  socket.on('chat', (message) => {
    console.log('mensagem: ' + message + 'do cliente: ' + socket.id);
    io.emit('chat', {message : message, color: socket.mycolor});
  })
});

app.get('/ola', (req, res) => {
  res.send('Olá, mundo!');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});