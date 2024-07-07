const {Server}=require('socket.io');
const server=require('./server');
const ACTIONS=require('./actions');
const io = new Server(server, {
  //cors policy
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
/*  
//socket
// here we have to mapping which socket Id is basically assigned to which user
const socketUserMapping={

};


// asign a event handlers ( on function listen the event),as soon as connection is done we have received a socket that basically tells which socket is conneted and each socket has an unique socket-id and every time you will refresh you will get a new socket-id
io.on("connection", (socket) => {
  console.log(`New connection is Established and the socketId is ${socket.id}`);

  socket.on(ACTIONS.JOIN,({roomId,user})=>{
    
    //mapping
    socketUserMapping[socket.id]=user;

    // fetch all the clients which basically connected to this room
    //this function returns map
    const clients=Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>({
      socketId,
      client:socketUserMapping[socketId],
    }));
    console.log(clients);


    //send an event/request(I want to add in room) to all the clients
    clients.forEach((clientId)=>{
        io.to(clientId).emit(ACTIONS.ADD_PEER,{
            peerId:socket.id,  //which person wanna add
            creteOffer:false,
            user,    
        });

         //also send/emit an event itself
    socket.emit(ACTIONS.ADD_PEER,{
    peerId:clientId,  // add that person in itself
    createOffer:true, // the client who wants to add that basically create offer
    user:socketUserMapping[clientId]

  })

    });

 //join the room
 socket.join(roomId);
           
  });
  
  // Handle relay Ice event
  socket.on(ACTIONS.RELAY_ICE,({peerId,icecandidate})=>{
    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE,{
      peerId:socket.id,
      icecandidate,
    });
  });

  //Handle Relay SDP
  socket.on(ACTIONS.SESSION_DESCRIPTION,({peerId,sessionDescription})=>{
      io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION,{
        peerId:socket.id,//whose session description this is ?
        sessionDescription
      });
  });

 
const leaveRoom = () => {
    const { rooms } = socket;
    Array.from(rooms).forEach((roomId) => {
        const clients = Array.from(
            io.sockets.adapter.rooms.get(roomId) || []
        );
        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
                peerId: socket.id,
                userId: socketUserMapping[socket.id]?.id,
            });

            // socket.emit(ACTIONS.REMOVE_PEER, {
            //     peerId: clientId,
            //     userId: socketUserMap[clientId]?.id,
            // });
        });
        socket.leave(roomId);
    });
    delete socketUserMapping[socket.id];
};

socket.on(ACTIONS.LEAVE, leaveRoom);

socket.on('disconnecting', leaveRoom);


});
 */

const USER_MAPPING = {};
const getConnectedClients = (roomId) =>{
   const clients= Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => ({
      socketId,
      client: USER_MAPPING[socketId],
    }));
    return clients;

}

  io.on('connection', (socket) => {
    console.log(`connected ${socket.id}`)
    socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
      USER_MAPPING[socket.id] = user;
      // GETTING ALL THE CLIENTS THAT ARE CONNECTED TO THE ROOM by its "roomId"
      const clients = getConnectedClients(roomId);
      console.log(clients);
      // NOW LOOP OVER THE CLIENTS ADD EMIT AN EVENT THAT A NEW CLIENT WANTS TO JOIN
      // ALSO EMIT AN EVENT THE CURRENT CLIENT WHO WANTS TO JOIN PASSING SOME INFO
      clients.forEach((connectedClient) => {
        // FOR OTHER CLIENTS
        io.to(connectedClient.socketId).emit(ACTIONS.ADD_PEER, {
          peerId: socket.id,
          createOffer: false,
          remoteUser: user,
        });
        // FOR THE CURRENT CLIENT
        socket.emit(ACTIONS.ADD_PEER, {
          peerId: connectedClient.socketId,
          createOffer: true,
          remoteUser: USER_MAPPING[connectedClient.socketId],
        });
        console.log('a');
      });
      console.log('b');
      socket.join(roomId);
    });
  
    // HANDLE ICECANDIDATE
    socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) =>
      io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
        peerId: socket.id,
        icecandidate,
      })
    );
  
    // HANDLE SDP (SESSION DESCRIPTION)
    socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) =>
      io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
        peerId: socket.id,
        sessionDescription,
      })
    );
  
    //leaving the room
  
    function leaveRoom({roomId}) {
        const { rooms } = socket;
        console.log('leaving',rooms);
        console.log('USER_MAPPING',USER_MAPPING);

    Array.from(rooms).forEach((roomId) => {
      const connectedClients = getConnectedClients(roomId);
      connectedClients.forEach((connectedClient) => {
        io.to(connectedClient).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
          userId: USER_MAPPING[socket.id]?.id,
        });
  
        socket.emit(ACTIONS.REMOVE_PEER, {
          peerId: connectedClient.socketId,
          userId: connectedClient.client?.id,
        });
      });
      socket.leave(roomId);
    });
      delete USER_MAPPING[socket.id];
      console.log('map',USER_MAPPING);
}
      
       // HANDLE REMOVE PEER
    socket.on(ACTIONS.LEAVE, leaveRoom);
    socket.on('disconnecting', leaveRoom);
    
  });
  

