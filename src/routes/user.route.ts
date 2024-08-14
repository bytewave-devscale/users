import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/all", (req, res) => res.json({ msg: "hai" })); //get all user in db
userRouter.get("/", userController.handleGetSelf); //get logged in user data

export default userRouter;
