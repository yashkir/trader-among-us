const debug = require("debug")("sockets");
const watchedDeals = { };

function configure(server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    }
  });

  io.on("connection", (socket) => {
    debug("socket client connected");

    // What deal do they want?
    socket.emit("WhatDeal");
    
    socket.on("WatchDeal",  (dealId) => {
      // Register the function to send a message
      if (!watchedDeals[dealId]) {
        watchedDeals[dealId] = {}; 
      }

      watchedDeals[dealId][socket.id] = (message) => {
        socket.emit("NewMessage", message);
      };

      // Unregister on disconnect
      socket.on("disconnect", () => {
        delete watchedDeals[dealId][socket.id];
      });
    });

    socket.on("disconnect", () => {
      debug("socket client disconnected");
    });
  });
}

function informNewMessages(dealId, messages) {
  if (watchedDeals[dealId]) {
    for (const socketId in watchedDeals[dealId]) {
      watchedDeals[dealId][socketId](messages);
    }
  }
}

module.exports = {
  configure,
  informNewMessages,
};
