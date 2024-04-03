// const chatForm = document.getElementById('chat-form');
// const chatMessages = document.querySelector('.chat-messages');
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');
// const socket = io();

// // Get username and room from URL
// const { username, room } = Qs.parse(location.search, {
//     ignoreQueryPrefix: true
// });

// // Join chatroom
// socket.emit('joinRoom', { username, room });

// // Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//     outputRoomName(room);
//     outputUsers(users);
// });

// // Message from server
// socket.on('message', message => {
//     outputMessage(message);
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// });

// // Message submit
// chatForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const msg = e.target.elements.msg.value;
//     socket.emit('chatMessage', msg);
//     e.target.elements.msg.value = '';
//     e.target.elements.msg.focus();
// });

// // Audio recording
// let mediaRecorder;
// let audioChunks = [];

// // Start recording audio
// function startRecording() {
//     navigator.mediaDevices.getUserMedia({ audio: true })
//         .then(stream => {
//             mediaRecorder = new MediaRecorder(stream);
//             mediaRecorder.addEventListener('dataavailable', event => {
//                 console.log('Data available:', event.data);
//                 audioChunks.push(event.data);
//             });
//             mediaRecorder.start();
//         })
//         .catch(err => console.error('Error accessing microphone:', err));
// }


// // Function to stop recording and broadcast the recorded audio
// function stopRecordingAndBroadcast() {
//     if (mediaRecorder && mediaRecorder.state === 'recording') {
//         mediaRecorder.stop();
//         mediaRecorder.stream.getTracks().forEach(track => track.stop());
//         console.log('Microphone turned off');

//         // Handle audio data when recording stops
//         const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });
//         socket.emit('audioMessage', audioBlob);
//         audioChunks = [];
//     }
// }

// // Event listener for record button
// let isRecording = false;

// document.getElementById('record-btn').addEventListener('click', (e) => {
//     e.preventDefault();
//     if (!isRecording) {
//         console.log('Start recording');
//         startRecording();
//         isRecording = true;
//     } else {
//         console.log('Stop recording');
//         stopRecordingAndBroadcast();
//         isRecording = false;
//     }
// });

// // Output message to DOM
// function outputMessage(message) {
//     const div = document.createElement('div');
//     div.classList.add('message');
//     div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
//     <p class="text">${message.text}</p>`;
//     chatMessages.appendChild(div);
// }

// // Add room name to DOM
// function outputRoomName(room) {
//     roomName.innerText = room;
// }

// // Add users to DOM
// function outputUsers(users) {
//     userList.innerHTML = users.map(user => `<li>${user.username}</li>`).join('');
// }


// Client-side code
// const chatForm = document.getElementById('chat-form');
// const chatMessages = document.querySelector('.chat-messages');
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');
// const socket = io();

// // Get username and room from URL
// const { username, room } = Qs.parse(location.search, {
//     ignoreQueryPrefix: true
// });

// // Join chatroom
// socket.emit('joinRoom', { username, room });

// // Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//     outputRoomName(room);
//     outputUsers(users);
// });

// // Message from server
// socket.on('message', message => {
//     outputMessage(message);
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// });

// // Message submit
// chatForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const msg = e.target.elements.msg.value;
//     socket.emit('chatMessage', msg);
//     e.target.elements.msg.value = '';
//     e.target.elements.msg.focus();
// });

// // Audio recording
// let mediaRecorder;
// let audioChunks = [];

// // Start recording audio
// function startRecording() {
//     navigator.mediaDevices.getUserMedia({ audio: true })
//         .then(stream => {
//             mediaRecorder = new MediaRecorder(stream);
//             mediaRecorder.addEventListener('dataavailable', event => {
//                 console.log('Data available:', event.data);
//                 audioChunks.push(event.data);
//             });
//             mediaRecorder.start();
//         })
//         .catch(err => console.error('Error accessing microphone:', err));
// }

// // Function to stop recording and broadcast the recorded audio
// function stopRecordingAndBroadcast() {
//     if (mediaRecorder && mediaRecorder.state === 'recording') {
//         mediaRecorder.stop();
//         mediaRecorder.stream.getTracks().forEach(track => track.stop());
//         console.log('Microphone turned off');

//         // Handle audio data when recording stops
//         const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });
//         console.log('Audio Blob:', audioBlob); 
//         console.log('Audio Blob size:', audioBlob.size);
// console.log('Audio Blob type:', audioBlob.type);

//         // socket.emit('audioMessage', audioBlob);
//         // audioChunks = [];

//                 // Play the recorded audio
//                 const audioPlayer = new Audio(URL.createObjectURL(audioBlob));
//                 audioPlayer.controls = true; // Add controls to the audio element
//                 document.body.appendChild(audioPlayer); // Append the audio element to the DOM
//                 audioPlayer.play(); // Play the audio
//                 audioChunks = [];
//     }
// }

// // Event listener for record button
// let isRecording = false;

// document.getElementById('record-btn').addEventListener('click', (e) => {
//     e.preventDefault();
//     if (!isRecording) {
//         console.log('Start recording');
//         startRecording();
//         isRecording = true;
//     } else {
//         console.log('Stop recording');
//         stopRecordingAndBroadcast();
//         isRecording = false;
//     }
// });

// // Event listener for receiving audio messages
// // Listen for audioMessage
// // socket.on('audioMessage', audioData => {
// //     const user = getCurrentUser(socket.id);

// //     // Convert the received ArrayBuffer to a Blob
// //     const audioBlob = new Blob([audioData], { type: 'audio/webm;codecs=opus' });

// //     // Broadcast the audio message to all users in the room
// //     io.to(user.room).emit('audioMessage', audioBlob);
// // });




// // Output message to DOM
// function outputMessage(message) {
//     const div = document.createElement('div');
//     div.classList.add('message');
//     div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
//     <p class="text">${message.text}</p>`;
//     chatMessages.appendChild(div);
// }

// // Add room name to DOM
// function outputRoomName(room) {
//     roomName.innerText = room;
// }

// // Add users to DOM
// function outputUsers(users) {
//     userList.innerHTML = users.map(user => `<li>${user.username}</li>`).join('');
// }

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const socket = io();

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

// Message from server
socket.on('message', message => {
    outputMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Audio recording
let mediaRecorder;
let audioChunks = [];

// Start recording audio
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

// Function to append the audio player to the chat messages container
function appendAudioPlayer(audioPlayer) {
    const chatContainer = document.querySelector('.chat-messages');
    chatContainer.appendChild(audioPlayer);
}

function stopRecordingAndBroadcast() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.addEventListener('stop', () => {
            console.log('Recording stopped');
            // Concatenate audio chunks into a single Blob
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });

            // Play the recorded audio
            const audioPlayer = new Audio(URL.createObjectURL(audioBlob));
            audioPlayer.controls = true; // Add controls to the audio element
            appendAudioPlayer(audioPlayer); // Append the audio player to the chat messages container
            audioPlayer.play().then(() => {
                // Broadcast the audio message to all users in the room after playing the audio
                socket.emit('audioMessage', audioBlob);
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

// Event listener for record button
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

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
    chatMessages.appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = users.map(user => `<li>${user.username}</li>`).join('');
}
