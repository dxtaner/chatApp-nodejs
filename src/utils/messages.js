function generateTimestamp() {
  return new Date().getTime();
}

function generateMessage(username, text) {
  return {
    username,
    text,
    createdAt: generateTimestamp(),
  };
}

function generateLocationMessage(username, url) {
  return {
    username,
    url,
    createdAt: generateTimestamp(),
  };
}

module.exports = {
  generateMessage,
  generateLocationMessage,
};
