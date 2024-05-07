const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const imageInput = document.getElementById('image-input');
const socket = io();

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

socket.on('message', message => {
    outputMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

document.getElementById('image-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const imageData = reader.result;
            socket.emit('imageMessage', { userId: socket.id, imageData });
        };
    }
});

socket.on('imageMessage', ({ userId, imageData }) => {
    const imgElement = document.createElement('img');
    imgElement.src = imageData;
    document.querySelector('.chat-messages').appendChild(imgElement);
});


let mediaRecorder;
let audioChunks = [];

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.addEventListener('dataavailable', event => {
                console.log('Data available:', event.data);
                audioChunks.push(event.data);
                console.log('Current audioChunks size:', audioChunks[0].size);
            });
            mediaRecorder.start();
        })
        .catch(err => console.error('Error accessing microphone:', err));
}

function appendAudioPlayer(audioPlayer) {
    const chatContainer = document.querySelector('.chat-messages');
    chatContainer.appendChild(audioPlayer);
}

function stopRecordingAndBroadcast() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.addEventListener('stop', () => {
            console.log('Recording stopped');
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });

            const audioPlayer = new Audio(URL.createObjectURL(audioBlob));
            audioPlayer.controls = true; // Add controls to the audio element
            appendAudioPlayer(audioPlayer); // Append the audio player to the chat messages container
            audioPlayer.play().then(() => {
                // Broadcast the audio message to all users in the room after playing the audio
                // socket.emit('audioMessage', audioBlob);
                // Inside stopRecordingAndBroadcast() function in main.js
            socket.emit('audioMessage', { socketId: socket.id, audioBlob });

                console.log("Broadcasted audio message:", audioBlob); // Check if audioBlob is properly emitted
                audioChunks = []; // Clear the audioChunks array after broadcasting
            }).catch(error => {
                console.error('Error playing audio:', error);
            });
        });

        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        console.log('Microphone turned off');
    }
}

let isRecording = false;

document.getElementById('record-btn').addEventListener('click', (e) => {
    e.preventDefault();
    if (!isRecording) {
        console.log('Start recording');
        startRecording();
        isRecording = true;
    } else {
        console.log('Stop recording');
        stopRecordingAndBroadcast();
        isRecording = false;
    }
});

socket.on('audioMessage', (data) => {
    if (data && data.userId && data.audioBlob) {
        const { userId, audioBlob } = data;
        console.log('Received audio message from user:', userId);
        const audioPlayer = new Audio(URL.createObjectURL(audioBlob));
        audioPlayer.controls = true; // Add controls to the audio element
        const chatContainer = document.querySelector('.chat-messages');
        chatContainer.appendChild(audioPlayer);
        audioPlayer.play();
    } else {
        console.error('Invalid data received for audio message:', data);
    }
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
    chatMessages.appendChild(div);
}

function outputRoomName(room) {
    roomName.innerText = room;
}

function outputUsers(users) {
    userList.innerHTML = users.map(user => `<li>${user.username}</li>`).join('');
}
