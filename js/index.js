// importing io()
var socket = io();

const form = document.getElementById('form');
const messageContainer = document.getElementById("container")
const input = document.getElementById('message');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
        append({message:input.value, user:"You"}, "right")
        socket.emit("message", input.value);
        input.value = "";
    }
})
const user = prompt("Eneter your name")

socket.emit('new-user-joined', user);

// append function for display message dynamically
const append = (data, pos) => {
    const messageDiv = document.createElement('div');
    const para = document.createElement("p");
    const h3 = document.createElement("h3");
    messageDiv.classList.add(pos)
    if (data.message == "Welcome") {
        let div = document.createElement("div");
        div.innerHTML = `<p>${data.message}<span class="user-name">${data.user}</span></p>`;
        div.classList.add("msg")
        messageDiv.appendChild(div)
    } else if(data.message == "is joined chat"){
        let div = document.createElement("div");
        div.innerHTML = `<p class="user-name">${data.user}<span class="welcome-msg">${data.message}</span></p>`;
        div.classList.add("msg")
        messageDiv.appendChild(div)
    } else {
        let div = document.createElement("div");
        div.innerHTML = `<h3>${data.user}:<span class="message">${data.message}</span></h3>`;
        div.classList.add("msg")
        messageDiv.appendChild(div)
    }
    
    messageContainer.appendChild(messageDiv);
}

//listen user-joined
socket.on('user-joined', (name) => {
    append({ message: "is joined chat", user: name },"left");
})

//listen welcome
socket.on("welcome", (data) => {
    append(data, "right")
})

socket.on("message", (data) => {
    append(data, "left")
})