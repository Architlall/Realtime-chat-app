const chatform = document.getElementById('chat-form');

const socket = io();

socket.on('message', message => {
    console.log(message);
    outputMessage(message);
})

chatform.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    console.log(msg);
    socket.emit('chatMessage', msg);
});

function outputMessage(message){
    const div = document.createElement('div');
}
