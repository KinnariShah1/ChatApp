const path = require('path');
const http = require('http');
const mongoose = require("mongoose")
const express = require("express");
const fs = require('fs');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers, addUserAudio, getUserAudio } = require('./utils/users');
const { MongoClient } = require('mongodb');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatApp Bot';
const users = {};

// mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true}).then(()=>{
//     console.log("MongoDB Connected!")
// }).catch((err)=>{
//     console.log(err);
// });

// Connect to MongoDB
// const client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect()
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Error connecting to MongoDB:', err));

// Database and collection names
// const dbName = 'chatdb';
// const collectionName = 'messages';

io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

                // Check if the users object is empty
                // if (Object.keys(users).length === 0) {
                //     console.log('The users object is empty.');
                // } else {
                    console.log('The users object is not empty.');
                    console.log('userssss:',user);
                // }

        users[socket.id] = {username, room};
        // console.log(users);

        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome to Chatcord!'));

        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

    
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    socket.on('imageMessage', ({ userId, imageData }) => {
        const user = getCurrentUser(userId);
        if (user) {
            io.to(user.room).emit('imageMessage', { userId, imageData });
        } else {
            console.error('User information not found for image message:', userId);
        }
    });

    socket.on('audioMessage', ({ socketId, audioBuffer }) => {
        const user = getCurrentUser(socketId);
        console.log("room: ", audioBuffer);
        if (user) {
            console.log("room: ", user.room);
            addUserAudio(socketId, audioBuffer); 
            console.log("room: ", audioBuffer);
            if (audioBuffer) {
                const audioBlob = Buffer.from(audioBuffer);

            io.to(user.room).emit('audioMessage', { userId: socketId, audioBlob });
            console.log("Broadcasted audio message:", audioBlob);
            }
        } else {
            console.error('User not found for audio message:', socketId);
        }
    });


    socket.on('chatMessage', async msg => {
        const user = getCurrentUser(socket.id);
        // io.to(user.room).emit('message', formatMessage(user.username, msg));
        if (user) {
            io.to(user.room).emit('message', formatMessage(user.username, msg));
            // const message = formatMessage(user.username, msg);
            // const messagesCollection = client.db(dbName).collection(collectionName);
            // try {
            //     await messagesCollection.insertOne(message);
            // } catch (err) {
            //     console.error('Error inserting message into MongoDB:', err);
            // }
        } else {
            console.error('User information not found for socket:', socket.id);
        }
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });

            delete users[socket.id];
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
