const { Server } = require("socket.io");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {

    console.log("User connected via services: 👤", socket.id);


    socket.on('disconnect', ()=> {
        console.log('User disconnected ❌');
    })
  });

  return io
};

module.exports = initSocket
