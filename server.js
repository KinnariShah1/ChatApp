// const path = require('path');
// const http = require('http');
// const express = require("express");
// const socketio = require('socket.io');
// const formatMessage = require('./utils/messages');
// const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');

// const app=express();
// const server = http.createServer(app);
// const io = socketio(server);

// //Set static folder
// app.use(express.static(path.join(__dirname,'public')));

// const botName = 'ChatApp Bot';

// // Run when client connects
// io.on('connection',socket =>{
//     socket.on('joinRoom', ({ username, room}) => {
//         const user = userJoin(socket.id, username, room);

//         socket.join(user.room);

//         // Emit a welcome message to the only user connecting
//         socket.emit('message', formatMessage(botName,'Welcome to Chatcord!'));

//         // Broadcast when a user connects (emit to everyone except the user)
//         socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

//         // Send users and room info
//         io.to(user.room).emit('roomUsers', {
//             room: user.room,
//             users: getRoomUsers(user.room)
//         })
//     })

//     // Listen for chatMessage
//     socket.on('chatMessage', msg => {
//         const user = getCurrentUser(socket.id);

//         io.to(user.room).emit('message', formatMessage(user.username, msg));
//     })

//     // Listen for audioMessage
//     // socket.on('audioMessage', audioData => {
//     //     const user = getCurrentUser(socket.id);

//     //     // Broadcast the audio message to all users in the room
//     //     io.to(user.room).emit('audioMessage', audioData);
//     // })

//     // Listen for audioMessage
// socket.on('audioMessage', audioData => {
//     const user = getCurrentUser(socket.id);

//     // Convert the received ArrayBuffer to a Blob
//     const audioBlob = new Blob([audioData], { type: 'audio/webm;codecs=opus' });

//     // Broadcast the audio message to all users in the room
//     io.to(user.room).emit('audioMessage', audioBlob);
// });


//     // Runs when client disconnects
//     socket.on('disconnect', () => {
//         const user = userLeave(socket.id);

//         if(user){
//             // Emit to everyone
//             io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
//         }

//         // Send users and room info
//         io.to(user.room).emit('roomUsers', {
//             room: user.room,
//             users: getRoomUsers(user.room)
//         })
//     })

// })
// const PORT = 3000 || process.env.PORT;

// server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));

const path = require('path');
const http = require('http');
const express = require("express");
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatApp Bot';

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // Emit a welcome message to the only user connecting
        socket.emit('message', formatMessage(botName, 'Welcome to Chatcord!'));

        // Broadcast when a user connects (emit to everyone except the user)
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

// Listen for audioMessage
socket.on('audioMessage', audioBlob => {
    // Create a new audio element to play the received audio
    const audioPlayer = new Audio(URL.createObjectURL(audioBlob));
    audioPlayer.controls = true; // Add controls to the audio element
    document.body.appendChild(audioPlayer); // Append the audio element to the DOM
    audioPlayer.play(); // Play the audio
    
    // Log the received audio message
    console.log("Received audio message:", audioBlob);
});



    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            // Emit to everyone
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
