const express= require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app =express();
const socket = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('MongoDB Connected');
}).catch((err)=>{
    console.log(err.message);
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

const io = socket(server, {cors:
    {
        origin:"http://localhost:5173",
        credentials: true,
    }
})

global.onlineUsers=new Map();

io.on("connection", (socket)=>{
    global.chatSocket=socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    })
    socket.on("send-msg", (data)=>{
        const receieverSocket=onlineUsers.get(data.to);
        if(receieverSocket){
            socket.to(receieverSocket).emit("msg-recieve", data.message);
        }
    })
})





