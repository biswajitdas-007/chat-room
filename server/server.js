const express = require("express");
const app = express();
const path = require("path");
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

// createing soket io server
const io = new Server(server);

// storing users with unique soket id
const users = {};

// allow js to use .js and .css files
app.use("/js", express.static('../js/'));
app.use("/css", express.static('../css/'));

// loading our landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "/index.html"))
})

//establishing connection with socket io
io.on('connection', (socket) => {
    console.log("User is connected");
    socket.on("new-user-joined", user => {
        users[socket.id] = user;
        console.log(user)
        socket.broadcast.emit('user-joined', user);
        socket.emit("welcome", {message:"Welcome", user:users[socket.id]})
    })
})

// listening to port 3000
server.listen(3000, () => {
    console.log("listening on 3000");
})