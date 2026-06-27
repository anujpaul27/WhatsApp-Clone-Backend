const { Server } = require("socket.io");
const saveMessage = require("../controllers/message.controller");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected via services: 👤", socket.id);

    // 1. Create room for individual  
    socket.on('joinRoom', async ({senderId, receiverId})=> {
        // create id of this room 
        const roomId = [senderId,receiverId].sort().join('-');
        
        // socket go the this room 
        socket.join(roomId)
        console.log(`User ${socket.id} joined room: 🔑 ${roomId}`);
    })

    // 2.Room wise message sending event 
    socket.on('sendMessage', async(data)=> {
        try {
            const {sender, receiver} = data;
            const roomId = [sender,receiver].sort().join('-')

            // message save to the DB 
            const saveMsg = await saveMessage(data)
            io.to(roomId).emit('receiveMessage', saveMsg)
        }
        catch (err)
        {
            socket.emit('error', 'message send failed')
        }
    })
    socket.on('disconnect', ()=> {
        console.log('User disconnected ❌');
    })
  });

  return io
};

module.exports = initSocket
