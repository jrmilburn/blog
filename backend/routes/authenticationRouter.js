const { Router } = require("express");
const userController = require("../controllers/userController");

const authenticationRouter = Router();

// Route to register a new user
authenticationRouter.post('/register', userController.createUser);

// Route to log in a user and issue a JWT token
authenticationRouter.post('/login', userController.loginUser);

module.exports = authenticationRouter;
