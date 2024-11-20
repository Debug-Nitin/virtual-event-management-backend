const UserModelDTO = require('../Models/userModel/userModelDTO');
const userService = require('../Services/userServices');

const registerUser = async(req,res)=>{
    const userData = req.body;
    const userDTO = new UserModelDTO(userData);
    try{
        const newUser =await userService.registerUser(userDTO);
        if(newUser){
            res.status(201).send({message: 'User created successfully'});
        }
    }catch(err){
        res.status(400).send({message: err.message});
    }
}

const loginUser = async(req,res)=>{
    const userData = req.body;
    const userDTO = new UserModelDTO(userData);
    try{
        const token = await userService.loginUser(userDTO);
        if(token){
            const bearerToken = 'Bearer ' + token;
            console.log(bearerToken);
            res.header('Authorization', bearerToken);
            res.status(200).send({message: 'User logged in successfully'});
        }
    }catch(err){
            res.status(400).send({message: err.message});
        }
};


module.exports = {
    registerUser,
    loginUser
};