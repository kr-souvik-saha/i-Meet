const socket = io('http://localhost:8080');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const chatbox = document.getElementById('chatBox')
// const messageContainer = document.querySelector('.container');

// const nameUser = prompt("Enter your name to join the chat");
// socket.emit('new-user-joined', nameUser);

// for sending the message to the server
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(messageInput.value){
        socket.emit('chat-message', messageInput.value)
        messageInput.value='' // setting the message box to null/empty
    }
})

// for listentning the message from the server
socket.on('chat-message', (msg)=>{
    const li = document.createElement('li')
    li.textContent = msg
    chatbox.appendChild(li);

})
