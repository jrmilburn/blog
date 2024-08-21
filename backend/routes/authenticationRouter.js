const { Router }= require("express");
const userController = require("../controllers/userController");
const { passport } = require("../config/passport");

const authenticationRouter = Router();

authenticationRouter.post('/register', userController.createUser);
authenticationRouter.post('/login', passport.authenticate("local", {
    successRedirect: '/posts',
    failureRedirect: '/login'
}) ,userController.loginUser);

module.exports = authenticationRouter;