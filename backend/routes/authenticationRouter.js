const { Router }= require("express");
const userController = require("../controllers/userController");

const authenticationRouter = Router();

authenticationRouter.post('/register', userController.createUser);
authenticationRouter.post('/login', userController.loginUser);

module.exports = authenticationRouter;