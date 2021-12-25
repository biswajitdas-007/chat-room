// importing io()
var socket = io();

const form = document.getElementById('form');
const messageContainer = document.getElementById("container")
const messageInput = document.getElementById('message');

const user = prompt("Eneter your name")

socket.emit('new-user-joined', user);

// append function for display message dynamically
const append = (data, pos) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(pos)
    messageDiv.textContent = `${data.message} ${data.user}`;
    messageContainer.appendChild(messageDiv);
}

//listen user-joined
socket.on('user-joined', (name) => {
    console.log("user: ", name)
    const messageDiv = document.createElement('div');
    messageDiv.classList.add("left")
    messageDiv.textContent = name +" joined";
    messageContainer.appendChild(messageDiv);
})

//listen welcome
socket.on("welcome", (data) => {
    append(data, "right")
})