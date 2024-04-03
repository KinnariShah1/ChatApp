const users = [];

// Join user to chat
function userJoin(id, username, room){
    const user = {id, username, room};

    users.push(user);

    return user;
}

// Get current user
function getCurrentUser(id){
    return users.find(user => user.id === id)
}

// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

// Get room users
function getRoomUsers(room){
    return users.filter(user => user.room === room);
}

// Add user's audio data
function addUserAudio(id, audioData) {
    const user = getCurrentUser(id);
    if (user) {
        user.audioData = audioData;
    }
}

// Get user's audio data
function getUserAudio(id) {
    const user = getCurrentUser(id);
    return user ? user.audioData : null;
}

module.exports = {
    userJoin,
    getCurrentUser, 
    userLeave,
    getRoomUsers,
    addUserAudio,
    getUserAudio
}