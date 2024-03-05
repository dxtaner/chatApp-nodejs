const users = [];

const addUser = ({ id, username, room }) => {
  if (username.length > 50) {
    return {
      error: "Username must be at most 50 characters long!",
    };
  }

  if (room.length > 50) {
    return {
      error: "Room must be at most 50 characters long!",
    };
  }

  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!username || !room) {
    return {
      error: "Username and room are required!",
    };
  }

  const existingUser = users.find(
    (user) => user.room === room && user.username === username
  );

  if (existingUser) {
    return {
      error: "Username is in use!",
    };
  }

  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const removedUserIndex = users.findIndex((user) => user.id === id);

  if (removedUserIndex !== -1) {
    return users.splice(removedUserIndex, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
