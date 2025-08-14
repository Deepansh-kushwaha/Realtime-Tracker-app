const { render } = require('ejs');
const express = require('express');
const http = require('http');
const socketio =  require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.set('view engine', 'ejs');
app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('send-location', (data) => {
        io.emit("recieved Location", {id: socket.id , ...data});
    })
    socket.on('disconnect', () => {
        io.emit("user-disconnected", socket.id);
    })

})

app.get('/', (req, res) => {
  res.render('index');
})
 


server.listen(3000);