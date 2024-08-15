import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/all", userController.handleGetAll);
userRouter.get("/:id", userController.handleGetOne);
userRouter.post("/", userController.handleCreate);
userRouter.patch("/:id", userController.handleUpdate);
userRouter.delete("/:id", userController.handleDelete);

export default userRouter;
