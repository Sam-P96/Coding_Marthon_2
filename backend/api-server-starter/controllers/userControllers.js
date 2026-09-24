// import { signupUser, loginUser } from "../models/userModel";
const {signupUser, loginUser} = require("../models/userModel")
const jwt = require("jsonwebtoken");

//JWT
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

const signup = async(req, res) => {
try {
    const data = req.body;

    const user = await signupUser(data);
    const token = await generateToken(user._id);

    if(user.error) {
        res.status(500).json({error: user.error})
    } else {
        res.status(201).json({user, token})
    }
} catch (error) {
    res.status(500).json(error.message)
}

};

const login = async(req,res) => {
    const data = req.body;

    const email = String(data.email).toLowerCase().trim() ;
    const password = data.password
    if (!email || !password){
        res.status(500).json({error: user.error});
    }
    const user = await loginUser(email, password)
    const token = await generateToken(user._id);

    if (user.error) {
        res.status(500).json({error: user.error})
    } else {
        res.status(200).json({user, token})
    }
};

module.exports = {
    signup,
    login
}