import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/all", userController.handleGetAll);
userRouter.get("/:id", userController.handleGetOne);

export default userRouter;
