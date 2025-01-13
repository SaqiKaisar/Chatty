const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports.register= async(req,res,next)=>{
    try{
        const {username,email,password}=req.body;
        const usernameCheck=await User.findOne({username});
        if(usernameCheck){
            return res.json({message:"Username already exists", state:false});
        }
        const emailCheck=await User.findOne({email});
        if(emailCheck){
            return res.json({message:"Email already exists", state:false});
        }
        const hashedPassword=await bcrypt.hash(password,12);
        const user=await User.create({
            username,
            email,
            password:hashedPassword,
        });
        delete user.password;
        return res.json({message:"User registered successfully", state:true, user});
    }catch(err){
        next(err);
    }
}

module.exports.logIn= async(req,res,next)=>{
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            return res.json({message:"Incorrect username or password", state:false});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.json({message:"Incorrect username or password", state:false});
        }
        delete user.password;
        return res.json({state:true, user});
    }catch(err){
        next(err);
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try{
        const userId=req.params.id;
        const avatarImage=req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        });
        userData.isAvatarImageSet = true;
        userData.avatarImage = avatarImage;
        return res.json({isSet:userData.isAvatarImageSet, image:userData.avatarImage});
    }catch(err){
        next(err);
    }
}

module.exports.allUsers = async (req, res, next) => {
    try{
        const users=await User.find({_id: {$ne: req.params.id}}).select([
            "username",
            "email",
            "avatarImage",
            "_id",
        ]);
        console.log(users);
        return res.json(users);
    }catch(err){
        next(err);
    }
}