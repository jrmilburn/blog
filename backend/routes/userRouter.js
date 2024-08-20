const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.get("/:userid", userController.getUser);

userRouter.post("/", userController.createUser);

userRouter.put("/:userid", userController.updateUser);

userRouter.delete("/:userid", userController.deleteUser);

module.exports = userRouter;