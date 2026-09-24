// import { signupUser, loginUser } from "../models/userModel";
const {signupUser, loginUser} = require("../models/userModel")

const signup = async(req, res) => {
    
    const data = req.body;

    const user = await signupUser(data);

    if(user.error) {
        res.status(500).json({error: user.error})
    } else {
        res.status(201).json(user)
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

    if (user.error) {
        res.status(500).json({error: user.error})
    } else {
        res.status(200).json(user)
    }
};

module.exports = {
    signup,
    login
}