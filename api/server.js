const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.get('/api', (req, res) => {
    res.send('I\'m up, I\'m up!');
})

module.exports = server;
