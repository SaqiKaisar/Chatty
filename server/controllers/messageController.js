const Message = require('../models/messageModel');

module.exports.addMessage=async(req, res, next)=>{
    try{
        const {from, to, message}=req.body;
        const data = await Message.create({
            message: message,
            users: [from, to],
            sender: from,
        });
        if(data){
            return res.json({message:"Message added to the database successfully"});
        }
        return res.json({message:"Failed to add message to the database"});
    }catch(ex){
        next(ex);
    }
}

module.exports.gettAllMessages=async(req, res, next)=>{
    try{
        const {from, to}=req.body;
        const messages = await Message.find({
            users:{
                $all: [from, to],
            },
        });
        const projectMessages=messages.map((msg)=>{
            return{
                fromSelf: msg.sender.toString() === from,
                message: msg.message,
            };
        });
        console.log(projectMessages);
        return res.json(projectMessages);
    }catch(ex){
        next(ex);
    }
}