// import { login, signup} from "../controllers/userControllers"
const {signup, login} = require("../controllers/userControllers")
const express = require("express")

const UserRouter = express.Router()

//ROUTES

// POST /user/signup
UserRouter.post("/signup",signup)

// POST /user/login
UserRouter.post("/login", login)

module.exports = UserRouter;
