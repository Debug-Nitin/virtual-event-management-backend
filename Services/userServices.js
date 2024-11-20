const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModelDAO = require('../Models/userModel/userModelDAO');

const generateToken = (user) => {
    const payload = {email: user.email, id: user.id};
    const secret = process.env.JWT_SECRET;
    const options = {expiresIn: '1h'};
    return jwt.sign(payload, secret, options);
}

const registerUser = async(userDTO)=>{
    const existingUser = await UserModelDAO.findOne({email : userDTO.email});
    if(existingUser){
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(userDTO.password,10);
    userDTO.password = hashedPassword;

    const newUser = await UserModelDAO.createUser(userDTO);
    return newUser;
}

const loginUser = async(userDTO)=>{
    const existingUser = await UserModelDAO.findOne({email : userDTO.email});
    if(!existingUser){
        throw new Error('User does not exist');
    }
    const isMatch = await bcrypt.compare(userDTO.password, existingUser.password);
    if(!isMatch){
        throw new Error('Invalid credentials');
    }
    const token = generateToken(existingUser);
    return token;
}

module.exports = {
    loginUser,
    registerUser
};