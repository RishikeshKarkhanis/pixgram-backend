const uidToUser = new Map();

function setUser(uid, user) {
    uidToUser.set(uid, user);
}
function getUser(uid) {
    return uidToUser.get(uid);
}

module.exports = { setUser, getUser };