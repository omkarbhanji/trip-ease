const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const JWT_SECRET = "MYNAME IS OMAKR";

exports.register = async(req, res) => {
    try{
        const { username, password, emailid, roles, name, gender, contact} = req.body;

        console.log(req.body);

        const userExists = await User.findOne({username: username});
        console.log(userExists);

        if(userExists){
            console.log("User does exist")
            return res.status(500).json({message: "Username already present"});
        }
    
        const user = await User.create({username, password, emailid, roles, name, gender, contact});

        res.status(201).json({message: "User successfully created", user});
            

        }
        catch(err){
            console.log(err);
            res.status(400).json({message: "Invalid request", error: err.message});
        }
};

exports.login = async(req, res) => {
    try{
        console.log("This is req body : " + req.body.password);
        const {username, password} = req.body;
        console.log("This is " + username + " " + password);

        const user = await User.findOne({username});
        console.log(user);
        if(!user){
            console.log("User dosent exist");
            return res.status(401).json({message: "Invalid credentials, user donsen't exist"});
        }
        console.log("Before checking: " +  user.password + " " + password);
        if(user.password != password){
            return res.status(401).json({message: "Invalid credentials, password didnt match"});
        }

        const token = jwt.sign({
            _id: user._id,
            email: user.emailid,
            roles: user.roles
        }, JWT_SECRET);

        return res.status(200).json({token});

    }
    catch(err){
        return res.status(500).json({error: err.message});
    }

};
