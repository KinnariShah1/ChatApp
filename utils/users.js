const users = [];

function userJoin(id, username, room){
    const user = {id, username, room};

    users.push(user);

    return user;
}

function getCurrentUser(id){
    return users.find(user => user.id === id)
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

function getRoomUsers(room){
    return users.filter(user => user.room === room);
}

function addUserAudio(id, audioData) {
    const user = getCurrentUser(id);
    if (user) {
        user.audioData = audioData;
    }
}

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